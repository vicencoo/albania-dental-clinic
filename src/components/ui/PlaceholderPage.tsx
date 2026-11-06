import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PlaceholderPageProps {
  title: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Temporary page shell used until each page gets its final design. */
export function PlaceholderPage({ title, breadcrumbs, children }: PlaceholderPageProps) {
  const t = useTranslations("ui");
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-6">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <h1 className="mt-4 font-heading text-4xl lg:text-5xl">{title}</h1>
      <p className="mt-4 text-brand-muted">{t("placeholder")}</p>
      {children && <div className="mt-10 space-y-10">{children}</div>}
    </div>
  );
}
