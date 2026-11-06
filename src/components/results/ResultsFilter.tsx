"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { ResultCase, TreatmentCategorySlug } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export interface ResultsFilterProps {
  categories: TreatmentCategorySlug[];
  cases: ResultCase[];
}

/** Filter consented results by treatment category (buttons with aria-pressed). */
export function ResultsFilter({ categories, cases }: ResultsFilterProps) {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const [active, setActive] = useState<TreatmentCategorySlug | "all">("all");
  const available = categories.filter((c) => cases.some((r) => r.category === c));
  const shown = active === "all" ? cases : cases.filter((c) => c.category === active);

  return (
    <div>
      {available.length > 1 && (
        <div role="group" aria-label={t("nav.results")} className="flex flex-wrap gap-2">
          {(["all", ...available] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                active === c
                  ? "border-brand-green bg-brand-green text-brand-white"
                  : "border-brand-sand hover:border-brand-gold"
              }`}
            >
              {c === "all" ? t("ui.all") : t(`treatments.categories.${c}`)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-16">
        {shown.map((c) => (
          <article key={c.slug} className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <BeforeAfterSlider before={c.beforeImage} after={c.afterImage} alt={c.title[locale]} ratio="aspect-[622/274]" />
            <div>
              <p className="eyebrow">{t(`treatments.categories.${c.category}`)}</p>
              <h2 className="mt-3 text-3xl">{c.title[locale]}</h2>
              <p className="mt-3 leading-relaxed text-brand-muted">{c.description[locale]}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
