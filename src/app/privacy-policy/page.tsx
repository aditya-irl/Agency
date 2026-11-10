import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MessageCircle, ArrowLeft, Lock, FileText, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/data/studio";
import { createPageMetadata } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    title: "Privacy Policy — DataCrafts Software Solutions",
    description:
      "Learn how DataCraft collects, uses, protects, and retains your project enquiry information in compliance with modern data privacy standards.",
    path: "/privacy-policy",
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="editorial-container py-12 md:py-20 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-secondary">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Legal</span>
        <span>/</span>
        <span className="text-accent font-semibold">Privacy Policy</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 max-w-3xl pb-8 border-b border-[rgba(35,31,32,0.1)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEAE3] text-accent border border-accent/20 text-xs font-mono font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Data Governance & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          At DataCraft ({BRAND.fullName}), we respect your personal privacy and handle your project enquiry information with absolute discretion, integrity, and security.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-text-secondary">
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Last Updated: November 2026
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Status: Current & Active
          </span>
        </div>
      </header>

      {/* Main Legal Content */}
      <article className="prose prose-neutral max-w-4xl space-y-10 text-sm sm:text-base text-foreground/90 leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">01.</span>
            <span>Data Controller & Studio Overview</span>
          </h2>
          <p>
            DataCraft operates as an independent, founder-led digital technology studio co-founded by{" "}
            <strong>Aditya Kumar</strong> (Co-Founder — Development & Technology) and{" "}
            <strong>Shreya</strong> (Co-Founder — Business & Creative Collaboration).
          </p>
          <p>
            For all interactions on <strong>https://www.datacrafts.in</strong>, DataCraft is the data controller responsible for your personal information. If you have questions regarding this Privacy Policy or wish to exercise any statutory privacy rights, contact us directly at:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm font-mono text-text-secondary">
            <li>Primary Email: {BRAND.primaryEmail}</li>
            <li>Direct Telephone: {BRAND.callingOnlyPhone} (Calling Only)</li>
            <li>Consultation & WhatsApp: {BRAND.callWhatsappPhone} (Calling + WhatsApp)</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">02.</span>
            <span>Information We Collect</span>
          </h2>
          <p>
            We collect personal information exclusively when you voluntarily provide it through our website consultation forms, email correspondence, telephone calls, or direct messaging channels. We do not engage in covert background data harvesting.
          </p>
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider font-mono">
              Categories of Personal Data Collected:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
                <strong className="block text-foreground mb-1">Identity & Contact Details:</strong>
                <span>Your full name, official email address, telephone/mobile number, and preferred contact channel (WhatsApp, phone call, or email).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
                <strong className="block text-foreground mb-1">Business & Commercial Details:</strong>
                <span>Your company or brand name, current business website or domain (if applicable), and industry sector.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
                <strong className="block text-foreground mb-1">Project Requirements & Scope:</strong>
                <span>Service requested (Website Development, Shopify E-commerce, Custom Software, Automation), project description, technical goals, and target launch timeline.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
                <strong className="block text-foreground mb-1">Budget Allocation:</strong>
                <span>Your selected budget bracket (starting at ₹3,000 onwards) used strictly to assess project feasibility and recommend appropriate technical architecture.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">03.</span>
            <span>Purposes of Processing</span>
          </h2>
          <p>We process your information strictly for legitimate commercial and engineering purposes:</p>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Scope Evaluation & Feasibility:</strong> Reviewing project briefs, technical constraints, and deliverables to determine project suitability.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Tailored Quotations:</strong> Calculating transparent, itemized commercial proposals aligned with your requirements and chosen milestones.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Direct Communication:</strong> Responding to consultation requests, clarifying specifications, and scheduling discovery calls.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Contractual Delivery:</strong> Carrying out digital design, software development, deployment, and ongoing technical maintenance agreed in project work orders.</span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">04.</span>
            <span>Storage, Security & Third-Party Processors</span>
          </h2>
          <p>
            DataCraft employs industry-standard security safeguards. All data transmitted between your browser and our website is encrypted using Transport Layer Security (TLS 1.3 / HTTPS).
          </p>
          <p>
            To fulfill our operational workflow, we utilize select verified enterprise infrastructure providers:
          </p>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
              <strong>Notion Labs Inc. (Agency HQ Pipeline):</strong> Form enquiry details are synchronized via secure encrypted API into DataCraft’s private workspace for team review and pipeline management.
            </div>
            <div className="p-3 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
              <strong>Transactional Email Infrastructure:</strong> Secure SMTP/API gateways used solely to deliver lead notification receipts and project confirmations to our verified founders.
            </div>
            <div className="p-3 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
              <strong>Vercel Inc. (Edge Hosting):</strong> Web application hosting and serverless API execution protected by automated DDoS shielding and modern edge routing.
            </div>
          </div>
          <p className="text-xs text-text-secondary">
            We never sell, rent, lease, or monetize your contact details to third-party data brokers or marketing aggregators.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">05.</span>
            <span>Analytics & Advertising Technologies</span>
          </h2>
          <p>
            We may use privacy-respecting measurement tools, including Google Analytics 4, Google Ads conversion measurement, and Meta Pixel, to understand website traffic patterns and evaluate our advertising campaigns.
          </p>
          <p>
            <strong>Strict Consent Control:</strong> These tracking technologies are non-essential and <em>never execute before you have granted explicit consent</em> via our on-screen Cookie Consent Banner. You can review, alter, or revoke your consent at any time by selecting the <strong>Cookie Settings</strong> link in our website footer.
          </p>
          <p className="text-xs text-text-secondary">
            For granular details regarding individual cookies and their retention durations, please refer to our dedicated{" "}
            <Link href="/cookie-policy" className="text-accent underline hover:text-accent-hover font-semibold">
              Cookie Policy
            </Link>.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">06.</span>
            <span>Data Retention & Your Statutory Rights</span>
          </h2>
          <p>
            We retain personal information for the duration necessary to satisfy the commercial purpose for which it was gathered, conduct client work, and comply with tax or legal audit obligations.
          </p>
          <p>You have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85">
            <li><strong>Right of Access:</strong> Request a copy of the personal information DataCraft maintains about you.</li>
            <li><strong>Right of Rectification:</strong> Request correction of inaccurate or incomplete contact records.</li>
            <li><strong>Right to Erasure (Deletion):</strong> Request that we delete your project enquiry records from our internal pipeline.</li>
            <li><strong>Right to Withdraw Consent:</strong> Revoke consent for marketing communications or analytics measurement at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, send an email to <strong>{BRAND.primaryEmail}</strong> with the subject line <em>“Data Privacy Request”</em>. We verify and respond to all legitimate requests within 30 calendar days at no charge.
          </p>
        </section>
      </article>

      {/* Review & Legal Notice Banner */}
      <aside className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
        <p className="font-bold">Legal Disclaimer:</p>
        <p>
          This policy is published for general transparency and reflects DataCraft’s actual operational workflows. It does not constitute formal legal counsel. For specific jurisdictional legal requirements, consult an attorney licensed in your jurisdiction.
        </p>
      </aside>
    </div>
  );
}
