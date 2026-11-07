import React from "react";
import { BRAND } from "@/data/studio";

export default function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Desktop Horizontal Timeline Track */}
      <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-0.5 bg-[rgba(35,31,32,0.12)] z-0" />

      {/* Grid: 4 items (horizontal on desktop, vertical on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
        {BRAND.process.map((p, idx) => (
          <div
            key={p.step}
            className="group rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.1)] p-7 shadow-subtle hover:border-[rgba(35,31,32,0.22)] hover:shadow-card transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Step Marker */}
              <div className="flex items-center justify-between pb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#F6EEE2] border border-[rgba(35,31,32,0.12)] flex items-center justify-center font-mono font-bold text-base text-foreground group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                  {p.step}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary bg-[#FCFAF8] px-2.5 py-1 rounded-full border border-[rgba(35,31,32,0.06)]">
                  {p.phase}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mt-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm font-semibold text-accent leading-snug">
                  {p.description}
                </p>
              </div>

              <p className="mt-3 text-xs text-text-secondary leading-relaxed">
                {p.details}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(35,31,32,0.06)] text-[11px] font-mono text-text-secondary">
              Milestone {idx + 1} of 4
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

