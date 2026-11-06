import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isPlaceholder } from "@/content/site";
import { getTreatmentBySlug, treatmentHref } from "@/content/treatments";
import type { Package } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations();
  const related = pkg.treatments.map(getTreatmentBySlug).filter((x) => x !== undefined);

  return (
    <article className="reveal relative grid overflow-clip rounded-[2.25rem] bg-brand-forest text-brand-white lg:grid-cols-[1.1fr_0.9fr]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgb(76_154_63/0.3),transparent_45%)]"
      />
      <div className="relative p-8 sm:p-12">
        <p className="eyebrow text-brand-gold-light">{t("nav.packages")}</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">{pkg.name[locale]}</h2>
        <p className="mt-4 text-lg text-brand-white/75">{pkg.description[locale]}</p>
        {related.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {related.map((tr) => (
              <li key={tr.slug}>
                <Link
                  href={treatmentHref(tr)}
                  className="inline-block rounded-full border border-brand-white/25 px-4 py-1.5 text-sm transition-colors hover:border-brand-gold"
                >
                  {t(tr.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/book" variant="light">
            {t("ui.bookCta")}
          </Button>
          <p className="font-heading text-2xl text-brand-gold-light">
            {isPlaceholder(pkg.price) ? t("ui.priceOnRequest") : pkg.price}
          </p>
        </div>
      </div>
      <div className="relative border-t border-brand-white/10 bg-brand-white/5 p-8 sm:p-12 lg:border-l lg:border-t-0">
        <p className="eyebrow text-brand-gold-light">{t("ui.includes")}</p>
        <ul className="mt-6 space-y-4">
          {pkg.includes.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-leaf">
                <Icon name="check" className="size-3.5" />
              </span>
              {item[locale]}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
