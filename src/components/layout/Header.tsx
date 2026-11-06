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
    <header className="scroll-shadow sticky top-0 z-40 border-b border-brand-sand/70 bg-brand-white/95 backdrop-blur-md">
      <div className="container-luxe flex items-center justify-between gap-6">
        <Link href="/" className="py-3.5" aria-label="Albania Dental Clinic">
          <Logo />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-4">
          <LanguageSwitcher className="hidden xl:block" />
          <Link
            href={bookHref}
            className="shine hidden rounded-full bg-brand-green px-5 py-2.5 text-sm text-brand-white transition-colors hover:bg-brand-green-dark sm:inline-block"
          >
            {t("nav.book")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
