import { getTranslations, setRequestLocale } from "next-intl/server";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "book";
const PATH = "/book";

type Props = PageProps<"/[locale]/book">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const next = t.raw("bookPage.next") as string[];

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        intro={t("bookPage.intro")}
        breadcrumbs={[{ label: t("nav.book") }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_0.8fr] lg:items-start">
          <div className="reveal-scale">
            <ConsultationForm />
          </div>
          <aside className="space-y-8 lg:sticky lg:top-28">
            <div className="reveal rounded-4xl bg-brand-forest p-8 text-brand-white">
              <h2 className="text-3xl">{t("bookPage.nextTitle")}</h2>
              <ol className="mt-6 space-y-5">
                {next.map((item, i) => (
                  <li
                    key={item}
                    className="reveal flex gap-4"
                    style={stagger(i)}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-gold-light font-heading text-brand-gold-light">
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
      </section>
    </>
  );
}
