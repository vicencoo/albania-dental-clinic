"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, localeNames, routing } from "@/i18n/routing";
import { Icon } from "@/components/ui/Icon";

interface LanguageSwitcherProps {
  className?: string;
  /**
   * "dropdown" — compact globe button with a small menu (desktop header).
   * "inline"   — segmented AL | IT | EN control (mobile drawer).
   */
  variant?: "dropdown" | "inline";
}

/** Keeps the current path when switching language. */
export function LanguageSwitcher({ className = "", variant = "dropdown" }: LanguageSwitcherProps) {
  const t = useTranslations("ui");
  const locale = useLocale();
  const pathname = usePathname();

  if (variant === "inline") {
    return (
      <nav aria-label={t("language")} className={className}>
        <ul className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
          {routing.locales.map((l) => (
            <li key={l}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                  l === locale ? "bg-brand-white text-brand-obsidian" : "text-brand-white/60 hover:text-brand-white"
                }`}
              >
                {localeLabels[l]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return <LanguageDropdown className={className} />;
}

function LanguageDropdown({ className }: { className: string }) {
  const t = useTranslations("ui");
  const locale = useLocale();
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click and Esc.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t("language")}: ${localeNames[locale as keyof typeof localeNames]}`}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.8rem] font-semibold text-brand-white/75 transition-colors hover:bg-white/[0.06] hover:text-brand-white ${
          open ? "bg-white/[0.06] text-brand-white" : ""
        }`}
      >
        <Icon name="globe" className="size-4" />
        {localeLabels[locale as keyof typeof localeLabels]}
        <Icon
          name="chevronDown"
          className={`size-3.5 opacity-60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        id={menuId}
        hidden={!open}
        className="absolute right-0 top-full mt-2 w-44 overflow-clip rounded-2xl border border-white/10 bg-brand-obsidian-soft p-1.5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.8)]"
      >
        {routing.locales.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={current ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/[0.06] ${
                  current ? "text-brand-leaf" : "text-brand-white/80 hover:text-brand-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-5 text-[0.7rem] font-semibold tracking-wide text-brand-white/40">
                    {localeLabels[l]}
                  </span>
                  {localeNames[l]}
                </span>
                {current && <Icon name="check" className="size-4" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
