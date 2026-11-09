import { defineRouting } from "next-intl/routing";

/** Public URL prefixes that differ from the locale code. */
const prefixes = { sq: "/al" } as const;

export const routing = defineRouting({
  // "sq" is the correct ISO code for Albanian; it is shown as "/al" in URLs.
  locales: ["sq", "it", "en"],
  defaultLocale: "sq",
  localePrefix: {
    mode: "always",
    prefixes,
  },
  // hreflang alternates are emitted via generateMetadata (src/lib/metadata.ts).
  alternateLinks: false,
});

export type AppLocale = (typeof routing.locales)[number];

/** Public URL prefix for a locale ("sq" → "/al"). */
export function localePrefix(locale: AppLocale): string {
  return (
    (prefixes as Partial<Record<AppLocale, string>>)[locale] ?? `/${locale}`
  );
}

/** Labels shown in the language switcher: AL · IT · EN */
export const localeLabels: Record<AppLocale, string> = {
  sq: "AL",
  it: "IT",
  en: "EN",
};

/** Full language names, each written in its own language (language menu). */
export const localeNames: Record<AppLocale, string> = {
  sq: "Shqip",
  it: "Italiano",
  en: "English",
};

/** Round flag icons shown in the language switcher. */
export const localeFlags: Record<AppLocale, string> = {
  sq: "/images/flags/alb.png",
  it: "/images/flags/ita.png",
  en: "/images/flags/eng.png",
};
