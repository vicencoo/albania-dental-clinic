import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand } from "@/components/ui/CTABand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "travel";
const PATH = "/dental-tourism/travel";
const icons: IconName[] = ["plane", "shield", "euro", "globe"];

type Props = PageProps<"/[locale]/dental-tourism/travel">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const sections = t.raw("travelPage.sections") as { title: string; text: string }[];

  return (
    <>
      <PageHero
        tone="sky"
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.tourism")}
        intro={t("travelPage.intro")}
        breadcrumbs={[{ label: t("nav.tourism"), href: "/dental-tourism" }, { label: t("nav.travel") }]}
      />
      <section className="py-20 lg:py-24">
        <ul className="container-luxe grid gap-6 md:grid-cols-2">
          {sections.map((s, i) => (
            <li key={s.title} className={`${i % 2 ? "reveal-left" : "reveal-right"} lift flex gap-6 rounded-[2rem] border border-brand-sand bg-brand-white p-8`} style={stagger(i % 2)}>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-sky text-brand-blue">
                <Icon name={icons[i] ?? "check"} className="size-6" />
              </span>
              <div>
                <h2 className="text-3xl">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-brand-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
