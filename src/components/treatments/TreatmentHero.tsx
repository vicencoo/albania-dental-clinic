import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import type { Crumb } from "@/components/ui/Breadcrumbs";

export interface TreatmentHeroProps {
  title: string;
  category: string;
  intro?: string;
  image?: string;
  breadcrumbs: Crumb[];
  tone?: "warm" | "sky";
}

/** Treatment page hero. */
export function TreatmentHero({ title, category, intro, image, breadcrumbs, tone }: TreatmentHeroProps) {
  const t = useTranslations("ui");
  return (
    <PageHero
      title={title}
      eyebrow={category}
      intro={intro}
      breadcrumbs={breadcrumbs}
      tone={tone}
      image={image ? { src: image, alt: title } : undefined}
    >
      <Button href="/book">{t("bookCta")}</Button>
      <Button href="/prices" variant="ghost">
        {t("priceOnRequest")}
      </Button>
    </PageHero>
  );
}
