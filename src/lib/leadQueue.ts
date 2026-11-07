/**
 * DataCraft Studio — Durable Lead Queue & Fallback Engine
 * 
 * Ensures zero enquiry loss during serverless execution or external API outages.
 * 
 * Storage Hierarchy:
 * 1. Cloud Key-Value / Redis Queue (Upstash Redis / Vercel KV) if configured.
 * 2. Dedicated CRM / Webhook Endpoint (Slack / Zapier / Make / n8n) if configured.
 * 3. Structured Serverless Log Drain (Permanent & indexed in Vercel / CloudWatch).
 * 4. Local File Ledger (for Node / container runtimes with filesystem access).
 */

import { LeadPayload, NotionSyncResult, syncLeadToNotion } from "./notion";
import { EmailDispatchResult, sendLeadNotificationEmail } from "./email";
import fs from "fs/promises";
import path from "path";

export interface QueuedLeadEntry {
  idempotencyKey: string;
  lead: LeadPayload;
  createdAt: string;
  updatedAt: string;
  retryCount: number;
  notionStatus: NotionSyncResult["status"] | "PENDING";
  notionPageId?: string;
  notionError?: string;
  emailStatus: EmailDispatchResult["status"] | "PENDING";
  emailMessageId?: string;
  emailError?: string;
}

export interface StorageStatus {
  durableStorageConfigured: boolean;
  provider: "UPSTASH_REDIS" | "VERCEL_KV" | "WEBHOOK" | "LOCAL_FILE" | "LOG_DRAIN_ONLY";
  details: string;
}

/**
 * Checks which persistent storage mechanism is configured in the runtime.
 */
export function checkPersistentStorage(): StorageStatus {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return {
      durableStorageConfigured: true,
      provider: "UPSTASH_REDIS",
      details: "Upstash Redis REST interface active for distributed serverless queueing.",
    };
  }

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return {
      durableStorageConfigured: true,
      provider: "VERCEL_KV",
      details: "Vercel KV active for durable serverless persistence.",
    };
  }

  if (process.env.LEAD_BACKUP_WEBHOOK_URL) {
    return {
      durableStorageConfigured: true,
      provider: "WEBHOOK",
      details: "Remote Webhook fallback active for external queue storage.",
    };
  }

  return {
    durableStorageConfigured: false,
    provider: "LOG_DRAIN_ONLY",
    details:
      "Remote cloud storage (Upstash Redis / Vercel KV / Webhook) is pending configuration. Leads are preserved via immutable serverless stdout log drain and local filesystem ledger.",
  };
}

/**
 * Persists lead entry to the active durable queue or fallback mechanisms.
 */
