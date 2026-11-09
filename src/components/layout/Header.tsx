import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookHref } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { NavProgress } from "./NavProgress";

/**
 * Sticky glass header: logo · centred nav · language + CTA.
 * Gains a shadow on scroll via a CSS scroll-driven animation (.scroll-shadow).
 * Its bottom border turns into a loading bar during page navigation (<NavProgress>).
 */
export function Header() {
  const t = useTranslations();

  return (
    <header className="scroll-shadow sticky top-0 z-40 border-b border-white/[0.07] text-brand-white">
      {/* Solid layer (no backdrop-filter: it repainted on every scroll frame and trapped the fixed mobile drawer). */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-brand-obsidian/97"
      />
      <div className="container-luxe flex h-17 items-center justify-between gap-6">
        <Link href="/" aria-label="Albania Dental Clinic" className="shrink-0">
          <Logo tone="dark" className="[&_img]:size-9" />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden xl:block" />
          <Link
            href={bookHref}
            className="hidden h-10 items-center whitespace-nowrap rounded-full bg-brand-white px-5 text-[0.82rem] font-semibold text-brand-obsidian transition-colors duration-300 hover:bg-brand-leaf sm:inline-flex"
          >
            {t("nav.book")}
          </Link>
          <MobileMenu />
        </div>
      </div>
      {/* Loading bar over the bottom border while a new page loads. */}
      <NavProgress />
    </header>
  );
}
