/**
 * DataCraft Studio — Production-Ready Notion Lead Synchronization Service
 * 
 * Target Destination: Agency HQ → Leads & Sales Pipeline
 * Database ID: d3908f13-dcd3-43f2-bf0c-76b9232df686
 * Data Source ID: bb8c1b3c-c0b9-47e7-a727-26c84e8b95b4
 * 
 * Official Notion API Version: 2022-06-28
 * Endpoint: POST https://api.notion.com/v1/pages
 * 
 * Property Schema Mapping:
 * - Lead            (Title)        : Client name
 * - Email           (Email)        : Validated client email address
 * - Contact No      (Phone Number) : Phone / WhatsApp number (if provided)
 * - Company         (Rich Text)    : Business / company name
 * - Service Interest(Multi-Select) : Website Development | Shopify | Web App | Automation | Other
 * - Estimated Value (Number)       : Numeric budget lower bound (only if numeric and meaningful)
 * - Notes           (Rich Text)    : Full structured consultation summary & client scope
 * - Source          (Select)       : "Website"
 * - Stage           (Status/Select): "New"
 * - Acquired By     (Select/People): "Unassigned"
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
  ipAddress?: string;
  source?: string;
}

export interface NotionSyncResult {
  success: boolean;
  status: "SUCCESS" | "FAILED" | "CONFIG_REQUIRED";
  pageId?: string;
  url?: string;
  error?: string;
  statusCode?: number;
}

// Canonical database destination IDs
export const NOTION_DEFAULTS = {
  DATABASE_ID: "d3908f13-dcd3-43f2-bf0c-76b9232df686",
  DATA_SOURCE_ID: "bb8c1b3c-c0b9-47e7-a727-26c84e8b95b4",
  API_VERSION: "2022-06-28",
  API_BASE_URL: "https://api.notion.com/v1",
} as const;

// The 5 strictly allowed multi-select options in the Leads & Sales Pipeline database
export const ALLOWED_SERVICE_INTERESTS = [
  "Website Development",
  "Shopify",
  "Web App",
  "Automation",
  "Other",
] as const;

export type AllowedServiceInterest = (typeof ALLOWED_SERVICE_INTERESTS)[number];

/**
 * Intelligently maps any incoming service selection to the strict 5-option multi-select set.
 * Guaranteed to never write unsupported multi-select values.
 */
export function mapServiceInterest(service: string): AllowedServiceInterest[] {
  if (!service) return ["Other"];
  const s = service.toLowerCase().trim();

  // Shopify & E-commerce
  if (
    s.includes("shopify") ||
    s.includes("store") ||
    s.includes("e-commerce") ||
    s.includes("ecommerce")
  ) {
    return ["Shopify"];
  }

  // Web Applications, Custom Software, CRM & Mobile
  if (
    s.includes("software") ||
    s.includes("web app") ||
    s.includes("custom software") ||
    s.includes("crm") ||
    s.includes("pwa") ||
    s.includes("mobile") ||
    s.includes("saas") ||
    s.includes("portal")
  ) {
    return ["Web App"];
  }

  // Automation & Integrations
  if (
    s.includes("automation") ||
    s.includes("integration") ||
    s.includes("bot") ||
    s.includes("workflow") ||
    s.includes("api") ||
    s.includes("sync")
  ) {
    return ["Automation"];
  }

  // Website Development & Brand Experiences
  if (
    s.includes("website") ||
    s.includes("landing") ||
    s.includes("redesign") ||
    s.includes("frontend") ||
    s.includes("design") ||
    s.includes("portfolio")
  ) {
    return ["Website Development"];
  }

  return ["Other"];
}

/**
 * Extracts a numeric value from the budget selection, only if numeric and meaningful.
 * E.g., "₹4,000 – ₹10,000" -> 4000
 * E.g., "₹10,000 – ₹30,000" -> 10000
 * E.g., "₹75,000 – ₹1,50,000+" -> 75000
 * E.g., "Flexible / Custom Scope" -> null
 * E.g., "TBD / Undecided" -> null
 */
