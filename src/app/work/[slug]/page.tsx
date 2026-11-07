import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  Code2,
  Check,
  Tablet,
  Smartphone,
} from "lucide-react";
import { MAIN_PROJECTS, EXPERIMENTAL_PROJECTS, Project } from "@/data/projects";
import { DesktopMockup, MobileMockup } from "@/components/DeviceMockup";
import ImageLightbox from "@/components/ImageLightbox";

const ALL_STUDY_PROJECTS = [...MAIN_PROJECTS, ...EXPERIMENTAL_PROJECTS];

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return ALL_STUDY_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = ALL_STUDY_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found | DataCraft" };

  return {
    title: `${project.name} Case Study | DataCraft`,
    description: project.description,
    openGraph: {
      title: `${project.name} — ${project.category} | DataCraft`,
      description: project.description,
      images: [project.screenshots.desktop],
    },
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const currentIndex = MAIN_PROJECTS.findIndex((p) => p.slug === params.slug);
  const isExperimental = currentIndex === -1;

  const project = isExperimental
    ? EXPERIMENTAL_PROJECTS.find((p) => p.slug === params.slug)
    : MAIN_PROJECTS[currentIndex];

  if (!project) {
    notFound();
  }

  const prevProject =
    !isExperimental &&
    MAIN_PROJECTS[(currentIndex - 1 + MAIN_PROJECTS.length) % MAIN_PROJECTS.length];
  const nextProject =
    !isExperimental &&
    MAIN_PROJECTS[(currentIndex + 1) % MAIN_PROJECTS.length];

  const isCrm = project.slug === "finance-crm";

  return (
    <div className="editorial-container space-y-16 md:space-y-24 pb-24">
      {/* Top Breadcrumb & Return */}
      <div className="pt-4 flex items-center justify-between border-b border-[rgba(35,31,32,0.08)] pb-4">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Work</span>
        </Link>
        <span className="text-xs font-mono text-text-secondary">
          DataCraft Case Study
        </span>
      </div>

      {/* ========================================================
          1 & 2. PROJECT INTRODUCTION, CLIENT, INDUSTRY & LOCATION
          ======================================================== */}
      <header className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="badge-pill">{project.category}</span>

          {/* Prominent Location Badge per requirement */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              project.locationVerified
                ? "bg-[#FFFDF6] text-foreground border-accent shadow-sm"
                : "bg-[#FCFAF8] text-text-secondary border-[rgba(35,31,32,0.12)]"
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
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
              project.statusType === "completed"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                : project.statusType === "in_progress"
                ? "bg-blue-50 text-blue-900 border-blue-200"
                : project.statusType === "paused"
                ? "bg-amber-50 text-amber-900 border-amber-200"
                : "bg-rose-50 text-rose-900 border-rose-200"
            }`}
          >
            {project.statusType === "paused" && (
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            )}
            <span>{project.statusBadge}</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
          {project.name}
        </h1>

        <p className="text-xl md:text-2xl font-medium text-accent leading-snug">
          {project.tagline}
        </p>

        <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[rgba(35,31,32,0.1)] text-xs">
          <div>
            <span className="block font-mono uppercase tracking-wider text-text-secondary">
              Client
            </span>
            <span className="font-semibold text-foreground text-sm mt-1 block">
              {project.client}
            </span>
          </div>
          <div>
            <span className="block font-mono uppercase tracking-wider text-text-secondary">
              Industry
            </span>
            <span className="font-semibold text-foreground text-sm mt-1 block">
              {project.industry}
            </span>
          </div>
          <div>
            <span className="block font-mono uppercase tracking-wider text-text-secondary">
              Location
            </span>
            <span className="font-semibold text-foreground text-sm mt-1 block">
              {project.location}
            </span>
          </div>
          <div>
            <span className="block font-mono uppercase tracking-wider text-text-secondary">
              Live Link
            </span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline text-sm mt-1"
              >
                <span>{project.ctaLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-text-secondary font-mono mt-1 block">
                Not deployed publicly
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Honest Framing Notice for CRM */}
      {isCrm && (
        <div className="rounded-2xl bg-amber-50/90 border border-amber-300 p-6 flex flex-col sm:flex-row items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-amber-950">
              Platform Engineering Prototype (Status: Paused)
            </h3>
            <p className="text-xs md:text-sm text-amber-900/90 leading-relaxed">
              This custom software system was engineered and prototyped for
              Sparsh Agrawal / Shubh Pvt Ltd to automate device lending, KYC
              verifications, and recovery routes. The project is currently paused
              and is documented here as an engineering prototype demonstrating our
              technical software depth, decimal financial ledgers, and role-based
              access controls.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          9. ACTUAL WEBSITE / DASHBOARD SCREENSHOT (ORIGINAL MAPPING)
          ======================================================== */}
      <section className="space-y-4">
        <ImageLightbox
          src={project.screenshots.desktop}
          alt={`${project.name} Interface Screenshot`}
          caption={project.screenshots.caption}
        >
          <DesktopMockup
            src={project.screenshots.desktop}
            alt={`${project.name} Interface Screenshot`}
            urlDisplay={
              project.liveUrl
                ? project.liveUrl.replace("https://", "").replace(/\/$/, "")
                : "datacraft-archive"
            }
            theme={isCrm ? "dark" : "light"}
            priority
          />
        </ImageLightbox>
        <p className="text-xs text-text-secondary font-mono text-center">
          {project.screenshots.caption} · (Click screenshot to enlarge)
        </p>
      </section>

      {/* ========================================================
          1. PROJECT OVERVIEW
          ======================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6 border-t border-[rgba(35,31,32,0.1)]">
        <div className="lg:col-span-4 space-y-2">
          <span className="badge-pill">Overview</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            The Context
          </h2>
        </div>
        <div className="lg:col-span-8 space-y-4 text-base md:text-lg text-text-secondary leading-relaxed">
          <p>{project.overview}</p>
        </div>
      </section>

      {/* ========================================================
          4 & 5. BUSINESS REQUIREMENTS & CHALLENGES
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Business Requirements */}
        <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-7 md:p-9 shadow-card space-y-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Business Requirements
            </h3>
          </div>
          <ul className="space-y-3.5 text-sm text-foreground/85">
            {project.businessRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges Faced */}
        <div className="rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-7 md:p-9 shadow-card space-y-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#231F20]" />
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Challenges & Solutions
            </h3>
          </div>
          <ul className="space-y-3.5 text-sm text-foreground/85">
            {project.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========================================================
          6. OUR APPROACH & DESIGN DECISIONS
          ======================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6 border-t border-[rgba(35,31,32,0.1)]">
        <div className="lg:col-span-4 space-y-2">
          <span className="badge-pill">Execution Strategy</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Our Approach & Design Decisions
          </h2>
        </div>
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Strategic Approach</h3>
            <ul className="space-y-3 text-sm md:text-base text-text-secondary leading-relaxed">
              {project.ourApproach.map((appr, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-accent mt-1">
                    0{i + 1}.
                  </span>
                  <span>{appr}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-[rgba(35,31,32,0.06)]">
            <h3 className="font-bold text-lg text-foreground">
              User Experience & Architecture Decisions
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-text-secondary leading-relaxed">
              {project.designDecisions.map((dd, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span>{dd}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Optional Mobile Viewport Preview if available */}
      {project.screenshots.mobile && (
        <section className="space-y-6 pt-6 border-t border-[rgba(35,31,32,0.1)]">
          <div className="space-y-2">
            <span className="badge-pill">Handheld Ergonomics</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Responsive Mobile Viewport
            </h2>
            <p className="text-sm text-text-secondary max-w-xl">
              Captured directly from the live deployment to verify touch navigation,
              header compression, and readability.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] flex justify-center">
            <div className="w-56 sm:w-64">
              <MobileMockup
                src={project.screenshots.mobile}
                alt={`${project.name} Mobile Viewport`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          7. FEATURES DELIVERED
          ======================================================== */}
      <section className="space-y-8 pt-6 border-t border-[rgba(35,31,32,0.1)]">
        <div className="space-y-2">
          <span className="badge-pill">Deliverables</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Features & Capabilities Delivered
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {project.featuresDelivered.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)] shadow-subtle space-y-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <h3 className="font-bold text-base text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pl-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          8. TECHNOLOGY STACK
          ======================================================== */}
      <section className="space-y-8 pt-6 border-t border-[rgba(35,31,32,0.1)]">
        <div className="space-y-2">
          <span className="badge-pill">Technical Stack</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Technologies & Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.techStack.map((stack, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)] shadow-subtle space-y-3"
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {stack.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          10. LIVE PROJECT CTA
          ======================================================== */}
      {project.liveUrl && (
        <section
          className={`rounded-3xl p-8 sm:p-12 md:p-14 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 ${
            isCrm
              ? "bg-[#181516] text-[#FFFDF6] border border-[#383234]"
              : "bg-[#231F20] text-[#FFFDF6]"
          }`}
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-accent">
              Live Preview
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Experience {project.name}
            </h3>
            <p className="text-sm text-[#D4C9BC] max-w-lg">
              Explore the deployed interface, interactions, and performance
              firsthand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors shadow-sm"
            >
              <span>{project.ctaLabel}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#352F30] border border-[#4A4244] text-white font-semibold text-sm hover:bg-[#3D3638] transition-colors"
            >
              <span>Discuss Similar Project</span>
            </Link>
          </div>
        </section>
      )}

      {/* Case Study Pagination */}
      {!isExperimental && prevProject && nextProject && (
        <nav
          className="pt-10 border-t border-[rgba(35,31,32,0.1)] flex items-center justify-between gap-4"
          aria-label="Case Study Pagination"
        >
          <Link
            href={`/work/${prevProject.slug}`}
            className="group flex flex-col items-start gap-1 p-3 rounded-2xl hover:bg-[#FFFDF6] transition-colors"
          >
            <span className="text-xs font-mono text-text-secondary flex items-center gap-1 group-hover:text-accent">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </span>
            <span className="font-bold text-sm sm:text-base text-foreground group-hover:text-accent">
              {prevProject.name}
            </span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1 p-3 rounded-2xl hover:bg-[#FFFDF6] transition-colors text-right"
          >
            <span className="text-xs font-mono text-text-secondary flex items-center gap-1 group-hover:text-accent">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-sm sm:text-base text-foreground group-hover:text-accent">
              {nextProject.name}
            </span>
          </Link>
        </nav>
      )}
    </div>
  );
}
