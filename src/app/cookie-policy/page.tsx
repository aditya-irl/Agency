import React from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Sliders, ExternalLink } from "lucide-react";
import { BRAND } from "@/data/studio";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { createPageMetadata } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    title: "Cookie Policy — DataCrafts Software Solutions",
    description:
      "Understand the types of cookies used by DataCraft, how we protect your privacy, and how to control your tracking preferences.",
    path: "/cookie-policy",
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
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
        <span className="text-accent font-semibold">Cookie Policy</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 max-w-3xl pb-8 border-b border-[rgba(35,31,32,0.1)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEAE3] text-accent border border-accent/20 text-xs font-mono font-semibold">
          <Cookie className="w-3.5 h-3.5" />
          <span>Tracking Technologies & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Cookie Policy
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          This policy explains how DataCraft uses cookies and similar storage technologies on <strong>https://www.datacrafts.in</strong> and provides you with complete control over your choices.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-text-secondary">
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Last Updated: November 2026
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)]">
            Consent Version: 2026.1
          </span>
        </div>
      </header>

      {/* Interactive Control Box */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-accent/30 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sliders className="w-4 h-4 text-accent" />
            <span>Manage Your Cookie Preferences at Any Time</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            You can modify or revoke your analytics and marketing cookie preferences whenever you choose.
          </p>
        </div>
        <CookieSettingsButton
          showIcon
          className="px-6 py-3 rounded-full bg-accent text-white font-semibold text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-sm"
        />
      </section>

      {/* Content */}
      <article className="prose prose-neutral max-w-4xl space-y-10 text-sm sm:text-base text-foreground/90 leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">01.</span>
            <span>What Are Cookies?</span>
          </h2>
          <p>
            Cookies are small text files placed on your device (computer, smartphone, or tablet) by websites you visit. They are widely used to ensure websites function properly, maintain navigation continuity, protect against malicious requests, and provide analytical information to site operators.
          </p>
          <p>
            We also use browser storage (such as <code>localStorage</code>) to store your chosen privacy and cookie consent preferences securely on your device.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">02.</span>
            <span>Cookie Categories We Use</span>
          </h2>

          <div className="space-y-6 pt-2">
            {/* Category A */}
            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>A. Strictly Necessary (Essential) Cookies</span>
                </h3>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Always Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Essential cookies and local storage tokens are required for core security, session integrity, form protection, and recording your cookie consent preferences. These cannot be disabled because the website cannot function reliably without them.
              </p>
            </div>

            {/* Category B */}
            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-accent" />
                  <span>B. Performance & Analytics Cookies</span>
                </h3>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-text-secondary bg-[#E0D5C9]/40 px-2.5 py-1 rounded-full">
                  Requires Opt-In Consent
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                We use Google Analytics 4 to understand visitor volume, referrers, popular case studies, and reading duration. All data is collected in aggregated, anonymized formats with IP anonymization active. <em>These scripts do not load until you click “Accept All” or enable Analytics in preferences.</em>
              </p>
            </div>

            {/* Category C */}
            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-accent" />
                  <span>C. Marketing & Advertising Measurement Cookies</span>
                </h3>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-text-secondary bg-[#E0D5C9]/40 px-2.5 py-1 rounded-full">
                  Requires Opt-In Consent
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                When active, Google Ads and Meta Pixel allow us to measure the performance of our advertising campaigns and prevent showing duplicate promotional messages to visitors who have already requested a consultation. <em>These scripts never execute without your explicit opt-in consent.</em>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Cookie Audit Table */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">03.</span>
            <span>Cookie & Storage Audit Table</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[rgba(35,31,32,0.15)] text-text-secondary font-mono uppercase text-[11px]">
                  <th className="py-3 px-3">Identifier</th>
                  <th className="py-3 px-3">Provider</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Purpose</th>
                  <th className="py-3 px-3">Retention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(35,31,32,0.08)]">
                <tr>
                  <td className="py-3 px-3 font-mono font-semibold text-foreground">datacraft_cookie_preferences_v1</td>
                  <td className="py-3 px-3">DataCraft</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">Essential</td>
                  <td className="py-3 px-3 text-text-secondary">Remembers your chosen cookie consent preferences across sessions</td>
                  <td className="py-3 px-3 font-mono text-text-secondary">1 Year</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono font-semibold text-foreground">_ga, _ga_*</td>
                  <td className="py-3 px-3">Google Analytics 4</td>
                  <td className="py-3 px-3 text-accent font-semibold">Analytics</td>
                  <td className="py-3 px-3 text-text-secondary">Distinguishes unique users and tracks anonymous session engagement metrics</td>
                  <td className="py-3 px-3 font-mono text-text-secondary">2 Years</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono font-semibold text-foreground">_gcl_au</td>
                  <td className="py-3 px-3">Google Ads</td>
                  <td className="py-3 px-3 text-accent font-semibold">Marketing</td>
                  <td className="py-3 px-3 text-text-secondary">Used by Google AdSense and Google Ads for advertising efficiency</td>
                  <td className="py-3 px-3 font-mono text-text-secondary">90 Days</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono font-semibold text-foreground">_fbp</td>
                  <td className="py-3 px-3">Meta (Facebook)</td>
                  <td className="py-3 px-3 text-accent font-semibold">Marketing</td>
                  <td className="py-3 px-3 text-text-secondary">Measures conversion effectiveness of Meta digital advertising campaigns</td>
                  <td className="py-3 px-3 font-mono text-text-secondary">90 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-card space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="font-mono text-accent text-lg">04.</span>
            <span>Managing Cookies via Web Browser</span>
          </h2>
          <p>
            In addition to our on-site Cookie Settings modal, most modern browsers allow you to manage or delete stored cookies through their application settings:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85">
            <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies</li>
            <li><strong>Apple Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
          </ul>
          <p className="text-xs text-text-secondary">
            Note that blocking strictly essential cookies via browser settings may prevent website forms and interactive features from operating properly.
          </p>
        </section>
      </article>
    </div>
  );
}
