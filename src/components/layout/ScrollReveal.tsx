"use client";

import { useEffect } from "react";

const GROUPS = [".reveal-stagger", ".reveal-sides", ".reveal-alternate", ".reveal-group"].join(",");

/** Group containers (their children animate) and single reveal elements — see globals.css. */
const TRIGGERS = [
  GROUPS,
  ".reveal", ".reveal-up", ".reveal-fade", ".reveal-scale", ".reveal-text", ".reveal-left",
  ".reveal-right", ".reveal-from-left", ".reveal-from-right", ".reveal-rotate", ".reveal-flip",
  ".reveal-zoom", ".reveal-spin", ".reveal-arch", ".reveal-img-zoom",
].join(",");

/** Reveal once the element is this far inside the viewport. */
const OFFSET = 70;

/** The paused CSS entrance animations (rv-*) that belong to this trigger. */
function entranceAnimations(trigger: HTMLElement): CSSAnimation[] {
  const targets = trigger.matches(GROUPS) ? Array.from(trigger.children) : [trigger];
  return targets.flatMap((t) =>
    t
      .getAnimations()
      .filter((a): a is CSSAnimation => a instanceof CSSAnimation && a.animationName.startsWith("rv-")),
  );
}

/**
 * Scroll-triggered reveals for every `.reveal*` element on the page.
 *
 * CSS sets each entrance animation up paused (element hidden on its first keyframe); this
 * plays it when the element scrolls into view. Playing through the Web Animations API means
 * no DOM attributes are touched before React hydrates. IntersectionObserver is used instead
 * of CSS scroll timelines because iOS Safari applied those late — items showed first and
 * only animated after more scrolling.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();
    /** Elements whose first (initial-state) observer callback has already arrived. */
    const measured = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const initial = !measured.has(el);
          measured.add(el);
          // Reveal when in view — or when the user scrolled past it (anchor jump, fast fling).
          // Being above the viewport on the FIRST callback doesn't count: that happens while a
          // new page is mounted before the scroll resets, and it would play the animation early.
          const skippedPast = !initial && entry.boundingClientRect.top < 0;
          if (!entry.isIntersecting && !skippedPast) continue;
          const animations = entranceAnimations(el);
          if (animations.length === 0) continue; // not rendered yet (display: none) — keep watching
          io.unobserve(el);
          animations.forEach((a) => a.play());
          Promise.all(animations.map((a) => a.finished))
            .then(() => {
              el.dataset.rv = "done";
            })
            .catch(() => {}); // animation was cancelled (element removed / restyled)
        }
      },
      { rootMargin: `0px 0px -${OFFSET}px 0px` },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(TRIGGERS).forEach((el) => {
        if (seen.has(el) || el.dataset.rv) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();

    // Pick up content added later (client-side navigation, filters, …).
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
