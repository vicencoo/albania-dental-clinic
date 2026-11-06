"use client";

import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, routing } from "@/i18n/routing";

/** AL · IT · EN — keeps the current path when switching language. */
export function LanguageSwitcher({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const t = useTranslations("ui");
  const locale = useLocale();
  const pathname = usePathname();
  const idle = tone === "light" ? "text-brand-muted hover:text-brand-ink" : "text-brand-white/60 hover:text-brand-white";
  const current = tone === "light" ? "text-brand-green" : "text-brand-gold-light";

  return (
    <nav aria-label={t("language")} className={`font-label text-xs tracking-widest ${className}`}>
      {routing.locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && (
            <span aria-hidden className="mx-1.5 text-brand-gold">
              ·
            </span>
          )}
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`transition-colors ${l === locale ? current : idle}`}
          >
            {localeLabels[l]}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
