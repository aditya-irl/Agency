/**
 * DataCraft — Lead Email Notification Service
 * Sends automated enquiry notifications to the studio founders (Adityak1149x@gmail.com).
 */

import { LeadPayload } from "./notion";

export interface EmailDispatchResult {
  success: boolean;
  status: "SUCCESS" | "FAILED" | "CONFIG_REQUIRED";
  messageId?: string;
  error?: string;
  statusCode?: number;
}

export function generateLeadEmailHtml(lead: LeadPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New DataCraft Enquiry — ${lead.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6EEE2; color: #231F20; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFDF6; border: 1px solid rgba(35,31,32,0.12); border-radius: 16px; overflow: hidden; }
    .header { background: #231F20; color: #FFFDF6; padding: 24px; border-bottom: 3px solid #C6532E; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 4px 0 0; font-size: 12px; color: #D4C9BC; }
    .content { padding: 28px; }
    .lead-meta { margin-bottom: 24px; border-bottom: 1px solid rgba(35,31,32,0.08); padding-bottom: 20px; }
    .row { display: flex; margin-bottom: 12px; font-size: 14px; }
    .label { width: 140px; font-weight: 600; color: #77716D; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; padding-top: 2px; }
    .value { flex: 1; color: #231F20; font-weight: 500; }
    .badge { display: inline-block; background: #FCEAE3; color: #C6532E; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
    .box { background: #FCFAF8; border: 1px solid rgba(35,31,32,0.08); border-radius: 12px; padding: 18px; margin-top: 16px; }
    .box-title { font-size: 12px; font-weight: 700; color: #77716D; text-transform: uppercase; margin-bottom: 8px; }
    .description { font-size: 14px; line-height: 1.6; color: #231F20; white-space: pre-wrap; margin: 0; }
    .footer { padding: 20px 28px; background: #F8F2E8; border-top: 1px solid rgba(35,31,32,0.08); font-size: 12px; color: #77716D; text-align: center; }
    .button { display: inline-block; background: #C6532E; color: #ffffff !important; padding: 10px 20px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 13px; margin-right: 8px; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DataCraft — New Client Consultation</h1>
      <p>Reference ID: ${lead.referenceId} · ${new Date(lead.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </div>
    <div class="content">
      <div class="lead-meta">
        <div class="row">
          <div class="label">Client Name</div>
          <div class="value"><strong>${lead.name}</strong></div>
        </div>
        <div class="row">
          <div class="label">Client Email</div>
          <div class="value"><a href="mailto:${lead.email}" style="color: #C6532E; text-decoration: none;">${lead.email}</a></div>
        </div>
        <div class="row">
          <div class="label">Business / Brand</div>
          <div class="value">${lead.businessName || "Individual / Not specified"}</div>
        </div>
        <div class="row">
          <div class="label">Service Required</div>
          <div class="value"><span class="badge">${lead.service}</span></div>
        </div>
        <div class="row">
          <div class="label">Budget Range</div>
          <div class="value"><strong>${lead.budget}</strong></div>
        </div>
        <div class="row">
          <div class="label">Preferred Contact</div>
          <div class="value">${lead.preferredContact}</div>
        </div>
      </div>

      <div class="box">
        <div class="box-title">Project Summary & Commercial Requirements</div>
        <p class="description">${lead.description}</p>
      </div>

      <div style="margin-top: 24px;">
        <a href="mailto:${lead.email}?subject=Re:%20DataCraft%20Project%20Consultation%20[${lead.referenceId}]" class="button">
          Reply Directly via Email
        </a>
      </div>
    </div>
    <div class="footer">
      This notification was automatically dispatched from the official DataCraft studio website lead engine.
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Sends an email notification for a new enquiry.
 */
export async function sendLeadNotificationEmail(lead: LeadPayload): Promise<EmailDispatchResult> {
  const recipient = process.env.NOTIFICATION_EMAIL || "Adityak1149x@gmail.com";
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY || process.env.RESEND_API_KEY;
  const subject = `New DataCraft Enquiry — ${lead.name}`;

  if (!apiKey) {
    console.warn(
      `[EMAIL_DISPATCH:CONFIG_REQUIRED] Reference: ${lead.referenceId}. EMAIL_PROVIDER_API_KEY is not defined in environment variables. Lead logged for manual delivery to ${recipient}.`
    );
    return {
      success: false,
      status: "CONFIG_REQUIRED",
      error: "EMAIL_PROVIDER_API_KEY environment variable is not configured.",
    };
  }

  const html = generateLeadEmailHtml(lead);

  // Default provider: Resend API (standard industry standard for Next.js / Vercel applications)
  const endpoint = "https://api.resend.com/emails";
  const payload = {
    from: "DataCraft Studio <onboarding@resend.dev>",
    to: [recipient],
    reply_to: lead.email,
    subject,
    html,
  };

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(
          `[EMAIL_DISPATCH:SUCCESS] Notification delivered to ${recipient} (Message ID: ${data.id}) for Ref: ${lead.referenceId}`
        );
        return {
          success: true,
          status: "SUCCESS",
          messageId: data.id,
          statusCode: response.status,
        };
      }

      console.error(
        `[EMAIL_DISPATCH:FAILED] Attempt ${attempts} returned ${response.status}:`,
        data
      );

      if (response.status >= 500) {
        if (attempts < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1000 * attempts));
          continue;
        }
      }

      return {
        success: false,
        status: "FAILED",
        error: data.message || `Email service responded with HTTP ${response.status}`,
        statusCode: response.status,
      };
    } catch (err: any) {
      console.error(`[EMAIL_DISPATCH:NETWORK_ERROR] Attempt ${attempts}:`, err.message);
      if (attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000 * attempts));
        continue;
      }
      return {
        success: false,
        status: "FAILED",
        error: err.message || "Network error while connecting to email provider",
      };
    }
  }

  return {
    success: false,
    status: "FAILED",
    error: "Exceeded maximum retry attempts for email notification.",
  };
}
