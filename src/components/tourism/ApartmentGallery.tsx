"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";

export interface ApartmentGalleryProps {
  images: string[];
  title: string;
}

/**
 * Gallery with a native <dialog> lightbox (focus trap + Esc for free).
 * Open/close animation is CSS via the [open] state.
 */
export function ApartmentGallery({ images, title }: ApartmentGalleryProps) {
  const t = useTranslations("ui");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  if (images.length === 0) {
    return (
      <div className="grid aspect-video place-items-center rounded-4xl border border-dashed border-brand-gold/50 bg-brand-porcelain text-center">
        <div>
          <Icon name="home" className="mx-auto size-10 text-brand-gold" />
          <p className="mt-3 text-sm text-brand-muted">{t("photosSoon")}</p>
        </div>
      </div>
    );
  }

  const go = (dir: 1 | -1) =>
    setIndex((i) =>
      i === null ? 0 : (i + dir + images.length) % images.length,
    );

  return (
    <>
      <ul className="grid auto-rows-48 grid-cols-2 gap-3 md:auto-rows-60 md:grid-cols-4">
        {images.map((src, i) => (
          <li key={src} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="lift relative block size-full overflow-clip rounded-3xl bg-brand-sand"
            >
              <Image
                src={src}
                alt={`${title} — ${i + 1}/${images.length}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="zoom-target object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        aria-label={title}
        className="m-auto max-h-[92vh] w-[min(92vw,72rem)] bg-transparent p-0 opacity-0 transition-[opacity,display,overlay] duration-300 transition-discrete backdrop:bg-brand-forest/85 backdrop:backdrop-blur-sm open:opacity-100 starting:open:opacity-0"
      >
        {index !== null && (
          <div className="relative aspect-3/2 w-full overflow-clip rounded-3xl">
            <Image
              src={images[index]}
              alt={`${title} — ${index + 1}/${images.length}`}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
        )}
        <div className="mt-4 flex items-center justify-center gap-3 text-brand-white">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="←"
            className="grid size-11 place-items-center rounded-full border border-brand-white/40"
          >
            <Icon name="arrowLeft" className="size-5" />
          </button>
          <span className="text-sm tabular-nums">
            {(index ?? 0) + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="→"
            className="grid size-11 place-items-center rounded-full border border-brand-white/40"
          >
            <Icon name="arrow" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex(null)}
            aria-label={t("closeMenu")}
            className="ml-4 grid size-11 place-items-center rounded-full bg-brand-white text-brand-ink"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>
      </dialog>
    </>
  );
}
