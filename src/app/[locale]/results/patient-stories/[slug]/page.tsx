import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { getTestimonial, testimonials } from "@/content/testimonials";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { paragraphs } from "@/lib/style";

type Props = PageProps<"/[locale]/results/patient-stories/[slug]">;

export function generateStaticParams() {
  // All entries are listed (cacheComponents needs ≥ 1); unconsented ones 404 below.
  return testimonials.map((t) => ({ slug: t.slug }));
}

async function load(params: Props["params"]) {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  const story = getTestimonial(slug);
  if (!story || !story.consentConfirmed) notFound();
  return { locale, story };
}

export async function generateMetadata({ params }: Props) {
  const { locale, story } = await load(params);
  return buildMetadata({
    locale,
    path: `/results/patient-stories/${story.slug}`,
    title: story.patientName,
    description: story.quote[locale],
  });
}

export default async function PatientStoryPage({ params }: Props) {
  const { locale, story } = await load(params);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={story.patientName}
        eyebrow={story.country}
        intro={story.quote[locale]}
        breadcrumbs={[
          { label: t("nav.results"), href: "/results" },
          { label: t("nav.patientStories"), href: "/results/patient-stories" },
          { label: story.patientName },
        ]}
      />
      <article className="container-luxe max-w-3xl space-y-5 py-20 text-lg leading-relaxed text-brand-muted">
        {paragraphs(story.story[locale]).map((p, i) => (
          <p key={i} className="reveal">
            {p}
          </p>
        ))}
      </article>
      <CTABand title={t("ui.bookCta")} />
    </>
  );
}
