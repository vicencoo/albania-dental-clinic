import { getTranslations, setRequestLocale } from "next-intl/server";
import { CandidateCheck } from "@/components/same-day/CandidateCheck";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "sameDayCandidates";
const PATH = "/same-day-teeth/candidates";

type Props = PageProps<"/[locale]/same-day-teeth/candidates">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function SameDayTeethCandidatesPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const good = t.raw("sameDayCandidates.good.items") as string[];
  const evaluate = t.raw("sameDayCandidates.evaluate.items") as string[];

  return (
    <>
      <PageHero
        title={t(`pages.${KEY}.title`)}
        eyebrow={t("nav.sameDay")}
        intro={t("sameDayCandidates.intro")}
        breadcrumbs={[
          { label: t("nav.sameDay"), href: "/same-day-teeth" },
          { label: t("nav.sameDayCandidates") },
        ]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-luxe grid gap-8 lg:grid-cols-2">
          <div className="reveal rounded-4xl border border-brand-sand bg-brand-white p-8 sm:p-10">
            <h2 className="text-3xl">{t("sameDayCandidates.good.title")}</h2>
            <ul className="mt-6 space-y-4">
              {good.map((item, i) => (
                <li key={item} className="reveal flex gap-3" style={stagger(i)}>
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-green text-brand-white">
                    <Icon name="check" className="size-3.5" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="reveal rounded-4xl bg-brand-porcelain p-8 sm:p-10"
            style={stagger(1)}
          >
            <h2 className="text-3xl">
              {t("sameDayCandidates.evaluate.title")}
            </h2>
            <ul className="mt-6 space-y-4">
              {evaluate.map((item, i) => (
                <li key={item} className="reveal flex gap-3" style={stagger(i)}>
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-brand-gold text-brand-gold">
                    <Icon name="shield" className="size-3.5" />
                  </span>
                  <span className="leading-relaxed text-brand-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-luxe mt-16 max-w-4xl">
          <p className="reveal mb-6 text-center text-brand-muted">
            {t("sameDayCandidates.check.intro")}
          </p>
          <div className="reveal-scale">
            <CandidateCheck />
          </div>
          <p className="mt-6 text-center text-xs text-brand-muted">
            {t("ui.medicalNote")}
          </p>
        </div>
      </section>
    </>
  );
}
