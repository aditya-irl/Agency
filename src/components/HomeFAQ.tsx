"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowUpRight, MessageCircle } from "lucide-react";
import { BRAND } from "@/data/studio";

export const HOME_FAQS = [
  {
    question: "How much does a website or software project cost at DataCrafts?",
    answer:
      "Our solutions start at ₹3,000 for single-page showcases. Multi-page business websites start from ₹8,000, full-featured Shopify e-commerce stores start from ₹15,000 onwards, and custom software or web applications start from ₹20,000 onwards. All estimates are negotiable and calibrated to your exact business requirements with zero hidden charges.",
    actionText: "Try our Interactive Scope Estimator",
    actionHref: "#cost-calculator",
  },
  {
    question: "How fast can you design and launch our digital project?",
    answer:
      "Starter single-page showcases and campaign landing pages are typically delivered in 3 to 7 business days. Full multi-page business websites and Shopify stores launch in 2 to 3 weeks, while custom CRM dashboards and software applications range from 3 to 5 weeks.",
    actionText: "Book a slot to discuss timelines",
    actionHref: "#book-consultation",
  },
  {
    question: "Will my website be mobile-optimized and rank well on Google?",
    answer:
      "Yes, absolutely. Every project is built mobile-first with 95+ Core Web Vitals speed scores, instant interactive loading, and schema-rich local SEO metadata to maximize visibility across Google Search in Auraiya, Kanpur, Delhi NCR, and throughout India.",
    actionText: "Check our completed projects",
    actionHref: "/work",
  },
  {
    question: "Do I own 100% of the code, domain, and design files?",
    answer:
      "100% Yes. You own all design files, production source code, and cloud hosting accounts. DataCrafts never charges proprietary lock-in fees or holds client websites hostage. You maintain total freedom and ownership.",
    actionText: "Chat with our founders directly",
    actionHref: BRAND.officialWhatsAppUrl,
    isExternal: true,
  },
  {
    question: "How does the Free 30-Minute Consultation call work?",
    answer:
      "Simply pick your preferred date and time slot below. Our founders Aditya and Shreya review your requirements beforehand and meet you on a direct call or WhatsApp with actionable architectural clarity, scope recommendations, and pricing options—with zero pressure.",
    actionText: "Reserve your free slot below",
    actionHref: "#book-consultation",
  },
];

export default function HomeFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="home-faq-heading" className="editorial-container">
      {/* JSON-LD Schema for Google Search Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-6 sm:p-10 md:p-14 shadow-card space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(35,31,32,0.1)]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEAE3] border border-accent/20 text-xs font-semibold text-accent">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Everything You Need to Know</span>
            </div>
            <h2
              id="home-faq-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Clear answers on pricing, turnaround speeds, code ownership, and how we collaborate with ambitious businesses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BRAND.officialWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors shadow-subtle"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ask on WhatsApp (15m response)</span>
            </a>
          </div>
        </div>

        {/* Semantic Collapsible FAQ Accordion */}
        <div className="divide-y divide-[rgba(35,31,32,0.1)]">
          {HOME_FAQS.map((faq, index) => (
            <details
              key={index}
              className="group py-5 transition-colors hover:bg-[rgba(35,31,32,0.01)] rounded-xl px-2"
            >
              <summary className="cursor-pointer list-none pr-4 text-base sm:text-lg font-bold text-foreground marker:hidden select-none">
                <span className="flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FCFAF8] border border-[rgba(35,31,32,0.15)] flex items-center justify-center text-sm font-bold text-accent transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <div className="pt-3 pb-1 text-sm sm:text-base text-text-secondary leading-relaxed space-y-3">
                <p>{faq.answer}</p>
                {faq.actionHref && (
                  <div>
                    {faq.isExternal ? (
                      <a
                        href={faq.actionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>{faq.actionText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={faq.actionHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>{faq.actionText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