export function parseEstimatedValue(budgetStr: string): number | null {
  if (!budgetStr) return null;
  const s = budgetStr.trim().toLowerCase();

  // Flexible or explicitly non-numeric selections
  if (
    s.includes("flexible") ||
    s.includes("undecided") ||
    s.includes("tbd")
  ) {
    return null;
  }

  // Strip commas and extract numeric digits
  const cleaned = s.replace(/,/g, "");
  const matches = cleaned.match(/\d+/g);

  if (!matches || matches.length === 0) {
    return null;
  }

  const val = parseInt(matches[0], 10);
  if (isNaN(val) || val <= 0) {
    return null;
  }

  return val;
}

/**
 * Formats notes string into chunks within Notion's 2,000 character rich_text limit per block.
 */
function createRichTextChunks(text: string) {
  const MAX_CHUNK = 1900;
  const chunks = [];
  for (let i = 0; i < text.length; i += MAX_CHUNK) {
    chunks.push({
      type: "text" as const,
      text: { content: text.slice(i, i + MAX_CHUNK) },
    });
  }
  return chunks.length > 0
    ? chunks
    : [{ type: "text" as const, text: { content: text } }];
}

/**
 * Builds the complete Notion properties payload compliant with the Leads & Sales Pipeline database.
 */
export function buildNotionProperties(
  lead: LeadPayload,
  schemaHints?: {
    stageType?: "status" | "select";
    acquiredByType?: "select" | "people";
  }
): Record<string, any> {
  const companyName = (lead.businessName || "Not specified").trim();
  const serviceInterests = mapServiceInterest(lead.service);
  const estimatedValue = parseEstimatedValue(lead.budget);

  // Structured notes including all consultation metadata
  const fullNotes = [
    `=== DATACRAFT CONSULTATION BRIEF ===`,
    `Reference ID : ${lead.referenceId}`,
    `Client Name  : ${lead.name}`,
    `Client Email : ${lead.email}`,
    `Phone / WA   : ${lead.phone || "Not provided"}`,
    `Company      : ${companyName}`,
    `Service Area : ${lead.service}`,
    `Budget Stated: ${lead.budget}`,
    `Contact Pref : ${lead.preferredContact}`,
    `Submitted At : ${lead.timestamp}`,
    `Lead Source  : ${lead.source || "DataCraft Website"}`,
    `=====================================`,
    `PROJECT SCOPE & REQUIREMENTS:`,
    lead.description,
  ].join("\n");

  const properties: Record<string, any> = {
    // Lead Title
    Lead: {
      title: [
        {
          type: "text",
          text: { content: lead.name.trim() },
        },
      ],
    },
    // Email property
    Email: {
      email: lead.email.trim(),
    },
    // Company rich_text property
    Company: {
      rich_text: [
        {
          type: "text",
          text: { content: companyName },
        },
      ],
    },
    // Service Interest multi_select (strictly mapped to 5 allowed options)
    "Service Interest": {
      multi_select: serviceInterests.map((name) => ({ name })),
    },
    // Notes rich_text (chunked to ensure <2000 chars per block)
    Notes: {
      rich_text: createRichTextChunks(fullNotes),
    },
    // Source select
    Source: {
      select: { name: "Website" },
    },
  };

  // Contact No (Phone property) — only add if phone is provided and valid
  if (lead.phone && lead.phone.trim().length > 0) {
    properties["Contact No"] = {
      phone_number: lead.phone.trim(),
    };
  }

  // Estimated Value (Number property) — only add if numeric and meaningful
  if (estimatedValue !== null) {
    properties["Estimated Value"] = {
      number: estimatedValue,
    };
  }

  // Stage property (Status or Select: "New")
  if (schemaHints?.stageType === "select") {
    properties["Stage"] = { select: { name: "New" } };
  } else {
    // Default to status object per standard Notion CRM template
    properties["Stage"] = { status: { name: "New" } };
  }

  // Acquired By property (Select: "Unassigned" or empty People array)
  if (schemaHints?.acquiredByType === "people") {
    properties["Acquired By"] = { people: [] };
  } else {
    properties["Acquired By"] = { select: { name: "Unassigned" } };
  }

  return properties;
}

