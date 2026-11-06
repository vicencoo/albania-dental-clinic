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

export default async function Page({ params }: Props) {
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
          {/* TODO: pass src/poster once the clinic supplies a video tour */}
          <VideoTour
            title={t(`pages.${KEY}.title`)}
            fallbackImages={[
              { src: "/images/clinic/treatment-room.jpg", caption: t("environmentPage.gallery.room") },
              { src: "/images/treatments/children.jpg", caption: t("environmentPage.gallery.children") },
              { src: "/images/clinic/tech-cbct-unit.jpg", caption: t("environmentPage.gallery.cbct") },
              { src: "/images/team/dr-donela-dede-with-patient.jpg", caption: t("environmentPage.gallery.doctor") },
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
