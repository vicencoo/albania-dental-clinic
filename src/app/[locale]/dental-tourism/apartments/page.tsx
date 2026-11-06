import { getTranslations, setRequestLocale } from "next-intl/server";
import { ApartmentCard } from "@/components/tourism/ApartmentCard";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { apartments } from "@/content/apartments";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "apartments";
const PATH = "/dental-tourism/apartments";

type Props = PageProps<"/[locale]/dental-tourism/apartments">;

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
        tone="sky"
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.featured.tourism.title")}
        intro={t("apartmentsPage.intro")}
        breadcrumbs={[{ label: t("nav.tourism"), href: "/dental-tourism" }, { label: t("nav.apartments") }]}
      />
      <section className="py-20 lg:py-24">
        <ul className="container-luxe space-y-8">
          {apartments.map((apartment, i) => (
            <li key={apartment.slug} className="reveal" style={stagger(i)}>
              <ApartmentCard apartment={apartment} />
            </li>
          ))}
        </ul>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
