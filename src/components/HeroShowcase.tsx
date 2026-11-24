"use client";

import React from "react";
import Image from "next/image";


export default function HeroShowcase() {
  return (
    <div className="relative w-full max-w-2xl mx-auto select-none pt-2 lg:pt-0">
      {/* Ambient background depth glow */}
      <div
        className="absolute -inset-6 bg-gradient-to-tr from-[#C6532E]/15 via-purple-900/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none transform-gpu"
        aria-hidden="true"
      />

      {/* ========================================================
          PROJECT SHOWCASE: MAVERICK PHYSICIST (Desktop Interface)
          ======================================================== */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.14)] p-2.5 sm:p-3 shadow-card hover:shadow-hover transition-all duration-300">
        {/* Browser Chrome Header */}
        <div className="px-3.5 py-2.5 border-b border-[rgba(35,31,32,0.08)] bg-[#F8F2E8]/80 flex items-center gap-1.5 rounded-t-xl sm:rounded-t-2xl">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6532E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A96A]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4C9BC]" />
          </div>
        </div>

        {/* Browser Viewport: Maverick Physicist Screenshot */}
        <div className="relative aspect-[2560/1412] w-full rounded-b-xl sm:rounded-b-2xl overflow-hidden bg-[#181516]">
          <Image
            src="/images/maverick_physicist.webp"
            alt="Maverick Physicist live website interface developed by DataCrafts"
            fill
            priority
            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 50vw, 680px"
            className="object-cover object-top"
          />

          {/* Floating Category & Identity Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
            <span className="bg-[#FFFDF6] text-foreground text-[10px] sm:text-[11px] font-bold font-mono px-2.5 py-1 rounded-full border border-[rgba(35,31,32,0.12)] shadow-sm">
              Maverick Physicist
            </span>
            <span className="bg-[#FCEAE3] text-accent text-[10px] sm:text-[11px] font-semibold font-mono px-2.5 py-1 rounded-full border border-[rgba(198,83,46,0.2)] shadow-sm">
              Website Development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
