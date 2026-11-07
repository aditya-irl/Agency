import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  MessageCircle,
  Mail,
  Phone,
  Code2,
  Users2,
  Zap,
  Palette,
  ShieldCheck,
  Check,
  Sparkles,
} from "lucide-react";
import { BRAND } from "@/data/studio";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "About DataCraft | Two Founders. One Shared Vision.",
  description:
    "Meet Aditya Kumar and Shreya, the co-founders of DataCraft. A founder-led digital studio building websites, e-commerce stores and custom software.",
};

export default function AboutPage() {
  const [aditya, shreya] = BRAND.founders;

  return (
    <div className="editorial-container space-y-20 md:space-y-28 pb-24">
      {/* Header */}
      <div className="space-y-6 max-w-4xl pt-6 md:pt-10">
        <div className="flex items-center gap-4">
          <Logo variant="badge" size="lg" priority />
          <div>
            <span className="badge-pill">Studio Profile</span>
            <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mt-1">
              DataCrafts Software Solutions
            </div>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
          Two founders. One shared vision.
        </h1>
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
          DataCraft is a founder-led digital studio founded by Aditya Kumar and
          Shreya. We partner directly with businesses to transform ambitious
          ideas into websites, e-commerce experiences and custom software that
          help businesses move forward.
        </p>
      </div>

      {/* Two Founder Profile Cards */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="badge-pill">Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Meet the Founders
          </h2>
          <p className="text-sm text-text-secondary">
            When you collaborate with DataCraft, you work directly with both co-founders without intermediary layers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Founder 1: Aditya Kumar */}
          <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-8 sm:p-10 shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(35,31,32,0.08)]">
                <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center font-extrabold text-xl">
                  A
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent bg-[#FCEAE3] px-3 py-1 rounded-full font-semibold">
                  Co-Founder
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {aditya.name}
                </h3>
                <p className="text-sm font-semibold text-accent font-mono">
                  {aditya.role}
                </p>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {aditya.bio}
              </p>

              <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.06)] space-y-1.5 text-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary font-semibold">
                  Core Expertise & Focus
                </span>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {aditya.focus}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(35,31,32,0.08)]">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#FCFAF8] border border-[rgba(35,31,32,0.12)] text-foreground text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                <span>Book a Consultation with DataCraft</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </div>

          {/* Founder 2: Shreya */}
          <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-8 sm:p-10 shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(35,31,32,0.08)]">
                <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center font-extrabold text-xl">
                  S
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent bg-[#FCEAE3] px-3 py-1 rounded-full font-semibold">
                  Co-Founder
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {shreya.name}
                </h3>
                <p className="text-sm font-semibold text-accent font-mono">
                  {shreya.role}
                </p>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {shreya.bio}
              </p>

              <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.06)] space-y-1.5 text-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary font-semibold">
                  Core Expertise & Focus
                </span>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {shreya.focus}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(35,31,32,0.08)]">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#FCFAF8] border border-[rgba(35,31,32,0.12)] text-foreground text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                <span>Book a Consultation with DataCraft</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </div>
        </div>

        {/* Studio Direct Contact Lines */}
        <div className="rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(35,31,32,0.08)] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                Official Direct Desk
              </span>
              <p className="text-sm text-text-secondary mt-0.5">
                Two dedicated direct communication channels for project scoping and consultations.
              </p>
            </div>
            <a
              href={`mailto:${BRAND.primaryEmail}`}
              className="text-xs font-mono text-text-secondary hover:text-accent transition-colors"
            >
              Email: <span className="font-bold text-foreground">{BRAND.primaryEmail}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Action 1: Call DataCraft — +91 80062 05606 (Calling only) */}
            <a
              href={BRAND.callingOnlyPhoneTel}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[rgba(35,31,32,0.1)] hover:border-accent hover:bg-accent/5 transition-all text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F6EEE2] text-accent flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-foreground text-sm">Call DataCraft</span>
                  <span className="font-mono text-text-secondary">{BRAND.callingOnlyPhone}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FCEAE3] text-accent font-semibold">
                Calling only
              </span>
            </a>

            {/* Action 2: Call / WhatsApp — +91 88658 04386 (Calling + WhatsApp) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[rgba(35,31,32,0.1)] hover:border-emerald-500 hover:bg-emerald-50/20 transition-all text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-foreground text-sm">Call / WhatsApp</span>
                  <span className="font-mono text-emerald-800">{BRAND.callWhatsappPhone}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={BRAND.callWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-semibold hover:bg-emerald-100"
                >
                  WhatsApp
                </a>
                <a
                  href={BRAND.callWhatsappPhoneTel}
                  className="px-2.5 py-1 rounded-md bg-[#FCFAF8] border border-[rgba(35,31,32,0.12)] text-foreground text-[11px] font-semibold hover:border-accent"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Philosophy */}
      <section className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-8 sm:p-12 md:p-16 shadow-card space-y-10">
        <div className="space-y-3 max-w-2xl">
          <span className="badge-pill">Studio Philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How we solve digital problems.
          </h2>
          <p className="text-text-secondary text-base">
            We avoid unnecessary layers and bloated processes. We focus directly
            on what creates business value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F6EEE2] flex items-center justify-center text-accent">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              Engineering Craft
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We write modular, strictly typed code with modern standards
              (Next.js, TypeScript, Tailwind) that loads fast and scales with
              your business.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F6EEE2] flex items-center justify-center text-accent">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              Warm Editorial Design
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Inspired by contemporary editorial design, our interfaces pair
              warm cream surfaces and crisp typography to create an enduring
              brand presence.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F6EEE2] flex items-center justify-center text-accent">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              Commercial Pragmatism
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Design and code exist to drive real business outcomes—whether that’s
              higher conversion on a Shopify store or automated recovery tracking in a CRM.
            </p>
          </div>
        </div>
      </section>

      {/* Final Action */}
      <div className="rounded-3xl bg-[#181516] text-[#FFFDF6] border border-[#383234] p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Work directly with Aditya and Shreya.
        </h3>
        <p className="text-[#D4C9BC] text-sm max-w-md mx-auto">
          Start a project conversation today to explore how DataCraft can turn
          your requirements into reality.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
