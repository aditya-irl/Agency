"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Cookie,
  Sliders,
  Check,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import {
  getCookiePreferences,
  saveCookiePreferences,
  CookiePreferences,
  OPEN_SETTINGS_EVENT,
} from "@/lib/consent";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getCookiePreferences();
    if (!existing) {
      setShowBanner(true);
    } else {
      setAnalyticsConsent(existing.analytics);
      setMarketingConsent(existing.marketing);
    }

    const handleOpenSettings = () => {
      const current = getCookiePreferences();
      if (current) {
        setAnalyticsConsent(current.analytics);
        setMarketingConsent(current.marketing);
      }
      setShowModal(true);
      setShowBanner(false);
    };

    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    saveCookiePreferences({ analytics: true, marketing: true });
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectNonEssential = () => {
    saveCookiePreferences({ analytics: false, marketing: false });
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    saveCookiePreferences({
      analytics: analyticsConsent,
      marketing: marketingConsent,
    });
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* 1. Bottom Responsive Banner */}
      {showBanner && !showModal && (
        <aside
          role="region"
          aria-label="Cookie Consent Banner"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-auto md:right-8 md:max-w-xl z-50 animate-fadeIn"
        >
          <div className="rounded-3xl bg-[#1C191A] text-[#FFFDF6] border border-[#3E383A] p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#2A2426] border border-[#483E40] text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-[#C6532E]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                  <span>Cookie & Privacy Preferences</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#D4C9BC] leading-relaxed">
                  DataCraft uses strictly essential cookies to maintain site security
                  and form functionality. With your consent, we also use optional analytics
                  and advertising measurement cookies to evaluate studio engagement and avoid
                  redundant ads.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#A59C92]">
                  <Link
                    href="/cookie-policy"
                    className="underline hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  <span>·</span>
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-4 py-2.5 rounded-full border border-[#484042] text-xs font-semibold text-[#D4C9BC] hover:bg-[#2A2426] hover:text-white transition-colors"
              >
                Customize Preferences
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2.5 rounded-full border border-[#484042] text-xs font-semibold text-[#D4C9BC] hover:bg-[#2A2426] hover:text-white transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-full bg-[#C6532E] text-white text-xs font-semibold hover:bg-[#A84121] transition-colors shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Detailed Preference Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
        >
          <div className="w-full max-w-2xl rounded-3xl bg-[#FFFDF6] text-[#231F20] border border-[rgba(35,31,32,0.16)] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-[rgba(35,31,32,0.1)] flex items-start justify-between gap-4 bg-[#FCFAF8]">
              <div className="space-y-1">
                <span className="badge-pill">Transparency & Control</span>
                <h2
                  id="cookie-settings-title"
                  className="text-2xl font-extrabold tracking-tight text-foreground"
                >
                  Manage Cookie Preferences
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We believe in total transparency. Choose which cookies you allow on DataCraft.
                  Essential cookies remain active to ensure secure website operations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-[rgba(35,31,32,0.06)] text-text-secondary hover:text-foreground transition-colors"
                aria-label="Close cookie preferences modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              {/* Category 1: Strictly Necessary */}
              <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-foreground">
                      Strictly Essential Cookies
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Required for site navigation, form CSRF protection, secure consultations,
                  and storing your privacy selections. These cannot be switched off.
                </p>
              </div>

              {/* Category 2: Analytics Cookies */}
              <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-bold text-foreground">
                      Performance & Analytics Cookies
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E0D5C9] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Allows us to count visits and traffic sources via Google Analytics 4
                  so we can measure and improve performance. All data is aggregated and anonymized.
                </p>
              </div>

              {/* Category 3: Advertising & Marketing */}
              <div className="p-5 rounded-2xl bg-[#FCFAF8] border border-[rgba(35,31,32,0.1)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-bold text-foreground">
                      Marketing & Advertising Cookies
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E0D5C9] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Used to evaluate conversion actions from Google Ads or Meta Ads campaigns.
                  These prevent showing redundant ads to people who have already reached out.
                </p>
              </div>

              <div className="text-xs text-text-secondary flex items-center justify-between pt-2">
                <Link
                  href="/cookie-policy"
                  className="underline hover:text-accent inline-flex items-center gap-1"
                >
                  <span>Read our detailed Cookie Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="/privacy-policy"
                  className="underline hover:text-accent inline-flex items-center gap-1"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 sm:p-6 border-t border-[rgba(35,31,32,0.1)] bg-[#FCFAF8] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[rgba(35,31,32,0.2)] text-xs font-semibold text-foreground hover:bg-[rgba(35,31,32,0.05)] transition-colors"
              >
                Reject Non-Essential
              </button>
              <div className="w-full sm:w-auto flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-accent transition-colors"
                >
                  Save Choices
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

