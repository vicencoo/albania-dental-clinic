import { getTranslations, setRequestLocale } from "next-intl/server";
import { TechnologyCard } from "@/components/clinic/TechnologyCard";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { technologies } from "@/content/technology";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "technology";
const PATH = "/clinic/technology";

type Props = PageProps<"/[locale]/clinic/technology">;

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
        eyebrow={t("nav.groups.place")}
        intro={t("technologyPage.intro")}
        tone="sky"
        breadcrumbs={[{ label: t("nav.clinic"), href: "/clinic" }, { label: t("nav.technology") }]}
        image={{ src: "/images/clinic/tech-cbct-unit.jpg", alt: t("environmentPage.gallery.cbct") }}
      />
      <section className="py-20 lg:py-28">
        <div className="container-luxe space-y-24">
          {technologies.map((technology, i) => (
            <TechnologyCard key={technology.slug} technology={technology} reverse={i % 2 === 1} index={i} />
          ))}
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
