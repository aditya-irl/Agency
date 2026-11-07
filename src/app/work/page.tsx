"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  MapPin,
  ShieldAlert,
  AlertCircle,
  FlaskConical,
} from "lucide-react";
import { MAIN_PROJECTS, EXPERIMENTAL_PROJECTS } from "@/data/projects";
import { DesktopMockup, MobileMockup } from "@/components/DeviceMockup";

export default function WorkPage() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Active Projects" },
    { id: "brand", label: "Brand Websites" },
    { id: "ecommerce", label: "Shopify / E-commerce" },
    { id: "software", label: "Custom Software & Web Apps" },
  ];

  const filteredProjects = MAIN_PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "brand") return p.category.includes("Brand");
    if (filter === "ecommerce")
      return p.category.includes("Shopify") || p.category.includes("E-commerce");
    if (filter === "software") return p.category.includes("Custom Software");
    return true;
  });

  return (
    <div className="editorial-container space-y-20 md:space-y-28 pb-24">
      {/* Header */}
      <div className="space-y-4 max-w-3xl pt-6 md:pt-10">
        <span className="badge-pill">Portfolio Index</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Selected work. Real digital experiences.
        </h1>
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          A transparent review of client websites, e-commerce storefronts, and
          custom software systems designed and developed by DataCraft.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(35,31,32,0.1)] pb-6">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
              filter === c.id
                ? "bg-foreground text-background shadow-sm"
                : "bg-[#FFFDF6] text-foreground/75 border border-[rgba(35,31,32,0.1)] hover:bg-[#F6EEE2]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Completed / Active Client Projects */}
      <div className="space-y-16">
        {filteredProjects.map((project, idx) => {
          const isReversed = idx % 2 === 1;
          const isCrm = project.slug === "finance-crm";

          if (isCrm) {
            return (
              <article
                key={project.slug}
                className="rounded-3xl bg-[#181516] text-[#FFFDF6] border border-[#383234] p-6 sm:p-8 md:p-12 shadow-2xl transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#2A2325] text-[#C6532E] border border-[#48393C]">
                          {project.category}
                        </span>

                        {/* Location Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#242122] text-[#A59C92] border border-[#423C3E]">
                          <MapPin className="w-3.5 h-3.5 text-[#C6532E]" />
                          <span>
                            {project.locationVerified
                              ? project.location
                              : "📍 Location to be verified"}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-200 border border-amber-800/80">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                          <span>{project.statusBadge}</span>
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                          {project.name}
                        </h2>
                        <p className="text-xs font-mono text-[#A59C92]">
                          Client: {project.client} · {project.industry}
                        </p>
                      </div>

                      <p className="text-sm md:text-base text-[#D4C9BC] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#C6532E] font-semibold">
                        Engineered Capabilities
                      </h3>
                      <ul className="space-y-2 text-xs md:text-sm text-[#D4C9BC]">
                        {project.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C6532E] mt-1.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6532E] text-white font-semibold text-sm hover:bg-[#A84121] transition-colors"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-[#484042] text-[#D4C9BC] font-medium text-sm hover:bg-[#282325] hover:text-white transition-colors"
                        >
                          <span>Live Preview</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <DesktopMockup
                      src={project.screenshots.desktop}
                      alt={`${project.name} Executive Operations Command Dashboard`}
                      urlDisplay="crm-two-orcin-18.vercel.app/#dashboard"
                      theme="dark"
                    />
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={project.slug}
              className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-6 sm:p-8 md:p-12 shadow-card hover:border-[rgba(35,31,32,0.22)] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Content Side */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-pill">{project.category}</span>

                      {/* Location Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          project.locationVerified
                            ? "bg-[#FFFDF6] text-foreground border-[rgba(35,31,32,0.18)]"
                            : "bg-[#FCFAF8] text-text-secondary border-[rgba(35,31,32,0.1)]"
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>
                          {project.locationVerified
                            ? project.location
                            : "📍 Location to be verified"}
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          project.statusType === "in_progress"
                            ? "bg-blue-50 text-blue-900 border-blue-200"
                            : "bg-emerald-50 text-emerald-900 border-emerald-200"
                        }`}
                      >
                        {project.statusBadge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                        {project.name}
                      </h2>
                      <p className="text-xs font-mono text-text-secondary">
                        Client: {project.client} · {project.industry}
                      </p>
                    </div>

                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                      Features Delivered
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-foreground/85">
                      {project.features.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-[rgba(35,31,32,0.15)] text-foreground font-medium text-sm hover:bg-[rgba(35,31,32,0.05)] transition-colors"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual Side */}
                <div
                  className={`lg:col-span-7 relative ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <DesktopMockup
                    src={project.screenshots.desktop}
                    alt={`${project.name} Desktop Interface`}
                    urlDisplay={
                      project.liveUrl
                        ? project.liveUrl
                            .replace("https://", "")
                            .replace(/\/$/, "")
                        : "project-preview"
                    }
                  />

                  {project.screenshots.mobile && (
                    <div className="hidden sm:block absolute -bottom-6 -right-4 w-32 md:w-36 z-10 transition-transform duration-300 hover:-translate-y-2">
                      <MobileMockup
                        src={project.screenshots.mobile}
                        alt={`${project.name} Mobile View`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ========================================================
          EXPERIMENTAL / ARCHIVED WORK SECTION (PROJECT 04)
          Clearly separated & labelled as uncompleted per Notion
          ======================================================== */}
      <section className="rounded-3xl bg-[#FCFAF8] border border-dashed border-[rgba(35,31,32,0.2)] p-8 sm:p-12 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-semibold">
            <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
            <span>Research & Archival Prototypes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Unfinished & Exploratory Work
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Per our transparent documentation standards, we document projects
            that were scoped or prototyped but cancelled prior to full commercial
            rollout. These are not presented as completed client deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIMENTAL_PROJECTS.map((exp) => (
            <div
              key={exp.slug}
              className="p-6 rounded-2xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-accent">
                  {exp.category}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  {exp.statusBadge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground">{exp.name}</h3>
                <p className="text-xs font-mono text-text-secondary">
                  Client: {exp.client} · Location: {exp.location}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {exp.description}
              </p>

              <div className="pt-2 border-t border-[rgba(35,31,32,0.08)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary block mb-1">
                  Planned Capabilities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.features.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6EEE2] text-foreground/80"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.14)] p-8 md:p-12 text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Have a project you would like to discuss?
        </h3>
        <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
          Aditya and Shreya are currently accepting select client engagements.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent transition-colors"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
