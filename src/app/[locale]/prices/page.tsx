import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { getFaqsByTopic } from "@/content/faq";
import { isPlaceholder } from "@/content/site";
import { getTreatmentsByCategory, treatmentCategories, treatmentHref } from "@/content/treatments";
import { Link } from "@/i18n/navigation";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "prices";
const PATH = "/prices";

type Props = PageProps<"/[locale]/prices">;

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
        eyebrow={t("ui.priceOnRequest")}
        intro={t("pricesPage.intro")}
        breadcrumbs={[{ label: t("nav.prices") }]}
      >
        <Button href="/book">{t("ui.bookCta")}</Button>
      </PageHero>

      <section className="py-20 lg:py-24">
        <div className="container-luxe grid gap-8 lg:grid-cols-2">
          {/* Never invent prices: values stay "[PRICE]" (shown as "after consultation") until confirmed. */}
          {treatmentCategories.map((category, ci) => (
            <div key={category.slug} className="reveal rounded-[2rem] border border-brand-sand bg-brand-white p-8" style={stagger(ci % 2)}>
              <h2 className="text-3xl">{t(category.labelKey)}</h2>
              <table className="mt-6 w-full text-left text-sm">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">{t("pricesPage.treatment")}</th>
                    <th scope="col">{t("pricesPage.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  {getTreatmentsByCategory(category.slug).map((treatment) => (
                    <tr key={treatment.slug} className="border-b border-brand-sand last:border-0">
                      <th scope="row" className="py-3.5 font-normal">
                        <Link href={treatmentHref(treatment)} className="link-underline hover:text-brand-green">
                          {t(treatment.labelKey)}
                        </Link>
                      </th>
                      <td className="py-3.5 text-right text-brand-muted">
                        {isPlaceholder(treatment.price) ? t("ui.priceOnRequest") : treatment.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <p className="container-luxe reveal mt-10 flex items-center gap-2 text-sm text-brand-muted">
          <Icon name="upload" className="size-4 text-brand-gold" /> {t("pricesPage.note")}
        </p>
      </section>

      <section className="bg-brand-porcelain py-20 grain">
        <div className="container-luxe max-w-4xl">
          <FAQAccordion items={getFaqsByTopic("prices")} />
        </div>
      </section>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
