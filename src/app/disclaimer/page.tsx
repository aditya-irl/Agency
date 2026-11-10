import React from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { BRAND } from "@/data/studio";
import { createPageMetadata } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    title: "Website & Portfolio Disclaimer — DataCrafts Software Solutions",
    description:
      "Review DataCraft’s professional disclaimer regarding case study representations, indicative starting pricing, and third-party platform dependencies.",
    path: "/disclaimer",
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
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
        <span className="text-accent font-semibold">Disclaimer</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 max-w-3xl pb-8 border-b border-[rgba(35,31,32,0.1)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEAE3] text-accent border border-accent/20 text-xs font-mono font-semibold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Professional Disclosures & Statements</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Website & Portfolio Disclaimer
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Please read this professional disclaimer carefully before browsing case studies, architectural previews, and commercial information published on <strong>https://www.datacrafts.in</strong>.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-text-secondary">
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Last Updated: November 2026
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Applicable to: DataCraft Digital Studio
          </span>
        </div>
      </header>

      {/* Main Content */}
      <article className="prose prose-neutral max-w-4xl space-y-10 text-sm sm:text-base text-foreground/90 leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">01.</span>
            <span>Case Studies & Work Portfolio Representation</span>
          </h2>
          <p>
            Project examples, case study write-ups, and interface screenshots featured on DataCraft (such as <em>Asquare Beverages</em>, <em>Aurified</em>, and the <em>Finance CRM Platform</em>) represent genuine engineering, design, and prototyping work conducted by DataCraft and its founders.
          </p>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Status Transparency:</strong> Each project displays its authentic development status (e.g. <em>“Live Website”</em>, <em>“In Progress”</em>, or <em>“Prototyped / Paused”</em>).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Client Confidentiality:</strong> Certain enterprise systems (such as our custom loan management CRM) are presented under strict confidentiality. Real customer records, identity documents, and proprietary financial ledgers are anonymized or masked.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
              <span><strong>Unfinished Works:</strong> Cancelled or paused prototypes are explicitly segregated in an archival section and are never mischaracterized as active commercial deployments.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">02.</span>
            <span>Commercial & Business Results Disclaimer</span>
          </h2>
          <p>
            While DataCraft builds high-performance digital products engineered to modern performance, conversion, and accessibility standards, <strong>we make no express or implied guarantees regarding specific commercial outcomes</strong>.
          </p>
          <p>
            Commercial results, revenue growth, search engine rankings (SEO), and conversion percentages are inherently determined by external variables beyond DataCraft’s control, including product-market fit, client pricing models, supply chain fulfillment, advertising spend, and broader industry competition.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">03.</span>
            <span>Indicative Baseline Pricing</span>
          </h2>
          <p>
            Any pricing references on this website (such as <em>“Quality Digital Solutions. Starting at ₹3,000”</em>) represent baseline starting thresholds for minimal starter solutions and single-page landing presentations.
          </p>
          <p>
            These figures do not imply that every digital service costs ₹3,000. All comprehensive multi-page corporate websites, Shopify e-commerce storefronts, and bespoke software systems require tailored quotations calculated based on functional specifications, data architecture, and custom requirements.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">04.</span>
            <span>Third-Party Platforms, Trademarks & Links</span>
          </h2>
          <p>
            All third-party trademarks, company logos, and service marks referenced across our website (including Shopify, React, Next.js, Google, Meta, Notion, and Vercel) remain the property of their respective trademark holders.
          </p>
          <p>
            Their inclusion on DataCraft does not constitute endorsement, sponsorship, or formal partnership unless explicitly declared. They are referenced solely to describe technical capabilities and integration compatibility.
          </p>
          <p>
            Our website may link to external websites (such as client live websites or external tools). DataCraft exercises no control over the content, privacy practices, or uptime of third-party websites.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">05.</span>
            <span>Ongoing Updates & Accuracy</span>
          </h2>
          <p>
            DataCraft reserves the right to refine, modify, or archive content, case study write-ups, service descriptions, and technical specifications at any time without prior announcement. While we endeavor to maintain up-to-date and accurate information, we make no representations as to the completeness or timeliness of all content on the website.
          </p>
        </section>
      </article>
    </div>
  );
}
