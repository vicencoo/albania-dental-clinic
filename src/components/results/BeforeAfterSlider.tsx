"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";

export interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
  /** Aspect ratio class, e.g. "aspect-[16/7]". */
  ratio?: string;
}

/**
 * Accessible before/after comparison. A native range input drives a CSS
 * variable; the reveal itself is pure CSS (clip-path).
 */
export function BeforeAfterSlider({ before, after, alt, ratio = "aspect-[16/8]" }: BeforeAfterSliderProps) {
  const t = useTranslations("ui");
  const [pos, setPos] = useState(50);

  return (
    <figure className="select-none">
      <div
        className={`group relative overflow-clip rounded-xl bg-brand-sand shadow-soft ring-brand-leaf ring-offset-4 has-[input:focus-visible]:ring-2 ${ratio}`}
        style={{ "--pos": `${pos}%` } as CSSProperties}
      >
        <Image src={after} alt={`${alt} — ${t("after")}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]">
          <Image src={before} alt={`${alt} — ${t("before")}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-brand-red/85 px-3 py-1 text-xs uppercase tracking-widest text-brand-white backdrop-blur">
          {t("before")}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-brand-green/85 px-3 py-1 text-xs uppercase tracking-widest text-brand-white backdrop-blur">
          {t("after")}
        </span>

        {/* Handle */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-(--pos) -translate-x-1/2">
          <div className="h-full w-0.5 bg-brand-white/90 shadow" />
          <div className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-brand-obsidian/80 text-brand-white shadow-soft backdrop-blur transition-transform duration-500 group-hover:scale-105">
            ⇆
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t("compareSlider")}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="sr-only">{t("compare")}</figcaption>
    </figure>
  );
}
