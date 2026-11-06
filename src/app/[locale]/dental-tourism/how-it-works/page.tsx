import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { StepList } from "@/components/ui/StepList";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "tourismHow";
const PATH = "/dental-tourism/how-it-works";

type Props = PageProps<"/[locale]/dental-tourism/how-it-works">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const steps = t.raw("tourismHow.steps") as { title: string; text: string }[];

  return (
    <>
      <PageHero
        tone="sky"
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.tourism")}
        intro={t("tourismHow.intro")}
        breadcrumbs={[{ label: t("nav.tourism"), href: "/dental-tourism" }, { label: t("nav.tourismHow") }]}
      />
      <section className="py-20 sky-wash lg:py-28">
        <div className="container-luxe max-w-4xl">
          <StepList steps={steps} tone="blue" />
          <div className="reveal mt-12 flex flex-wrap gap-4">
            <Button href="/book">{t("ui.bookCta")}</Button>
            <Button href="/dental-tourism/apartments" variant="secondary">
              {t("nav.apartments")}
            </Button>
          </div>
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
