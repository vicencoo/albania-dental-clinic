import { notFound } from "next/navigation";

/**
 * Catches unknown paths under a locale so the localized not-found page renders.
 */
export function generateStaticParams() {
  return [{ rest: ["__not-found"] }];
}

export default function CatchAllPage() {
  notFound();
}

// This segment always 404s, so there is nothing to validate for instant navigation.
export const instant = false;
