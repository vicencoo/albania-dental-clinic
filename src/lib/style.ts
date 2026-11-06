import type { CSSProperties } from "react";

/** Stagger index for CSS animations (.rise, .reveal, .float …): style={stagger(2)} */
export function stagger(i: number, extra?: CSSProperties): CSSProperties {
  return { "--i": i, ...extra } as CSSProperties;
}

/** Joins class names, skipping falsy values. */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Splits a text into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}

/** Rough reading time in minutes (200 wpm). */
export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
