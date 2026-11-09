import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { journalPosts } from "@/content/journal";
import { Link } from "@/i18n/navigation";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { readingMinutes, stagger } from "@/lib/style";

const KEY = "journal";
const PATH = "/journal";

type Props = PageProps<"/[locale]/journal">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const posts = journalPosts
    .filter((post) => post.locales.includes(locale))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const dateFmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        intro={t("journalPage.intro")}
        breadcrumbs={[{ label: t("nav.journal") }]}
      />
      <section className="py-20 lg:py-24">
        <ul className="container-luxe grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className={`reveal ${i === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}
              style={stagger(i % 3)}
            >
              <Link
                href={`/journal/${post.slug}`}
                className={`lift group grid h-full overflow-clip rounded-4xl border border-brand-sand bg-brand-white ${
                  i === 0 ? "lg:grid-cols-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-clip bg-brand-sand ${i === 0 ? "aspect-16/10 lg:aspect-auto" : "aspect-16/10"}`}
                >
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="zoom-target object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col p-8">
                  <p className="text-xs uppercase tracking-widest text-brand-muted">
                    <time dateTime={post.publishedAt}>
                      {dateFmt.format(new Date(post.publishedAt))}
                    </time>{" "}
                    ·{" "}
                    {t("ui.minRead", {
                      minutes: readingMinutes(post.body[locale]),
                    })}
                  </p>
                  <h2
                    className={`mt-4 transition-colors group-hover:text-brand-green ${i === 0 ? "text-4xl lg:text-5xl" : "text-3xl"}`}
                  >
                    {post.title[locale]}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-brand-muted">
                    {post.excerpt[locale]}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-brand-green">
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
