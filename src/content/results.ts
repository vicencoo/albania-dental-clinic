import type { ResultCase } from "./types";

/**
 * Before/after cases. Add a case here once photos exist, with the files in
 * public/images/results/<slug>-before.webp and <slug>-after.webp.
 * Only cases with consentConfirmed === true (signed written consent) are shown.
 */
const allCases: ResultCase[] = [];

export const results = allCases.filter((c) => c.consentConfirmed);
