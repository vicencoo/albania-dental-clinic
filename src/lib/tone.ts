import type { TreatmentCategorySlug } from "@/content/types";

/**
 * Colour roles (see globals.css):
 * green = brand / care, blue = digital & travel, red = the one key highlight.
 * Use tones only where they carry meaning; neutral is the default.
 */
export type Tone = "green" | "blue" | "red";

export const tone: Record<
  Tone,
  { text: string; bg: string; soft: string; border: string; hoverBg: string; dot: string }
> = {
  green: {
    text: "text-brand-green",
    bg: "bg-brand-green",
    soft: "bg-brand-porcelain",
    border: "border-brand-green",
    hoverBg: "group-hover:bg-brand-green",
    dot: "bg-brand-leaf",
  },
  blue: {
    text: "text-brand-blue",
    bg: "bg-brand-blue",
    soft: "bg-brand-sky",
    border: "border-brand-blue",
    hoverBg: "group-hover:bg-brand-blue",
    dot: "bg-brand-blue",
  },
  red: {
    text: "text-brand-red",
    bg: "bg-brand-red",
    soft: "bg-brand-rose",
    border: "border-brand-red",
    hoverBg: "group-hover:bg-brand-red",
    dot: "bg-brand-red",
  },
};

/** Treatment areas: implants & care = emerald, digital = blue. Red is reserved for the logo. */
export const categoryTone: Record<TreatmentCategorySlug, Tone> = {
  implantology: "green",
  "digital-implant": "blue",
  aesthetic: "green",
  general: "green",
};
