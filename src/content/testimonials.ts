import { todo } from "./placeholder";
import type { Testimonial } from "./types";

// TODO: replace with real, consented patient stories. Never invent reviews.
// The placeholder entry keeps /results/patient-stories/[slug] buildable
// (cacheComponents requires non-empty generateStaticParams); it is excluded
// from listings and the sitemap until consentConfirmed is true.
export const testimonials: Testimonial[] = [
  {
    slug: "patient-story-1",
    patientName: "[PATIENT_NAME]",
    country: "[COUNTRY]",
    treatment: "all-on-4",
    quote: todo("QUOTE"),
    story: todo("STORY"),
    consentConfirmed: false,
  },
];

export const publishedTestimonials = testimonials.filter((t) => t.consentConfirmed);

export function getTestimonial(slug: string) {
  return testimonials.find((t) => t.slug === slug);
}
