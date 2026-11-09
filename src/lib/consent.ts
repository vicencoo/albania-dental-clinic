"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie consent store (client only). The choice is kept in localStorage — not a cookie —
 * and shared with the banner, Google Ads loader, map embed and "Cookie settings" button.
 */
export type Consent = "accepted" | "rejected";

const STORAGE_KEY = "cookie-consent";
const listeners = new Set<() => void>();

/** In-memory fallback so a choice still applies for this visit when storage is unavailable. */
let memory: Consent | null = null;
/** True while the visitor has re-opened the banner from "Cookie settings". */
let reopened = false;

function read(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    // Storage blocked (private mode) — fall back to memory.
  }
  return memory;
}

const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setConsent(value: Consent) {
  memory = value;
  reopened = false;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore — memory fallback applies
  }
  emit();
}

/** Shows the banner again so the visitor can change their choice (GDPR: as easy as giving it). */
export function openConsentSettings() {
  reopened = true;
  emit();
}

/** Current choice; `null` = not decided yet. Always `null` during server render. */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

/** Whether the banner should be visible. Never on the server. */
export function useBannerVisible(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => reopened || read() === null,
    () => false,
  );
}
