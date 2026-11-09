"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MIN_VISIBLE = 250;
const TIMEOUT = 10_000;

export function NavProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLSpanElement>(null);
  const state = useRef({ loading: false, startedAt: 0, timer: 0, pathname });

  const finish = () => {
    const bar = barRef.current;
    const s = state.current;
    if (!bar || !s.loading) return;
    s.loading = false;
    clearTimeout(s.timer);
    const wait = Math.max(0, MIN_VISIBLE - (performance.now() - s.startedAt));
    s.timer = window.setTimeout(() => {
      const from = getComputedStyle(bar).transform;
      bar.getAnimations().forEach((a) => a.cancel());
      bar.animate(
        [
          { transform: from === "none" ? "scaleX(0)" : from, opacity: 1 },
          { transform: "scaleX(1)", opacity: 1, offset: 0.55 },
          { transform: "scaleX(1)", opacity: 0 },
        ],
        { duration: 500, easing: "ease-out", fill: "forwards" },
      );
    }, wait);
  };

  const start = () => {
    const bar = barRef.current;
    const s = state.current;
    if (!bar) return;
    clearTimeout(s.timer);
    s.loading = true;
    s.startedAt = performance.now();
    bar.getAnimations().forEach((a) => a.cancel());
    // Quick jump, then a slow crawl towards 90% while the page loads.
    bar.animate(
      [
        { transform: "scaleX(0)", opacity: 1 },
        { transform: "scaleX(0.4)", opacity: 1, offset: 0.06 },
        { transform: "scaleX(0.9)", opacity: 1 },
      ],
      {
        duration: 8000,
        easing: "cubic-bezier(0.1, 0.7, 0.3, 1)",
        fill: "forwards",
      },
    );
    s.timer = window.setTimeout(finish, TIMEOUT);
  };

  // Navigation finished: the new route has rendered.
  useEffect(() => {
    state.current.pathname = pathname;
    finish();
  }, [pathname]);

  useEffect(() => {
    const s = state.current;
    const onClick = (e: MouseEvent) => {
      // Next.js <Link> calls preventDefault() only for navigations it handles itself.
      if (!e.defaultPrevented || e.button !== 0) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (
        !(a instanceof HTMLAnchorElement) ||
        a.target === "_blank" ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === s.pathname) return;
      start();
    };
    // Back/forward: Next.js restores the cached page instantly, so just play one quick sweep.
    const sweep = () => {
      start();
      finish();
    };
    const onNavigate = (e: Event) => {
      const nav = e as Event & {
        navigationType: string;
        destination: { url: string };
      };
      if (nav.navigationType !== "traverse") return;
      if (new URL(nav.destination.url).pathname !== location.pathname) sweep();
    };
    const onPopState = () => sweep();
    // Navigation API where supported (fires before the page changes), popstate elsewhere.
    const navApi = (window as Window & { navigation?: EventTarget }).navigation;
    document.addEventListener("click", onClick);
    if (navApi) navApi.addEventListener("navigate", onNavigate);
    else window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick);
      if (navApi) navApi.removeEventListener("navigate", onNavigate);
      else window.removeEventListener("popstate", onPopState);
      clearTimeout(s.timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span
      ref={barRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-0.75 origin-left transform-[scaleX(0)] bg-linear-to-r from-brand-leaf to-brand-azure opacity-0 shadow-[0_0_12px_rgb(69_196_154/0.85)]"
    />
  );
}
