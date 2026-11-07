"use client";

import React from "react";
import Image from "next/image";
import { Lock, Globe, ExternalLink, ArrowUpRight, Sparkles, ShoppingBag } from "lucide-react";

export default function HeroShowcase() {
  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto select-none pt-2 lg:pt-0">
      {/* Ambient background depth glow (optimized with subtle opacity & GPU isolation) */}
      <div
        className="absolute -inset-6 bg-gradient-to-tr from-[#C6532E]/10 via-[#F6EEE2] to-transparent rounded-full blur-2xl -z-10 pointer-events-none transform-gpu"
        aria-hidden="true"
      />

      {/* ========================================================
          PROJECT 01: MAVERICK PHYSICIST (Primary Desktop Preview)
          ======================================================== */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#FFFDF6] border border-[rgba(35,31,32,0.14)] p-2.5 sm:p-3 shadow-card transform lg:-rotate-1 hover:rotate-0 transition-transform duration-500 ease-out will-change-transform z-10">
        {/* Browser Chrome Header */}
        <div className="px-3 py-2 border-b border-[rgba(35,31,32,0.08)] bg-[#F8F2E8]/80 flex items-center justify-between gap-3 rounded-t-xl sm:rounded-t-2xl">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6532E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A96A]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4C9BC]" />
          </div>

          {/* Central URL & Domain Badge */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFDF6] border border-[rgba(35,31,32,0.08)] text-[11px] font-mono text-text-secondary truncate max-w-[220px] sm:max-w-xs shadow-subtle">
            <Lock className="w-2.5 h-2.5 text-accent flex-shrink-0" />
            <span className="truncate">maverick-physicist.vercel.app</span>
          </div>

          {/* External Link Pill */}
          <a
            href="https://maverick-physicist.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-mono font-medium text-text-secondary hover:text-accent transition-colors"
            title="Open Maverick Physicist in new tab"
          >
            <span className="hidden sm:inline">Live</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Browser Viewport: Maverick Physicist Screenshot */}
        <div className="relative aspect-[1440/900] w-full rounded-b-xl sm:rounded-b-2xl overflow-hidden bg-[#181516]">
          <Image
            src="/images/maverick_physicist.webp"
            alt="Maverick Physicist live website interface developed by DataCraft"
            fill
            priority
            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 50vw, 620px"
            className="object-cover object-top"
          />

          {/* Floating Category & Identity Badges (Maverick Physicist) */}
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

      {/* ========================================================
          PROJECT 02: AURIFIED (Overlapping Mobile Storefront)
          ======================================================== */}
      <div className="relative sm:absolute sm:-bottom-8 sm:-right-4 md:-bottom-10 md:-right-6 w-full max-w-[260px] sm:w-56 md:w-60 z-20 mt-4 sm:mt-0 ml-auto sm:ml-0">
        <div className="rounded-[2.2rem] bg-[#1C191A] p-2 border-4 border-[#3D3739] shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out will-change-transform">
          {/* Dynamic Island Speaker Notch */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#1C191A] rounded-full z-30 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#352F30] mr-1.5" />
            <div className="w-4 h-1 rounded-full bg-[#352F30]" />
          </div>

          {/* Phone Screen Frame */}
          <div className="relative aspect-[430/932] w-full rounded-[1.8rem] overflow-hidden bg-[#FFFDF6]">
            <Image
              src="/images/aurified_storefront.webp"
              alt="Aurified Shopify Store live mobile storefront"
              fill
              priority
              sizes="(max-width: 640px) 260px, 240px"
              className="object-cover object-top"
            />

            {/* In-Frame Floating Domain Pill: aurified.in */}
            <div className="absolute top-7 left-2.5 right-2.5 flex items-center justify-between px-2.5 py-1 rounded-full bg-[#FFFDF6]/95 border border-[rgba(35,31,32,0.1)] shadow-sm">
              <span className="text-[9px] font-mono font-bold text-foreground truncate">
                aurified.in
              </span>
              <a
                href="https://aurified.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent"
                title="Visit Aurified live storefront"
              >
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Floating Identity & Category Badges (Aurified — Shopify Store) */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-1.5 justify-end sm:justify-start">
          <span className="bg-[#FFFDF6] text-foreground text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full border border-[rgba(35,31,32,0.12)] shadow-subtle flex items-center gap-1">
            <ShoppingBag className="w-2.5 h-2.5 text-accent" />
            <span>Aurified — Shopify Store</span>
          </span>
          <span className="bg-[#FCEAE3] text-accent text-[9px] font-semibold font-mono px-2 py-0.5 rounded-full border border-[rgba(198,83,46,0.2)] shadow-subtle">
            E-commerce Development
          </span>
        </div>
      </div>
    </div>
  );
}