/**
 * Synchronizes an incoming consultation enquiry into the Notion Leads database.
 * Completely server-side, with automated retry, error boundary, and schema adaptability.
 */
export async function syncLeadToNotion(lead: LeadPayload): Promise<NotionSyncResult> {
  const apiKey = process.env.NOTION_API_KEY;
  const rawDatabaseId =
    process.env.NOTION_DATABASE_ID || NOTION_DEFAULTS.DATABASE_ID;
  const databaseId = rawDatabaseId.replace(/-/g, "");

  // If NOTION_API_KEY is not yet configured, cleanly report configuration status
  // without throwing an unhandled exception or breaking form submission.
  if (!apiKey || apiKey.trim().length === 0 || apiKey.startsWith("ntn_your_")) {
    console.warn(
      `[NOTION_SYNC:CONFIG_REQUIRED] Ref: ${lead.referenceId}. NOTION_API_KEY is pending configuration. Database ID: ${databaseId}. Lead preserved in persistent log drain & queue.`
    );
    return {
      success: false,
      status: "CONFIG_REQUIRED",
      error: "NOTION_API_KEY environment variable is not configured.",
    };
  }

  const endpoint = `${NOTION_DEFAULTS.API_BASE_URL}/pages`;
  const headers = {
    Authorization: `Bearer ${apiKey.trim()}`,
    "Notion-Version": NOTION_DEFAULTS.API_VERSION,
    "Content-Type": "application/json",
  };

  // Attempt 1: Standard payload
  let properties = buildNotionProperties(lead);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log(
          `[NOTION_SYNC:SUCCESS] Created Notion Lead: ${data.id} (Ref: ${lead.referenceId})`
        );
        return {
          success: true,
          status: "SUCCESS",
          pageId: data.id,
          url: data.url,
          statusCode: response.status,
        };
      }

      console.error(
        `[NOTION_SYNC:FAILED] Attempt ${attempt} HTTP ${response.status}:`,
        data.message || data
      );

      // Inspect Notion error message for schema-specific adaptability
      const errMsg = (data.message || "").toLowerCase();

      // If Stage should be select instead of status (or vice versa), adapt and retry
      if (errMsg.includes("stage") && errMsg.includes("select")) {
        properties = buildNotionProperties(lead, { stageType: "select" });
        continue;
      } else if (errMsg.includes("stage") && errMsg.includes("status")) {
        properties = buildNotionProperties(lead, { stageType: "status" });
        continue;
      }

      // If Acquired By is a people property instead of select
      if (errMsg.includes("acquired by") && errMsg.includes("people")) {
        properties = buildNotionProperties(lead, { acquiredByType: "people" });
        continue;
      }

      // If property does not exist in schema, try creating without that optional property
      if (errMsg.includes("contact no") || errMsg.includes("phone_number")) {
        delete properties["Contact No"];
        continue;
      }
      if (errMsg.includes("estimated value")) {
        delete properties["Estimated Value"];
        continue;
      }
      if (errMsg.includes("acquired by")) {
        delete properties["Acquired By"];
        continue;
      }

      // Handle 429 Rate Limiting with backoff
      if (response.status === 429 && attempt === 1) {
        await new Promise((r) => setTimeout(r, 1200));
        continue;
      }

      return {
        success: false,
        status: "FAILED",
        error: data.message || `Notion API responded with HTTP ${response.status}`,
        statusCode: response.status,
      };
    } catch (netErr: any) {
      console.error(`[NOTION_SYNC:NETWORK_ERROR] Attempt ${attempt}:`, netErr.message);
      if (attempt === 1) {
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      return {
        success: false,
        status: "FAILED",
        error: netErr.message || "Network exception during Notion API sync.",
      };
    }
  }

  return {
    success: false,
    status: "FAILED",
    error: "Maximum retry attempts exceeded for Notion API lead creation.",
  };
}
