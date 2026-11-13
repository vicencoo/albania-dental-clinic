import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand } from "@/components/ui/CTABand";
import { LinkCards, type LinkCardItem } from "@/components/ui/LinkCards";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "clinic";
const PATH = "/clinic";

type Props = PageProps<"/[locale]/clinic">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function ClinicPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  const cards: LinkCardItem[] = [
    { href: "/clinic/dr-donela-dede", key: "drDede", image: "/images/team/dr-donela-dede-with-patient.jpg" },
    { href: "/clinic/team", key: "team", icon: "user" },
    { href: "/clinic/technology", key: "technology", image: "/images/clinic/tech-cbct-unit.jpg" },
    { href: "/clinic/laboratory", key: "laboratory", image: "/images/lab/zirconia-bridge.jpg" },
    { href: "/clinic/environment", key: "environment", image: "/images/clinic/treatment-room.jpg" },
    { href: "/clinic/why-choose-us", key: "whyChooseUs", icon: "sparkle" },
  ].map(({ key, ...rest }) => ({
    ...rest,
    title: t(`nav.${key}`),
    text: t(`nav.descriptions.${key}`),
  })) as LinkCardItem[];

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.groups.place")}
        intro={t("clinicPage.intro")}
        breadcrumbs={[{ label: t("nav.clinic") }]}
        image={{ src: "/images/clinic/treatment-room.jpg", alt: t("environmentPage.gallery.room") }}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <LinkCards items={cards} />
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
