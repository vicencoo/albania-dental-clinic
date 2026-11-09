"use client";

import { useEffect } from "react";

export function ScrollTopOnReload() {
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
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
