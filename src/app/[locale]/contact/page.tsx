import { getTranslations, setRequestLocale } from "next-intl/server";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { isPlaceholder, site } from "@/content/site";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { dentistSchema } from "@/lib/schema";

const KEY = "contact";
const PATH = "/contact";

type Props = PageProps<"/[locale]/contact">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const hasMap = !isPlaceholder(site.geo.lat) && !isPlaceholder(site.geo.lng);

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        intro={t("contactPage.intro")}
        breadcrumbs={[{ label: t("nav.contact") }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.8fr_1.5fr] lg:items-start">
          <aside className="space-y-8 lg:sticky lg:top-28">
            <ContactDetails />
            {hasMap && (
              <div className="reveal-scale overflow-clip rounded-4xl border border-brand-sand">
                <MapEmbed
                  title={site.name}
                  src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`}
                />
              </div>
            )}
          </aside>
          <div className="reveal-scale">
            <ConsultationForm defaultInterest="other" />
          </div>
        </div>
      </section>
      <JsonLd data={dentistSchema()} />
    </>
  );
}
