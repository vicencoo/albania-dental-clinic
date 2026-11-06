import { getTranslations, setRequestLocale } from "next-intl/server";
import { ResultsFilter } from "@/components/results/ResultsFilter";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { results } from "@/content/results";
import { site } from "@/content/site";
import { treatmentCategories } from "@/content/treatments";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "beforeAfter";
const PATH = "/results/before-after";

type Props = PageProps<"/[locale]/results/before-after">;

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
        eyebrow={t("nav.results")}
        intro={t("beforeAfterPage.intro")}
        breadcrumbs={[{ label: t("nav.results"), href: "/results" }, { label: t("nav.beforeAfter") }]}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          {/* Only cases with consentConfirmed === true are included in `results`. */}
          <ResultsFilter categories={treatmentCategories.map((c) => c.slug)} cases={results} />
          <div className="reveal mt-16 rounded-[2rem] bg-brand-porcelain p-8 text-center">
            <p className="mx-auto max-w-xl text-brand-muted">{t("ui.noResultsYet")}</p>
            <div className="mt-6">
              <Button external={site.social.instagram} variant="secondary" leadingIcon="instagram" icon={null}>
                {t("ui.followUs")}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
