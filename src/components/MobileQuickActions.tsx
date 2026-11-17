"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PhoneCall, MessageCircle, Calendar } from "lucide-react";
import { BRAND } from "@/data/studio";

export default function MobileQuickActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show quick actions after scrolling past the hero (150px)
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Quick contact actions"
      className={`fixed bottom-4 left-3 right-3 z-40 md:hidden transition-all duration-300 pointer-events-auto ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-1.5 p-1.5 rounded-full bg-[#181516]/95 backdrop-blur-md border border-white/15 text-white shadow-2xl">
        {/* Direct Phone Call */}
        <a
          href={BRAND.officialPhoneTel}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-full text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
          title={`Call founders directly at ${BRAND.officialPhone}`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <span>Call</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={BRAND.officialWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-full text-xs font-semibold text-emerald-400 hover:bg-emerald-500/15 active:scale-95 transition-all"
          title="Instant WhatsApp consultation with founders"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Book Free Slot */}
        <Link
          href="/#book-consultation"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold bg-accent text-white shadow-sm hover:bg-accent-hover active:scale-95 transition-all"
        >
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Book Free</span>
        </Link>
      </div>
    </aside>
  );
}
