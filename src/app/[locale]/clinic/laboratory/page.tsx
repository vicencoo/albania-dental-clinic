import { getTranslations, setRequestLocale } from "next-intl/server";
import { LabShowcase } from "@/components/clinic/LabShowcase";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "laboratory";
const PATH = "/clinic/laboratory";

type Props = PageProps<"/[locale]/clinic/laboratory">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function ClinicLaboratoryPage({ params }: Props) {
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
      <section className="py-20 sky-wash lg:py-28">
        <div className="container-luxe">
          <SectionHeading title={t("laboratoryPage.videosTitle")} />
          {/* Short muted clips, loaded only when played (preload="none" + poster). */}
          <div className="mt-10 grid items-start gap-6 md:grid-cols-[0.45fr_1fr]">
            {[
              { src: "/videos/lab-design.mp4", poster: "/videos/lab-design-poster.webp", caption: "design", ratio: "aspect-[9/16]" },
              { src: "/videos/lab-milling.mp4", poster: "/videos/lab-milling-poster.webp", caption: "milling", ratio: "aspect-video" },
            ].map((v) => (
              <figure key={v.src} className="reveal-scale">
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                  poster={v.poster}
                  aria-label={t(`laboratoryPage.${v.caption}`)}
                  className={`w-full rounded-4xl bg-brand-navy object-cover shadow-soft ${v.ratio}`}
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-sm text-brand-muted">{t(`laboratoryPage.${v.caption}`)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
