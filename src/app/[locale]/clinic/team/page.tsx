import { getTranslations, setRequestLocale } from "next-intl/server";
import { TeamCard } from "@/components/clinic/TeamCard";
import { CTABand } from "@/components/ui/CTABand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { publishedTeam } from "@/content/team";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "team";
const PATH = "/clinic/team";

type Props = PageProps<"/[locale]/clinic/team">;

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
        eyebrow={t("nav.groups.people")}
        intro={t("teamPage.intro")}
        breadcrumbs={[
          { label: t("nav.clinic"), href: "/clinic" },
          { label: t("nav.team") },
        ]}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <ul className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publishedTeam.map((member, i) => (
              <li key={member.slug} className="reveal" style={stagger(i)}>
                <TeamCard member={member} />
              </li>
            ))}
            <li className="reveal" style={stagger(publishedTeam.length)}>
              <div className="grid h-full min-h-72 place-items-center rounded-4xl border border-dashed border-brand-gold/50 bg-brand-porcelain p-8 text-center">
                <div>
                  <Icon
                    name="user"
                    className="mx-auto size-10 text-brand-gold"
                  />
                  <p className="mt-4 text-sm text-brand-muted">
                    {t("teamPage.comingSoon")}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
    </>
  );
}
