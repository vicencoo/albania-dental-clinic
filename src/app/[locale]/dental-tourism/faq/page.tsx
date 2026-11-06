import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { faqTopics, faqs, getFaqsByTopic } from "@/content/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "faq";
const PATH = "/dental-tourism/faq";

type Props = PageProps<"/[locale]/dental-tourism/faq">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const topics = faqTopics.filter((topic) => getFaqsByTopic(topic).length > 0);

  return (
    <>
      <PageHero
        tone="sky"
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.tourism")}
        intro={t("faqPage.intro")}
        breadcrumbs={[{ label: t("nav.tourism"), href: "/dental-tourism" }, { label: t("nav.faq") }]}
      >
        <nav aria-label={t("nav.faq")} className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <a
              key={topic}
              href={`#${topic}`}
              className="hero-pill"
            >
              {t(`faqPage.topics.${topic}`)}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="py-20 lg:py-24">
        <div className="container-luxe max-w-4xl space-y-16">
          {topics.map((topic) => (
            <div key={topic} id={topic}>
              <h2 className="reveal text-4xl">{t(`faqPage.topics.${topic}`)}</h2>
              <div className="mt-6">
                <FAQAccordion items={getFaqsByTopic(topic)} schema={false} />
              </div>
            </div>
          ))}
          <div className="reveal rounded-[2rem] bg-brand-porcelain p-8 text-center">
            <p className="font-heading text-3xl">{t("ui.askQuestion")}</p>
            <div className="mt-6">
              <Button href="/contact">{t("nav.contact")}</Button>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question[locale],
            acceptedAnswer: { "@type": "Answer", text: faq.answer[locale] },
          })),
        }}
      />
    </>
  );
}
