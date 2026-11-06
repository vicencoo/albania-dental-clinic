import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/ui/LegalPage";
import { asLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

const KEY = "accessibility";
const PATH = "/accessibility";

type Props = PageProps<"/[locale]/accessibility">;

export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), KEY, PATH);
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  return <LegalPage title={t(`pages.${KEY}.title`)} sectionsKey={KEY} label={t("nav.accessibility")} />;
}
