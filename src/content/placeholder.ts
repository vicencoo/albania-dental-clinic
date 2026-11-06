import type { LocalizedString } from "./types";

/** Same placeholder in every locale, e.g. todo("BIO") → { sq: "[BIO]", ... } */
export function todo(token: string): LocalizedString {
  const value = `[${token}]`;
  return { sq: value, it: value, en: value };
}
