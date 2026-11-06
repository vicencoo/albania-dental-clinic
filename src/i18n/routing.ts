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
  return (prefixes as Partial<Record<AppLocale, string>>)[locale] ?? `/${locale}`;
}

/** Labels shown in the language switcher: AL · IT · EN */
export const localeLabels: Record<AppLocale, string> = {
  sq: "AL",
  it: "IT",
  en: "EN",
};
