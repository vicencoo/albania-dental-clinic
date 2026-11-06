"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { isActivePath, mainNav, primaryHref } from "@/content/navigation";
import type { NavItem } from "@/content/types";

const HOVER_CLOSE_DELAY = 150;

/** "nav.team" → "nav.descriptions.team" (only nav.* links have descriptions). */
const descKey = (labelKey: string) =>
  labelKey.startsWith("nav.") ? `nav.descriptions.${labelKey.slice(4)}` : "nav.descriptions.__none";

/**
 * Desktop mega menu. Reads from src/content/navigation.ts.
 * - Opens on hover and on keyboard (ArrowDown/ArrowUp); clicking a top-level item
 * navigates to the first link of its panel
 * - Esc closes and returns focus to the trigger
 * - ArrowLeft/Right moves between top-level items, ArrowUp/Down moves within a panel
 * - aria-expanded / aria-controls on triggers
 */
export function MegaMenu() {
  const t = useTranslations();
  const baseId = useId();
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const panelId = (id: string) => `${baseId}-panel-${id}`;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenId(null), HOVER_CLOSE_DELAY);
  };

  const close = useCallback((returnFocusTo?: string | null) => {
    setOpenId(null);
    if (returnFocusTo) triggerRefs.current.get(returnFocusTo)?.focus();
  }, []);

  // Clean up the hover timer on unmount.
  useEffect(() => cancelClose, []);

  // Esc anywhere closes the open panel.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close(openId);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, close]);

  const focusPanelLink = (id: string, index: "first" | "last") => {
    // Wait for the panel to become visible before focusing.
    requestAnimationFrame(() => {
      const links = document.getElementById(panelId(id))?.querySelectorAll<HTMLElement>("a[href]");
      if (!links?.length) return;
      (index === "first" ? links[0] : links[links.length - 1]).focus();
    });
  };

  const moveTopLevel = (currentId: string, dir: 1 | -1) => {
    const ids = mainNav.map((i) => i.id);
    const next = ids[(ids.indexOf(currentId) + dir + ids.length) % ids.length];
    triggerRefs.current.get(next)?.focus();
    if (openId) setOpenId(mainNav.find((i) => i.id === next)?.columns ? next : null);
  };

  const onTriggerKeyDown = (e: KeyboardEvent, item: NavItem) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        moveTopLevel(item.id, 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        moveTopLevel(item.id, -1);
        break;
      case "ArrowDown":
        if (!item.columns) break;
        e.preventDefault();
        setOpenId(item.id);
        focusPanelLink(item.id, "first");
        break;
      case "ArrowUp":
        if (!item.columns) break;
        e.preventDefault();
        setOpenId(item.id);
        focusPanelLink(item.id, "last");
        break;
    }
  };

  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>, item: NavItem) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("a[href]"));
    const index = links.indexOf(document.activeElement as HTMLElement);
    e.preventDefault();
    if (e.key === "ArrowUp" && index <= 0) {
      triggerRefs.current.get(item.id)?.focus();
      return;
    }
    const next = e.key === "ArrowDown" ? Math.min(index + 1, links.length - 1) : index - 1;
    links[next]?.focus();
  };

  // Close when focus leaves the whole nav (Tab out).
  const onBlur = (e: FocusEvent) => {
    if (!navRef.current?.contains(e.relatedTarget as Node | null)) setOpenId(null);
  };

  return (
    <nav
      ref={navRef}
      aria-label={t("ui.mainNavigation")}
      className="hidden xl:block"
      onBlur={onBlur}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <ul className="flex items-center gap-7">
        {mainNav.map((item) => {
          const isOpen = openId === item.id;
          // Green = the section of the current page. Same-Day keeps its emphasis via weight.
          const active = isActivePath(pathname, item.href);
          const triggerClass = `relative flex items-center gap-1.5 py-7 text-[0.9rem] transition-colors after:absolute after:inset-x-0 after:bottom-5 after:h-px after:origin-left after:bg-brand-gold after:transition-transform after:duration-500 after:ease-(--ease-luxe) ${
            active || isOpen
              ? "text-brand-green after:scale-x-100"
              : "text-brand-ink after:scale-x-0 hover:text-brand-green hover:after:scale-x-100"
          } ${item.highlight ? "font-semibold" : ""}`;
          const setRef = (el: HTMLElement | null) => {
            if (el) triggerRefs.current.set(item.id, el);
            else triggerRefs.current.delete(item.id);
          };

          return (
            <li key={item.id} onMouseEnter={() => setOpenId(item.columns ? item.id : null)}>
              {/* Click navigates to the first option; hover / ArrowDown opens the panel. */}
              <Link
                ref={setRef}
                href={primaryHref(item)}
                aria-expanded={item.columns ? isOpen : undefined}
                aria-controls={item.columns ? panelId(item.id) : undefined}
                aria-current={active ? "true" : undefined}
                onClick={() => close()}
                onKeyDown={(e) => onTriggerKeyDown(e, item)}
                className={triggerClass}
              >
                {item.highlight && (
                  <span aria-hidden className="pulse-ring size-1.5 rounded-full bg-brand-red [--pulse:rgb(184_35_47/0.45)]" />
                )}
                {t(item.labelKey)}
              </Link>

              {item.columns && (
                <div
                  id={panelId(item.id)}
                  onKeyDown={(e) => onPanelKeyDown(e, item)}
                  className={`absolute inset-x-0 top-full border-t border-brand-sand bg-brand-white shadow-[0_30px_60px_-30px_rgb(30_26_27/0.35)] transition-[opacity,visibility,transform] duration-500 ease-(--ease-luxe) ${
                    isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="container-luxe flex gap-12 py-10">
                    <div className={`grid flex-1 gap-8 ${item.columns.length >= 4 ? "grid-cols-4" : "grid-cols-2"}`}>
                      {item.columns.map((column, i) => (
                        <div key={column.titleKey ?? i}>
                          {column.titleKey && (
                            <p className="eyebrow mb-4">
                              {column.href ? (
                                <Link href={column.href} onClick={() => close()}>
                                  {t(column.titleKey)}
                                </Link>
                              ) : (
                                t(column.titleKey)
                              )}
                            </p>
                          )}
                          <ul className="space-y-1">
                            {column.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={() => close()}
                                  aria-current={pathname === link.href ? "page" : undefined}
                                  className={`group/link block rounded-xl px-3 py-2 -mx-3 transition-colors hover:bg-brand-porcelain ${
                                    pathname === link.href ? "text-brand-green" : "text-brand-ink"
                                  }`}
                                >
                                  <span className="flex items-center gap-2 text-[0.95rem] group-hover/link:text-brand-green">
                                    {t(link.labelKey)}
                                    <span
                                      aria-hidden
                                      className="text-brand-gold opacity-0 transition-[opacity,transform] duration-300 -translate-x-1 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                                    >
                                      →
                                    </span>
                                  </span>
                                  {t.has(descKey(link.labelKey)) && (
                                    <span className="mt-0.5 block text-xs leading-snug text-brand-muted">
                                      {t(descKey(link.labelKey))}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {item.featured && (
                      <Link
                        href={item.featured.href}
                        onClick={() => close()}
                        className="lift group/feat block w-80 shrink-0 overflow-clip rounded-[1.75rem] bg-brand-porcelain"
                      >
                        <div className="relative aspect-[16/10] overflow-clip">
                          <Image
                            src={item.featured.image}
                            alt=""
                            fill
                            sizes="320px"
                            className="zoom-target object-cover"
                          />
                        </div>
                        <div className="p-5">
                          <p className="font-heading text-2xl leading-tight">{t(item.featured.titleKey)}</p>
                          <p className="mt-2 text-sm text-brand-muted">{t(item.featured.textKey)}</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
