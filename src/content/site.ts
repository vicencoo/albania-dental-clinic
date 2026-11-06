/**
 * Global clinic details. Every value is a placeholder until confirmed by the clinic.
 */
export const site = {
  name: "Albania Dental Clinic",
  leadDoctor: "Dr. Donela Dede",
  domain: "[DOMAIN]", // e.g. "https://www.example.com" — used for sitemap, canonical & hreflang
  phone: "[PHONE]",
  whatsapp: "[WHATSAPP]", // international format without "+" or spaces, for wa.me links
  email: "[EMAIL]",
  address: {
    street: "[ADDRESS]",
    city: "[CITY]",
    postalCode: "[POSTAL_CODE]",
    country: "AL",
  },
  geo: { lat: "[LAT]", lng: "[LNG]" },
  mapUrl: "[MAP_URL]",
  hours: [
    { days: "[DAYS]", open: "[OPEN]", close: "[CLOSE]" },
  ],
  social: {
    instagram: "https://www.instagram.com/albaniadental_clinic/",
    facebook: "[FACEBOOK_URL]",
  },
} as const;

/** Absolute base URL. Falls back to localhost while the domain is a placeholder. */
export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (site.domain.startsWith("http")) return site.domain.replace(/\/$/, "");
  return "http://localhost:3000";
}

/** True for values still waiting for the clinic, e.g. "[PHONE]". */
export function isPlaceholder(value?: string | null): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

export function whatsappHref(): string | null {
  return /^\d+$/.test(site.whatsapp) ? `https://wa.me/${site.whatsapp}` : null;
}
