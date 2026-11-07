/**
 * DataCraft Studio — Lead Email Notification Service (Web3Forms)
 * 
 * Delivers consultation enquiries directly to the founders (Adityak1149x@gmail.com)
 * via the official Web3Forms API (https://api.web3forms.com/submit).
 * 
 * Server-side only: WEB3FORMS_ACCESS_KEY is strictly never exposed to client browsers.
 */

import { LeadPayload } from "./notion";

export interface EmailDispatchResult {
  success: boolean;
  status: "SUCCESS" | "FAILED" | "CONFIG_REQUIRED";
  messageId?: string;
  error?: string;
  statusCode?: number;
}

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Generates an executive editorial HTML email template for studio inquiries.
 */
export function generateLeadEmailHtml(lead: LeadPayload): string {
  const company = lead.businessName || "Individual / Not specified";
  const phone = lead.phone || "Not provided";
  const formattedDate = new Date(lead.timestamp || Date.now()).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

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
      <p>Reference ID: ${lead.referenceId} · ${formattedDate} IST</p>
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
          <div class="label">Contact Phone</div>
          <div class="value">${phone}</div>
        </div>
        <div class="row">
          <div class="label">Business / Brand</div>
          <div class="value">${company}</div>
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
      Dispatched securely via DataCraft Web3Forms Lead Engine.
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Sends a consultation notification email via Web3Forms.
 * Completely server-side. Guaranteed to never expose the access key to the client.
 */
export async function sendLeadNotificationEmail(
  lead: LeadPayload
): Promise<EmailDispatchResult> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  const recipient = process.env.NOTIFICATION_EMAIL || "Adityak1149x@gmail.com";
  const subject = `New DataCraft Enquiry — ${lead.name}`;

  // If WEB3FORMS_ACCESS_KEY is not configured, report clean configuration status
  // without failing or throwing unhandled exceptions.
  if (
    !accessKey ||
    accessKey.trim().length === 0 ||
    accessKey.startsWith("your_")
  ) {
    console.warn(
      `[WEB3FORMS:CONFIG_REQUIRED] Ref: ${lead.referenceId}. WEB3FORMS_ACCESS_KEY is pending configuration. Lead preserved for delivery to ${recipient}.`
    );
    return {
      success: false,
      status: "CONFIG_REQUIRED",
      error: "WEB3FORMS_ACCESS_KEY environment variable is not configured.",
    };
  }

  const structuredMessage = [
    `=== DATACRAFT CONSULTATION BRIEF ===`,
    `Reference ID   : ${lead.referenceId}`,
    `Client Name    : ${lead.name}`,
    `Client Email   : ${lead.email}`,
    `Phone / WA     : ${lead.phone || "Not provided"}`,
    `Business       : ${lead.businessName || "Not specified"}`,
    `Service        : ${lead.service}`,
    `Budget         : ${lead.budget}`,
    `Contact Pref   : ${lead.preferredContact}`,
    `Submitted At   : ${lead.timestamp}`,
    `=====================================`,
    `PROJECT SCOPE & REQUIREMENTS:`,
    lead.description,
  ].join("\n");

  const payload: Record<string, any> = {
    access_key: accessKey.trim(),
    subject,
    from_name: "DataCraft Studio Lead Engine",
    to_email: recipient,
    replyto: lead.email,
    name: lead.name,
    email: lead.email,
    phone: lead.phone || "Not provided",
    business_name: lead.businessName || "Not specified",
    service: lead.service,
    budget: lead.budget,
    preferred_contact: lead.preferredContact,
    reference_id: lead.referenceId,
    message: structuredMessage,
    botcheck: "", // Built-in Web3Forms honeypot field
  };

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      // Web3Forms returns JSON with { success: true/false, message: "..." }
      if (response.ok && data.success === true) {
        const messageId =
          data.data?.id || `w3f-${lead.referenceId}`;
        console.log(
          `[WEB3FORMS:SUCCESS] Delivered to ${recipient} (Message ID: ${messageId}) for Ref: ${lead.referenceId}`
        );
        return {
          success: true,
          status: "SUCCESS",
          messageId,
          statusCode: response.status,
        };
      }

      console.error(
        `[WEB3FORMS:FAILED] Attempt ${attempts} returned status ${response.status}:`,
        data.message || data
      );

      // Retry on 429 or 5xx server issues
      if (response.status === 429 || response.status >= 500) {
        if (attempts < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1000 * attempts));
          continue;
        }
      }

      return {
        success: false,
        status: "FAILED",
        error:
          data.message ||
          `Web3Forms API responded with status ${response.status}`,
        statusCode: response.status,
      };
    } catch (err: any) {
      console.error(
        `[WEB3FORMS:NETWORK_ERROR] Attempt ${attempts}:`,
        err.message
      );
      if (attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000 * attempts));
        continue;
      }
      return {
        success: false,
        status: "FAILED",
        error: err.message || "Network error while connecting to Web3Forms API",
      };
    }
  }

  return {
    success: false,
    status: "FAILED",
    error: "Exceeded maximum retry attempts for Web3Forms email notification.",
  };
}
