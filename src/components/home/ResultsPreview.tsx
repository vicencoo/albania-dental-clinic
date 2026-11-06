import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/results/BeforeAfterSlider";
import { results } from "@/content/results";
import type { AppLocale } from "@/i18n/routing";

/** Preview of consented before/after cases. Hidden when there are none. */
export function ResultsPreview() {
  const t = useTranslations("home.results");
  const locale = useLocale() as AppLocale;
  const featured = results[0];
  if (!featured) return null;

  return (
    <section className="bg-brand-porcelain py-28 lg:py-40">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} />
          <p className="reveal mt-6 font-heading text-2xl font-light italic text-brand-green">{featured.title[locale]}</p>
          <div className="reveal-from-left mt-10">
            <Button href="/results/before-after" variant="secondary">
              {t("cta")}
            </Button>
          </div>
        </div>
        <div className="reveal-left">
          <BeforeAfterSlider
            before={featured.beforeImage}
            after={featured.afterImage}
            alt={featured.title[locale]}
            ratio="aspect-[622/274]"
          />
        </div>
      </div>
    </section>
  );
}
