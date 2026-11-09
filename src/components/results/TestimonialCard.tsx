import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Testimonial } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

/** Only pass consented testimonials. */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const locale = useLocale() as AppLocale;
  return (
    <Link
      href={`/results/patient-stories/${testimonial.slug}`}
      className="lift flex h-full flex-col rounded-4xl border border-brand-sand bg-brand-white p-8"
    >
      <span
        aria-hidden
        className="font-heading text-6xl leading-none text-brand-gold"
      >
        “
      </span>
      <blockquote className="mt-2 flex-1 font-heading text-2xl leading-snug">
        {testimonial.quote[locale]}
      </blockquote>
      <p className="mt-6 text-sm text-brand-muted">
        {testimonial.patientName} · {testimonial.country}
      </p>
    </Link>
  );
}
