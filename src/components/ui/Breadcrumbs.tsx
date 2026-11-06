import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPath } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export interface Crumb {
  label: string;
  href?: AppPath;
}

/** Home is prepended automatically; the last item is the current page. Emits BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const all: Crumb[] = [{ label: t("nav.home"), href: "/" }, ...items];

  return (
    <>
      <nav
        aria-label={t("ui.breadcrumbs")}
        className={tone === "light" ? "text-xs text-brand-muted" : "text-xs text-brand-white/70"}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-brand-gold">
                    ◆
                  </span>
                )}
                {isLast || !crumb.href ? (
                  <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="link-underline hover:text-current">
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            ...(crumb.href ? { item: localizedUrl(locale, crumb.href) } : {}),
          })),
        }}
      />
    </>
  );
}
