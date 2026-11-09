/**
 * Google Ads configuration (set in .env.local — see .env.example).
 * Everything is a no-op while NEXT_PUBLIC_GOOGLE_ADS_ID is empty.
 */
export const googleAds = {
  /** e.g. "AW-123456789" */
  id: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  /** Conversion labels from Google Ads → Goals → Conversions → (action) → Tag setup. */
  labels: {
    lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "",
    whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL ?? "",
  },
};

export type ConversionKind = keyof typeof googleAds.labels;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * Reports a conversion to Google Ads. Safe to call anywhere: it does nothing when Ads is not
 * configured, and nothing leaves the browser unless the visitor accepted cookies
 * (gtag.js is only loaded after consent — see GoogleAds.tsx).
 */
export function trackConversion(kind: ConversionKind) {
  const label = googleAds.labels[kind];
  if (typeof window === "undefined" || !googleAds.id || !label || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${googleAds.id}/${label}` });
}
