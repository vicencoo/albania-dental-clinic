import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Link } from "@/i18n/navigation";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { readingMinutes, stagger } from "@/lib/style";
import { urlFor } from "@/sanity/client";
import { categoryLabels } from "@/sanity/categories";
import { getPosts } from "@/sanity/posts";

const KEY = "blog";
const PATH = "/blog";

type Props = PageProps<"/[locale]/blog">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const posts = await getPosts();
  const dateFmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        intro={t("blogPage.intro")}
        breadcrumbs={[{ label: t("nav.blog") }]}
      />
      <section className="py-20 lg:py-24">
        <ul className="container-luxe grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post._id} className="reveal" style={stagger(i % 3)}>
              <Link
                href={`/blog/${post.slug}`}
                className="lift group flex h-full flex-col overflow-clip rounded-3xl border border-brand-sand bg-brand-white"
              >
                <div className="relative aspect-16/10 overflow-clip bg-brand-sand">
                  {post.mainImage?.asset && (
                    <Image
                      src={urlFor(post.mainImage).width(1600).height(1000).auto("format").url()}
                      alt={post.mainImage.alt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="zoom-target object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {post.category && categoryLabels[post.category] && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green">
                      {categoryLabels[post.category]}
                    </p>
                  )}
                  <p className="text-xs uppercase tracking-widest text-brand-muted">
                    <time dateTime={post.publishedAt}>
                      {dateFmt.format(new Date(post.publishedAt))}
                    </time>{" "}
                    ·{" "}
                    {t("ui.minRead", {
                      minutes: readingMinutes(post.bodyText ?? ""),
                    })}
                  </p>
                  <h2 className="mt-3 text-2xl leading-tight transition-colors group-hover:text-brand-green">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-muted">{post.excerpt}</p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-brand-green">
                    {t("ui.readMore")}
                    <Icon
                      name="arrow"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
