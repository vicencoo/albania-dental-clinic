import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { site, siteUrl } from "@/content/site";
import { asLocale } from "@/lib/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";
import { readingMinutes } from "@/lib/style";
import { urlFor } from "@/sanity/client";
import { getPost, getPostSlugs } from "@/sanity/posts";

type Props = PageProps<"/[locale]/journal/[slug]">;

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="pt-6 text-3xl text-brand-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="pt-4 text-2xl text-brand-ink">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value).width(1600).url()}
        alt={value.alt ?? ""}
        width={1600}
        height={900}
        className="rounded-4xl"
      />
    ),
  },
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  // Cache Components needs at least one entry.
  return (slugs.length ? slugs : ["none"]).map((slug) => ({ slug }));
}

async function load(params: Props["params"]) {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  const post = await getPost(slug);
  if (!post) notFound();
  return { locale, post };
}

export async function generateMetadata({ params }: Props) {
  const { locale, post } = await load(params);
  return buildMetadata({
    locale,
    path: `/journal/${post.slug}`,
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
  });
}

export default async function JournalPostPage({ params }: Props) {
  const { locale, post } = await load(params);
  setRequestLocale(locale);
  const t = await getTranslations();
  const cover = post.mainImage ? urlFor(post.mainImage).width(1600).height(900).url() : undefined;
  const dateFmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Reading progress (CSS scroll-driven animation) */}
      <div
        aria-hidden
        className="read-progress tricolor-line fixed inset-x-0 top-0 z-50 transform-[scaleX(0)] rounded-none"
      />

      <PageHero
        title={post.title}
        intro={post.excerpt}
        breadcrumbs={[
          { label: t("nav.journal"), href: "/journal" },
          { label: post.title },
        ]}
      >
        <p className="text-xs uppercase tracking-widest text-brand-muted">
          {t("ui.published")}{" "}
          <time dateTime={post.publishedAt}>
            {dateFmt.format(new Date(post.publishedAt))}
          </time>{" "}
          · {t("ui.minRead", { minutes: readingMinutes(post.bodyText ?? "") })}
        </p>
      </PageHero>

      <article className="container-luxe max-w-3xl py-16 lg:py-20">
        {cover && (
          <div className="reveal-scale relative mb-12 aspect-video overflow-clip rounded-4xl bg-brand-sand">
            <Image
              src={cover}
              alt={post.mainImage?.alt ?? ""}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="space-y-6 text-lg leading-[1.85] text-brand-ink/85">
          <PortableText value={post.body} components={components} />
        </div>
        <p className="mt-10 flex items-center gap-2 border-t border-brand-sand pt-6 text-xs text-brand-muted">
          <Icon name="shield" className="size-4 text-brand-gold" />{" "}
          {t("ui.medicalNote")}
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
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          image: cover,
          mainEntityOfPage: localizedUrl(locale, `/journal/${post.slug}`),
          author: { "@type": "Organization", name: site.name },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl()}/images/brand/logo-full.png`,
            },
          },
        }}
      />
    </>
  );
}
