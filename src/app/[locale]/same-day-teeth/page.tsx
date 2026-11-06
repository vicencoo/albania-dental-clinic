import { getTranslations, setRequestLocale } from "next-intl/server";
import { BeforeAfterSlider } from "@/components/results/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqsByTopic } from "@/content/faq";
import { results } from "@/content/results";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "sameDay";
const PATH = "/same-day-teeth";
const icons: IconName[] = ["shield", "clock", "plane", "heart"];

type Props = PageProps<"/[locale]/same-day-teeth">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const benefits = t.raw("sameDay.benefits") as { title: string; text: string }[];
  const featured = results[0];

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.featured.sameDay.title")}
        intro={t("sameDay.intro")}
        breadcrumbs={[{ label: t("nav.sameDay") }]}
        image={{ src: "/images/treatments/implant-render.jpg", alt: t("nav.featured.sameDay.title") }}
      >
        <Button href="/book">{t("ui.bookCta")}</Button>
        <Button href="/same-day-teeth/candidates" variant="secondary">
          {t("sameDay.ctaCandidate")}
        </Button>
      </PageHero>

      <section className="py-24 lg:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow={t("sameDay.eyebrow")} title={t("sameDay.what.title")} intro={t("sameDay.what.text")} />
          {featured && (
            <div className="reveal-scale">
              <BeforeAfterSlider
                before={featured.beforeImage}
                after={featured.afterImage}
                alt={featured.title[locale]}
                ratio="aspect-[622/274]"
              />
            </div>
          )}
        </div>

        <ul className="container-luxe mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <li key={b.title} className="reveal-rotate lift rounded-[1.75rem] bg-brand-porcelain p-7" style={stagger(i)}>
              <Icon name={icons[i] ?? "check"} className="size-7 text-brand-green" />
              <h3 className="mt-5 text-2xl">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="obsidian relative overflow-clip py-24 lg:py-32">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading title={t("sameDay.whyHere.title")} intro={t("sameDay.whyHere.text")} tone="dark" />
          <div className="reveal flex flex-wrap gap-4">
            <Button href="/same-day-teeth/how-it-works" variant="light">
              {t("sameDay.ctaHow")}
            </Button>
            <Button href="/clinic/why-one-of-two" variant="outline-light">
              {t("nav.whyOneOfTwo")}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-luxe max-w-4xl">
          <SectionHeading title={t("ui.faqTitle")} />
          <div className="mt-10">
            <FAQAccordion items={getFaqsByTopic("same-day")} />
          </div>
        </div>
      </section>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
