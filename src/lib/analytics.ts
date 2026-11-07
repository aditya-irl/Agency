"use client";

import { getCookiePreferences } from "./consent";

// Global Window extensions for Google tag (gtag) and Meta Pixel (fbq)
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "consent",
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
    fbq?: (
      command: "track" | "trackCustom" | "init",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

// In-memory deduplication set to prevent double counting within rapid succession
const recentEvents = new Map<string, number>();

function isDuplicate(key: string, cooldownMs = 4000): boolean {
  const now = Date.now();
  const lastFired = recentEvents.get(key);
  if (lastFired && now - lastFired < cooldownMs) {
    return true;
  }
  recentEvents.set(key, now);
  return false;
}

/**
 * Tracks consultation request submissions across Google Analytics, Google Ads, and Meta Pixel.
 * Only executes if appropriate consent was granted and tracking IDs are configured.
 */
export function trackConsultationSubmit(payload: {
  service: string;
  budget: string;
  referenceId: string;
}): void {
  const dedupKey = `consultation_submit:${payload.referenceId}`;
  if (isDuplicate(dedupKey)) return;

  const prefs = getCookiePreferences();

  // 1. Google Analytics 4 (requires analytics consent)
  if (prefs?.analytics && typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "Consultation",
      event_label: payload.service,
      value: 1,
      currency: "INR",
      transaction_id: payload.referenceId,
      service_required: payload.service,
      budget_range: payload.budget,
    });
  }

  // 2. Google Ads Conversion (requires marketing consent)
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (
    prefs?.marketing &&
    adsId &&
    adsLabel &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", "conversion", {
      send_to: `${adsId}/${adsLabel}`,
      transaction_id: payload.referenceId,
    });
  }

  // 3. Meta Pixel (requires marketing consent)
  if (prefs?.marketing && typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: payload.service,
      content_category: "Digital Agency Consultation",
      value: 1,
      currency: "INR",
    });
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[DATACRAFT_ANALYTICS] Consultation lead tracked:", payload);
  }
}

/**
 * Tracks clicks on direct WhatsApp contact buttons
 */
export function trackWhatsAppClick(source: string): void {
  const dedupKey = `whatsapp_click:${source}`;
  if (isDuplicate(dedupKey)) return;

  const prefs = getCookiePreferences();

  if (prefs?.analytics && typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact_whatsapp", {
      event_category: "Engagement",
      event_label: source,
    });
  }

  if (prefs?.marketing && typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "WhatsAppContact", {
      placement: source,
    });
  }
}

/**
 * Tracks clicks on direct telephone calling buttons
 */
export function trackPhoneClick(phoneNumber: string, source: string): void {
  const dedupKey = `phone_click:${phoneNumber}:${source}`;
  if (isDuplicate(dedupKey)) return;

  const prefs = getCookiePreferences();

  if (prefs?.analytics && typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact_phone", {
      event_category: "Engagement",
      event_label: `${phoneNumber} (${source})`,
    });
  }

  if (prefs?.marketing && typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "PhoneContact", {
      phone: phoneNumber,
      placement: source,
    });
  }
}

/**
 * Tracks clicks on primary studio email links
 */
export function trackEmailClick(source: string): void {
  const dedupKey = `email_click:${source}`;
  if (isDuplicate(dedupKey)) return;

  const prefs = getCookiePreferences();

  if (prefs?.analytics && typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact_email", {
      event_category: "Engagement",
      event_label: source,
    });
  }
}

/**
 * Tracks clicks on main call-to-action buttons
 */
export function trackCtaClick(label: string, destination: string): void {
  const dedupKey = `cta_click:${label}:${destination}`;
  if (isDuplicate(dedupKey, 1500)) return;

  const prefs = getCookiePreferences();

  if (prefs?.analytics && typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "cta_click", {
      event_category: "CTA",
      event_label: `${label} -> ${destination}`,
    });
  }
}

