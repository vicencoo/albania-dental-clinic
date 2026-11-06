import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

/** Narrow a route param to a supported locale, or 404. */
export function asLocale(value: string): AppLocale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value;
}

/** generateStaticParams helper for the [locale] segment. */
export function localeParams() {
  return routing.locales.map((locale) => ({ locale }));
}
