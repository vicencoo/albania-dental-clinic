"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { useConsent } from "@/lib/consent";

/**
 * Google Maps embed that only loads once the visitor accepted cookies, or clicks "Show map"
 * (Google sets its own cookies inside the iframe).
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const t = useTranslations("ui");
  const consent = useConsent();
  const [requested, setRequested] = useState(false);

  if (consent === "accepted" || requested) {
    return (
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-square w-full grayscale-[30%]"
      />
    );
  }

  return (
    <div className="grid aspect-square w-full place-items-center bg-brand-porcelain p-8 text-center">
      <div>
        <Icon name="map" className="mx-auto size-8 text-brand-green" />
        <p className="mt-4 text-sm text-brand-muted">{t("mapNote")}</p>
        <button
          type="button"
          onClick={() => setRequested(true)}
          className="mt-5 h-10 rounded-full bg-brand-obsidian px-5 text-[0.82rem] font-semibold text-brand-white transition-colors hover:bg-brand-green"
        >
          {t("showMap")}
        </button>
      </div>
    </div>
  );
}
