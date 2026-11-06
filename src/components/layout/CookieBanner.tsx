"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "cookie-consent";
type Consent = "accepted" | "rejected";

const listeners = new Set<() => void>();
/** Set after a choice so the banner hides even if storage is unavailable. */
let hidden = false;

function readConsent(): Consent | null {
  try {
    return localStorage.getItem(STORAGE_KEY) as Consent | null;
  } catch {
    return null;
  }
}

function writeConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable (private mode) — banner simply hides for this session.
  }
  hidden = true;
  listeners.forEach((l) => l());
}


function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Minimal consent banner. TODO: wire consent to analytics loading and
 * align wording with the final cookie policy.
 */
export function CookieBanner() {
  const t = useTranslations("ui.cookie");
  const visible = useSyncExternalStore(
    subscribe,
    () => !hidden && readConsent() === null,
    () => false, // never render on the server
  );

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="rise fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl flex-wrap items-center gap-3 rounded-3xl border border-brand-white/10 bg-brand-forest/95 p-5 text-sm text-brand-white shadow-soft backdrop-blur-md sm:right-24"
    >
      <p className="flex-1">
        {t("text")}{" "}
        <Link href="/cookies" className="text-brand-gold-light underline underline-offset-4">
          {t("more")}
        </Link>
      </p>
      <button type="button" onClick={() => writeConsent("rejected")} className="rounded-full px-4 py-2 transition-colors hover:bg-brand-white/10">
        {t("reject")}
      </button>
      <button
        type="button"
        onClick={() => writeConsent("accepted")}
        className="rounded-full bg-brand-gold px-4 py-2 text-brand-ink transition-colors hover:bg-brand-gold-light"
      >
        {t("accept")}
      </button>
    </div>
  );
}
