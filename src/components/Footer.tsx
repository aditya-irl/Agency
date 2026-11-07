import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Mail, Phone, ShieldCheck } from "lucide-react";
import { BRAND, LEGAL_LINKS } from "@/data/studio";
import Logo from "@/components/Logo";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export default function Footer() {
  return (
    <footer className="bg-[#1C191A] text-[#F6EEE2] pt-20 pb-12 border-t border-[#332C2E] mt-auto">
      <div className="editorial-container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[rgba(246,238,226,0.1)]">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <Logo variant="badge" size="lg" />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white leading-tight">
                  {BRAND.name}
                </span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#A59C92]">
                  Software Solutions
                </span>
              </div>
            </div>
            <p className="text-base text-accent font-medium">
              “{BRAND.tagline}”
            </p>
            <p className="text-sm text-[#D4C9BC] max-w-sm leading-relaxed">
              {BRAND.positioning}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#292426] border border-[#3E383A] text-xs text-[#E0D5C9]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{BRAND.startingPriceMessage}</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A59C92]">
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#D4C9BC] hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-[#D4C9BC] hover:text-white transition-colors"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[#D4C9BC] hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#D4C9BC] hover:text-white transition-colors"
                >
                  About DataCraft
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#D4C9BC] hover:text-white transition-colors"
                >
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A59C92] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Legal & Policies</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#D4C9BC] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <CookieSettingsButton showIcon className="text-xs text-[#D4C9BC] hover:text-white" />
              </li>
            </ul>
          </div>

          {/* Official Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A59C92]">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              {/* Action 1: Call DataCraft — +91 80062 05606 (Calling only) */}
              <div className="p-3 rounded-xl bg-[#282325] border border-[#3E383A] space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#A59C92]">
                  Calling Only
                </div>
                <a
                  href={BRAND.callingOnlyPhoneTel}
                  className="flex items-center gap-2 text-white hover:text-accent transition-colors font-mono font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>Call: {BRAND.callingOnlyPhone}</span>
                </a>
              </div>

              {/* Action 2: Call / WhatsApp — +91 88658 04386 (Calling + WhatsApp) */}
              <div className="p-3 rounded-xl bg-[#282325] border border-[#3E383A] space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  Calling + WhatsApp
                </div>
                <div className="font-mono font-semibold text-white text-xs sm:text-sm">
                  {BRAND.callWhatsappPhone}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-[#3E383A]">
                  <a
                    href={BRAND.callWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={BRAND.callWhatsappPhoneTel}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#342E30] text-white text-xs font-semibold hover:bg-accent transition-colors"
                  >
                    <Phone className="w-3 h-3 text-accent" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              {/* Email & Consultation */}
              <div className="pt-1 space-y-2">
                <a
                  href={`mailto:${BRAND.primaryEmail}`}
                  className="inline-flex items-center gap-2 text-[#D4C9BC] hover:text-white transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span>{BRAND.primaryEmail}</span>
                </a>
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                  >
                    <span>Let’s Discuss Your Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A59C92]">
          <p>© 2026 {BRAND.name} ({BRAND.fullName}). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[#C4B9AD]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <span>·</span>
            <CookieSettingsButton className="text-xs text-[#C4B9AD] hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
