import { notFound } from "next/navigation";

/**
 * Catches unknown paths under a locale so the localized not-found page renders.
 * The proxy rewrites every unknown path to /<locale>/__not-found, which is
 * prerendered here so it serves a static localized 404 (real HTTP 404 status).
 */
export function generateStaticParams() {
  return [{ rest: ["__not-found"] }];
}

export default function CatchAllPage() {
  notFound();
}

// This segment always 404s, so there is nothing to validate for instant navigation.
export const instant = false;
