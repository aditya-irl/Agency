import { NextRequest, NextResponse } from "next/server";
import { syncLeadToNotion } from "@/lib/notion";
import { sendLeadNotificationEmail } from "@/lib/email";

// -----------------------------------------------------------------------------
// Rate Limiting (In-Memory per IP)
// -----------------------------------------------------------------------------
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const ipRateLimits = new Map<string, RateLimitEntry>();
const MAX_REQUESTS_PER_WINDOW = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);

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
// Input Sanitization Helpers
// -----------------------------------------------------------------------------
function sanitizeString(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // strip angle brackets
    .trim()
    .slice(0, maxLength);
}

// Normalize Indian mobile number into 10 digits
function normalizeIndianPhone(input: string): string | null {
  // Strip all non-digit characters
  let digits = input.replace(/\D/g, "");

  // If starts with 91 and has 12 digits, strip country code
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  // If starts with 0 and has 11 digits, strip leading zero
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Valid Indian mobile: starts with 6, 7, 8, or 9 and has exactly 10 digits
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (indianMobileRegex.test(digits)) {
    return digits;
  }
  return null;
}

const ALLOWED_SERVICES = [
  "Custom Web Application",
  "Shopify E-Commerce Store",
  "Custom CRM / ERP Software",
  "Business Website & Local SEO",
  "Other Software Solution",
];

const ALLOWED_SLOTS = [
  "10:00 AM – 12:00 PM",
  "12:00 PM – 3:00 PM",
  "3:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce payload size limit (max 50KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 50 * 1024) {
      return NextResponse.json(
        { success: false, error: "Payload too large. Max allowed is 50KB." },
        { status: 413 }
      );
    }

    // 2. Rate limiting by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many appointment requests. Please try again in ${rateCheck.retryAfter} seconds.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfter || 60) },
        }
      );
    }

    // 3. Parse JSON safely
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 4. Honeypot check (anti-bot)
    if (body.hp_field || body.website_url) {
      return NextResponse.json(
        { success: true, message: "Appointment confirmed." },
        { status: 200 }
      );
    }

    // 5. Extract and sanitize fields
    const name = sanitizeString(body.name, 100);
    const rawPhone = String(body.phone || "").trim();
    const cleanPhone = normalizeIndianPhone(rawPhone);
    const business = sanitizeString(body.businessName, 150) || "N/A";
    const service = sanitizeString(body.service, 100);
    const date = sanitizeString(body.date, 20);
    const timeSlot = sanitizeString(body.timeSlot, 50);
    const notes = sanitizeString(body.notes, 2000) || "None";

    // 6. Validations
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!cleanPhone) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid 10-digit Indian mobile number is required (starting with 6, 7, 8, or 9).",
        },
        { status: 400 }
      );
    }

    if (!service || !ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid service from the options.",
        },
        { status: 400 }
      );
    }

    // Date validation
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid preferred date." },
        { status: 400 }
      );
    }

    const todayStr = new Date().toISOString().split("T")[0];
    if (date < todayStr) {
      return NextResponse.json(
        { success: false, error: "Preferred date cannot be in the past." },
        { status: 400 }
      );
    }

    if (!timeSlot || !ALLOWED_SLOTS.includes(timeSlot)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid preferred time slot." },
        { status: 400 }
      );
    }

    // Generate unique reference ID
    const referenceId = `DC-APT-${Date.now().toString().slice(-6)}-${Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase()}`;

    // 7. Format clean WhatsApp alert message per user specifications
    const whatsappMessage =
