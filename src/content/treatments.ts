import type { Treatment, TreatmentCategory, TreatmentCategorySlug } from "./types";

/** Clinic photos (optimized WebP in public/images). */
const img = {
  implant: "/images/lab/implant-bridge-design.webp",
  fullArch: "/images/lab/full-arch-design.webp",
  design: "/images/lab/design-closeup.webp",
  cbct: "/images/clinic/cbct.webp",
  scan: "/images/lab/technician-scan.webp",
  milling: "/images/lab/milling-unit.webp",
  furnace: "/images/lab/printer-furnace.webp",
  room: "/images/clinic/treatment-room.webp",
  room2: "/images/clinic/treatment-room-2.webp",
  equipment: "/images/clinic/equipment.webp",
  xray: "/images/clinic/digital-x-ray.webp",
} as const;

export const treatmentCategories: TreatmentCategory[] = [
  { slug: "implantology", labelKey: "treatments.categories.implantology", image: img.implant },
  { slug: "digital-implant", labelKey: "treatments.categories.digital-implant", image: img.design },
  { slug: "aesthetic", labelKey: "treatments.categories.aesthetic", image: img.furnace },
  { slug: "general", labelKey: "treatments.categories.general", image: img.room },
];

const bySlug: Record<TreatmentCategorySlug, [slug: string, image: string, related?: string[]][]> = {
  implantology: [
    ["single-implant", img.implant, ["3d-ct-scan", "zirconia-crowns"]],
    ["multiple-implants", img.implant, ["guided-surgery", "bridges"]],
    ["all-on-4", img.fullArch, ["all-on-6", "guided-surgery"]],
    ["all-on-6", img.fullArch, ["all-on-4", "bone-grafting-sinus-lift"]],
    ["replacing-old-bridges", img.fullArch, ["all-on-4", "zirconia-crowns"]],
    ["bone-grafting-sinus-lift", img.cbct, ["3d-ct-scan", "single-implant"]],
  ],
  "digital-implant": [
    ["3d-ct-scan", img.cbct, ["guided-surgery", "single-implant"]],
    ["digital-impressions", img.scan, ["zirconia-crowns", "digital-smile-design"]],
    ["guided-surgery", img.design, ["3d-ct-scan", "all-on-4"]],
    ["digital-smile-design", img.design, ["veneers", "zirconia-crowns"]],
  ],
  aesthetic: [
    ["zirconia-crowns", img.milling, ["bridges", "digital-smile-design"]],
    ["veneers", img.furnace, ["teeth-whitening", "digital-smile-design"]],
    ["bridges", img.milling, ["zirconia-crowns", "multiple-implants"]],
    ["teeth-whitening", img.room2, ["veneers", "hygiene"]],
  ],
  general: [
    ["endodontics", img.equipment, ["zirconia-crowns", "oral-surgery"]],
    ["oral-surgery", img.room, ["single-implant", "bone-grafting-sinus-lift"]],
    ["hygiene", img.room2, ["teeth-whitening", "children"]],
    ["children", img.room, ["hygiene"]],
  ],
};

export const treatments: Treatment[] = treatmentCategories.flatMap((category) =>
  bySlug[category.slug].map(([slug, image, related]) => ({
    slug,
    category: category.slug,
    labelKey: `treatments.items.${slug}`,
    image,
    // Never invent prices: keep "[PRICE]" until the clinic confirms.
    price: "[PRICE]",
    related,
  })),
);

export function getCategory(slug: string): TreatmentCategory | undefined {
  return treatmentCategories.find((c) => c.slug === slug);
}

export function getTreatmentsByCategory(category: string): Treatment[] {
  return treatments.filter((t) => t.category === category);
}

export function getTreatment(category: string, slug: string): Treatment | undefined {
  return treatments.find((t) => t.category === category && t.slug === slug);
}

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export function treatmentHref(t: Pick<Treatment, "category" | "slug">) {
  return `/treatments/${t.category}/${t.slug}` as const;
}
