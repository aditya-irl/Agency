# DataCraft — Premium Digital Studio Website

A conversion-focused, editorial digital studio website engineered for **DataCraft**, an independent creative technology and digital studio led by co-founders **Aditya** and **Shreya**.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, the site combines warm cream editorial layouts, clean white project showcases, and dark technical software frames inspired by contemporary Swiss studio design (**Pépite Boisson**).

---

## 🎨 Visual Identity & Color Tokens

Built strictly around the designated color palette:

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **Background** | `#F6EEE2` | Warm cream linen foundation |
| **Surface** | `#FFFDF6` | Primary editorial card surface |
| **Primary Text** | `#231F20` | Cocoa / deep charcoal typography |
| **Secondary Text** | `#77716D` | Subdued editorial body & meta |
| **Accent** | `#C6532E` | Deep coral-orange focal points & actions |
| **Soft Accent** | `#FCEAE3` | Subtle badge backgrounds & chip highlights |
| **Borders** | `rgba(35, 31, 32, 0.15)` | Restrained hairline framing |
| **Dark Technical** | `#181516` / `#231F20` | High-contrast dark sections for software/dashboards |

* **Typography**: Google Font **Manrope** (editorial headlines, comfortable line lengths).

---

## 📁 Notion Projects & Asset Mapping

1. **ASQUARE BEVERAGES** (Client: Asquare Beverages)
   * **Category**: Brand Website / Product Showcase
   * **Location**: `📍 Kakor / Kanpur, Uttar Pradesh, India` (verified badge)
   * **Screenshot Asset**: **Attachment 2** (`/images/asquare_homepage.jpg`) displayed in original aspect ratio inside a desktop mockup.
   * **CTA**: “Visit Live Website”
2. **AURIFIED SHOPIFY STORE** (Client: Parth)
   * **Category**: E-commerce Development
   * **Location**: `📍 Varanasi, Uttar Pradesh, India` (verified badge)
   * **Status**: In Progress
   * **CTA**: “Visit Website”
3. **FINANCE CRM PLATFORM** (Client: Confidential Finance Client)
   * **Category**: Custom Software Development
   * **Industry**: Finance Management & Loan Operations CRM
   * **Location**: `📍 Auraiya, Uttar Pradesh, India` (verified badge)
   * **Status**: Paused (Engineering Prototype)
   * **Screenshot Asset**: **Attachment 1** (`/images/crm_dashboard.jpg`) displayed inside a dark technical dashboard frame with proprietary client records anonymized.
   * **CTA**: “Explore Project”
4. **PHONEVAULT PRO** (Client: Shivendra Rathore)
   * **Status**: Cancelled before completion. Clearly segregated in an **Archival & Exploratory Lab** section; excluded from the primary completed portfolio.
5. **SHOPIFY STORE** (Private Client)
   * **Status**: Planning. Kept strictly out of the public portfolio until deliverables exist.

---

## 👥 Studio Leadership & Official Contact

* **Founders**:
  * **Aditya Kumar**: Co-Founder — Development & Technology
  * **Shreya**: Co-Founder — Business & Creative Collaboration
* **Official Studio Contact Actions**:
  * **1. Call DataCraft (Calling Only)**: `+91 80062 05606` (`tel:+918006205606` · Calling only, never used for WhatsApp)
  * **2. Call / WhatsApp**: `+91 88658 04386` (`tel:+918865804386` & `https://wa.me/918865804386`)
  * **Official Email**: `Adityak1149x@gmail.com`
* **Commercial Baseline**: Quality Digital Solutions Starting at ₹3,000 onwards (*Final pricing depends on project requirements, functionality and scope*).
* **Zero invented social media profiles**. Direct founder collaboration with no intermediary layers.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional for local mock testing)
cp .env.example .env.local

# 3. Build for production
npm run build

# 4. Start production server
npm run start -p 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Notion Lead Management & Email Notification Engine

DataCraft features an automated lead engine connecting client consultation submissions directly into the existing **Agency HQ** Notion workspace and dispatching real-time email notifications to `Adityak1149x@gmail.com`.

### 1. Notion Database Mapping
* **Workspace**: Agency HQ
* **Target Database**: `Leads & Sales Pipeline` (`bb8c1b3c-c0b9-47e7-a727-26c84e8b95b4`)
* **Property Schema Alignment**:
  * `Lead` (Title): Client Name & Business Name
  * `Email` (Email): Verified client email
  * `Company` (Rich Text): Client business / brand
  * `Service Interest` (Multi-Select): `Website Development`, `Shopify`, `Web App`, `Automation`, `Other`
  * `Estimated Value` (Number): Budget baseline parsed from inquiry
  * `Source` (Select): `Website`
  * `Stage` (Status): `New`
  * `Acquired By` (Select): `Both`
  * `Next Follow-up` (Date): Submission timestamp date
  * `Notes` (Rich Text): Structured brief with reference ID, service details, and timeline

### 2. Environment Variables Configuration
Configure the following in `.env.local` or your deployment platform (Vercel, Netlify):

```bash
# Notion Integration
NOTION_API_KEY=ntn_your_notion_integration_secret_here
NOTION_DATABASE_ID=bb8c1b3c-c0b9-47e7-a727-26c84e8b95b4

# Email Provider (Resend / SendGrid)
EMAIL_PROVIDER_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=Adityak1149x@gmail.com
```

### 3. Reliability & Fault-Tolerance
* **Independent Execution**: Notion synchronization and Email notification execute in parallel using `Promise.allSettled`. If one service is unconfigured or encounters a network error, the other continues, and the client inquiry is never dropped.
* **Serverless Stdout Drain**: Inquiries are logged directly to structured `stdout` for permanent cloud indexing in Vercel / CloudWatch / Datadog.
* **Dead-Letter Queue**: Failed or unconfigured submissions are appended locally to `data/failed_submissions.json` for subsequent retries.
* **15-Minute Deduplication**: Protects against accidental duplicate submissions from identical emails.
