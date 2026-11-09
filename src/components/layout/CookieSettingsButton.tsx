"use client";

import { useTranslations } from "next-intl";
import { openConsentSettings } from "@/lib/consent";

/** Footer link that re-opens the cookie banner so visitors can change their choice. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("ui.cookie");
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {t("settings")}
    </button>
  );
}
