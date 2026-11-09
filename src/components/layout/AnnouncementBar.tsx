import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";

/** Thin bar above the header. Text from messages "ui.announcement". */
export function AnnouncementBar() {
  const t = useTranslations("ui");
  return (
    <div className="border-b border-white/6 bg-[linear-gradient(90deg,var(--color-brand-green-dark),var(--color-brand-obsidian)_45%,var(--color-brand-obsidian)_55%,var(--color-brand-navy))] text-brand-white/85">
      <Link
        href="/book"
        className="group container-luxe flex items-center justify-center gap-2 py-1.5 text-center text-[0.72rem] tracking-[0.02em]"
      >
        <Icon name="sparkle" className="size-3 shrink-0 text-brand-leaf" />
        <span className="link-underline">{t("announcement")}</span>
        <Icon
          name="arrow"
          className="hidden size-3 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:block"
        />
      </Link>
    </div>
  );
}
