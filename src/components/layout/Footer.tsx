import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { footerNav, legalNav } from "@/content/navigation";
import { isPlaceholder, site, whatsappHref } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations();
  const wa = whatsappHref();
  const street = !isPlaceholder(site.address.street);

  const contacts = [
    street && { icon: "pin" as const, text: `${site.address.street}, ${site.address.city}` },
    !isPlaceholder(site.phone) && { icon: "phone" as const, text: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    !isPlaceholder(site.email) && { icon: "mail" as const, text: site.email, href: `mailto:${site.email}` },
  ].filter(Boolean) as { icon: "pin" | "phone" | "mail"; text: string; href?: string }[];

  const socials = [
    !isPlaceholder(site.social.instagram) && { icon: "instagram" as const, href: site.social.instagram, label: "Instagram" },
    !isPlaceholder(site.social.facebook) && { icon: "facebook" as const, href: site.social.facebook, label: "Facebook" },
    wa && { icon: "whatsapp" as const, href: wa, label: "WhatsApp" },
  ].filter(Boolean) as { icon: "instagram" | "facebook" | "whatsapp"; href: string; label: string }[];

  return (
    <footer className="relative mt-auto overflow-clip bg-brand-forest text-sm text-brand-white/75">
      <span aria-hidden className="tricolor-line absolute inset-x-0 top-0 rounded-none" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgb(176_141_87/0.18),transparent_40%)]"
      />
      <div className="container-luxe relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={site.name} className="inline-block rounded-2xl bg-brand-white px-4 py-3">
            <Logo />
          </Link>
          <p className="mt-6 max-w-xs leading-relaxed">{t("ui.footerTagline")}</p>

          {contacts.length > 0 && (
            <address className="mt-6 space-y-2 not-italic">
              {contacts.map((c) => (
                <p key={c.text} className="flex items-start gap-2.5">
                  <Icon name={c.icon} className="mt-0.5 size-4 shrink-0 text-brand-gold-light" />
                  {c.href ? (
                    <a href={c.href} className="link-underline hover:text-brand-white">
                      {c.text}
                    </a>
                  ) : (
                    c.text
                  )}
                </p>
              ))}
            </address>
          )}

          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-brand-white/20 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-white/10"
                  >
                    <Icon name={s.icon} className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {footerNav.map((group) => (
          <div key={group.titleKey}>
            <p className="eyebrow mb-4 text-brand-gold-light">{t(group.titleKey)}</p>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline transition-colors hover:text-brand-white">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-brand-white/10">
        <div className="container-luxe flex flex-wrap items-center justify-between gap-4 py-5 text-xs">
          <p>
            © {site.name}. {t("ui.rights")}
          </p>
          <ul className="flex flex-wrap gap-5">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline hover:text-brand-white">
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher tone="dark" />
        </div>
      </div>
    </footer>
  );
}
