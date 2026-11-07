"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { BRAND } from "@/data/studio";
import ContactForm from "@/components/ContactForm";

function ContactPageInner() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  return (
    <div className="editorial-container space-y-16 md:space-y-24 pb-24">
      {/* Header */}
      <div className="space-y-4 max-w-3xl pt-6 md:pt-10">
        <span className="badge-pill">Initiate Collaboration</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
          Let’s build something meaningful.
        </h1>
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          Tell us about what you’re building, your timeline, and commercial goals.
          Aditya and Shreya will review your brief and respond directly within 24
          business hours.
        </p>
      </div>

      {/* Main Grid: Form + Official Studio Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm initialService={preselectedService} />
        </div>

        {/* Right Side: Official Studio Contact Desk & Information */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-7 md:p-8 shadow-card space-y-6">
            <div className="space-y-1">
              <span className="badge-pill">Direct Channels</span>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Official Studio Desk
              </h3>
              <p className="text-xs text-text-secondary">
                Connect directly with the DataCraft studio team for project scoping, inquiries, and fast-track consultation.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* WhatsApp Consultation */}
              <a
                href={BRAND.officialWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] hover:border-emerald-500/50 hover:bg-emerald-50/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground group-hover:text-emerald-950">
                      WhatsApp Consultation
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-emerald-700" />
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Fast-track project discussion & instant quote scoping
                  </p>
                  <span className="text-xs font-mono font-medium text-emerald-800 mt-1 inline-block">
                    {BRAND.officialPhoneDisplay}
                  </span>
                </div>
              </a>

              {/* Call DataCraft */}
              <a
                href={`tel:${BRAND.officialPhone.replace(/\s+/g, "")}`}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F6EEE2] text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground group-hover:text-accent">
                      Call DataCraft
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent" />
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Official DataCraft voice & consultation line
                  </p>
                  <span className="text-xs font-mono font-medium text-foreground mt-1 inline-block">
                    {BRAND.officialPhoneDisplay}
                  </span>
                </div>
              </a>

              {/* Primary Email Direct */}
              <a
                href={`mailto:${BRAND.primaryEmail}`}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F6EEE2] text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground group-hover:text-accent">
                      Official Email
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent" />
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    For project briefs and commercial RFPs
                  </p>
                  <span className="text-xs font-mono font-medium text-foreground mt-1 inline-block">
                    {BRAND.primaryEmail}
                  </span>
                </div>
              </a>
            </div>

            {/* Pricing Transparency Callout */}
            <div className="p-4 rounded-2xl bg-[#FCEAE3]/60 border border-[rgba(198,83,46,0.2)] space-y-1.5 text-xs">
              <span className="font-bold text-accent block">
                Digital Solutions Starting at ₹3,000
              </span>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                Whether you need a business website, an online store or a custom digital solution, let’s find the right approach for your business.
              </p>
              <p className="text-[10px] text-text-secondary italic pt-0.5 border-t border-[rgba(198,83,46,0.15)]">
                Final pricing depends on project requirements, functionality and scope.
              </p>
            </div>
          </div>

          {/* Response Commitment Card */}
          <div className="rounded-3xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] p-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <Clock className="w-4 h-4" />
              <span>Response Standard</span>
            </div>
            <h4 className="text-base font-bold text-foreground">
              What happens after you reach out?
            </h4>
            <ul className="space-y-3 text-xs text-text-secondary leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>24-Hour Review:</strong> Aditya and Shreya analyze
                  your brief, technical requirements, and timeline.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Discovery Working Session:</strong> A focused 30-minute
                  call to clarify scope and technical architecture.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Fixed Scope & Milestones:</strong> A clear commercial
                  proposal with predictable deliverables and weekly checkpoints.
                </span>
              </li>
            </ul>
          </div>

          {/* Privacy & NDA */}
          <div className="p-4 rounded-2xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.08)] flex items-center gap-3 text-xs text-text-secondary">
            <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
            <span>
              All project concepts and data shared with DataCraft remain strictly
              confidential.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="editorial-container py-24 text-center">
          Loading contact experience...
        </div>
      }
    >
      <ContactPageInner />
    </Suspense>
  );
}
