import type { MetadataRoute } from "next";
import { apartments } from "@/content/apartments";
import { staticRoutes } from "@/content/navigation";
import { publishedTeam } from "@/content/team";
import { publishedTestimonials } from "@/content/testimonials";
import { treatmentCategories, treatments, treatmentHref } from "@/content/treatments";
import type { AppPath } from "@/content/types";
import { routing, type AppLocale } from "@/i18n/routing";
import { hreflangAlternates, localizedUrl } from "@/lib/metadata";
import { getPostSlugs } from "@/sanity/posts";

function entries(path: AppPath, locales: readonly AppLocale[] = routing.locales): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale, path),
    alternates: { languages: hreflangAlternates(path) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes: AppPath[] = [
    ...treatmentCategories.map((c) => `/treatments/${c.slug}` as AppPath),
    ...treatments.map((t) => treatmentHref(t) as AppPath),
    ...publishedTeam.filter((m) => !m.isLead).map((m) => `/clinic/team/${m.slug}` as AppPath),
    ...apartments.map((a) => `/dental-tourism/apartments/${a.slug}` as AppPath),
    ...publishedTestimonials.map((t) => `/results/patient-stories/${t.slug}` as AppPath),
  ];

  const journalSlugs = await getPostSlugs();

  return [
    ...[...staticRoutes, ...dynamicRoutes].flatMap((path) => entries(path)),
    ...journalSlugs.flatMap((slug) => entries(`/journal/${slug}` as AppPath)),
  ];
}
