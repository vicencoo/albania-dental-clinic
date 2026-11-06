import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { getJournalPost, journalPosts } from "@/content/journal";
import { site, siteUrl } from "@/content/site";
import { asLocale } from "@/lib/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";
import { paragraphs, readingMinutes } from "@/lib/style";

type Props = PageProps<"/[locale]/journal/[slug]">;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return journalPosts
    .filter((p) => (p.locales as string[]).includes(params.locale))
    .map((p) => ({ slug: p.slug }));
}

async function load(params: Props["params"]) {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  const post = getJournalPost(slug);
  if (!post || !post.locales.includes(locale)) notFound();
  return { locale, post };
}

export async function generateMetadata({ params }: Props) {
  const { locale, post } = await load(params);
  return {
    ...buildMetadata({
      locale,
      path: `/journal/${post.slug}`,
      title: post.title[locale],
      description: post.excerpt[locale],
      image: post.coverImage,
    }),
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { locale, post } = await load(params);
  setRequestLocale(locale);
  const t = await getTranslations();
  const title = post.title[locale];
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      {/* Reading progress (CSS scroll-driven animation) */}
      <div aria-hidden className="read-progress tricolor-line fixed inset-x-0 top-0 z-50 scale-x-0 rounded-none" />

      <PageHero
        title={title}
        intro={post.excerpt[locale]}
        breadcrumbs={[{ label: t("nav.journal"), href: "/journal" }, { label: title }]}
      >
        <p className="text-xs uppercase tracking-widest text-brand-muted">
          {t("ui.published")} <time dateTime={post.publishedAt}>{dateFmt.format(new Date(post.publishedAt))}</time> ·{" "}
          {t("ui.minRead", { minutes: readingMinutes(post.body[locale]) })}
        </p>
      </PageHero>

      <article className="container-luxe max-w-3xl py-16 lg:py-20">
        {post.coverImage && (
          <div className="reveal-scale relative mb-12 aspect-[16/9] overflow-clip rounded-[2rem] bg-brand-sand">
            <Image src={post.coverImage} alt="" fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
          </div>
        )}
        <div className="space-y-6 text-lg leading-[1.85] text-brand-ink/85">
          {paragraphs(post.body[locale]).map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "reveal first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-brand-green"
                  : "reveal"
              }
            >
              {p}
            </p>
          ))}
        </div>
        <p className="mt-10 flex items-center gap-2 border-t border-brand-sand pt-6 text-xs text-brand-muted">
          <Icon name="shield" className="size-4 text-brand-gold" /> {t("ui.medicalNote")}
        </p>
        <div className="mt-8">
          <Button href="/journal" variant="ghost" icon="arrowLeft">
            {t("ui.backToJournal")}
          </Button>
        </div>
      </article>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: post.excerpt[locale],
          datePublished: post.publishedAt,
          inLanguage: locale,
          image: post.coverImage ? `${siteUrl()}${post.coverImage}` : undefined,
          mainEntityOfPage: localizedUrl(locale, `/journal/${post.slug}`),
          author: { "@type": "Organization", name: site.name },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: { "@type": "ImageObject", url: `${siteUrl()}/images/brand/logo-full.png` },
          },
        }}
      />
    </>
  );
}
