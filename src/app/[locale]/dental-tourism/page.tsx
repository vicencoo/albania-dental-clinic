import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { LinkCards, type LinkCardItem } from "@/components/ui/LinkCards";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "tourism";
const PATH = "/dental-tourism";

type Props = PageProps<"/[locale]/dental-tourism">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const steps = (t.raw("tourismHow.steps") as { title: string; text: string }[]).slice(0, 4);

  const links: [LinkCardItem["href"], string, LinkCardItem["icon"]][] = [
    ["/dental-tourism/how-it-works", "tourismHow", "calendar"],
    ["/dental-tourism/apartments", "apartments", "home"],
    ["/dental-tourism/packages", "packages", "sparkle"],
    ["/dental-tourism/travel", "travel", "plane"],
    ["/dental-tourism/discover-albania", "discoverAlbania", "map"],
    ["/dental-tourism/faq", "faq", "chat"],
  ];

  return (
    <>
      <PageHero
        tone="sky"
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("home.tourism.title")}
        intro={t("tourismPage.intro")}
        breadcrumbs={[{ label: t("nav.tourism") }]}
        image={{ src: "/images/brand/logo-on-green.jpg", alt: t("ui.logoAlt") }}
      >
        <Button href="/book">{t("ui.bookCta")}</Button>
      </PageHero>

      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("nav.tourismHow")} title={t("tourismHow.intro")} />
          <StepList steps={steps} layout="grid" tone="blue" className="mt-10" />
        </div>
      </section>

      <section className="py-20 sky-wash lg:py-24">
        <div className="container-luxe">
          <LinkCards
            tone="blue"
            items={links.map(([href, key, icon]) => ({
              href,
              icon,
              title: t(`nav.${key}`),
              text: t(`nav.descriptions.${key}`),
            }))}
          />
        </div>
      </section>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
