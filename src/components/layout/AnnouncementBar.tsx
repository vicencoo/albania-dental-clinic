import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";

/** Thin bar above the header. Text from messages "ui.announcement". */
export function AnnouncementBar() {
  const t = useTranslations("ui");
  return (
    <div className="bg-brand-forest text-brand-white">
      <Link
        href="/book"
        className="group container-luxe flex items-center justify-center gap-2 py-2.5 text-center text-xs tracking-wide"
      >
        <Icon name="sparkle" className="size-3.5 shrink-0 text-brand-gold-light" />
        <span className="link-underline">{t("announcement")}</span>
        <Icon
          name="arrow"
          className="hidden size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:block"
        />
      </Link>
    </div>
  );
}
