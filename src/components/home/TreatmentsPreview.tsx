import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { treatmentCategories } from "@/content/treatments";
import { stagger } from "@/lib/style";
import { categoryTone, tone } from "@/lib/tone";

/** The four treatment areas as image cards. */
export function TreatmentsPreview() {
  const t = useTranslations();

  return (
    <section className="bg-brand-porcelain py-24 grain lg:py-32">
      <div className="container-luxe">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow={t("home.treatments.eyebrow")}
            title={t("home.treatments.title")}
            intro={t("home.treatments.text")}
            className="max-w-3xl"
          />
          <div className="reveal">
            <Button href="/treatments" variant="secondary">
              {t("home.treatments.cta")}
            </Button>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {treatmentCategories.map((category, i) => (
            <li key={category.slug} className="reveal-flip" style={stagger(i)}>
              <Link
                href={`/treatments/${category.slug}`}
                className="lift group flex h-full flex-col overflow-clip rounded-[2rem] bg-brand-white"
              >
                <div className="relative aspect-[4/3] overflow-clip bg-brand-sand">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="zoom-target object-cover"
                    />
                  )}
                </div>
                <span aria-hidden className={`h-1 w-full ${tone[categoryTone[category.slug]].bg}`} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl">{t(category.labelKey)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                    {t(`treatments.categoryText.${category.slug}`)}
                  </p>
                  <span className={`mt-5 inline-flex items-center gap-2 text-sm ${tone[categoryTone[category.slug]].text}`}>
                    {t("ui.discover")}
                    <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
