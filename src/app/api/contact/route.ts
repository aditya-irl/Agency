import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { syncLeadToNotion, LeadPayload } from "@/lib/notion";
import { sendLeadNotificationEmail } from "@/lib/email";

// In-memory cache for fast deduplication within serverless invocation lifetimes
const recentSubmissions = new Map<string, { timestamp: number; referenceId: string }>();

function generateDedupKey(email: string, description: string): string {
  return `${email.trim().toLowerCase()}:::${description.trim().toLowerCase().slice(0, 80)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      businessName,
      company,
      service,
      budget,
      description,
      preferredContact,
    } = body;

    const clientCompany = (businessName || company || "Not specified").trim();

    // 1. Strict Schema Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please share a brief project summary (at least 10 characters)." },
        { status: 400 }
      );
    }

    // 2. Duplicate Submission Prevention (15-minute cooldown for identical email + description)
    const dedupKey = generateDedupKey(email, description);
    const now = Date.now();
    const existing = recentSubmissions.get(dedupKey);

    if (existing && now - existing.timestamp < 15 * 60 * 1000) {
      console.warn(
        `[DATACRAFT_LEAD_DEDUP] Duplicate submission detected for ${email}. Re-referencing ${existing.referenceId}.`
      );

      const waMessage = encodeURIComponent(
        `Hi DataCraft, I previously submitted a consultation request.\n\n*Reference:* ${existing.referenceId}\n*Name:* ${name.trim()}\n*Email:* ${email.trim()}`
      );

      return NextResponse.json(
        {
          success: true,
          duplicate: true,
          referenceId: existing.referenceId,
          message:
            "Your consultation brief was already safely received. Our team will contact you shortly.",
          whatsappUrl: `https://wa.me/919412835869?text=${waMessage}`,
        },
        { status: 200 }
      );
    }

    // 3. Generate Unique Lead Reference ID
    const referenceId = `DATACRAFT-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    recentSubmissions.set(dedupKey, { timestamp: now, referenceId });

    const submission: LeadPayload = {
      referenceId,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : undefined,
      businessName: clientCompany,
      service: service || "General Consultation",
      budget: budget || "₹3,000 onwards",
      preferredContact: preferredContact || "WhatsApp",
      description: description.trim(),
    };

    // 4. Structured Cloud Log Drain Persistence (Permanent & indexed in Vercel / CloudWatch / Datadog stdout)
    console.log(`[DATACRAFT_CONSULTATION_REQUEST] ${JSON.stringify(submission)}`);

    // 5. Independent Notion & Email Operations
    // Both operations run independently without blocking one another or crashing the client request
    const [notionResult, emailResult] = await Promise.all([
      syncLeadToNotion(submission).catch((err) => ({
        success: false,
        status: "FAILED" as const,
        pageId: undefined,
        error: err.message || "Unexpected exception during Notion sync",
      })),
      sendLeadNotificationEmail(submission).catch((err) => ({
        success: false,
        status: "FAILED" as const,
        messageId: undefined,
        error: err.message || "Unexpected exception during email dispatch",
      })),
    ]);

    // 6. Local Persistence & Dead-Letter Queue (Preserve failed operations for retry)
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });

      // Save to primary submissions ledger
      const logFile = path.join(dataDir, "submissions.json");
      let existingSubmissions = [];
      try {
        const fileData = await fs.readFile(logFile, "utf-8");
        existingSubmissions = JSON.parse(fileData);
      } catch {
        existingSubmissions = [];
      }
      existingSubmissions.unshift({
        ...submission,
        notionSync: notionResult,
        emailNotification: emailResult,
      });
      await fs.writeFile(logFile, JSON.stringify(existingSubmissions, null, 2), "utf-8");

      // If either operation failed or needs config, record in failed_submissions queue for automated retry
      if (!notionResult.success || !emailResult.success) {
        const failedFile = path.join(dataDir, "failed_submissions.json");
        let failedList = [];
        try {
          const failedData = await fs.readFile(failedFile, "utf-8");
          failedList = JSON.parse(failedData);
        } catch {
          failedList = [];
        }
        failedList.unshift({
          submission,
          failedAt: new Date().toISOString(),
          notionStatus: notionResult.status,
          notionError: notionResult.error,
          emailStatus: emailResult.status,
          emailError: emailResult.error,
        });
        await fs.writeFile(failedFile, JSON.stringify(failedList, null, 2), "utf-8");
      }
    } catch {
      // Graceful fallback for serverless read-only filesystems (Vercel edge/lambda)
      console.info("Serverless runtime detected. File writes omitted; stdout log captured.");
    }

    // 7. Generate Pre-formatted Official WhatsApp Consultation Link (+91 94128 35869)
    const waMessage = encodeURIComponent(
      `Hi DataCraft, I would like to book a consultation.\n\n*Reference:* ${referenceId}\n*Name:* ${submission.name}\n*Email:* ${submission.email}\n*Business:* ${submission.businessName}\n*Service:* ${submission.service}\n*Budget:* ${submission.budget}\n*Preferred Contact:* ${submission.preferredContact}\n*Scope:* ${submission.description}`
    );

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message:
          "Thank you for contacting DataCraft. Aditya and Shreya will review your requirements and reach out within 24 business hours.",
        notion: {
          status: notionResult.status,
          pageId: notionResult.pageId,
          error: notionResult.error,
        },
        email: {
          status: emailResult.status,
          messageId: emailResult.messageId,
          error: emailResult.error,
        },
        whatsappUrl: `https://wa.me/919412835869?text=${waMessage}`,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Contact API fatal error:", err);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while submitting your consultation request. Please try again or reach out directly.",
      },
      { status: 500 }
    );
  }
}
