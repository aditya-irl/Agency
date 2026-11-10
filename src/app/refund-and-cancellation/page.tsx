import React from "react";
import Link from "next/link";
import { RefreshCw, CheckCircle2, AlertCircle, Mail, HelpCircle } from "lucide-react";
import { BRAND } from "@/data/studio";
import { createPageMetadata } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    title: "Refund & Cancellation Policy — DataCrafts Software Solutions",
    description:
      "Review DataCraft’s structured cancellation procedures, advance deposit treatment, out-of-pocket expense handling, and refund resolution timeline.",
    path: "/refund-and-cancellation",
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundAndCancellationPage() {
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
        <span className="text-accent font-semibold">Refund & Cancellation</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 max-w-3xl pb-8 border-b border-[rgba(35,31,32,0.1)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEAE3] text-accent border border-accent/20 text-xs font-mono font-semibold">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Transparent Commercial Resolution</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Refund & Cancellation Policy
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          At DataCraft ({BRAND.fullName}), we structure project contracts fairly, with clear guidelines governing project cancellations, advance deposit reconciliation, and deliverable handoffs.
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

      {/* Main Content */}
      <article className="prose prose-neutral max-w-4xl space-y-10 text-sm sm:text-base text-foreground/90 leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">01.</span>
            <span>Nature of Digital & Custom Engineering Services</span>
          </h2>
          <p>
            DataCraft provides bespoke digital design, software engineering, and consulting services. Because our work involves custom code authoring, information architecture design, and dedicated engineering bandwidth, services cannot simply be “returned” once executed.
          </p>
          <p>
            Rather than enforcing an arbitrary universal “no refunds” clause, DataCraft adheres to a structured, pro-rata reconciliation framework aligned with signed project work orders and applicable contract guidelines in India.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">02.</span>
            <span>Cancellation Scenarios & Deposit Treatment</span>
          </h2>
          <div className="space-y-4 pt-2">
            {/* Scenario A */}
            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">
                  A. Cancellation Prior to Project Kickoff
                </h3>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Refundable (Less Admin Fee)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                If the client requests cancellation in writing before discovery documentation, wireframing, or code development has commenced, the advance deposit is refundable minus a <strong>10% administrative and payment processing fee</strong> to cover banking transaction charges.
              </p>
            </div>

            {/* Scenario B */}
            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">
                  B. Cancellation During Active Milestone Execution
                </h3>
                <span className="text-[11px] font-mono text-accent bg-[#FCEAE3] px-2 py-0.5 rounded border border-accent/20">
                  Pro-Rata Account Reconciliation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                If a project is cancelled while active development is in progress, the account is reconciled based on the percentage of milestones achieved and hours invested up to the date of cancellation notice. Any unearned portion of the advance deposit will be promptly refunded. All completed deliverables and working code generated up to the cancellation date will be handed over to the client.
              </p>
            </div>

            {/* Scenario C */}
            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">
                  C. Cancellation Following Deliverable Completion & Staging Approval
                </h3>
                <span className="text-[11px] font-mono text-text-secondary bg-[#E0D5C9]/40 px-2 py-0.5 rounded">
                  Completed Phases Non-Refundable
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Once a milestone deliverable or complete project has been delivered, reviewed, and approved on staging, the fees associated with that milestone are fully earned and non-refundable.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">03.</span>
            <span>Third-Party Disbursements & Out-of-Pocket Expenses</span>
          </h2>
          <p>
            Payments disbursed to external third-party providers on behalf of the client are strictly <strong>non-refundable</strong> once incurred, because external vendors do not issue refunds to DataCraft. These include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85">
            <li>Domain registration, renewal, and transfer fees (e.g. GoDaddy, Namecheap).</li>
            <li>Premium Shopify themes or paid Shopify App Store extensions.</li>
            <li>Third-party software licenses, API subscriptions, or hosting accounts.</li>
            <li>SSL certificates and dedicated transactional email IP setups.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">04.</span>
            <span>Refund Request & Resolution Procedure</span>
          </h2>
          <p>To request a project cancellation or refund review, follow this step-by-step procedure:</p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-foreground/85">
            <li>
              <strong>Submit Written Notice:</strong> Email <strong>{BRAND.primaryEmail}</strong> from the primary email associated with the project contract, quoting your project reference ID and reasons for cancellation.
            </li>
            <li>
              <strong>Account Reconciliation:</strong> DataCraft founders will review the contract milestones, calculate hours and deliverables completed, and provide an itemized account summary within <strong>seven (7) business days</strong>.
            </li>
            <li>
              <strong>Resolution Agreement:</strong> Both parties review the reconciliation statement and sign a mutual project termination agreement.
            </li>
            <li>
              <strong>Payment Disbursement:</strong> Approved refunds are credited back via original payment channel (Bank NEFT/RTGS or UPI) within <strong>5 to 10 business days</strong> following agreement execution.
            </li>
          </ol>
        </section>
      </article>

      {/* Direct Contact Callout */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            <span>Have Questions About Project Terms or Invoicing?</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Our co-founders Aditya and Shreya are available for direct discussion regarding any commercial questions.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-foreground text-background font-semibold text-xs sm:text-sm hover:bg-accent transition-colors shadow-sm"
        >
          Contact Co-Founders
        </Link>
      </section>
    </div>
  );
}
