import { getTranslations, setRequestLocale } from "next-intl/server";
import { PackageCard } from "@/components/tourism/PackageCard";
import { CTABand } from "@/components/ui/CTABand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { packages } from "@/content/packages";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "packages";
const PATH = "/dental-tourism/packages";

type Props = PageProps<"/[locale]/dental-tourism/packages">;

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
        tone="sky"
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.tourism")}
        intro={t("packagesPage.intro")}
        breadcrumbs={[{ label: t("nav.tourism"), href: "/dental-tourism" }, { label: t("nav.packages") }]}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe space-y-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
          <p className="reveal flex items-center gap-2 text-sm text-brand-muted">
            <Icon name="euro" className="size-4 text-brand-gold" />
            {t("packagesPage.note")}
          </p>
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
