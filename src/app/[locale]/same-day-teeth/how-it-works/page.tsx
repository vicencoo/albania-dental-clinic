import { getTranslations, setRequestLocale } from "next-intl/server";
import { DayTimeline } from "@/components/same-day/DayTimeline";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "sameDayHow";
const PATH = "/same-day-teeth/how-it-works";

type Props = PageProps<"/[locale]/same-day-teeth/how-it-works">;

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
        eyebrow={t("nav.sameDay")}
        intro={t("sameDayHow.intro")}
        breadcrumbs={[{ label: t("nav.sameDay"), href: "/same-day-teeth" }, { label: t("nav.sameDayHow") }]}
        image={{ src: "/images/clinic/tech-3d-ct-scan.jpg", alt: t("treatments.items.3d-ct-scan") }}
      />

      <section className="bg-brand-porcelain py-20 grain lg:py-28">
        <div className="container-luxe max-w-4xl">
          <DayTimeline />
          <p className="reveal mt-12 flex gap-3 rounded-2xl border border-brand-gold/40 bg-brand-white p-5 text-sm leading-relaxed text-brand-muted">
            <Icon name="shield" className="size-5 shrink-0 text-brand-gold" />
            {t("sameDayHow.note")}
          </p>
          <div className="reveal mt-10">
            <Button href="/same-day-teeth/candidates" variant="secondary">
              {t("sameDay.ctaCandidate")}
            </Button>
          </div>
        </div>
      </section>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
