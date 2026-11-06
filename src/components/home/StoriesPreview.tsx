import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/results/TestimonialCard";
import { site } from "@/content/site";
import { publishedTestimonials } from "@/content/testimonials";

const feed = [
  "/images/clinic/tech-3d-ct-scan.jpg",
  "/images/team/dr-donela-dede-with-patient.jpg",
  "/images/lab/zirconia-bridge.jpg",
  "/images/treatments/children.jpg",
  "/images/treatments/implant-render.jpg",
  "/images/clinic/treatment-room.jpg",
];

/**
 * Consented patient stories when available; until then, the clinic's Instagram feed
 * (no invented reviews).
 */
export function StoriesPreview() {
  const t = useTranslations("home.stories");

  if (publishedTestimonials.length > 0) {
    return (
      <section className="bg-brand-porcelain py-28 lg:py-40">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />
          <div className="reveal-sides mt-14 grid gap-6 md:grid-cols-3">
            {publishedTestimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.slug} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-porcelain py-28 lg:py-40">
      <div className="container-luxe">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} align="center" />
        <ul aria-hidden className="reveal-stagger mt-14 grid grid-cols-3 gap-3 md:grid-cols-6">
          {feed.map((src) => (
            <li key={src}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-clip rounded-lg bg-brand-sand"
                tabIndex={-1}
                aria-hidden
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 16vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-brand-obsidian/0 text-brand-white opacity-0 transition-[opacity,background-color] duration-500 group-hover:bg-brand-obsidian/55 group-hover:opacity-100">
                  <Icon name="instagram" className="size-7" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="reveal-scale mt-12 text-center">
          <Button external={site.social.instagram} variant="secondary" leadingIcon="instagram" icon={null}>
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