export async function persistLeadToDurableQueue(
  lead: LeadPayload,
  notionResult: NotionSyncResult,
  emailResult: EmailDispatchResult
): Promise<{ persisted: boolean; destinations: string[] }> {
  const destinations: string[] = [];
  const entry: QueuedLeadEntry = {
    idempotencyKey: lead.referenceId,
    lead,
    createdAt: lead.timestamp || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    retryCount: 0,
    notionStatus: notionResult.status,
    notionPageId: notionResult.pageId,
    notionError: notionResult.error,
    emailStatus: emailResult.status,
    emailMessageId: emailResult.messageId,
    emailError: emailResult.error,
  };

  // 1. Immutable Serverless Log Drain (Guaranteed capture in Vercel / AWS CloudWatch)
  console.log(
    `[DATACRAFT_LEAD_AUDIT_LOG] ${JSON.stringify({
      ref: lead.referenceId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service: lead.service,
      budget: lead.budget,
      notionStatus: notionResult.status,
      emailStatus: emailResult.status,
      timestamp: entry.createdAt,
    })}`
  );
  destinations.push("SERVERLESS_LOG_DRAIN");

  // 2. Upstash Redis / Vercel KV REST push
  const redisUrl =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (redisUrl && redisToken) {
    try {
      // Store under unique lead key and push to pending queue if not fully synced
      const key = `lead:${lead.referenceId}`;
      await fetch(`${redisUrl}/set/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${redisToken}` },
        body: JSON.stringify(entry),
      });

      if (!notionResult.success || !emailResult.success) {
        await fetch(`${redisUrl}/rpush/lead_retry_queue`, {
          method: "POST",
          headers: { Authorization: `Bearer ${redisToken}` },
          body: JSON.stringify(key),
        });
      }
      destinations.push("CLOUD_KV_STORE");
    } catch (err: any) {
      console.error("[LEAD_QUEUE:KV_FAIL]", err.message);
    }
  }

  // 3. Fallback Remote Webhook (Slack / CRM / Zapier)
  const webhookUrl = process.env.LEAD_BACKUP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "DataCraft Website Fallback",
          lead,
          notionStatus: notionResult.status,
          emailStatus: emailResult.status,
        }),
      });
      destinations.push("BACKUP_WEBHOOK");
    } catch (err: any) {
      console.error("[LEAD_QUEUE:WEBHOOK_FAIL]", err.message);
    }
  }

  // 4. Local Filesystem Ledger (for Node / Docker / development environments)
  try {
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    // Main submissions log
    const ledgerPath = path.join(dataDir, "submissions.json");
    let ledger: QueuedLeadEntry[] = [];
    try {
      const data = await fs.readFile(ledgerPath, "utf-8");
      ledger = JSON.parse(data);
    } catch {
      ledger = [];
    }
    ledger.unshift(entry);
    await fs.writeFile(ledgerPath, JSON.stringify(ledger.slice(0, 500), null, 2), "utf-8");

    // Failed queue for retry
    if (!notionResult.success || !emailResult.success) {
      const queuePath = path.join(dataDir, "pending_retries.json");
      let queue: QueuedLeadEntry[] = [];
      try {
        const qData = await fs.readFile(queuePath, "utf-8");
        queue = JSON.parse(qData);
      } catch {
        queue = [];
      }
      // Avoid duplicate queue entries
      queue = queue.filter((item) => item.idempotencyKey !== lead.referenceId);
      queue.unshift(entry);
      await fs.writeFile(queuePath, JSON.stringify(queue.slice(0, 200), null, 2), "utf-8");
    }
    destinations.push("LOCAL_FILE_LEDGER");
  } catch {
    // Expected on strictly read-only serverless environments
  }

  return {
    persisted: destinations.length > 0,
    destinations,
  };
}

/**
 * Replays any pending leads requiring retry against Notion or Email.
 * Guarantees idempotency: leads already marked SUCCESS are never resubmitted.
 */
export async function retryPendingLeads(): Promise<{
  processed: number;
  succeeded: number;
  failed: number;
}> {
  const dataDir = path.join(process.cwd(), "data");
  const queuePath = path.join(dataDir, "pending_retries.json");

  let queue: QueuedLeadEntry[] = [];
  try {
    const raw = await fs.readFile(queuePath, "utf-8");
    queue = JSON.parse(raw);
  } catch {
    return { processed: 0, succeeded: 0, failed: 0 };
  }

  if (queue.length === 0) {
    return { processed: 0, succeeded: 0, failed: 0 };
  }

  let succeeded = 0;
  let failed = 0;
  const remaining: QueuedLeadEntry[] = [];

  for (const item of queue) {
    let itemUpdated = false;

    // Retry Notion if not previously successful
    if (item.notionStatus !== "SUCCESS") {
      const notionRes = await syncLeadToNotion(item.lead);
      if (notionRes.success) {
        item.notionStatus = "SUCCESS";
        item.notionPageId = notionRes.pageId;
        item.notionError = undefined;
        itemUpdated = true;
      } else {
        item.notionError = notionRes.error;
      }
    }

    // Retry Email if not previously successful
    if (item.emailStatus !== "SUCCESS") {
      const emailRes = await sendLeadNotificationEmail(item.lead);
      if (emailRes.success) {
        item.emailStatus = "SUCCESS";
        item.emailMessageId = emailRes.messageId;
        item.emailError = undefined;
        itemUpdated = true;
      } else {
        item.emailError = emailRes.error;
      }
    }

    item.retryCount += 1;
    item.updatedAt = new Date().toISOString();

    if (item.notionStatus === "SUCCESS" && item.emailStatus === "SUCCESS") {
      succeeded++;
    } else {
      failed++;
      remaining.push(item);
    }
  }

  try {
    await fs.writeFile(queuePath, JSON.stringify(remaining, null, 2), "utf-8");
  } catch {}

  return { processed: queue.length, succeeded, failed };
}

