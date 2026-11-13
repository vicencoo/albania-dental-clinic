import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand } from "@/components/ui/CTABand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "discoverAlbania";
const PATH = "/dental-tourism/discover-albania";

/** Illustrated cards (CSS gradients) until licensed destination photos are added. */
const looks: { icon: IconName; bg: string }[] = [
  {
    icon: "sun",
    bg: "bg-[linear-gradient(160deg,#cfe7ea_0%,#7fb7c2_55%,#2f6f7c_100%)]",
  },
  {
    icon: "home",
    bg: "bg-[linear-gradient(160deg,#efe1cc_0%,#c9a77a_60%,#8a6a45_100%)]",
  },
  {
    icon: "map",
    bg: "bg-[linear-gradient(160deg,#dfe9d6_0%,#8fb07a_55%,#3f6b3a_100%)]",
  },
  {
    icon: "globe",
    bg: "bg-[linear-gradient(160deg,#f2d9d2_0%,#d48f7f_55%,#8f3f3a_100%)]",
  },
];

type Props = PageProps<"/[locale]/dental-tourism/discover-albania">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function DentalTourismDiscoverAlbaniaPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const places = t.raw("discoverPage.places") as {
    title: string;
    text: string;
  }[];

  return (
    <>
      <PageHero
        tone="sky"
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.tourism")}
        intro={t("discoverPage.intro")}
        breadcrumbs={[
          { label: t("nav.tourism"), href: "/dental-tourism" },
          { label: t("nav.discoverAlbania") },
        ]}
      />
      <section className="py-20 lg:py-24">
        <ul className="container-luxe grid gap-6 sm:grid-cols-2">
          {places.map((p, i) => (
            <li
              key={p.title}
              className={`reveal lift group relative flex min-h-80 flex-col justify-end overflow-clip rounded-4xl p-8 text-brand-white ${looks[i]?.bg ?? ""}`}
              style={stagger(i % 2)}
            >
              <Icon
                name={looks[i]?.icon ?? "map"}
                className="float absolute right-8 top-8 size-16 text-brand-white/40 transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-brand-ink/50 to-transparent"
                aria-hidden
              />
              <div className="relative">
                <h2 className="text-4xl">{p.title}</h2>
                <p className="mt-2 max-w-md text-brand-white/90">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="container-luxe reveal mt-10 flex items-center gap-2 text-sm text-brand-muted">
          <Icon name="heart" className="size-4 text-brand-gold" />{" "}
          {t("discoverPage.note")}
        </p>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
