import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvironmentPreview } from "@/components/home/EnvironmentPreview";
import { Hero } from "@/components/home/Hero";
import { OneRoofSection } from "@/components/home/OneRoofSection";
import { ResultsPreview } from "@/components/home/ResultsPreview";
import { StoriesPreview } from "@/components/home/StoriesPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { TourismPreview } from "@/components/home/TourismPreview";
import { TreatmentsPreview } from "@/components/home/TreatmentsPreview";
import { TrustStrip } from "@/components/home/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { dentistSchema } from "@/lib/schema";

type Props = PageProps<"/[locale]">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), "home", "/");
}

export default async function HomePage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <Hero />
      <TrustStrip />
      <OneRoofSection />
      <TreatmentsPreview />
      <ResultsPreview />
      <TeamPreview />
      <EnvironmentPreview />
      <TourismPreview />
      <StoriesPreview />
      <CTABand title={t("ui.bookCta")} text={t("ui.announcement")} />
      <JsonLd data={dentistSchema()} />
    </>
  );
}
