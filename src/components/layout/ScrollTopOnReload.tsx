"use client";

import { useEffect } from "react";

/**
 * A page reload always starts at the top instead of the browser restoring the old position.
 *
 * - On pagehide, scroll restoration is switched to "manual" so the reload doesn't restore.
 * - On a reload we keep it "manual" until the page has fully loaded and jump to the top
 *   again after the load event: iOS Safari restores the position late (around `load`),
 *   which used to undo an early jump. Only then is it set back to "auto", so back/forward
 *   keeps restoring normally.
 * - If the visitor starts scrolling meanwhile, the late jumps are skipped.
 * - Links with a #hash still land on their section.
 */
export function ScrollTopOnReload() {
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = nav?.type === "reload" && !location.hash;

    const onPageHide = () => {
      history.scrollRestoration = "manual";
    };
    window.addEventListener("pagehide", onPageHide);

    if (!isReload) {
      history.scrollRestoration = "auto";
      return () => window.removeEventListener("pagehide", onPageHide);
    }

    let userScrolled = false;
    let frame = 0;
    let timer = 0;
    const onUserInput = () => {
      userScrolled = true;
    };
    const inputEvents = ["touchstart", "wheel", "keydown"] as const;
    inputEvents.forEach((e) =>
      window.addEventListener(e, onUserInput, { passive: true, once: true }),
    );

    const toTop = () => {
      if (!userScrolled) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    const afterLoad = () => {
      // Run after the browser's own (late) restore: next task, then next frame.
      timer = window.setTimeout(() => {
        toTop();
        frame = requestAnimationFrame(() => {
          toTop();
          history.scrollRestoration = "auto";
        });
      }, 0);
    };

    toTop();
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("load", afterLoad);
      inputEvents.forEach((e) => window.removeEventListener(e, onUserInput));
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
