/**
 * Single source of truth for header mega menu, mobile drawer, footer and sitemap.
 * Labels are translation keys resolved with next-intl (messages/*.json).
 */
import { treatmentCategories, getTreatmentsByCategory, treatmentHref } from "./treatments";
import type { AppPath, FooterGroup, NavItem } from "./types";

export const bookHref: AppPath = "/book";

/** True when `pathname` (without locale) is `href` or one of its sub-pages. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Where a top-level item navigates on click: its own overview page (e.g. /treatments). */
export function primaryHref(item: NavItem): AppPath {
  return item.href;
}

export const mainNav: NavItem[] = [
  {
    id: "same-day",
    labelKey: "nav.sameDay",
    href: "/same-day-teeth",
    highlight: true,
    columns: [
      {
        links: [
          { labelKey: "nav.sameDayOverview", href: "/same-day-teeth" },
          { labelKey: "nav.sameDayHow", href: "/same-day-teeth/how-it-works" },
          { labelKey: "nav.sameDayCandidates", href: "/same-day-teeth/candidates" },
        ],
      },
    ],
    featured: {
      titleKey: "nav.featured.sameDay.title",
      textKey: "nav.featured.sameDay.text",
      image: "/images/results/case-1-after.jpg",
      href: "/same-day-teeth/how-it-works",
    },
  },
  {
    id: "treatments",
    labelKey: "nav.treatments",
    href: "/treatments",
    // 4 columns generated from treatments.ts
    columns: treatmentCategories.map((category) => ({
      titleKey: category.labelKey,
      href: `/treatments/${category.slug}` as AppPath,
      links: getTreatmentsByCategory(category.slug).map((t) => ({
        labelKey: t.labelKey,
        href: treatmentHref(t),
      })),
    })),
  },
  {
    id: "clinic",
    labelKey: "nav.clinic",
    href: "/clinic",
    columns: [
      {
        titleKey: "nav.groups.people",
        links: [
          { labelKey: "nav.drDede", href: "/clinic/dr-donela-dede" },
          { labelKey: "nav.team", href: "/clinic/team" },
        ],
      },
      {
        titleKey: "nav.groups.place",
        links: [
          { labelKey: "nav.technology", href: "/clinic/technology" },
          { labelKey: "nav.laboratory", href: "/clinic/laboratory" },
          { labelKey: "nav.environment", href: "/clinic/environment" },
          { labelKey: "nav.whyOneOfTwo", href: "/clinic/why-one-of-two" },
        ],
      },
    ],
    featured: {
      titleKey: "nav.featured.clinic.title",
      textKey: "nav.featured.clinic.text",
      image: "/images/team/dr-donela-dede-with-patient.jpg",
      href: "/clinic/why-one-of-two",
    },
  },
  {
    id: "tourism",
    labelKey: "nav.tourism",
    href: "/dental-tourism",
    columns: [
      {
        titleKey: "nav.groups.plan",
        links: [
          { labelKey: "nav.tourismHow", href: "/dental-tourism/how-it-works" },
          { labelKey: "nav.packages", href: "/dental-tourism/packages" },
          { labelKey: "nav.faq", href: "/dental-tourism/faq" },
        ],
      },
      {
        titleKey: "nav.groups.stay",
        links: [
          { labelKey: "nav.apartments", href: "/dental-tourism/apartments" },
          { labelKey: "nav.travel", href: "/dental-tourism/travel" },
          { labelKey: "nav.discoverAlbania", href: "/dental-tourism/discover-albania" },
        ],
      },
    ],
    featured: {
      titleKey: "nav.featured.tourism.title",
      textKey: "nav.featured.tourism.text",
      image: "/images/brand/logo-on-green.jpg",
      href: "/dental-tourism/apartments",
    },
  },
  {
    id: "results",
    labelKey: "nav.results",
    href: "/results",
    columns: [
      {
        links: [
          { labelKey: "nav.beforeAfter", href: "/results/before-after" },
          { labelKey: "nav.patientStories", href: "/results/patient-stories" },
        ],
      },
    ],
  },
  { id: "prices", labelKey: "nav.prices", href: "/prices" },
  { id: "journal", labelKey: "nav.journal", href: "/journal" },
];

export const footerNav: FooterGroup[] = [
  {
    titleKey: "nav.sameDay",
    links: [
      { labelKey: "nav.sameDayHow", href: "/same-day-teeth/how-it-works" },
      { labelKey: "nav.sameDayCandidates", href: "/same-day-teeth/candidates" },
      { labelKey: "nav.treatments", href: "/treatments" },
      { labelKey: "nav.prices", href: "/prices" },
    ],
  },
  {
    titleKey: "nav.clinic",
    links: [
      { labelKey: "nav.drDede", href: "/clinic/dr-donela-dede" },
      { labelKey: "nav.team", href: "/clinic/team" },
      { labelKey: "nav.technology", href: "/clinic/technology" },
      { labelKey: "nav.laboratory", href: "/clinic/laboratory" },
      { labelKey: "nav.results", href: "/results" },
      { labelKey: "nav.journal", href: "/journal" },
    ],
  },
  {
    titleKey: "nav.tourism",
    links: [
      { labelKey: "nav.tourismHow", href: "/dental-tourism/how-it-works" },
      { labelKey: "nav.apartments", href: "/dental-tourism/apartments" },
      { labelKey: "nav.packages", href: "/dental-tourism/packages" },
      { labelKey: "nav.faq", href: "/dental-tourism/faq" },
    ],
  },
  {
    titleKey: "nav.groups.contact",
    links: [
      { labelKey: "nav.book", href: "/book" },
      { labelKey: "nav.contact", href: "/contact" },
    ],
  },
];

export const legalNav = [
  { labelKey: "nav.privacy", href: "/privacy" },
  { labelKey: "nav.cookies", href: "/cookies" },
  { labelKey: "nav.terms", href: "/terms" },
  { labelKey: "nav.accessibility", href: "/accessibility" },
] as const satisfies { labelKey: string; href: AppPath }[];

/**
 * Static (non-dynamic) routes for the sitemap. Dynamic routes are added in
 * src/app/sitemap.ts from the content files. /thank-you is intentionally excluded.
 */
export const staticRoutes: AppPath[] = [
  "/",
  "/same-day-teeth",
  "/same-day-teeth/how-it-works",
  "/same-day-teeth/candidates",
  "/treatments",
  "/clinic",
  "/clinic/dr-donela-dede",
  "/clinic/team",
  "/clinic/technology",
  "/clinic/laboratory",
  "/clinic/environment",
  "/clinic/why-one-of-two",
  "/dental-tourism",
  "/dental-tourism/how-it-works",
  "/dental-tourism/apartments",
  "/dental-tourism/packages",
  "/dental-tourism/travel",
  "/dental-tourism/discover-albania",
  "/dental-tourism/faq",
  "/results",
  "/results/before-after",
  "/results/patient-stories",
  "/prices",
  "/journal",
  "/book",
  "/contact",
  "/privacy",
  "/cookies",
  "/terms",
  "/accessibility",
];
