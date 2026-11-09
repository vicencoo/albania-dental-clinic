import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { getFaqsByTopic } from "@/content/faq";
import { compareCountries, priceComparison } from "@/content/priceComparison";
import { isPlaceholder } from "@/content/site";
import { getTreatmentBySlug, treatmentHref } from "@/content/treatments";
import { Link } from "@/i18n/navigation";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

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

  const euro = new Intl.NumberFormat(locale === "sq" ? "sq-AL" : locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const rows = priceComparison.flatMap((row) => {
    const treatment = getTreatmentBySlug(row.treatment);
    return treatment ? [{ ...row, treatment }] : [];
  });

  /** Our price, or a "Free quote" link while the clinic hasn't confirmed it. Never invented. */
  const ourPrice = (price: string) =>
    isPlaceholder(price) ? (
      <Link href="/book" className="link-underline font-semibold text-brand-green">
        {t("pricesPage.freeQuote")}
      </Link>
    ) : (
      <span className="font-semibold text-brand-green">{price}</span>
    );

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("pricesPage.eyebrow")}
        intro={t("pricesPage.intro")}
        breadcrumbs={[{ label: t("nav.prices") }]}
      >
        <Button href="/book">{t("pricesPage.disclaimerCta")}</Button>
      </PageHero>

      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <div className="reveal max-w-2xl">
            <h2 className="text-4xl sm:text-5xl">{t("pricesPage.tableTitle")}</h2>
            <p className="mt-4 text-brand-muted">{t("pricesPage.tableIntro")}</p>
          </div>

          {/* Desktop / tablet: comparison table */}
          <div className="reveal mt-12 hidden overflow-clip rounded-[1.75rem] border border-brand-sand bg-brand-white md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-brand-sand bg-brand-porcelain">
                  <th scope="col" className="px-6 py-5 font-label text-[0.68rem] uppercase tracking-[0.18em] text-brand-muted">
                    {t("pricesPage.treatment")}
                  </th>
                  <th scope="col" className="bg-brand-green/[0.07] px-6 py-5 text-right">
                    <span className="flex items-center justify-end gap-2 font-semibold text-brand-green">
                      <Icon name="tooth" className="size-4" />
                      {t("pricesPage.ourClinic")}
                    </span>
                  </th>
                  {compareCountries.map((c) => (
                    <th key={c} scope="col" className="px-6 py-5 text-right font-semibold">
                      {t(`pricesPage.countries.${c}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.treatment.slug} className="border-b border-brand-sand last:border-0">
                    <th scope="row" className="px-6 py-4.5 font-normal">
                      <Link href={treatmentHref(row.treatment)} className="link-underline text-base hover:text-brand-green">
                        {t(row.treatment.labelKey)}
                      </Link>
                      {row.unit && (
                        <span className="mt-0.5 block text-xs text-brand-muted">{t(`pricesPage.units.${row.unit}`)}</span>
                      )}
                    </th>
                    <td className="bg-brand-green/[0.07] px-6 py-4.5 text-right">{ourPrice(row.treatment.price)}</td>
                    {compareCountries.map((c) => (
                      <td key={c} className="px-6 py-4.5 text-right tabular-nums text-brand-ink/80">
                        {t("pricesPage.from", { price: euro.format(row.prices[c]) })}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: one card per treatment */}
          <ul className="mt-10 space-y-4 md:hidden">
            {rows.map((row) => (
              <li key={row.treatment.slug} className="reveal rounded-2xl border border-brand-sand bg-brand-white p-5">
                <Link href={treatmentHref(row.treatment)} className="text-lg font-medium hover:text-brand-green">
                  {t(row.treatment.labelKey)}
                </Link>
                {row.unit && <p className="text-xs text-brand-muted">{t(`pricesPage.units.${row.unit}`)}</p>}
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-brand-green/[0.07] px-3 py-2">
                    <dt className="font-semibold text-brand-green">{t("pricesPage.ourClinic")}</dt>
                    <dd>{ourPrice(row.treatment.price)}</dd>
                  </div>
                  {compareCountries.map((c) => (
                    <div key={c} className="flex items-center justify-between px-3">
                      <dt className="text-brand-muted">{t(`pricesPage.countries.${c}`)}</dt>
                      <dd className="tabular-nums">{t("pricesPage.from", { price: euro.format(row.prices[c]) })}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>

          <p className="reveal mt-6 text-xs text-brand-muted">{t("pricesPage.sourceNote")}</p>

          {/* Disclaimer + quote request */}
          <div className="reveal obsidian mt-14 flex flex-col gap-8 rounded-[1.75rem] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-leaf/15 text-brand-leaf">
                <Icon name="upload" className="size-5" />
              </span>
              <div>
                <p className="font-heading text-3xl text-brand-white">{t("pricesPage.disclaimerTitle")}</p>
                <p className="mt-2 max-w-2xl leading-relaxed text-brand-white/70">{t("pricesPage.disclaimer")}</p>
              </div>
            </div>
            <Button href="/book" className="shrink-0">
              {t("pricesPage.disclaimerCta")}
            </Button>
          </div>
        </div>
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
