import type { AppLocale } from "@/i18n/routing";

/**
 * Content that varies per locale and is NOT a short UI label.
 * Short labels (nav, treatment names) live in messages/*.json instead.
 */
export type LocalizedString = Record<AppLocale, string>;

/** Path without locale prefix, e.g. "/treatments/aesthetic/veneers". */
export type AppPath = `/${string}`;

/* ---------------------------------------------------------------- Treatments */

export type TreatmentCategorySlug = "implantology" | "digital-implant" | "aesthetic" | "general";

export interface TreatmentCategory {
  slug: TreatmentCategorySlug;
  /** Translation key, e.g. "treatments.categories.implantology" */
  labelKey: string;
  image?: string;
}

export interface Treatment {
  slug: string;
  category: TreatmentCategorySlug;
  /** Translation key, e.g. "treatments.items.all-on-4" */
  labelKey: string;
  image?: string;
  /** Shown on /prices. Never invent: keep "[PRICE]" until the clinic confirms. */
  price: string;
  /** Slugs of related treatments (same or other category). */
  related?: string[];
}

/* --------------------------------------------------------------------- Team */

export interface TeamMember {
  slug: string;
  name: string;
  role: LocalizedString;
  specialties: LocalizedString[];
  bio: LocalizedString;
  photo?: string;
  /** Lead doctor has a dedicated page at /clinic/dr-donela-dede */
  isLead?: boolean;
}

/* ----------------------------------------------------------- Dental tourism */

export interface Apartment {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  location: string;
  /** Max guests. Keep undefined until confirmed. */
  capacity?: number;
  amenities: LocalizedString[];
  images: string[];
  distanceToClinic: string;
}

export interface Package {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  includes: LocalizedString[];
  /** Related treatment slugs */
  treatments: string[];
  price: string;
  nights?: number;
}

/* ------------------------------------------------------------------ Results */

export interface ResultCase {
  slug: string;
  treatment: string;
  category: TreatmentCategorySlug;
  title: LocalizedString;
  description: LocalizedString;
  beforeImage: string;
  afterImage: string;
  /** MUST be true (written patient consent on file) before a case is published. */
  consentConfirmed: boolean;
}

export interface Testimonial {
  slug: string;
  patientName: string;
  country: string;
  treatment: string;
  quote: LocalizedString;
  /** Full story for /results/patient-stories/[slug] */
  story: LocalizedString;
  photo?: string;
  videoUrl?: string;
  /** MUST be true before publishing. */
  consentConfirmed: boolean;
}

/* ---------------------------------------------------------------------- FAQ */

export type FaqTopic = "same-day" | "treatments" | "tourism" | "prices" | "general";

export interface Faq {
  id: string;
  topic: FaqTopic;
  question: LocalizedString;
  answer: LocalizedString;
}

/* --------------------------------------------------------------- Technology */

export interface Technology {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  image?: string;
}

/* ------------------------------------------------------------------ Journal */

export interface JournalPost {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  body: LocalizedString;
  publishedAt: string; // ISO date
  coverImage?: string;
  /** Locales the post is published in (others fall back / are excluded). */
  locales: AppLocale[];
}

/* --------------------------------------------------------------- Navigation */

export interface NavLink {
  /** Full translation key, e.g. "nav.sameDayHow" or "treatments.items.veneers" */
  labelKey: string;
  href: AppPath;
}

export interface NavColumn {
  /** Optional column heading (translation key) — links to `href` if given */
  titleKey?: string;
  href?: AppPath;
  links: NavLink[];
}

export interface NavFeatured {
  titleKey: string;
  textKey: string;
  image: string;
  href: AppPath;
}

export interface NavItem {
  id: string;
  labelKey: string;
  href: AppPath;
  /** Visually emphasised in the header (Same-Day Teeth) */
  highlight?: boolean;
  /** If present, the item opens a mega panel */
  columns?: NavColumn[];
  featured?: NavFeatured;
}

export interface FooterGroup {
  titleKey: string;
  links: NavLink[];
}
