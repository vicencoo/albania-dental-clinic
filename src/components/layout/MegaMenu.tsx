"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { isNavItemActive, mainNav, primaryHref } from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import type { NavItem } from "@/content/types";

const HOVER_CLOSE_DELAY = 150;
const HOVER_OPEN_DELAY = 70;

const panelItems = mainNav.filter((item) => item.columns);

const descKey = (labelKey: string) =>
  labelKey.startsWith("nav.")
    ? `nav.descriptions.${labelKey.slice(4)}`
    : "nav.descriptions.__none";

export function MegaMenu() {
  const t = useTranslations();
  const baseId = useId();
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [heights, setHeights] = useState<Record<string, number>>({});

  const panelId = (id: string) => `${baseId}-panel-${id}`;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const cancelOpen = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = null;
  };

  const hoverItem = (item: NavItem) => {
    cancelOpen();
    const next = item.columns ? item.id : null;
    if (openId === null && next !== null) {
      openTimer.current = setTimeout(() => setOpenId(next), HOVER_OPEN_DELAY);
    } else {
      setOpenId(next);
    }
  };

  const scheduleClose = () => {
    cancelClose();
    cancelOpen();
    closeTimer.current = setTimeout(() => setOpenId(null), HOVER_CLOSE_DELAY);
  };

  const close = useCallback((returnFocusTo?: string | null) => {
    setOpenId(null);
    if (returnFocusTo) triggerRefs.current.get(returnFocusTo)?.focus();
  }, []);

  // Clean up the hover timers on unmount.
  useEffect(
    () => () => {
      cancelClose();
      cancelOpen();
    },
    [],
  );

  // Measure every panel so the shared surface can animate its height between them.
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setHeights((prev) => {
        const next = { ...prev };
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.panel;
          if (id)
            next[id] = Math.ceil(
              entry.borderBoxSize[0]?.blockSize ?? entry.target.clientHeight,
            );
        }
        return next;
      });
    });
    panelRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
      const links = document
        .getElementById(panelId(id))
        ?.querySelectorAll<HTMLElement>("a[href]");
      if (!links?.length) return;
      (index === "first" ? links[0] : links[links.length - 1]).focus();
    });
  };

  const moveTopLevel = (currentId: string, dir: 1 | -1) => {
    const ids = mainNav.map((i) => i.id);
    const next = ids[(ids.indexOf(currentId) + dir + ids.length) % ids.length];
    triggerRefs.current.get(next)?.focus();
    if (openId)
      setOpenId(mainNav.find((i) => i.id === next)?.columns ? next : null);
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
    const links = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>("a[href]"),
    );
    const index = links.indexOf(document.activeElement as HTMLElement);
    e.preventDefault();
    if (e.key === "ArrowUp" && index <= 0) {
      triggerRefs.current.get(item.id)?.focus();
      return;
    }
    const next =
      e.key === "ArrowDown" ? Math.min(index + 1, links.length - 1) : index - 1;
    links[next]?.focus();
  };

  // Close when focus leaves the whole nav (Tab out).
  const onBlur = (e: FocusEvent) => {
    if (!navRef.current?.contains(e.relatedTarget as Node | null))
      setOpenId(null);
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
      <ul className="flex items-center gap-0.5 2xl:gap-1">
        {mainNav.map((item) => {
          const isOpen = openId === item.id;
          // Green = the section of the current page. Same-Day keeps its emphasis via weight.
          const active = isNavItemActive(pathname, item);
          const triggerClass = `relative flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[0.84rem] font-medium transition-colors duration-300 ${
            isOpen
              ? "bg-white/[0.08] text-brand-white"
              : active
                ? "text-brand-leaf bg-white/[0.06] hover:bg-white/[0.06]"
                : "text-brand-white/70 hover:bg-white/[0.06] hover:text-brand-white"
          }`;
          const setRef = (el: HTMLElement | null) => {
            if (el) triggerRefs.current.set(item.id, el);
            else triggerRefs.current.delete(item.id);
          };

          return (
            <li key={item.id} onMouseEnter={() => hoverItem(item)}>
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
                  <span
                    aria-hidden
                    className="pulse-ring size-1.5 rounded-full bg-brand-leaf"
                  />
                )}
                {t(item.labelKey)}
                {item.columns && (
                  <Icon
                    name="chevronDown"
                    className={`size-3.5 opacity-50 transition-transform duration-300 ${isOpen ? "rotate-180 opacity-90" : ""}`}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* One shared surface: its height morphs between panels (pure CSS transition). */}
      <div
        className="mega-shell absolute inset-x-0 top-full border-t border-white/6 bg-brand-obsidian-soft text-brand-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]"
        data-open={openId !== null}
        style={{ height: openId ? (heights[openId] ?? "auto") : 0 }}
      >
        {panelItems.map((item, index) => {
          const columns = item.columns ?? [];
          const activeIndex = panelItems.findIndex((p) => p.id === openId);
          // active · before (left of the open item) · after (right of it) · idle (menu closed)
          const state =
            openId === null
              ? "idle"
              : item.id === openId
                ? "active"
                : index < activeIndex
                  ? "before"
                  : "after";

          return (
            <div
              key={item.id}
              id={panelId(item.id)}
              data-panel={item.id}
              data-state={state}
              ref={(el) => {
                if (el) panelRefs.current.set(item.id, el);
                else panelRefs.current.delete(item.id);
              }}
              onKeyDown={(e) => onPanelKeyDown(e, item)}
              className="mega-panel absolute inset-x-0 top-0"
            >
              <div className="container-luxe flex gap-12 py-10">
                <div
                  className={`grid flex-1 gap-8 ${
                    columns.length >= 5
                      ? "grid-cols-5"
                      : columns.length >= 4
                        ? "grid-cols-4"
                        : "grid-cols-2"
                  }`}
                >
                  {columns.map((column, i) => (
                    <div
                      key={column.titleKey ?? i}
                      className={`mega-item ${
                        columns.length >= 5 && i === columns.length - 1
                          ? "border-l border-white/8 pl-8"
                          : ""
                      }`}
                      style={{ "--i": i } as CSSProperties}
                    >
                      {column.titleKey && (
                        <p className="eyebrow mb-4 text-brand-leaf">
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
                              aria-current={
                                pathname === link.href ? "page" : undefined
                              }
                              className={`group/link -mx-3 block rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-white/4 ${
                                pathname === link.href
                                  ? "text-brand-leaf bg-white/4"
                                  : "text-brand-white/85"
                              }`}
                            >
                              <span className="flex items-center gap-2 text-[0.95rem] group-hover/link:text-brand-white">
                                {t(link.labelKey)}
                                <span
                                  aria-hidden
                                  className="-translate-x-1 text-brand-leaf opacity-0 transition-[opacity,translate] duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                                >
                                  →
                                </span>
                              </span>
                              {t.has(descKey(link.labelKey)) && (
                                <span className="mt-0.5 block text-xs leading-snug text-brand-white/45">
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
                    className="mega-item group/feat block w-80 shrink-0 overflow-clip rounded-xl border border-white/8 bg-white/3 transition-[border-color,background-color] duration-500 hover:border-brand-leaf/40 hover:bg-white/5"
                    style={{ "--i": columns.length } as CSSProperties}
                  >
                    <div className="relative aspect-16/10 overflow-clip">
                      <Image
                        src={item.featured.image}
                        alt=""
                        fill
                        sizes="320px"
                        className="object-cover opacity-90 transition-[scale,opacity] duration-1000 ease-luxe group-hover/feat:scale-[1.06] group-hover/feat:opacity-100"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-heading text-2xl leading-tight">
                        {t(item.featured.titleKey)}
                      </p>
                      <p className="mt-2 text-sm text-brand-white/55">
                        {t(item.featured.textKey)}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
