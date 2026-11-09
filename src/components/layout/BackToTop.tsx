"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";

/** Show the button once the visitor is this many screens down the page. */
const SCREENS = 2;

export function BackToTop() {
  const t = useTranslations("ui");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * SCREENS);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0 });
    // Keep keyboard focus somewhere sensible: the logo link at the top of the page.
    document
      .querySelector<HTMLElement>("header a")
      ?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={t("backToTop")}
      inert={!visible}
      className={`fixed bottom-22 right-6.5 z-30 grid size-11 place-items-center rounded-full cursor-pointer border border-white/15 bg-brand-obsidian/85 text-brand-white shadow-[0_10px_24px_-10px_rgb(0_0_0/0.6)] transition-[opacity,translate,background-color] duration-300 ease-out hover:bg-brand-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-leaf motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <Icon name="arrowUp" className="size-4.5" />
    </button>
  );
}
