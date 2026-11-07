import { NextRequest, NextResponse } from "next/server";
import { syncLeadToNotion, LeadPayload, NotionSyncResult } from "@/lib/notion";
import { sendLeadNotificationEmail, EmailDispatchResult } from "@/lib/email";
import {
  persistLeadToDurableQueue,
  checkPersistentStorage,
} from "@/lib/leadQueue";
import { BRAND } from "@/data/studio";

// -----------------------------------------------------------------------------
// Rate Limiting & Abuse Prevention (In-Memory Sliding Window per IP)
// -----------------------------------------------------------------------------
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const ipRateLimits = new Map<string, RateLimitEntry>();
const MAX_REQUESTS_PER_WINDOW = 15;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);

  // Clean old expired entries periodically
  if (ipRateLimits.size > 1000) {
    ipRateLimits.forEach((val, key) => {
      if (val.resetAt <= now) ipRateLimits.delete(key);
    });
  }

  if (!entry || entry.resetAt <= now) {
    ipRateLimits.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count += 1;
  return { allowed: true };
}

// -----------------------------------------------------------------------------
// Idempotency & Duplicate Prevention (15-Minute Cooldown)
// -----------------------------------------------------------------------------
const recentSubmissions = new Map<
  string,
  { timestamp: number; referenceId: string; responseData: any }
>();

