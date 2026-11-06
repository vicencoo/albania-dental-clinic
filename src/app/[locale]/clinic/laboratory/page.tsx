import { getTranslations, setRequestLocale } from "next-intl/server";
import { LabShowcase } from "@/components/clinic/LabShowcase";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "laboratory";
const PATH = "/clinic/laboratory";

type Props = PageProps<"/[locale]/clinic/laboratory">;

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
        eyebrow={t("nav.groups.place")}
        intro={t("laboratoryPage.intro")}
        tone="sky"
        breadcrumbs={[{ label: t("nav.clinic"), href: "/clinic" }, { label: t("nav.laboratory") }]}
      >
        <Button href="/same-day-teeth" variant="secondary">
          {t("nav.sameDay")}
        </Button>
      </PageHero>
      <section className="py-20 lg:py-28">
        <div className="container-luxe">
          <LabShowcase />
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
