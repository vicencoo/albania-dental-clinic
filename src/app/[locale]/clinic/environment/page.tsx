import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { VideoTour } from "@/components/ui/VideoTour";
import { site } from "@/content/site";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "environment";
const PATH = "/clinic/environment";

type Props = PageProps<"/[locale]/clinic/environment">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function ClinicEnvironmentPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.groups.place")}
        intro={t("environmentPage.intro")}
        breadcrumbs={[{ label: t("nav.clinic"), href: "/clinic" }, { label: t("nav.environment") }]}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <VideoTour
            title={t(`pages.${KEY}.title`)}
            fallbackImages={[
              { src: "/images/clinic/exterior.webp", caption: t("environmentPage.gallery.exterior") },
              { src: "/images/clinic/reception.webp", caption: t("environmentPage.gallery.reception") },
              { src: "/images/clinic/waiting-room.webp", caption: t("environmentPage.gallery.waiting") },
              { src: "/images/clinic/equipment.webp", caption: t("environmentPage.gallery.equipment") },
              { src: "/images/clinic/lounge.webp", caption: t("environmentPage.gallery.lounge") },
              { src: "/images/clinic/reception-sign.webp", caption: t("environmentPage.gallery.sign") },
              { src: "/images/clinic/treatment-room.webp", caption: t("environmentPage.gallery.room") },
            ]}
          />
          <div className="reveal mt-12 text-center">
            <Button external={site.social.instagram} variant="secondary" leadingIcon="instagram" icon={null}>
              {t("ui.followUs")}
            </Button>
          </div>
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
