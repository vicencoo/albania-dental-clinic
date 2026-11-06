import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { site, siteUrl } from "@/content/site";
import { localePrefix, routing, type AppLocale } from "@/i18n/routing";
import type { AppPath } from "@/content/types";

/** Absolute URL for a locale + path, e.g. ("sq", "/clinic") → https://…/al/clinic */
export function localizedUrl(locale: AppLocale, path: AppPath | string): string {
  const clean = path === "/" ? "" : path;
  return `${siteUrl()}${localePrefix(locale)}${clean}`;
}

/** hreflang map for sq, it, en + x-default (→ sq). */
export function hreflangAlternates(path: AppPath | string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = localizedUrl(locale, path);
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return languages;
}

interface BuildMetadataInput {
  locale: AppLocale;
  path: AppPath | string;
  title: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noindex,
}: BuildMetadataInput): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title,
    description,
    alternates: { canonical: url, languages: hreflangAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/** Metadata for a static page whose title/description live under messages "pages.<key>". */
export async function pageMetadata(
  locale: AppLocale,
  key: string,
  path: AppPath,
  options: { noindex?: boolean } = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({
    locale,
    path,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    noindex: options.noindex,
  });
}
