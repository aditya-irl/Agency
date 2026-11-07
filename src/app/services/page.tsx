import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ShoppingBag,
  Database,
  Smartphone,
  Cpu,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { BRAND } from "@/data/studio";
import ScopeEstimator from "@/components/ScopeEstimator";

export const metadata: Metadata = {
  title: "Services & Capabilities | DataCraft",
  description:
    "Explore DataCraft's five core disciplines: Website Development, E-Commerce, Custom Software Development, Mobile & PWA, and Automation & Integrations. Starting at ₹3,000.",
};

export default function ServicesPage() {
  const serviceIcons = [Code2, ShoppingBag, Database, Smartphone, Cpu];

  const faqs = [
    {
      q: "How does DataCraft structure pricing and engagements?",
      a: "Our digital solutions start at ₹3,000 onwards for focused landing showcases. For multi-page business websites, Shopify stores, and custom software systems, we provide transparent fixed-fee milestone proposals tailored to your scope.",
    },
    {
      q: "Do you build on generic WordPress or pre-made templates?",
      a: "No. Pre-made templates carry hidden technical debt, bloated scripts, and vulnerability risks. We build custom frontends on Next.js, React, or tailored Shopify themes where every line of code is intentional.",
    },
    {
      q: "Can you take over or rebuild an existing application?",
      a: "Yes. We frequently audit legacy codebases, rescue stalled projects, or re-engineer slow existing websites to modern TypeScript and React architectures.",
    },
    {
      q: "What is your typical turnaround time?",
      a: "A focused starter landing page typically delivers in 1 to 2 weeks. Full custom Shopify storefronts or custom software prototypes take 3 to 6 weeks depending on integration requirements.",
    },
  ];

  return (
    <div className="editorial-container space-y-20 md:space-y-28 pb-24">
      {/* Header */}
      <div className="space-y-4 max-w-3xl pt-6 md:pt-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge-pill">Capabilities & Practices</span>
          <span className="text-xs font-mono font-bold text-accent bg-[#FCEAE3] px-3 py-1 rounded-full border border-accent/20">
            {BRAND.startingPriceMessage}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
          Everything your business needs to grow digitally.
        </h1>
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          We combine bespoke aesthetic design with production software
          engineering. Each practice is focused on solving commercial friction,
          accelerating customer acquisition, and automating workflows.
        </p>
      </div>

      {/* Services Deep Dive List */}
      <div className="space-y-16">
        {SERVICES.map((service, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];

          return (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-28 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-7 sm:p-10 md:p-14 shadow-card hover:border-[rgba(35,31,32,0.22)] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Overview Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#F6EEE2] border border-[rgba(35,31,32,0.1)] flex items-center justify-center text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-accent">
                      Practice {service.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h2>
                    <p className="text-base font-semibold text-accent leading-snug">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary font-semibold">
                      Target Audience & Fit
                    </span>
                    <p className="text-xs text-foreground/85 leading-relaxed">
                      {service.idealFor}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/contact?service=${encodeURIComponent(
                        service.title
                      )}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent transition-colors"
                    >
                      <span>Book a Consultation</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Details Column */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] p-6 sm:p-8 rounded-2xl">
                  {/* Deliverables List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
                      Core Deliverables & Outputs
                    </h3>
                    <ul className="space-y-3">
                      {service.deliverables.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="space-y-2 pt-4 border-t border-[rgba(35,31,32,0.08)]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
                      Measurable Commercial Outcome
                    </h4>
                    <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                      {service.outcome}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="space-y-2 pt-4 border-t border-[rgba(35,31,32,0.08)]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
                      Tech Stacks Deployed
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)] text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Interactive Scope & Pricing Calculator (₹3,000 Starting) */}
      <section className="pt-6">
        <ScopeEstimator />
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-8 pt-8 border-t border-[rgba(35,31,32,0.1)]">
        <div className="space-y-2 max-w-2xl">
          <span className="badge-pill">Clarity</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-text-secondary">
            Common questions regarding our pricing, process, and engagement structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)] shadow-subtle space-y-3"
            >
              <h3 className="font-bold text-base md:text-lg text-foreground">
                {faq.q}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="rounded-4xl bg-[#181516] text-[#FFFDF6] border border-[#383234] p-8 sm:p-12 md:p-16 text-center space-y-6">
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Ready to discuss your project requirements?
        </h3>
        <p className="text-sm sm:text-base text-[#D4C9BC] max-w-lg mx-auto leading-relaxed">
          {BRAND.startingPriceMessage} Let’s discuss your objectives and map out
          the most practical technical path.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors shadow-sm"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={BRAND.officialWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#282325] border border-[#3E383A] text-white font-semibold text-sm hover:bg-[#342D30] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-accent" />
            <span>Discuss Your Project</span>
          </a>
          <a
            href={`tel:${BRAND.officialPhone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#282325] border border-[#3E383A] text-white font-semibold text-sm hover:bg-[#342D30] transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-accent" />
            <span>Call DataCraft</span>
          </a>
        </div>
      </div>
    </div>
  );
}
