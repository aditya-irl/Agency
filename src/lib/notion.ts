/**
 * DataCraft — Notion Lead Synchronization Service
 * Maps website consultation inquiries into the existing Notion "Leads & Sales Pipeline" database.
 * Workspace: Agency HQ
 * Database ID: bb8c1b3c-c0b9-47e7-a727-26c84e8b95b4
 */

export interface LeadPayload {
  referenceId: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  service: string;
  budget: string;
  description: string;
  preferredContact: string;
  timestamp: string;
}

export interface NotionSyncResult {
  success: boolean;
  status: "SUCCESS" | "FAILED" | "CONFIG_REQUIRED";
  pageId?: string;
  url?: string;
  error?: string;
  statusCode?: number;
}

// Map website service selection to existing Notion "Service Interest" multi_select options
function mapServiceInterest(service: string): string[] {
  const s = (service || "").toLowerCase();
  if (s.includes("shopify") || s.includes("e-commerce")) return ["Shopify"];
  if (s.includes("software") || s.includes("web app") || s.includes("custom software")) return ["Web App"];
  if (s.includes("automation") || s.includes("integration")) return ["Automation"];
  if (s.includes("website") || s.includes("brand")) return ["Website Development"];
  return ["Website Development", "Other"];
}

// Parse numeric estimate from budget strings (e.g. "₹3,000 – ₹10,000", "$2,500 – $7,500", "₹3,000 onwards")
function parseEstimatedValue(budgetStr: string): number | null {
  if (!budgetStr) return 3000;
  // Match digits with optional commas
  const matches = budgetStr.replace(/,/g, "").match(/\d+/g);
  if (matches && matches.length > 0) {
    const val = parseInt(matches[0], 10);
    return isNaN(val) ? 3000 : val;
  }
  return 3000;
}

/**
 * Creates a new Lead entry in the existing Notion Leads database.
 */
export async function syncLeadToNotion(lead: LeadPayload): Promise<NotionSyncResult> {
  const apiKey = process.env.NOTION_API_KEY;
  // Default to existing "Leads & Sales Pipeline" database in Agency HQ workspace
  const databaseId = (
    process.env.NOTION_DATABASE_ID || "bb8c1b3c-c0b9-47e7-a727-26c84e8b95b4"
  ).replace(/-/g, "");

  if (!apiKey) {
    console.warn(
      `[NOTION_SYNC:CONFIG_REQUIRED] Reference: ${lead.referenceId}. NOTION_API_KEY is not defined in environment variables. Lead safely preserved in local queue.`
    );
    return {
      success: false,
      status: "CONFIG_REQUIRED",
      error: "NOTION_API_KEY environment variable is not configured.",
    };
  }

  const serviceInterests = mapServiceInterest(lead.service);
  const estimatedValue = parseEstimatedValue(lead.budget);
  const contactNo = lead.phone || (lead.preferredContact === "WhatsApp" ? "Via WhatsApp Consultation" : undefined);
  const companyName = lead.businessName || "Individual Client";
  const isoDate = new Date(lead.timestamp || Date.now()).toISOString().split("T")[0];

  // Exact property schema mapping to existing Notion "Leads & Sales Pipeline" database:
  // - title: "Lead" (title)
  // - "Email": email
  // - "Company": rich_text
  // - "Service Interest": multi_select
  // - "Estimated Value": number
  // - "Source": select ("Website")
  // - "Stage": status ("New")
  // - "Acquired By": select ("Both")
  // - "Next Follow-up": date
  // - "Notes": rich_text (Full structured consultation brief)
  // - "Contact No": phone_number (if provided)
  const properties: Record<string, any> = {
    Lead: {
      title: [
        {
          type: "text",
          text: { content: `${lead.name} — ${companyName}` },
        },
      ],
    },
    Email: {
      email: lead.email,
    },
    Company: {
      rich_text: [
        {
          type: "text",
          text: { content: companyName },
        },
      ],
    },
    "Service Interest": {
      multi_select: serviceInterests.map((val) => ({ name: val })),
    },
    Source: {
      select: { name: "Website" },
    },
    Stage: {
      status: { name: "New" },
    },
    "Acquired By": {
      select: { name: "Both" },
    },
    "Next Follow-up": {
      date: { start: isoDate },
    },
    Notes: {
      rich_text: [
        {
          type: "text",
          text: {
            content: [
              `[DataCraft Website Enquiry]`,
              `Reference ID: ${lead.referenceId}`,
              `Client: ${lead.name}`,
              `Email: ${lead.email}`,
              `Company: ${companyName}`,
              `Service: ${lead.service}`,
              `Budget: ${lead.budget}`,
              `Preferred Contact: ${lead.preferredContact}`,
              `Submitted: ${lead.timestamp}`,
              `---`,
              `Project Brief:`,
              lead.description,
            ].join("\n"),
          },
        },
      ],
    },
  };

  if (estimatedValue !== null) {
    properties["Estimated Value"] = { number: estimatedValue };
  }

  if (contactNo) {
    properties["Contact No"] = { phone_number: contactNo };
  }

  // Notion API POST /v1/pages with retry loop
  const endpoint = "https://api.notion.com/v1/pages";
  const requestBody = {
    parent: { database_id: databaseId },
    properties,
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
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(
          `[NOTION_SYNC:SUCCESS] Created Notion Lead: ${responseData.id} for Reference: ${lead.referenceId}`
        );
        return {
          success: true,
          status: "SUCCESS",
          pageId: responseData.id,
          url: responseData.url,
          statusCode: response.status,
        };
      }

      console.error(
        `[NOTION_SYNC:FAILED] Attempt ${attempts} returned ${response.status}:`,
        responseData
      );

      // Retry on 429 (Rate Limit) or 5xx (Server Error)
      if (response.status === 429 || response.status >= 500) {
        if (attempts < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1000 * attempts));
          continue;
        }
      }

      return {
        success: false,
        status: "FAILED",
        error: responseData.message || `Notion API responded with status ${response.status}`,
        statusCode: response.status,
      };
    } catch (err: any) {
      console.error(`[NOTION_SYNC:NETWORK_ERROR] Attempt ${attempts}:`, err.message);
      if (attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000 * attempts));
        continue;
      }
      return {
        success: false,
        status: "FAILED",
        error: err.message || "Network error while connecting to Notion API",
      };
    }
  }

  return {
    success: false,
    status: "FAILED",
    error: "Exceeded maximum retry attempts for Notion API sync.",
  };
}

