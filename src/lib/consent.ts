"use client";

export interface CookiePreferences {
  essential: true; // Always active
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export const CONSENT_STORAGE_KEY = "datacraft_cookie_preferences_v1";
export const CONSENT_UPDATED_EVENT = "datacraft-consent-updated";
export const OPEN_SETTINGS_EVENT = "datacraft-open-cookie-settings";
export const CURRENT_CONSENT_VERSION = "2026.1";

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookiePreferences;
    if (parsed && parsed.version === CURRENT_CONSENT_VERSION && parsed.essential === true) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(options: {
  analytics: boolean;
  marketing: boolean;
}): CookiePreferences {
  const preferences: CookiePreferences = {
    essential: true,
    analytics: Boolean(options.analytics),
    marketing: Boolean(options.marketing),
    timestamp: new Date().toISOString(),
    version: CURRENT_CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
      window.dispatchEvent(
        new CustomEvent(CONSENT_UPDATED_EVENT, { detail: preferences })
      );
    } catch (e) {
      console.warn("[DATACRAFT_CONSENT] Failed to persist cookie preferences to localStorage", e);
    }
  }

  return preferences;
}

export function openCookieSettings(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
  }
}

