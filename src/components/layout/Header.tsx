import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookHref } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

/** Sticky header; gains a shadow on scroll via a CSS scroll-driven animation (.scroll-shadow). */
export function Header() {
  const t = useTranslations();

  return (
    <header className="scroll-shadow sticky top-0 z-40 border-b border-white/[0.06] bg-brand-obsidian text-brand-white">
      <div className="container-luxe flex items-center justify-between gap-6">
        <Link href="/" className="py-3.5" aria-label="Albania Dental Clinic">
          <Logo tone="dark" />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-4">
          <LanguageSwitcher tone="dark" className="hidden xl:block" />
          <Link
            href={bookHref}
            className="shine hidden rounded-full bg-brand-green whitespace-nowrap px-6 py-3 font-label text-[0.68rem] uppercase tracking-[0.18em] text-brand-white shadow-glow transition-colors duration-500 hover:bg-brand-leaf hover:text-brand-obsidian sm:inline-block"
          >
            {t("nav.book")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
