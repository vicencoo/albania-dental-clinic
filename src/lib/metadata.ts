import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { baseKeywords, pageSeo, type Seo } from "@/content/seo";
import { site, siteUrl } from "@/content/site";
import { SHARE_SIZE, shareImageUrl } from "@/lib/share";
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

/** Open Graph locale codes (language_TERRITORY). */
const ogLocales: Record<AppLocale, string> = { sq: "sq_AL", it: "it_IT", en: "en_GB" };

interface BuildMetadataInput {
  locale: AppLocale;
  path: AppPath | string;
  title: string;
  description?: string;
  /** Page-specific search keywords; the brand keywords for the locale are added automatically. */
  keywords?: string[];
  /** "article" for blog posts. */
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
  /** Use the title as-is, without the " | Albania Dental Clinic" suffix from the layout. */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  keywords = [],
  type = "website",
  publishedTime,
  noindex,
  absoluteTitle,
}: BuildMetadataInput): Metadata {
  const url = localizedUrl(locale, path);
  // Branded link-preview card generated for this page (see src/lib/share.ts).
  const images = [{ url: shareImageUrl(locale, path), ...SHARE_SIZE, type: "image/jpeg", alt: title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...new Set([...keywords, ...baseKeywords[locale]])],
    alternates: { canonical: url, languages: hreflangAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

/**
 * Metadata from an SEO entry (src/content/seo.ts). These titles are written to fit Google's
 * ~60-character limit on their own, so the brand suffix is not added (Google shows the site
 * name separately, from the WebSite structured data).
 */
export function seoMetadata(
  locale: AppLocale,
  path: AppPath | string,
  seo: Seo,
  extra: Partial<BuildMetadataInput> = {},
): Metadata {
  return buildMetadata({ locale, path, ...seo, absoluteTitle: true, ...extra });
}

/**
 * Metadata for a static page. Uses the keyword-rich entry in src/content/seo.ts when there is
 * one, otherwise the title/description under messages "pages.<key>".
 */
export async function pageMetadata(
  locale: AppLocale,
  key: string,
  path: AppPath,
  options: { noindex?: boolean } = {},
): Promise<Metadata> {
  const seo = pageSeo[path]?.[locale];
  if (seo) return seoMetadata(locale, path, seo, { noindex: options.noindex });
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({
    locale,
    path,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    noindex: options.noindex,
  });
}
