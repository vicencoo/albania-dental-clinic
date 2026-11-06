import { getTranslations, setRequestLocale } from "next-intl/server";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { getTreatmentsByCategory, treatmentCategories } from "@/content/treatments";
import { Link } from "@/i18n/navigation";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";
import { categoryTone, tone } from "@/lib/tone";

const KEY = "treatments";
const PATH = "/treatments";

type Props = PageProps<"/[locale]/treatments">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("home.treatments.eyebrow")}
        intro={t("treatmentsPage.intro")}
        breadcrumbs={[{ label: t("nav.treatments") }]}
      >
        <nav aria-label={t("nav.treatments")} className="flex flex-wrap gap-2">
          {treatmentCategories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="rounded-full border border-brand-gold/50 bg-brand-white px-4 py-2 text-sm transition-colors hover:border-brand-gold hover:text-brand-green"
            >
              {t(c.labelKey)}
            </a>
          ))}
        </nav>
      </PageHero>

      {treatmentCategories.map((category, ci) => (
        <section
          key={category.slug}
          id={category.slug}
          className={ci % 2 === 1 ? "bg-brand-porcelain py-20 grain lg:py-24" : "py-20 lg:py-24"}
        >
          <div className="container-luxe">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className={`eyebrow reveal ${tone[categoryTone[category.slug]].text}`}>0{ci + 1}</p>
                <h2 className="reveal mt-3 text-4xl sm:text-5xl" style={stagger(1)}>
                  <Link href={`/treatments/${category.slug}`} className="link-underline">
                    {t(category.labelKey)}
                  </Link>
                </h2>
                <p className="reveal mt-4 text-lg text-brand-muted" style={stagger(2)}>
                  {t(`treatments.categoryText.${category.slug}`)}
                </p>
              </div>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {getTreatmentsByCategory(category.slug).map((treatment, i) => (
                <li key={treatment.slug} className="reveal-flip" style={stagger(i % 4)}>
                  <TreatmentCard treatment={treatment} label={t(treatment.labelKey)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
