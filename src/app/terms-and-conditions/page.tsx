import React from "react";
import Link from "next/link";
import { Scale, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { BRAND } from "@/data/studio";
import { createPageMetadata } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    title: "Terms & Conditions — DataCrafts Software Solutions",
    description:
      "Review the commercial, intellectual property, payment, and operational terms governing digital services provided by DataCraft.",
    path: "/terms-and-conditions",
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
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
        <span className="text-accent font-semibold">Terms & Conditions</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 max-w-3xl pb-8 border-b border-[rgba(35,31,32,0.1)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEAE3] text-accent border border-accent/20 text-xs font-mono font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Service Agreement & Commercial Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Terms & Conditions
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          These Terms and Conditions govern the engagement, design, engineering, and digital services delivered by DataCraft ({BRAND.fullName}) to our clients.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-text-secondary">
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Last Updated: November 2026
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Applicable Website: https://www.datacrafts.in
          </span>
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-neutral max-w-4xl space-y-10 text-sm sm:text-base text-foreground/90 leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">01.</span>
            <span>Nature of Services & Studio Engagement</span>
          </h2>
          <p>
            DataCraft is an independent creative technology studio co-founded by Aditya Kumar and Shreya. We provide professional digital services comprising custom business website design, Shopify e-commerce development, bespoke web application engineering (including CRM platforms), business workflow automations, and technical architecture consulting.
          </p>
          <p>
            When engaging DataCraft, clients collaborate directly with the founders. All specific deliverables, timelines, milestones, and technical parameters are formalized in individual project proposals or written work orders that supplement these Terms.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">02.</span>
            <span>Quotations, Scope & Baseline Pricing</span>
          </h2>
          <p>
            DataCraft offers digital solutions starting at <strong>₹3,000 onwards</strong> for focused starter solutions and single-page landing presentations. Multi-page brand sites, full-featured Shopify stores, and custom software systems require tailored engineering proposals.
          </p>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Scope Definition:</strong> Every project quote specifies exact deliverables, page counts, feature sets, and third-party integrations.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Scope Variations:</strong> Any feature additions, structural changes, or functional expansions requested outside the approved scope document are quoted as separate work order addenda.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Validity of Estimates:</strong> Quotations remain valid for thirty (30) calendar days from issuance unless otherwise agreed in writing.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">03.</span>
            <span>Payment Terms & Milestone Structure</span>
          </h2>
          <p>
            To ensure sustained engineering dedication, our projects operate on a structured milestone payment schedule:
          </p>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
              <strong>1. Initial Advance Deposit (30% to 50%):</strong> Due upon work order signing to schedule project discovery, reserve development bandwidth, and initiate design architecture.
            </div>
            <div className="p-3.5 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
              <strong>2. Interim Milestones (if applicable):</strong> Due upon formal client review and approval of staged deliverables (such as wireframe completion or core software module delivery).
            </div>
            <div className="p-3.5 rounded-xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)]">
              <strong>3. Final Balance (Due Prior to Production Deployment):</strong> Payable upon pre-launch staging verification and prior to final source code handoff or live domain deployment.
            </div>
          </div>
          <p className="text-xs text-text-secondary">
            Invoices are payable via direct bank wire transfer, UPI, or designated authorized payment links within seven (7) business days of issuance.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">04.</span>
            <span>Client Responsibilities & Timelines</span>
          </h2>
          <p>Project velocity depends on close collaboration. The client agrees to:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85">
            <li>Provide high-resolution brand assets, logos, and approved textual content in a timely manner.</li>
            <li>Supply necessary account access (domain DNS, hosting portals, Shopify merchant credentials, or third-party API keys) needed for integration.</li>
            <li>Review and provide consolidated feedback on staging previews within agreed review windows (typically 3–5 business days).</li>
          </ul>
          <p className="text-xs text-text-secondary">
            Prolonged delays in feedback or content delivery exceeding thirty (30) days may cause project rescheduling and adjustment of launch dates.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">05.</span>
            <span>Intellectual Property Rights & Ownership</span>
          </h2>
          <p>
            <strong>Client Deliverables:</strong> Upon receipt of full and final payment for all project invoices, full ownership of custom code, layout designs, and graphics created exclusively for the client transfers to the client.
          </p>
          <p>
            <strong>Pre-Existing Studio Tooling:</strong> DataCraft retains ownership of its proprietary boilerplates, reusable utility libraries, workflow scripts, and foundational components developed independently of the project. The client is granted a perpetual, royalty-free, non-exclusive license to use such components as part of their delivered product.
          </p>
          <p>
            <strong>Third-Party & Open Source Software:</strong> Frameworks and libraries (such as Next.js, React, Tailwind CSS, Lucide Icons) remain governed by their respective open-source licenses (MIT, Apache 2.0).
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">06.</span>
            <span>Third-Party Platforms, Subscriptions & Domain Accounts</span>
          </h2>
          <p>
            The client is directly responsible for establishing and maintaining their own third-party accounts and subscriptions, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85">
            <li>Domain registration and annual renewal fees (e.g. GoDaddy, Namecheap).</li>
            <li>Platform hosting and infrastructure subscriptions (e.g. Shopify plan fees, Vercel, AWS).</li>
            <li>Third-party API quotas, transaction fees, and SMS/payment gateway charges (e.g. Razorpay, Stripe, Twilio).</li>
          </ul>
          <p className="text-xs text-text-secondary">
            DataCraft does not mark up third-party platform fees unless expressly agreed as part of a managed maintenance retainer.
          </p>
        </section>

        {/* Section 7 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">07.</span>
            <span>Warranty, Maintenance & Limitation of Liability</span>
          </h2>
          <p>
            <strong>30-Day Post-Launch Warranty:</strong> We provide thirty (30) calendar days of complimentary technical defect warranty following official launch to resolve any bugs or functional discrepancies against the agreed scope.
          </p>
          <p>
            <strong>Limitation of Liability:</strong> In no event shall DataCraft, its founders, or contractors be liable for any indirect, consequential, exemplary, or punitive damages, including loss of profits, commercial interruption, or data corruption. DataCraft’s aggregate liability arising out of any engagement shall not exceed the total fees paid by the client for the specific service under dispute.
          </p>
        </section>

        {/* Section 8 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">08.</span>
            <span>Governing Law & Dispute Resolution</span>
          </h2>
          <p>
            These Terms shall be interpreted and governed in accordance with the laws of India. Any controversy or claim arising from or relating to these terms shall first be addressed through direct, good-faith executive discussion between the client and DataCraft founders. If unresolved within thirty (30) days, disputes shall be subject to the exclusive jurisdiction of the competent courts in Uttar Pradesh, India.
          </p>
        </section>
      </article>

      {/* Review Notice */}
      <aside className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
        <p className="font-bold">Legal Notice:</p>
        <p>
          These Terms and Conditions are adapted to DataCraft’s independent digital studio workflow. They should be reviewed by qualified legal counsel prior to formal execution in enterprise commercial agreements.
        </p>
      </aside>
    </div>
  );
}
