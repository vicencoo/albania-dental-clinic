import Image from "next/image";
import { useTranslations } from "next-intl";
import { cx } from "@/lib/style";

/**
 * Logo: heart-tooth mark (extracted from the clinic's Instagram) + live-text wordmark.
 * TODO: replace /images/brand/logo-mark.png with the original vector file when supplied.
 */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const t = useTranslations("ui");
  return (
    <span className={cx("flex items-center gap-3", className)}>
      <Image
        src="/images/brand/logo-mark.png"
        alt={t("logoAlt")}
        width={44}
        height={44}
        priority
        className="size-10 shrink-0 object-contain lg:size-11"
      />
      <span className="flex flex-col whitespace-nowrap leading-none" aria-hidden>
        <span
          className={cx(
            "font-label text-[1.15rem] tracking-[0.12em]",
            tone === "light" ? "text-brand-red" : "text-brand-white",
          )}
        >
          ALBANIA
        </span>
        <span
          className={cx(
            "mt-1 font-label text-[0.6rem] tracking-[0.32em]",
            tone === "light" ? "text-brand-green" : "text-brand-white/60",
          )}
        >
          DENTAL CLINIC
        </span>
      </span>
    </span>
  );
}
