import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ApartmentGallery } from "@/components/tourism/ApartmentGallery";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { apartments, getApartment } from "@/content/apartments";
import { isPlaceholder } from "@/content/site";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

type Props = PageProps<"/[locale]/dental-tourism/apartments/[slug]">;

export function generateStaticParams() {
  return apartments.map((a) => ({ slug: a.slug }));
}

async function load(params: Props["params"]) {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  const apartment = getApartment(slug);
  if (!apartment) notFound();
  return { locale, apartment };
}

export async function generateMetadata({ params }: Props) {
  const { locale, apartment } = await load(params);
  return buildMetadata({
    locale,
    path: `/dental-tourism/apartments/${apartment.slug}`,
    title: apartment.name[locale],
    description: apartment.description[locale],
    image: apartment.images[0],
  });
}

export default async function ApartmentPage({ params }: Props) {
  const { locale, apartment } = await load(params);
  setRequestLocale(locale);
  const t = await getTranslations();
  const name = apartment.name[locale];
  const next = t.raw("bookPage.next") as string[];
  const facts = [
    !isPlaceholder(apartment.location) && { icon: "pin" as const, text: apartment.location },
    !isPlaceholder(apartment.distanceToClinic) && { icon: "map" as const, text: apartment.distanceToClinic },
    apartment.capacity && { icon: "user" as const, text: String(apartment.capacity) },
  ].filter(Boolean) as { icon: "pin" | "map" | "user"; text: string }[];

  return (
    <>
      <PageHero
        title={name}
        eyebrow={t("nav.apartments")}
        intro={apartment.description[locale]}
        breadcrumbs={[
          { label: t("nav.tourism"), href: "/dental-tourism" },
          { label: t("nav.apartments"), href: "/dental-tourism/apartments" },
          { label: name },
        ]}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe space-y-14">
          <div className="reveal">
            <ApartmentGallery images={apartment.images} title={name} />
          </div>

          {(facts.length > 0 || apartment.amenities.length > 0) && (
            <ul className="flex flex-wrap gap-3">
              {facts.map((f) => (
                <li key={f.text} className="flex items-center gap-2 rounded-full bg-brand-porcelain px-4 py-2 text-sm">
                  <Icon name={f.icon} className="size-4 text-brand-gold" /> {f.text}
                </li>
              ))}
              {apartment.amenities.map((a) => (
                <li key={a.en} className="flex items-center gap-2 rounded-full bg-brand-porcelain px-4 py-2 text-sm">
                  <Icon name="check" className="size-4 text-brand-gold" /> {a[locale]}
                </li>
              ))}
            </ul>
          )}

          {/* Apartments are for patients during treatment (not daily rental): same request as /book */}
          <div id="request" className="scroll-mt-28">
            <div className="max-w-2xl">
              <h2 className="reveal text-4xl">{t("apartmentsPage.formTitle")}</h2>
              <p className="reveal mt-3 text-lg text-brand-muted" style={stagger(1)}>
                {t("apartmentsPage.formText")}
              </p>
            </div>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_0.8fr] lg:items-start">
              <div className="reveal-scale">
                <ConsultationForm defaultInterest="tourism" apartment={apartment.slug} />
              </div>
              <aside className="space-y-8 lg:sticky lg:top-28">
                <div className="reveal rounded-[2rem] bg-brand-navy p-8 text-brand-white">
                  <h3 className="text-3xl">{t("bookPage.nextTitle")}</h3>
                  <ol className="mt-6 space-y-5">
                    {next.map((item, i) => (
                      <li key={item} className="reveal flex gap-4" style={stagger(i)}>
                        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-sky-mid font-heading text-brand-sky-mid">
                          {i + 1}
                        </span>
                        <span className="pt-1 text-brand-white/85">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <ContactDetails />
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
