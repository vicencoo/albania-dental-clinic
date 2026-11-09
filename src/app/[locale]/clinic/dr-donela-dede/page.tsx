import { getTranslations, setRequestLocale } from "next-intl/server";
import { DoctorProfile } from "@/components/clinic/DoctorProfile";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { leadDoctor } from "@/content/team";
import { asLocale } from "@/lib/locale";
import { localizedUrl, pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/style";

const KEY = "drDede";
const PATH = "/clinic/dr-donela-dede";
const icons: IconName[] = ["heart", "target", "user"];

type Props = PageProps<"/[locale]/clinic/dr-donela-dede">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();
  const approach = t.raw("drDede.approach") as {
    title: string;
    text: string;
  }[];

  return (
    <>
      <PageHero
        title={leadDoctor.name}
        eyebrow={t("drDede.eyebrow")}
        intro={t("drDede.intro")}
        breadcrumbs={[
          { label: t("nav.clinic"), href: "/clinic" },
          { label: t("nav.drDede") },
        ]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-luxe">
          <DoctorProfile member={leadDoctor} />
        </div>
      </section>

      <section className="bg-brand-porcelain py-20 grain lg:py-24">
        <div className="container-luxe">
          <SectionHeading title={t("drDede.approachTitle")} align="center" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {approach.map((a, i) => (
              <li
                key={a.title}
                className="reveal lift rounded-4xl bg-brand-white p-8 text-center"
                style={stagger(i)}
              >
                <span className="reveal-spin mx-auto grid size-14 place-items-center rounded-full bg-brand-green text-brand-white">
                  <Icon name={icons[i] ?? "check"} className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {a.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Physician",
          name: leadDoctor.name,
          jobTitle: leadDoctor.role[locale],
          url: localizedUrl(locale, PATH),
          medicalSpecialty: "Dentistry",
          knowsAbout: leadDoctor.specialties.map((s) => s[locale]),
          worksFor: { "@type": "Dentist", name: site.name },
        }}
      />
    </>
  );
}
