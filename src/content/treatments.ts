import type { Treatment, TreatmentCategory, TreatmentCategorySlug } from "./types";

/**
 * Images come from the clinic's Instagram (low resolution). Replace with the
 * high-resolution files listed in public/images/README.md when available.
 */
const img = {
  implant: "/images/treatments/implant-render.jpg",
  scan: "/images/clinic/tech-3d-ct-scan.jpg",
  cbct: "/images/clinic/tech-cbct-unit.jpg",
  lab: "/images/lab/zirconia-bridge.jpg",
  room: "/images/clinic/treatment-room.jpg",
  children: "/images/treatments/children.jpg",
  after: "/images/results/case-1-after.jpg",
  doctor: "/images/team/dr-donela-dede-with-patient.jpg",
} as const;

export const treatmentCategories: TreatmentCategory[] = [
  { slug: "implantology", labelKey: "treatments.categories.implantology", image: img.implant },
  { slug: "digital-implant", labelKey: "treatments.categories.digital-implant", image: img.scan },
  { slug: "aesthetic", labelKey: "treatments.categories.aesthetic", image: img.lab },
  { slug: "general", labelKey: "treatments.categories.general", image: img.room },
];

const bySlug: Record<TreatmentCategorySlug, [slug: string, image: string, related?: string[]][]> = {
  implantology: [
    ["single-implant", img.implant, ["3d-ct-scan", "zirconia-crowns"]],
    ["multiple-implants", img.implant, ["guided-surgery", "bridges"]],
    ["all-on-4", img.implant, ["all-on-6", "guided-surgery"]],
    ["all-on-6", img.implant, ["all-on-4", "bone-grafting-sinus-lift"]],
    ["replacing-old-bridges", img.implant, ["all-on-4", "zirconia-crowns"]],
    ["bone-grafting-sinus-lift", img.scan, ["3d-ct-scan", "single-implant"]],
  ],
  "digital-implant": [
    ["3d-ct-scan", img.scan, ["guided-surgery", "single-implant"]],
    ["digital-impressions", img.lab, ["zirconia-crowns", "digital-smile-design"]],
    ["guided-surgery", img.cbct, ["3d-ct-scan", "all-on-4"]],
    ["digital-smile-design", img.lab, ["veneers", "zirconia-crowns"]],
  ],
  aesthetic: [
    ["zirconia-crowns", img.lab, ["bridges", "digital-smile-design"]],
    ["veneers", img.lab, ["teeth-whitening", "digital-smile-design"]],
    ["bridges", img.lab, ["zirconia-crowns", "multiple-implants"]],
    ["teeth-whitening", img.doctor, ["veneers", "hygiene"]],
  ],
  general: [
    ["endodontics", img.room, ["zirconia-crowns", "oral-surgery"]],
    ["oral-surgery", img.room, ["single-implant", "bone-grafting-sinus-lift"]],
    ["hygiene", img.room, ["teeth-whitening", "children"]],
    ["children", img.children, ["hygiene"]],
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
