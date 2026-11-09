import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { treatmentCategories } from "@/content/treatments";
import { categoryTone } from "@/lib/tone";

/** The four treatment areas as image cards. */
export function TreatmentsPreview() {
  const t = useTranslations();

  return (
    <section className="obsidian py-28 lg:py-40">
      <div className="container-luxe">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow={t("home.treatments.eyebrow")}
            title={t("home.treatments.title")}
            intro={t("home.treatments.text")}
            className="max-w-3xl"
            tone="dark"
          />
          <div className="reveal-from-right">
            <Button href="/treatments" variant="outline-light">
              {t("home.treatments.cta")}
            </Button>
          </div>
        </div>

        <ul className="reveal-stagger mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {treatmentCategories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/treatments/${category.slug}`}
                className="group flex h-full flex-col overflow-clip rounded-xl border border-white/8 bg-white/3 transition-[border-color,background-color,translate] duration-700 ease-luxe hover:-translate-y-1 hover:border-brand-leaf/40 hover:bg-white/5"
              >
                <div className="relative aspect-4/3 overflow-clip bg-brand-obsidian-soft">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="reveal-img-zoom object-cover opacity-85 transition-[transform,opacity] duration-1000 ease-luxe group-hover:opacity-100 group-hover:transform-[scale(1.04)]"
                    />
                  )}
                </div>
                <span
                  aria-hidden
                  className={`h-px w-full ${categoryTone[category.slug] === "blue" ? "bg-brand-azure/60" : "bg-brand-leaf/60"}`}
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-[1.7rem] text-brand-white">
                    {t(category.labelKey)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-white/55">
                    {t(`treatments.categoryText.${category.slug}`)}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-2 font-label text-[0.68rem] uppercase tracking-[0.2em] ${
                      categoryTone[category.slug] === "blue"
                        ? "text-brand-azure"
                        : "text-brand-leaf"
                    }`}
                  >
                    {t("ui.discover")}
                    <Icon
                      name="arrow"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
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
