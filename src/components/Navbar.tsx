"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/data/studio";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let prevScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== prevScrolled) {
        prevScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#F6EEE2]/90 backdrop-blur-md border-b border-[rgba(35,31,32,0.08)] shadow-sm"
            : "py-5 md:py-6 bg-transparent"
        }`}
      >
        <div className="editorial-container flex items-center justify-between">
          {/* Brand Logo: DataCrafts */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-foreground focus-visible:outline-none"
            aria-label={`${BRAND.name} Homepage`}
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo variant="badge" size="md" priority />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-foreground">
                {BRAND.name}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-text-secondary mt-0.5 font-medium">
                Starting ₹3,000
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 bg-[#FFFDF6]/95 border border-[rgba(35,31,32,0.1)] px-4 py-1.5 rounded-full shadow-subtle backdrop-blur-sm"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-foreground/80 hover:text-foreground hover:bg-[rgba(35,31,32,0.05)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA & Quick Contact */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={BRAND.callingOnlyPhoneTel}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[rgba(35,31,32,0.12)] bg-[#FFFDF6] text-xs font-semibold text-foreground hover:border-accent hover:text-accent transition-colors shadow-subtle"
              title={BRAND.callingOnlyActionLabel}
            >
              <Phone className="w-3 h-3 text-accent" />
              <span>Call: {BRAND.callingOnlyPhone}</span>
            </a>
            <a
              href={BRAND.callWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[rgba(35,31,32,0.12)] bg-[#FFFDF6] text-xs font-semibold text-foreground hover:border-emerald-600 hover:text-emerald-700 transition-colors shadow-subtle"
              title="Call / WhatsApp — +91 88658 04386"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600" />
              <span>Call / WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-semibold hover:bg-accent transition-colors duration-200 shadow-sm focus-visible:outline-none"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full border border-[rgba(35,31,32,0.12)] bg-[#FFFDF6] text-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 bg-[#FFFDF6] border-l border-[rgba(35,31,32,0.12)] p-6 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile Menu"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(35,31,32,0.1)]">
            <div className="flex items-center gap-2.5">
              <Logo variant="badge" size="sm" />
              <span className="font-bold text-base">{BRAND.name}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full border border-[rgba(35,31,32,0.1)] text-text-secondary hover:text-foreground"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-[rgba(35,31,32,0.05)]"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>

          {/* Unified Official Consultation Actions */}
          <div className="mt-8 p-4 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.08)] space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block">
              Direct Contact Lines
            </span>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              {/* Action 1: Call DataCraft — +91 80062 05606 (Calling only) */}
              <a
                href={BRAND.callingOnlyPhoneTel}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[rgba(35,31,32,0.08)] text-foreground font-medium hover:border-accent"
              >
                <div className="flex flex-col text-left">
                  <span className="font-bold">Call DataCraft</span>
                  <span className="text-[11px] font-mono text-text-secondary">{BRAND.callingOnlyPhone}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-accent px-2 py-0.5 rounded-md bg-[#FCEAE3]">
                  <span>Call Only</span>
                  <Phone className="w-3 h-3" />
                </div>
              </a>

              {/* Action 2: Call / WhatsApp — +91 88658 04386 (Calling + WhatsApp) */}
              <div className="p-2.5 rounded-xl bg-white border border-[rgba(35,31,32,0.08)] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="font-bold">Call / WhatsApp</span>
                    <span className="text-[11px] font-mono text-emerald-800">{BRAND.callWhatsappPhone}</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-emerald-800 px-2 py-0.5 rounded-md bg-emerald-50">
                    Voice + Chat
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[rgba(35,31,32,0.06)]">
                  <a
                    href={BRAND.callWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 text-[11px] font-semibold hover:bg-emerald-100"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-700" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={BRAND.callWhatsappPhoneTel}
                    className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] text-foreground text-[11px] font-semibold hover:border-accent"
                  >
                    <Phone className="w-3 h-3 text-accent" />
                    <span>Voice Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-[rgba(35,31,32,0.1)]">
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}