function generateDedupKey(email: string, description: string): string {
  const normEmail = (email || "").trim().toLowerCase();
  const normDesc = (description || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .slice(0, 100);
  return `${normEmail}:::${normDesc}`;
}

// -----------------------------------------------------------------------------
// Text Sanitization Helper
// -----------------------------------------------------------------------------
function sanitizeString(str: any, maxLength = 1000): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "") // Strip dangerous HTML tags
    .trim()
    .slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Request Payload Size Validation (< 32 KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 32768) {
      return NextResponse.json(
        { error: "Payload too large. Please limit submissions to under 32 KB." },
        { status: 413 }
      );
    }

    // 2. Client IP Extraction & Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown-ip";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many consultation requests from your network. Please wait a few moments before trying again, or reach us directly on WhatsApp.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfter || 600) },
        }
      );
    }

    // 3. Body Parsing
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

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
      privacyConsent,
      website_hp, // Honeypot field 1
      b_name_trap, // Honeypot field 2
    } = body;

    // 4. Honeypot Spam Verification
    // If hidden bot fields are populated, silently drop spam request
    if (
      (website_hp && String(website_hp).trim().length > 0) ||
      (b_name_trap && String(b_name_trap).trim().length > 0)
    ) {
      console.warn(`[SPAM_DETECTED:HONEYPOT] IP: ${ip}, Ref: ${email}`);
      // Return 200 with realistic confirmation to mislead automated bots
      return NextResponse.json(
        {
          success: true,
          referenceId: `DATACRAFT-SPAM-BLOCKED`,
          message: "Consultation request received.",
        },
        { status: 200 }
      );
    }

    // 5. Strict Schema Validation
    if (privacyConsent !== true) {
      return NextResponse.json(
        {
          error:
            "You must acknowledge and agree to the Privacy Policy and Terms & Conditions to submit an enquiry.",
        },
        { status: 400 }
      );
    }

    const cleanName = sanitizeString(name, 100);
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const cleanEmail = sanitizeString(email, 100).toLowerCase();
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Phone format validation (optional, but must be valid if provided)
    let cleanPhone: string | undefined = undefined;
    if (phone && String(phone).trim().length > 0) {
      const rawPhone = String(phone).trim();
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;
      if (!phoneRegex.test(rawPhone)) {
        return NextResponse.json(
          { error: "Please provide a valid telephone or WhatsApp number with country code." },
          { status: 400 }
        );
      }
      cleanPhone = sanitizeString(rawPhone, 30);
    }

    const cleanDescription = sanitizeString(description, 3000);
    if (!cleanDescription || cleanDescription.length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief project summary (at least 10 characters)." },
        { status: 400 }
      );
    }

    const cleanCompany = sanitizeString(businessName || company || "", 150);
    const cleanService = sanitizeString(service || "Website Development", 100);
    const cleanBudget = sanitizeString(budget || "₹4,000 – ₹10,000", 100);
    const cleanContactPref = sanitizeString(preferredContact || "WhatsApp", 50);

    // 6. Idempotency & Duplicate Prevention
    const dedupKey = generateDedupKey(cleanEmail, cleanDescription);
    const now = Date.now();
    const existing = recentSubmissions.get(dedupKey);

    if (existing && now - existing.timestamp < 15 * 60 * 1000) {
      console.warn(
        `[DATACRAFT_LEAD_DEDUP] Duplicate submission detected for ${cleanEmail}. Re-referencing ${existing.referenceId}.`
      );

      return NextResponse.json(
        {
          success: true,
          duplicate: true,
          referenceId: existing.referenceId,
          message:
            "Your consultation brief was already safely received. Our team will review your requirements and reach out within 24 business hours.",
          whatsappUrl: existing.responseData?.whatsappUrl,
        },
        { status: 200 }
      );
    }

    // 7. Generate Canonical Reference ID
    const referenceId = `DATACRAFT-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const submission: LeadPayload = {
      referenceId,
      timestamp: new Date().toISOString(),
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      businessName: cleanCompany || "Not specified",
      service: cleanService,
      budget: cleanBudget,
      preferredContact: cleanContactPref,
      description: cleanDescription,
      ipAddress: ip,
      source: "DataCraft Website Consultation Form",
    };

    // 8. Independent Parallel Operations (Notion CRM & Email Dispatch)
    // Decoupled using Promise.allSettled: neither operation can crash or block the other
    const [notionSettled, emailSettled] = await Promise.allSettled([
      syncLeadToNotion(submission),
      sendLeadNotificationEmail(submission),
    ]);

    const notionResult: NotionSyncResult =
      notionSettled.status === "fulfilled"
        ? notionSettled.value
        : {
            success: false,
            status: "FAILED",
            error:
              notionSettled.reason?.message ||
              "Unexpected exception in Notion service",
          };

    const emailResult: EmailDispatchResult =
      emailSettled.status === "fulfilled"
        ? emailSettled.value
        : {
            success: false,
            status: "FAILED",
            error:
              emailSettled.reason?.message ||
              "Unexpected exception in Email service",
          };

    // 9. Durable Queue & Fallback Persistence
    // Guarantees zero enquiry loss even if Notion and Email are both temporarily unavailable
    await persistLeadToDurableQueue(submission, notionResult, emailResult);

    // 10. Generate Official WhatsApp Direct Action Link (+91 88658 04386)
    const waMessage = encodeURIComponent(
      `Hi DataCraft, I would like to book a consultation.\n\n*Reference:* ${referenceId}\n*Name:* ${submission.name}\n*Email:* ${submission.email}\n*Business:* ${submission.businessName}\n*Service:* ${submission.service}\n*Budget:* ${submission.budget}\n*Preferred Contact:* ${submission.preferredContact}\n*Scope:* ${submission.description}`
    );
    const whatsappUrl = `https://wa.me/918865804386?text=${waMessage}`;

    const responsePayload = {
      success: true,
      referenceId,
      message:
        "Thank you for contacting DataCraft. Our team has received your project details and will reach out within 24 business hours.",
      notion: {
        status: notionResult.status,
        pageId: notionResult.pageId,
        error:
          notionResult.status === "CONFIG_REQUIRED"
            ? "NOTION_API_KEY pending configuration"
            : notionResult.error
            ? "Sync logged for background delivery"
            : undefined,
      },
      email: {
        status: emailResult.status,
        messageId: emailResult.messageId,
        error:
          emailResult.status === "CONFIG_REQUIRED"
            ? "WEB3FORMS_ACCESS_KEY pending configuration"
            : emailResult.error
            ? "Email logged for background delivery"
            : undefined,
      },
      whatsappUrl,
    };

    // Cache successful submission for idempotency
    recentSubmissions.set(dedupKey, {
      timestamp: now,
      referenceId,
      responseData: responsePayload,
    });

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (err: any) {
    console.error("[CONTACT_API:UNEXPECTED_ERROR]", err);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while transmitting your consultation request. Please try again or reach our team directly via WhatsApp.",
      },
      { status: 500 }
    );
  }
}
