/**
 * Price comparison shown on /prices.
 *
 * `uk` / `italy` / `turkey` are INDICATIVE average starting prices in EUR for private clinics
 * in each country (rounded). TODO: clinic to review and confirm these figures before launch.
 *
 * `savings` is the "up to X%" shown in the Albania Dental Clinic column, measured
 * against the most expensive country in the row. TODO: clinic to confirm these percentages
 * against its real prices before launch. If `treatment.price` in treatments.ts is set,
 * that price is shown too.
 */
export type CompareCountry = "uk" | "italy" | "turkey";

export interface PriceComparisonRow {
  /** Treatment slug from treatments.ts */
  treatment: string;
  /** Optional unit shown under the name, translation key in pricesPage.units.* */
  unit?: "perTooth" | "perArch" | "perImplant" | "fullTreatment";
  prices: Record<CompareCountry, number>;
  /** "Up to X%" savings at the clinic, in percent. */
  savings: number;
}

export const compareCountries: CompareCountry[] = ["uk", "italy", "turkey"];

export const priceComparison: PriceComparisonRow[] = [
  { treatment: "single-implant", unit: "perImplant", prices: { uk: 2800, italy: 1800, turkey: 700 }, savings: 80 },
  { treatment: "all-on-4", unit: "perArch", prices: { uk: 14000, italy: 10000, turkey: 4500 }, savings: 75 },
  { treatment: "all-on-6", unit: "perArch", prices: { uk: 17000, italy: 12000, turkey: 5500 }, savings: 75 },
  { treatment: "bone-grafting-sinus-lift", prices: { uk: 1500, italy: 1000, turkey: 450 }, savings: 70 },
  { treatment: "zirconia-crowns", unit: "perTooth", prices: { uk: 900, italy: 750, turkey: 250 }, savings: 70 },
  { treatment: "veneers", unit: "perTooth", prices: { uk: 1000, italy: 800, turkey: 300 }, savings: 75 },
  { treatment: "endodontics", unit: "perTooth", prices: { uk: 700, italy: 450, turkey: 150 }, savings: 65 },
  { treatment: "teeth-whitening", unit: "fullTreatment", prices: { uk: 450, italy: 350, turkey: 180 }, savings: 60 },
];
