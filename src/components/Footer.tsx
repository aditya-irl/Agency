import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Mail, Phone } from "lucide-react";
import { BRAND } from "@/data/studio";
import { SERVICES } from "@/data/services";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#1C191A] text-[#F6EEE2] pt-20 pb-12 border-t border-[#332C2E] mt-auto">
      <div className="editorial-container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(246,238,226,0.1)]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
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
              Navigation
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
                  Work / Portfolio
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
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A59C92]">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services#${srv.id}`}
                    className="text-[#D4C9BC] hover:text-white transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Details (No individual founder phone numbers) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A59C92]">
              Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={`tel:${BRAND.officialPhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-[#D4C9BC] hover:text-white transition-colors font-mono"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  <span>{BRAND.officialPhoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.primaryEmail}`}
                  className="inline-flex items-center gap-2 text-[#D4C9BC] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span>{BRAND.primaryEmail}</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={BRAND.officialWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#282325] border border-[#3E383A] text-[#FFFDF6] hover:border-accent hover:bg-[#342D30] transition-all"
                >
                  <span className="font-semibold text-xs sm:text-sm">
                    Book a Consultation
                  </span>
                  <MessageCircle className="w-4 h-4 text-accent" />
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                >
                  <span>Let’s Discuss Your Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A59C92]">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#C4B9AD]">
            Starting at ₹3,000 onwards · Crafted with editorial precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
