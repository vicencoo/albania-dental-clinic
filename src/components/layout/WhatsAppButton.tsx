import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Floating WhatsApp button. Falls back to /book until site.whatsapp is set. */
export function WhatsAppButton() {
  const t = useTranslations("ui");
  const href = whatsappHref();
  const className =
    "pulse-ring fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-brand-leaf text-brand-white shadow-soft transition-transform duration-300 hover:scale-105 focus-visible:scale-105";

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={t("whatsapp")} className={className}>
      <Icon name="whatsapp" className="size-7" />
    </a>
  ) : (
    <Link href="/book" aria-label={t("bookCta")} className={className}>
      <Icon name="chat" className="size-6" />
    </Link>
  );
}
