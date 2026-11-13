import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "whyChooseUs";
const PATH = "/clinic/why-choose-us";
const icons: IconName[] = ["cube", "target", "lab", "user"];

type Props = PageProps<"/[locale]/clinic/why-choose-us">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function ClinicWhyChooseUsPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const reasons = t.raw("whyPage.reasons") as { title: string; text: string }[];

  return (
    <>
      <PageHero
        title={t("nav.featured.clinic.title")}
        eyebrow={t("nav.whyChooseUs")}
        intro={t("whyPage.intro")}
        breadcrumbs={[{ label: t("nav.clinic"), href: "/clinic" }, { label: t("nav.whyChooseUs") }]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="reveal-scale relative mx-auto aspect-square w-full max-w-sm">
            <div className="spin-slow absolute inset-0 rounded-full border border-dashed border-brand-gold/50" />
            <div className="absolute inset-8 grid place-items-center rounded-full bg-brand-forest shadow-soft">
              <Image src="/images/brand/logo-mark.png" alt="" width={180} height={180} className="float w-1/2" />
            </div>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <li key={r.title} className="reveal-flip lift rounded-[1.75rem] border border-brand-sand bg-brand-white p-7" style={stagger(i)}>
                <Icon name={icons[i] ?? "check"} className={`size-7 ${i === 0 ? "text-brand-blue" : "text-brand-green"}`} />
                <h2 className="mt-5 text-2xl">{r.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="container-luxe mt-20 max-w-3xl text-center">
          <span aria-hidden className="ornament reveal mx-auto w-48 text-xs">◆</span>
          <p className="reveal mt-8 font-heading text-3xl leading-snug sm:text-4xl">{t("whyPage.closing")}</p>
          <div className="reveal mt-10">
            <Button href="/same-day-teeth/how-it-works">{t("sameDay.ctaHow")}</Button>
          </div>
        </div>
      </section>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
