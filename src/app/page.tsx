import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Check,
  Code2,
  Sparkles,
  PhoneCall,
  Calculator,
} from "lucide-react";
import { BRAND } from "@/data/studio";
import { MAIN_PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import HeroShowcase from "@/components/HeroShowcase";
import Logo from "@/components/Logo";

export default function HomePage() {
  const [asquareProject, aurifiedProject, crmProject] = MAIN_PROJECTS;

  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* ========================================================
          1. HERO SECTION (WITH STARTING PRICE ₹3,000 HIGHLIGHT)
          ======================================================== */}
      <section className="editorial-container pt-6 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Typography & Value Prop */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] shadow-subtle text-xs font-semibold text-foreground">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{BRAND.startingPriceMessage}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight text-foreground leading-[1.08]">
                We turn ambitious ideas into{" "}
                <span className="relative inline-block text-accent italic font-serif">
                  digital
                </span>{" "}
                experiences.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-xl font-normal leading-relaxed pt-2">
                From high-performing websites to custom business applications,
                we design and build digital products that help businesses move
                forward.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/work"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent transition-all duration-200 shadow-sm group"
              >
                <span>Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFFDF6] border border-[rgba(35,31,32,0.18)] text-foreground font-semibold text-sm hover:bg-[rgba(35,31,32,0.06)] transition-all duration-200"
              >
                <span>Book a Consultation</span>
              </Link>
            </div>

            {/* Micro Credibility & Pricing Bar */}
            <div className="pt-6 border-t border-[rgba(35,31,32,0.1)] flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>{BRAND.startingPrice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Direct Founder Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Custom Built · Zero Bloated Templates</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Overlapping Real Desktop (Maverick Physicist) & Mobile (Aurified) Mockups */}
          <div className="lg:col-span-5 relative">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRUST & INTRODUCTORY SECTION (WITH OFFICIAL CONTACT)
          ======================================================== */}
      <section className="editorial-container">
        <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-8 sm:p-12 md:p-16 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <Logo variant="badge" size="md" />
                <span className="badge-pill">Studio Foundation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Small studio. Big ideas. Thoughtful execution.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-text-secondary leading-relaxed">
              <p>
                DataCraft is a founder-led creative technology studio founded by{" "}
                <strong className="text-foreground font-semibold">
                  Aditya
                </strong>{" "}
                and{" "}
                <strong className="text-foreground font-semibold">Shreya</strong>.
                We deliberately operate as an independent, focused studio
                working directly with businesses to design and develop practical
                digital solutions.
              </p>
              <p>
                We don’t pretend to be an oversized agency with fictional
                departments or layers of account managers. When you partner with
                DataCraft, you communicate directly with the makers who plan,
                design, and engineer your product.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-accent transition-colors"
                >
                  <span>Book a Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={BRAND.callingOnlyPhoneTel}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FCFAF8] border border-[rgba(35,31,32,0.15)] text-xs font-semibold text-foreground hover:border-accent transition-colors"
                  title="Call DataCraft — +91 80062 05606"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-accent" />
                  <span>Call DataCraft — +91 80062 05606</span>
                </a>
                <a
                  href={BRAND.callWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
                  title="Call / WhatsApp — +91 88658 04386"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Call / WhatsApp — +91 88658 04386</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PREMIUM PRICING INTRODUCTION SECTION (₹3,000 STARTING)
          ======================================================== */}
      <section className="editorial-container">
        <div className="rounded-3xl bg-[#FFFDF6] border border-[#C6532E]/30 p-8 sm:p-12 shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(35,31,32,0.1)]">
            <div className="space-y-3 max-w-2xl">
              <span className="badge-pill bg-[#FCEAE3] text-[#C6532E] border-[#C6532E]/30">
                Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Digital Solutions Starting at ₹3,000
              </h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                Whether you need a business website, an online store or a custom
                digital solution, let’s find the right approach for your business.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-text-secondary block">
                Starting Baseline
              </span>
              <span className="text-3xl font-extrabold text-foreground">
                ₹3,000
              </span>
              <span className="text-xs text-text-secondary block font-mono">
                onwards
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] space-y-2">
              <span className="font-mono text-xs font-bold text-accent">
                01 · Starter / Landing
              </span>
              <h3 className="font-bold text-foreground text-sm">
                Single-Page Showcase
              </h3>
              <p className="text-xs text-text-secondary">
                Conversion-focused landing page for products, campaigns, or local businesses.
              </p>
              <div className="text-xs font-mono font-bold text-foreground pt-1">
                From ₹3,000 onwards
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] space-y-2">
              <span className="font-mono text-xs font-bold text-accent">
                02 · Full Brand Presence
              </span>
              <h3 className="font-bold text-foreground text-sm">
                Multi-Page Business Website
              </h3>
              <p className="text-xs text-text-secondary">
                Complete corporate presence with product catalogues, inquiries, and brand story.
              </p>
              <div className="text-xs font-mono font-bold text-foreground pt-1">
                Custom Scope
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] space-y-2">
              <span className="font-mono text-xs font-bold text-accent">
                03 · Commerce & Apps
              </span>
              <h3 className="font-bold text-foreground text-sm">
                Shopify Stores & Custom Software
              </h3>
              <p className="text-xs text-text-secondary">
                Online retail storefronts, CRM dashboards, and operational web platforms.
              </p>
              <div className="text-xs font-mono font-bold text-foreground pt-1">
                Tailored Proposal
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] text-xs text-text-secondary flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <span>
              <strong>Note:</strong> {BRAND.startingPriceNote}
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SELECTED WORK (PORTFOLIO GRID)
          ======================================================== */}
      <section id="selected-work" className="editorial-container scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(35,31,32,0.1)]">
          <div className="space-y-3">
            <span className="badge-pill">Portfolio Showcase</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Selected client work.
            </h2>
            <p className="text-text-secondary text-base md:text-lg max-w-xl">
              Authentic projects across brand showcases, Shopify storefronts,
              and enterprise custom software prototypes.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent group"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* The 3 Featured Projects with Unique Visual Treatments */}
        <div className="mt-12 space-y-12 md:space-y-16">
          {/* Project 01: Asquare Beverages (Attachment 2 Image) */}
          <ProjectCard
            project={asquareProject}
            layoutVariant="split-left"
            priority
          />

          {/* Project 02: Aurified Shopify Store */}
          <ProjectCard project={aurifiedProject} layoutVariant="split-right" />

          {/* Project 03: Finance CRM Platform (Attachment 1 Image in Dark Tech Frame) */}
          <ProjectCard project={crmProject} layoutVariant="tech-dark" />
        </div>
      </section>

      {/* ========================================================
          5. SERVICES
          ======================================================== */}
      <section className="editorial-container">
        <div className="space-y-4 max-w-2xl pb-12 border-b border-[rgba(35,31,32,0.1)]">
          <div className="flex items-center gap-2">
            <span className="badge-pill">Core Capabilities</span>
            <span className="text-xs font-mono font-bold text-accent">
              {BRAND.startingPrice}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Everything your business needs to grow digitally.
          </h2>
          <p className="text-text-secondary text-base md:text-lg">
            We provide five focused digital services. Every build is designed for
            measurable commercial impact, speed, and clean software architecture.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}

          {/* 6th Studio Card: Technical Advisory */}
          <div className="rounded-3xl bg-[#181516] text-[#FFFDF6] border border-[#383234] p-7 md:p-9 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#332C2E]">
                <span className="font-mono text-xs font-semibold text-accent tracking-wider">
                  06
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A59C92] bg-[#292426] px-2.5 py-1 rounded-full">
                  Consultation
                </span>
              </div>
              <h3 className="mt-6 text-xl md:text-2xl font-bold tracking-tight text-white">
                Technical Architecture & Code Audits
              </h3>
              <p className="mt-3 text-sm text-[#D4C9BC] leading-relaxed">
                Need guidance before writing code? We audit existing codebases,
                review Shopify setups, and architect scalable tech roadmaps for
                founders.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#332C2E]">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-white transition-colors"
              >
                <span>Book a Technical Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. OUR PROCESS
          ======================================================== */}
      <section className="editorial-container">
        <div className="space-y-4 max-w-2xl pb-12 border-b border-[rgba(35,31,32,0.1)]">
          <span className="badge-pill">Methodology</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Good work starts with a good process.
          </h2>
          <p className="text-text-secondary text-base md:text-lg">
            A structured four-stage delivery model engineered to eliminate
            ambiguity, deliver weekly visible progress, and launch on schedule.
          </p>
        </div>

        <div className="mt-12">
          <ProcessTimeline />
        </div>
      </section>

      {/* ========================================================
          7. FINAL CTA (UNIFIED CONSULTATION & OFFICIAL LINE)
          ======================================================== */}
      <section className="editorial-container">
        <div className="rounded-4xl bg-[#181516] text-[#FFFDF6] border border-[#383234] p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#292426] border border-[#3E383A] text-xs font-mono text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{BRAND.startingPriceMessage}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Let’s build something meaningful.
            </h2>

            <p className="text-base sm:text-xl text-[#D4C9BC] max-w-xl leading-relaxed">
              Tell us what you’re building. We’ll help you turn it into a
              distinctive digital product.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors shadow-sm"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={BRAND.callingOnlyPhoneTel}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#282325] border border-[#3E383A] text-white font-semibold text-sm hover:bg-[#342D30] hover:border-accent transition-colors"
                title="Call DataCraft — +91 80062 05606"
              >
                <PhoneCall className="w-4 h-4 text-accent" />
                <span>Call DataCraft — +91 80062 05606</span>
              </a>
              <a
                href={BRAND.callWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-300 font-semibold text-sm hover:bg-emerald-900/80 transition-colors"
                title="Call / WhatsApp — +91 88658 04386"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Call / WhatsApp — +91 88658 04386</span>
              </a>
            </div>

            <p className="text-xs text-[#A59C92] pt-2">
              Calling only: +91 80062 05606 · WhatsApp & Voice: +91 88658 04386 · Direct response within 24 business hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
