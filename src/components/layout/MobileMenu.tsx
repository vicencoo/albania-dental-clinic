"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { bookHref, isActivePath, mainNav } from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Mobile full-screen drawer with accordion sections and a sticky
 * "Book consultation" button. Reads from src/content/navigation.ts.
 */
export function MobileMenu() {
  const t = useTranslations();
  const baseId = useId();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerId = `${baseId}-drawer`;

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Lock page scroll, focus the close button and close on Esc while open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-brand-sand px-4 py-2 text-sm transition-colors hover:border-brand-gold"
      >
        <Icon name="menu" className="size-5" />
        <span>{t("ui.menu")}</span>
      </button>

      <div
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label={t("ui.mainNavigation")}
        className={`fixed inset-0 z-50 flex flex-col bg-brand-white transition-[opacity,visibility,transform] duration-500 ease-(--ease-luxe) ${
          open ? "visible translate-x-0 opacity-100" : "invisible translate-x-8 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-sand px-5 py-3">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t("ui.closeMenu")}
            className="grid size-11 place-items-center rounded-full border border-brand-sand transition-colors hover:border-brand-gold"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>
        <div className="border-b border-brand-sand px-5 py-3">
          <LanguageSwitcher />
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-28" aria-label={t("ui.mainNavigation")}>
          <ul className="divide-y divide-brand-sand">
            {mainNav.map((item) => {
              const sectionId = `${baseId}-section-${item.id}`;
              const isExpanded = expanded === item.id;
              const active = isActivePath(pathname, item.href);
              const labelClass = `${active ? "text-brand-green" : ""} ${item.highlight ? "font-semibold" : ""}`;

              if (!item.columns) {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`block py-4 font-heading text-2xl ${labelClass}`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={sectionId}
                    onClick={() => setExpanded(isExpanded ? null : item.id)}
                    className={`flex w-full items-center justify-between py-4 text-left font-heading text-2xl ${labelClass}`}
                  >
                    {t(item.labelKey)}
                    <span
                      aria-hidden
                      className={`grid size-8 place-items-center rounded-full border border-brand-gold/50 text-brand-gold transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`}
                    >
                      <Icon name="plus" className="size-4" />
                    </span>
                  </button>
                  <div id={sectionId} hidden={!isExpanded} className="pb-4">
                    <Link href={item.href} onClick={close} className="block py-2 text-sm font-semibold">
                      {t(item.labelKey)}
                    </Link>
                    {item.columns.map((column, i) => (
                      <div key={column.titleKey ?? i} className="mt-2">
                        {column.titleKey && (
                          <p className="eyebrow mt-2">
                            {t(column.titleKey)}
                          </p>
                        )}
                        <ul>
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={close}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className={`block py-2 text-sm ${pathname === link.href ? "text-brand-green" : ""}`}
                              >
                                {t(link.labelKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sticky bottom-0 border-t border-brand-sand bg-brand-white p-4">
          <Link
            href={bookHref}
            onClick={close}
            className="shine block rounded-full bg-brand-green py-3.5 text-center text-brand-white"
          >
            {t("nav.book")}
          </Link>
        </div>
      </div>
    </div>
  );
}
