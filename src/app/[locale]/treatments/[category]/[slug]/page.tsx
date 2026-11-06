import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { TreatmentHero } from "@/components/treatments/TreatmentHero";
import { TreatmentSteps } from "@/components/treatments/TreatmentSteps";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqsByTopic } from "@/content/faq";
import { getCategory, getTreatment, getTreatmentBySlug, treatmentHref, treatments } from "@/content/treatments";
import { asLocale } from "@/lib/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";
import { stagger } from "@/lib/style";

type Props = PageProps<"/[locale]/treatments/[category]/[slug]">;

export function generateStaticParams() {
  return treatments.map((t) => ({ category: t.category, slug: t.slug }));
}

async function load(params: Props["params"]) {
  const { locale: raw, category, slug } = await params;
  const locale = asLocale(raw);
  const treatment = getTreatment(category, slug);
  const cat = getCategory(category);
  if (!treatment || !cat) notFound();
  return { locale, treatment, category: cat };
}

export async function generateMetadata({ params }: Props) {
  const { locale, treatment } = await load(params);
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: treatmentHref(treatment),
    title: t(treatment.labelKey),
    description: t(`treatments.desc.${treatment.slug}`),
    image: treatment.image,
  });
}

export default async function TreatmentPage({ params }: Props) {
  const { locale, treatment, category } = await load(params);
  setRequestLocale(locale);
  const t = await getTranslations();
  const title = t(treatment.labelKey);
  const steps = t.raw(`treatments.steps.${category.slug}`) as { title: string; text: string }[];
  const related = (treatment.related ?? []).map(getTreatmentBySlug).filter((x) => x !== undefined);
  const faqs = category.slug === "implantology" || category.slug === "digital-implant" ? getFaqsByTopic("treatments") : [];

  return (
    <>
      <TreatmentHero
        title={title}
        category={t(category.labelKey)}
        intro={t(`treatments.desc.${treatment.slug}`)}
        image={treatment.image}
        tone={category.slug === "digital-implant" ? "sky" : "warm"}
        breadcrumbs={[
          { label: t("nav.treatments"), href: "/treatments" },
          { label: t(category.labelKey), href: `/treatments/${category.slug}` },
          { label: title },
        ]}
      />

      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={title} title={t("ui.howItWorks")} />
          <div className="mt-10">
            <TreatmentSteps steps={steps} />
          </div>
          <p className="reveal mt-8 flex items-center gap-2 text-xs text-brand-muted">
            <Icon name="shield" className="size-4 text-brand-gold" />
            {t("ui.medicalNote")}
          </p>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="bg-brand-porcelain py-20 grain lg:py-24">
          <div className="container-luxe max-w-4xl">
            <SectionHeading title={t("ui.faqTitle")} />
            <div className="mt-10">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-20 lg:py-24">
          <div className="container-luxe">
            <SectionHeading title={t("ui.relatedTreatments")} />
            <ul className="reveal-sides mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <li key={r.slug} className="reveal" style={stagger(i)}>
                  <TreatmentCard treatment={r} label={t(r.labelKey)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: title,
          description: t(`treatments.desc.${treatment.slug}`),
          url: localizedUrl(locale, treatmentHref(treatment)),
        }}
      />
    </>
  );
}
