import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div
      id={service.id}
      className="group relative rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.12)] p-7 md:p-9 shadow-card hover:border-[rgba(35,31,32,0.25)] hover:shadow-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[rgba(35,31,32,0.08)]">
          <span className="font-mono text-xs font-semibold text-accent tracking-wider">
            {service.number}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary bg-[#F6EEE2] px-2.5 py-1 rounded-full">
            Practice
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="mt-6 space-y-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            {service.title}
          </h3>
          <p className="text-sm font-medium text-accent leading-snug">
            {service.tagline}
          </p>
        </div>

        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Deliverables Checklist */}
        <div className="mt-6 pt-6 border-t border-[rgba(35,31,32,0.06)] space-y-2.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-text-secondary">
            Deliverables
          </h4>
          <ul className="space-y-2">
            {service.deliverables.slice(0, 4).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs text-foreground/85"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-8 pt-6 border-t border-[rgba(35,31,32,0.08)] flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5 max-w-[65%]">
          {service.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6EEE2] text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/contact?service=${service.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-accent group-hover:translate-x-0.5 transition-all"
        >
          <span>{service.ctaText}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

