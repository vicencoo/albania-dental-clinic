"use client";

import { useEffect } from "react";

/**
 * A page reload always starts at the top instead of the browser restoring the old position.
 *
 * - On pagehide we switch scroll restoration to "manual", so the reload doesn't jump down.
 * - On load we switch it back to "auto" (back/forward keeps working normally) and, for a
 *   reload, scroll to the top instantly. Links with a #hash still land on their section.
 */
export function ScrollTopOnReload() {
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    history.scrollRestoration = "auto";
    if (nav?.type === "reload" && !location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const onPageHide = () => {
      history.scrollRestoration = "manual";
    };
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, []);

  return null;
}
