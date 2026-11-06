import { getTranslations, setRequestLocale } from "next-intl/server";
import { TestimonialCard } from "@/components/results/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/content/site";
import { publishedTestimonials } from "@/content/testimonials";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "patientStories";
const PATH = "/results/patient-stories";

type Props = PageProps<"/[locale]/results/patient-stories">;

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
        eyebrow={t("nav.results")}
        intro={t("storiesPage.intro")}
        breadcrumbs={[{ label: t("nav.results"), href: "/results" }, { label: t("nav.patientStories") }]}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          {publishedTestimonials.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {publishedTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.slug} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className="reveal mx-auto max-w-2xl rounded-[2rem] bg-brand-porcelain p-10 text-center">
              <Icon name="heart" className="mx-auto size-10 text-brand-gold" />
              <p className="mt-5 text-lg text-brand-muted">{t("ui.noStoriesYet")}</p>
              <div className="mt-8">
                <Button external={site.social.instagram} variant="secondary" leadingIcon="instagram" icon={null}>
                  {t("ui.followUs")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
