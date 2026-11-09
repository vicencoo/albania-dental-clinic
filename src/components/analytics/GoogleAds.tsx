"use client";

import { useEffect } from "react";
import Script from "next/script";
import { googleAds, trackConversion } from "@/lib/ads";
import { useConsent } from "@/lib/consent";

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

/** Defines window.gtag and sets Consent Mode v2 defaults to "denied" (runs once, before gtag.js). */
function ensureGtag() {
  if (typeof window === "undefined" || window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", DENIED);
}

if (googleAds.id) ensureGtag();

/**
 * Google Ads tag with Consent Mode v2 ("basic" mode):
 * gtag.js is NOT downloaded until the visitor clicks "Accept", so nothing is sent to Google before that.
 * Also reports a "whatsapp" conversion for any click on a wa.me link.
 */
export function GoogleAds() {
  const consent = useConsent();
  const accepted = consent === "accepted";

  useEffect(() => {
    if (!googleAds.id || !consent) return;
    ensureGtag();
    window.gtag!("consent", "update", accepted ? GRANTED : DENIED);
  }, [consent, accepted]);

  // One delegated listener covers every WhatsApp link on the site.
  useEffect(() => {
    if (!googleAds.id || !accepted) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="https://wa.me/"]');
      if (link) trackConversion("whatsapp");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [accepted]);

  if (!googleAds.id || !accepted) return null;

  return (
    <Script
      id="google-ads"
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAds.id}`}
      strategy="afterInteractive"
      onLoad={() => {
        window.gtag!("js", new Date());
        window.gtag!("config", googleAds.id);
      }}
    />
  );
}
