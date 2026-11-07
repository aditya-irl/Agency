import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, MapPin, ShieldAlert, Sparkles } from "lucide-react";
import { Project } from "@/data/projects";
import { DesktopMockup, MobileMockup } from "./DeviceMockup";

interface ProjectCardProps {
  project: Project;
  layoutVariant?: "split-left" | "split-right" | "tech-dark";
  priority?: boolean;
}

export default function ProjectCard({
  project,
  layoutVariant = "split-left",
  priority = false,
}: ProjectCardProps) {
  const isCrm = project.slug === "finance-crm";
  const isDark = layoutVariant === "tech-dark" || isCrm;

  // Dark Technical Section treatment for Finance CRM (Software & Dashboard)
  if (isDark) {
    return (
      <article className="group rounded-3xl bg-[#181516] text-[#FFFDF6] border border-[#383234] p-6 sm:p-8 md:p-12 shadow-2xl transition-all duration-300 hover:border-[#52494B]">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#332C2E]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#2A2325] text-[#C6532E] border border-[#48393C]">
                {project.category}
              </span>

              {/* Location Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                  project.locationVerified
                    ? "bg-[#242122] text-[#E0D5C9] border-[#423C3E]"
                    : "bg-[#242122] text-[#A59C92] border-[#423C3E]"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#C6532E]" />
                <span>
                  {project.locationVerified
                    ? project.location
                    : "📍 Location to be verified"}
                </span>
              </div>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-200 border border-amber-800/80">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.statusBadge}</span>
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white group-hover:text-[#C6532E] transition-colors">
                {project.name}
              </h3>
              <p className="text-xs font-mono text-[#A59C92]">
                Client: {project.client} · {project.industry}
              </p>
            </div>

            <p className="text-[#D4C9BC] text-sm md:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6532E] text-white font-semibold text-sm hover:bg-[#A84121] transition-colors shadow-sm"
            >
              <span>{project.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-[#484042] text-[#D4C9BC] font-medium text-sm hover:bg-[#282325] hover:text-white transition-colors"
                title="Open live preview"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="sr-only">Live preview</span>
              </a>
            )}
          </div>
        </div>

        {/* Technical Showcase Frame (Attachment 1: Exact CRM Dashboard) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 relative">
            <DesktopMockup
              src={project.screenshots.desktop}
              alt={`${project.name} Executive Operations Command Dashboard`}
              urlDisplay="crm-two-orcin-18.vercel.app/#dashboard"
              theme="dark"
              priority={priority}
            />
            {project.screenshots.mobile && (
              <div className="hidden sm:block absolute -bottom-6 -right-4 md:-right-6 w-32 md:w-36 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                <MobileMockup
                  src={project.screenshots.mobile}
                  alt={`${project.name} Mobile Operations`}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="p-6 rounded-2xl bg-[#231F20] border border-[#3D3739] space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C6532E] font-semibold">
                Engineered Capabilities
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D4C9BC]">
                {project.features.slice(0, 5).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6532E] mt-1.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#282325] border border-[#3D3739] text-[#E0D5C9]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Warm Editorial & Clean White Showcase (Asquare & Aurified)
  const isReversed = layoutVariant === "split-right";

  return (
    <article className="group rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-6 sm:p-8 md:p-12 shadow-card hover:border-[rgba(35,31,32,0.25)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Content Column */}
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

            {project.statusBadge && (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  project.statusType === "in_progress"
                    ? "bg-blue-50 text-blue-900 border-blue-200"
                    : "bg-emerald-50 text-emerald-900 border-emerald-200"
                }`}
              >
                {project.statusBadge}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            <p className="text-xs font-mono text-text-secondary">
              Client: {project.client} · {project.industry}
            </p>
          </div>

          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-mono uppercase tracking-wider text-text-secondary">
            Project Deliverables
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-foreground/85">
            {project.features.slice(0, 4).map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
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
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-accent transition-colors"
          >
            <span>{project.ctaLabel}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-[rgba(35,31,32,0.15)] text-foreground font-medium text-sm hover:bg-[rgba(35,31,32,0.05)] transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Visual Mockups Column */}
      <div
        className={`lg:col-span-7 relative ${
          isReversed ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="relative">
          <DesktopMockup
            src={project.screenshots.desktop}
            alt={`${project.name} Desktop Interface`}
            urlDisplay={
              project.liveUrl
                ? project.liveUrl.replace("https://", "").replace(/\/$/, "")
                : "project-preview"
            }
            priority={priority}
          />

          {/* Optional mobile preview for handheld ergonomics */}
          {project.screenshots.mobile && (
            <div className="hidden sm:block absolute -bottom-6 -right-4 md:-right-6 w-32 md:w-36 z-10 transition-transform duration-300 group-hover:-translate-y-2">
              <MobileMockup
                src={project.screenshots.mobile}
                alt={`${project.name} Mobile Experience`}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