`🚀 *New DataCrafts Appointment!*
👤 *Name:* ${name}
📞 *Phone:* +91 ${cleanPhone}
🏢 *Business:* ${business}
🛠 *Service:* ${service}
📅 *Date:* ${date}
⏰ *Slot:* ${timeSlot}
📝 *Notes:* ${notes}`;

    // 8. Server-side CallMeBot WhatsApp Notification
    const rawTargetPhone = process.env.WHATSAPP_PHONE || "918865804386";
    const targetPhone = rawTargetPhone.replace(/\D/g, "");
    const callMeBotApiKey = process.env.CALLMEBOT_API_KEY;

    let whatsappDispatchStatus: "SENT" | "CONFIG_REQUIRED" | "FAILED" = "CONFIG_REQUIRED";
    let whatsappErrorDetails: string | undefined = undefined;

    if (callMeBotApiKey) {
      try {
        const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
          targetPhone
        )}&text=${encodeURIComponent(whatsappMessage)}&apikey=${encodeURIComponent(
          callMeBotApiKey
        )}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const callMeBotRes = await fetch(callMeBotUrl, {
          method: "GET",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const callMeBotText = await callMeBotRes.text();

        if (callMeBotRes.ok && !callMeBotText.toLowerCase().includes("error")) {
          whatsappDispatchStatus = "SENT";
          console.log(`[CALLMEBOT_WHATSAPP:SUCCESS] Dispatched appointment alert to ${targetPhone}`);
        } else {
          whatsappDispatchStatus = "FAILED";
          whatsappErrorDetails = callMeBotText || `HTTP status ${callMeBotRes.status}`;
          console.warn(`[CALLMEBOT_WHATSAPP:FAILED] ${whatsappErrorDetails}`);
        }
      } catch (err: any) {
        whatsappDispatchStatus = "FAILED";
        whatsappErrorDetails = err?.message || "Connection timeout";
        console.warn(`[CALLMEBOT_WHATSAPP:ERROR] Failed to reach CallMeBot: ${whatsappErrorDetails}`);
      }
    } else {
      console.log(
        `[CALLMEBOT_WHATSAPP:CONFIG_REQUIRED] CALLMEBOT_API_KEY is not configured in environment. WhatsApp alert message ready:\n${whatsappMessage}`
      );
    }

    // 9. Dual redundancy: Dispatch Web3Forms notification & Notion sync in background
    const nowIso = new Date().toISOString();
    Promise.allSettled([
      sendLeadNotificationEmail({
        referenceId,
        name,
        email: body.email || "appointment@datacrafts.in",
        phone: `+91 ${cleanPhone}`,
        businessName: business,
        service: `[Appointment] ${service}`,
        budget: "Free Consultation",
        preferredContact: `Appointment: ${date} (${timeSlot})`,
        description: `Scheduled Appointment:\nDate: ${date}\nTime Slot: ${timeSlot}\nBusiness: ${business}\nNotes: ${notes}`,
        timestamp: nowIso,
      }),
      syncLeadToNotion({
        referenceId,
        name,
        email: body.email || "appointment@datacrafts.in",
        phone: `+91 ${cleanPhone}`,
        businessName: business,
        service,
        budget: "Free Consultation",
        preferredContact: `Appointment: ${date} (${timeSlot})`,
        description: `Scheduled Date: ${date} (${timeSlot})\nNotes: ${notes}`,
        timestamp: nowIso,
      }),
    ]).catch((e) => console.error("[APPOINTMENT_BACKUP_DISPATCH_ERROR]", e));

    // 10. Clean console log
    console.log(
      `[APPOINTMENT_LOG] ${referenceId} | ${name} | +91 ${cleanPhone} | ${service} | ${date} ${timeSlot} | WhatsApp Status: ${whatsappDispatchStatus}`
    );

    // 11. Return clean success response (without redirecting user)
    return NextResponse.json(
      {
        success: true,
        message:
          "Appointment Confirmed! Our team at DataCrafts will reach out on WhatsApp/call at your scheduled slot.",
        booking: {
          referenceId,
          name,
          phone: `+91 ${cleanPhone}`,
          businessName: business,
          service,
          date,
          timeSlot,
          notes,
          whatsappStatus: whatsappDispatchStatus,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[APPOINTMENT_API_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while scheduling appointment." },
      { status: 500 }
    );
  }
}
