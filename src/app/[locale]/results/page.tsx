import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand } from "@/components/ui/CTABand";
import { LinkCards } from "@/components/ui/LinkCards";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "results";
const PATH = "/results";

type Props = PageProps<"/[locale]/results">;

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
        eyebrow={t("home.results.title")}
        intro={t("resultsPage.intro")}
        breadcrumbs={[{ label: t("nav.results") }]}
        image={{ src: "/images/treatments/implant-render.jpg", alt: t("nav.beforeAfter") }}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <LinkCards
            columns={2}
            items={[
              {
                href: "/results/before-after",
                title: t("nav.beforeAfter"),
                text: t("nav.descriptions.beforeAfter"),
                image: "/images/results/case-1-before.jpg",
              },
              {
                href: "/results/patient-stories",
                title: t("nav.patientStories"),
                text: t("nav.descriptions.patientStories"),
                image: "/images/team/dr-donela-dede-with-patient.jpg",
              },
            ]}
          />
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
