import Image from "next/image";
import type { CSSProperties } from "react";
import { cx } from "@/lib/style";

/** "aspect-[3/4]" → "37.5%": vertical arch radius matching a half-width circle. */
export function archRadius(ratio: string): string {
  const m = ratio.match(/aspect-\[(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\]/);
  const r = m ? Number(m[1]) / Number(m[2]) : 3 / 4;
  return `${(50 * r).toFixed(2)}%`;
}

export interface ArchImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Aspect ratio class for the frame, e.g. "aspect-[3/4]". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** "load" plays on page load (hero), "scroll" reveals on scroll, "none" is static. */
  animate?: "load" | "scroll" | "none";
  /** Slow Ken Burns zoom on the photo. */
  kenburns?: boolean;
  /** Focal point for object-position, e.g. "50% 30%". */
  position?: string;
}

/** Arched image frame — the clinic's visual signature. */
export function ArchImage({
  src,
  alt,
  className,
  ratio = "aspect-[3/4]",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority,
  animate = "scroll",
  kenburns,
  position = "50% 50%",
}: ArchImageProps) {
  return (
    <div
      className={cx(
        "arch relative bg-brand-sand",
        ratio,
        animate === "load" && "unveil",
        animate === "scroll" && "reveal-arch",
        className,
      )}
      style={{ "--arch-v": archRadius(ratio) } as CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cx("object-cover", kenburns && "kenburns")}
        style={{ objectPosition: position }}
      />
      {/* Inner gold hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-2.5 rounded-[inherit] border border-brand-white/45"
      />
    </div>
  );
}
