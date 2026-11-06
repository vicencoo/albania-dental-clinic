import type { MetadataRoute } from "next";
import { apartments } from "@/content/apartments";
import { journalPosts } from "@/content/journal";
import { staticRoutes } from "@/content/navigation";
import { publishedTeam } from "@/content/team";
import { publishedTestimonials } from "@/content/testimonials";
import { treatmentCategories, treatments, treatmentHref } from "@/content/treatments";
import type { AppPath } from "@/content/types";
import { routing, type AppLocale } from "@/i18n/routing";
import { hreflangAlternates, localizedUrl } from "@/lib/metadata";

function entries(path: AppPath, locales: readonly AppLocale[] = routing.locales): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale, path),
    alternates: { languages: hreflangAlternates(path) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicRoutes: AppPath[] = [
    ...treatmentCategories.map((c) => `/treatments/${c.slug}` as AppPath),
    ...treatments.map((t) => treatmentHref(t) as AppPath),
    ...publishedTeam.filter((m) => !m.isLead).map((m) => `/clinic/team/${m.slug}` as AppPath),
    ...apartments.map((a) => `/dental-tourism/apartments/${a.slug}` as AppPath),
    ...publishedTestimonials.map((t) => `/results/patient-stories/${t.slug}` as AppPath),
  ];

  return [
    ...[...staticRoutes, ...dynamicRoutes].flatMap((path) => entries(path)),
    ...journalPosts.flatMap((post) => entries(`/journal/${post.slug}`, post.locales)),
  ];
}
