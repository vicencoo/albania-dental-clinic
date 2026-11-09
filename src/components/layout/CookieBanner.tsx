"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { setConsent, useBannerVisible } from "@/lib/consent";

/**
 * Cookie consent banner. "Reject" is exactly as prominent as "Accept" (GDPR / Italian Garante
 * guidance). The choice controls Google Ads (GoogleAds.tsx) and the Google Maps embed (MapEmbed.tsx).
 * Re-opened from "Cookie settings" in the footer.
 */
export function CookieBanner() {
  const t = useTranslations("ui.cookie");
  const visible = useBannerVisible();

  if (!visible) return null;

  const button =
    "h-10 flex-1 rounded-full px-5 text-[0.82rem] font-semibold transition-colors duration-300 sm:flex-none";

  return (
    <div
      role="region"
      aria-label={t("title")}
      className="rise fixed inset-x-4 bottom-4 z-40 mx-auto max-w-lg rounded-3xl border border-white/10 bg-brand-obsidian-soft p-5 text-sm text-brand-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] sm:right-24 sm:p-6"
    >
      <p className="font-semibold">{t("title")}</p>
      <p className="mt-1.5 leading-relaxed text-brand-white/70">
        {t("text")}{" "}
        <Link href="/cookies" className="text-brand-leaf underline underline-offset-4">
          {t("more")}
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setConsent("rejected")}
          className={`${button} border border-white/25 text-brand-white hover:border-brand-white`}
        >
          {t("reject")}
        </button>
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className={`${button} bg-brand-white text-brand-obsidian hover:bg-brand-leaf`}
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
