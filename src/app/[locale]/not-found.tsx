import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function LocaleNotFound() {
  const t = useTranslations();
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-heading text-4xl">{t("pages.notFound.title")}</h1>
      <p className="mt-4 text-brand-muted">{t("pages.notFound.text")}</p>
      <div className="mt-8">
        <Button href="/">{t("ui.backHome")}</Button>
      </div>
    </div>
  );
}
