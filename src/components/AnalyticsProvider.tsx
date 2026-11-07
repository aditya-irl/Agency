"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { getCookiePreferences, CONSENT_UPDATED_EVENT, CookiePreferences } from "@/lib/consent";

export default function AnalyticsProvider() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    // Read on client mount
    setPreferences(getCookiePreferences());

    const onConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<CookiePreferences>;
      setPreferences(customEvent.detail);
    };

    window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdate);
    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdate);
    };
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Strict validation: Only initialize if real ID format is present (never placeholder strings)
  const isValidGa = Boolean(gaId && /^G-[A-Z0-9]+$/i.test(gaId.trim()));
  const isValidAds = Boolean(adsId && /^AW-[0-9]+$/i.test(adsId.trim()));
  const isValidMeta = Boolean(metaPixelId && /^[0-9]{8,20}$/.test(metaPixelId.trim()));

  const loadGa = Boolean(preferences?.analytics && isValidGa);
  const loadAds = Boolean(preferences?.marketing && isValidAds);
  const loadMeta = Boolean(preferences?.marketing && isValidMeta);

  return (
    <>
      {/* 1. Google Analytics 4 Script (Loads ONLY if user opted in to Analytics) */}
      {loadGa && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* 2. Google Ads Tag (Loads ONLY if user opted in to Marketing) */}
      {loadAds && adsId && (
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('config', '${adsId}');
          `}
        </Script>
      )}

      {/* 3. Meta Pixel (Loads ONLY if user opted in to Marketing) */}
      {loadMeta && metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

