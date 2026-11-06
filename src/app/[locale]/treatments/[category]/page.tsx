import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { CTABand } from "@/components/ui/CTABand";
import { LinkCards } from "@/components/ui/LinkCards";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";
import { getCategory, getTreatmentsByCategory, treatmentCategories } from "@/content/treatments";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

type Props = PageProps<"/[locale]/treatments/[category]">;

export function generateStaticParams() {
  return treatmentCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale: raw, category: slug } = await params;
  const locale = asLocale(raw);
  const category = getCategory(slug);
  if (!category) notFound();
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: `/treatments/${category.slug}`,
    title: t(category.labelKey),
    description: t(`treatments.categoryText.${category.slug}`),
    image: category.image,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale: raw, category: slug } = await params;
  const locale = asLocale(raw);
  const category = getCategory(slug);
  if (!category) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const steps = t.raw(`treatments.steps.${category.slug}`) as { title: string; text: string }[];

  return (
    <>
      <PageHero
        title={t(category.labelKey)}
        eyebrow={t("nav.treatments")}
        intro={t(`treatments.categoryText.${category.slug}`)}
        breadcrumbs={[{ label: t("nav.treatments"), href: "/treatments" }, { label: t(category.labelKey) }]}
        image={category.image ? { src: category.image, alt: t(category.labelKey) } : undefined}
        tone={category.slug === "digital-implant" ? "sky" : "warm"}
      />

      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("ui.inThisCategory")} title={t("treatmentsPage.categoryIntro")} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getTreatmentsByCategory(category.slug).map((treatment, i) => (
              <li key={treatment.slug} className="reveal" style={stagger(i % 3)}>
                <TreatmentCard treatment={treatment} label={t(treatment.labelKey)} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-porcelain py-20 grain lg:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t(category.labelKey)} title={t("ui.howItWorks")} />
          <StepList steps={steps} layout="grid" className="mt-10" />
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading title={t("ui.otherCategories")} />
          <div className="mt-10">
            <LinkCards
              items={treatmentCategories
                .filter((c) => c.slug !== category.slug)
                .map((c) => ({
                  href: `/treatments/${c.slug}` as const,
                  title: t(c.labelKey),
                  text: t(`treatments.categoryText.${c.slug}`),
                  image: c.image,
                }))}
            />
          </div>
        </div>
      </section>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
