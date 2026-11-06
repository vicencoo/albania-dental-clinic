/**
 * Validates dynamic paths against the content files. Used by the proxy so unknown
 * slugs return a real HTTP 404 (with Cache Components, a notFound() thrown inside a
 * page for an unknown param happens after the static shell has started streaming,
 * so the status would otherwise stay 200).
 */
import type { AppLocale } from "@/i18n/routing";
import { apartments } from "./apartments";
import { journalPosts } from "./journal";
import { team } from "./team";
import { testimonials } from "./testimonials";
import { staticRoutes } from "./navigation";
import { getCategory, getTreatment } from "./treatments";

/** Routes that exist but are intentionally not in the sitemap. */
const unlistedRoutes = ["/thank-you"];
const knownStatic = new Set<string>([...staticRoutes, ...unlistedRoutes]);

/**
 * @param segments path segments after the locale, e.g. ["treatments", "aesthetic", "veneers"]
 * @returns true if the path resolves to an existing page
 */
export function isKnownPath(segments: string[], locale: AppLocale): boolean {
  const [a, b, c] = segments;
  const len = segments.length;

  if (a === "treatments" && len === 2) return !!getCategory(b);
  if (a === "treatments" && len === 3) return !!getTreatment(b, c);
  if (a === "clinic" && b === "team" && len === 3) return team.some((m) => m.slug === c);
  if (a === "dental-tourism" && b === "apartments" && len === 3)
    return apartments.some((x) => x.slug === c);
  if (a === "results" && b === "patient-stories" && len === 3)
    return testimonials.some((t) => t.slug === c && t.consentConfirmed);
  if (a === "journal" && len === 2)
    return journalPosts.some((p) => p.slug === b && p.locales.includes(locale));

  return knownStatic.has(`/${segments.join("/")}`.replace(/\/$/, "") || "/");
}
