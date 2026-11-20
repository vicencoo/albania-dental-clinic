"use client";

import { useEffect, useRef } from "react";

const MIN_THUMB = 48;

/**
 * Floating page scrollbar: the native root scrollbar always reserves a gutter painted with the
 * page background (a white strip), so on mouse/trackpad devices it is hidden (see
 * `html.overlay-scrollbar` in globals.css) and replaced by this emerald pill drawn over the
 * content. Touch devices keep their native overlay scrollbars. Keyboard / wheel scrolling is
 * untouched — this only mirrors the scroll position and supports dragging.
 */
export function OverlayScrollbar() {
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!rail || !thumb) return;

    root.classList.add("overlay-scrollbar");

    let frame = 0;
    let thumbHeight = 0;
    let maxTop = 0;

    const update = () => {
      frame = 0;
      const view = window.innerHeight;
      const total = root.scrollHeight;
      const scrollable = total - view;
      rail.dataset.hidden = scrollable <= 1 ? "true" : "false";
      if (scrollable <= 1) return;
      thumbHeight = Math.max(MIN_THUMB, (view * view) / total);
      maxTop = view - thumbHeight;
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translate3d(0, ${(window.scrollY / scrollable) * maxTop}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Drag the thumb.
    let dragOffset = 0;
    const scrollToThumb = (clientY: number) => {
      const scrollable = root.scrollHeight - window.innerHeight;
      const ratio = maxTop > 0 ? Math.min(1, Math.max(0, (clientY - dragOffset) / maxTop)) : 0;
      window.scrollTo({ top: ratio * scrollable, behavior: "instant" });
    };
    const onMove = (e: PointerEvent) => scrollToThumb(e.clientY);
    const onUp = (e: PointerEvent) => {
      rail.dataset.dragging = "false";
      thumb.releasePointerCapture(e.pointerId);
      thumb.removeEventListener("pointermove", onMove);
    };
    const onThumbDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragOffset = e.clientY - thumb.getBoundingClientRect().top;
      rail.dataset.dragging = "true";
      thumb.setPointerCapture(e.pointerId);
      thumb.addEventListener("pointermove", onMove);
      thumb.addEventListener("pointerup", onUp, { once: true });
      thumb.addEventListener("pointercancel", onUp, { once: true });
    };
    // Click on the rail: jump so the thumb centres on the pointer.
    const onRailDown = (e: PointerEvent) => {
      dragOffset = thumbHeight / 2;
      scrollToThumb(e.clientY);
    };

    thumb.addEventListener("pointerdown", onThumbDown);
    rail.addEventListener("pointerdown", onRailDown);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    update();

    return () => {
      root.classList.remove("overlay-scrollbar");
      cancelAnimationFrame(frame);
      thumb.removeEventListener("pointerdown", onThumbDown);
      rail.removeEventListener("pointerdown", onRailDown);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={railRef} className="overlay-scrollbar-rail" data-hidden="true" aria-hidden="true">
      <div ref={thumbRef} className="overlay-scrollbar-thumb" />
    </div>
  );
}
