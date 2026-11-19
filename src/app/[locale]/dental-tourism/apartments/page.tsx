import { getTranslations, setRequestLocale } from "next-intl/server";
import { ApartmentGallery } from "@/components/tourism/ApartmentGallery";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { apartmentImages } from "@/content/apartments";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "apartments";
const PATH = "/dental-tourism/apartments";

type Props = PageProps<"/[locale]/dental-tourism/apartments">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function DentalTourismApartmentsPage({ params }: Props) {
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
        <div className="container-luxe space-y-12">
          <div className="max-w-2xl">
            <h2 className="reveal text-4xl">{t("apartmentsPage.title")}</h2>
            <p className="reveal mt-4 text-lg leading-relaxed text-brand-muted" style={stagger(1)}>
              {t("apartmentsPage.text")}
            </p>
          </div>
          <div className="reveal">
            <ApartmentGallery images={apartmentImages} title={t(`pages.${KEY}.title`)} />
          </div>
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
