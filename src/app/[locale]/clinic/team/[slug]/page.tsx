import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DoctorProfile } from "@/components/clinic/DoctorProfile";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { getTeamMember, team } from "@/content/team";
import { redirect } from "@/i18n/navigation";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = PageProps<"/[locale]/clinic/team/[slug]">;

export function generateStaticParams() {
  // The lead doctor has a dedicated page (/clinic/dr-donela-dede).
  return team.filter((m) => !m.isLead).map((m) => ({ slug: m.slug }));
}

async function load(params: Props["params"]) {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  const member = getTeamMember(slug);
  if (!member) notFound();
  if (member.isLead) redirect({ href: "/clinic/dr-donela-dede", locale });
  return { locale, member };
}

export async function generateMetadata({ params }: Props) {
  const { locale, member } = await load(params);
  return buildMetadata({
    locale,
    path: `/clinic/team/${member.slug}`,
    title: member.name,
    description: member.role[locale],
    image: member.photo,
    // Placeholder entries stay out of search engines until real data is added.
    noindex: /^\[.*\]$/.test(member.name),
  });
}

export default async function TeamMemberPage({ params }: Props) {
  const { locale, member } = await load(params);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={member.name}
        eyebrow={member.role[locale]}
        breadcrumbs={[
          { label: t("nav.clinic"), href: "/clinic" },
          { label: t("nav.team"), href: "/clinic/team" },
          { label: member.name },
        ]}
      />
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <DoctorProfile member={member} />
        </div>
      </section>
      <CTABand title={t("ui.bookCta")} />
    </>
  );
}
