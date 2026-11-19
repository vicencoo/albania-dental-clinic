import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site, siteUrl } from "@/content/site";
import { asLocale } from "@/lib/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";
import { readingMinutes } from "@/lib/style";
import { urlFor } from "@/sanity/client";
import { Link } from "@/i18n/navigation";
import { categoryLabels } from "@/sanity/categories";
import { getPost, getPostSlugs } from "@/sanity/posts";

type Props = PageProps<"/[locale]/blog/[slug]">;

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
    path: `/blog/${post.slug}`,
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, post } = await load(params);
  setRequestLocale(locale);
  const t = await getTranslations();
  // Wide, uncropped source: the full-width cover is cropped by CSS (object-cover).
  const cover = post.mainImage ? urlFor(post.mainImage).width(2400).auto("format").url() : undefined;
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

      {/* Header: cover photo as a soft background under a white wash, title on top.
          The wash + light blur also hides covers that are not very sharp. */}
      <header className="relative overflow-clip bg-brand-porcelain">
        {cover && (
          <>
            <Image
              src={cover}
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover blur-[1px]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-b from-brand-white/55 via-brand-white/70 to-brand-white"
            />
          </>
        )}
        <div className="container-luxe relative max-w-3xl py-16 lg:py-28">
          {/* Breadcrumb trail kept for search engines and screen readers only. */}
          <div className="sr-only">
            <Breadcrumbs items={[{ label: t("nav.blog"), href: "/blog" }, { label: post.title }]} />
          </div>
          <div className="flex items-center justify-between gap-6 text-xs uppercase tracking-[0.18em]">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-brand-green transition-colors hover:text-brand-ink"
            >
              <Icon
                name="arrowLeft"
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
              {t("ui.backToBlog")}
            </Link>
            {post.category && categoryLabels[post.category] && (
              <span className="text-right text-brand-green">{categoryLabels[post.category]}</span>
            )}
          </div>
          <h1 className="rise display mt-10 text-4xl text-brand-ink sm:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-muted">
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" className="size-4" />
              <time dateTime={post.publishedAt}>{dateFmt.format(new Date(post.publishedAt))}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="clock" className="size-4" />
              {t("ui.minRead", { minutes: readingMinutes(post.bodyText ?? "") })}
            </span>
          </p>
        </div>
      </header>

      <article className="container-luxe max-w-3xl py-12 lg:py-16">
        {post.excerpt && <p className="text-xl leading-relaxed text-brand-ink/75">{post.excerpt}</p>}
        <hr className="my-10 border-brand-sand" />
        <div className="space-y-6 text-lg leading-[1.85] text-brand-ink/85">
          <PortableText value={post.body} components={components} />
        </div>
        <p className="mt-10 flex items-center gap-2 border-t border-brand-sand pt-6 text-xs text-brand-muted">
          <Icon name="shield" className="size-4 text-brand-gold" />{" "}
          {t("ui.medicalNote")}
        </p>
        <div className="mt-8">
          <Button href="/blog" variant="ghost" leadingIcon="arrowLeft" icon={null}>
            {t("ui.backToBlog")}
          </Button>
        </div>
      </article>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          image: cover,
          mainEntityOfPage: localizedUrl(locale, `/blog/${post.slug}`),
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
