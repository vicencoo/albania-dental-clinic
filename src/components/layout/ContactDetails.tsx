import { useTranslations } from "next-intl";
import { isPlaceholder, site, whatsappHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Contact card. Rows with placeholder values are hidden until the clinic confirms them. */
export function ContactDetails() {
  const t = useTranslations("ui");
  const wa = whatsappHref();

  const rows = [
    !isPlaceholder(site.address.street) && {
      icon: "pin",
      label: t("address"),
      value: `${site.address.street}, ${site.address.city}`,
      href: isPlaceholder(site.mapUrl) ? undefined : site.mapUrl,
    },
    !isPlaceholder(site.phone) && {
      icon: "phone",
      label: t("phone"),
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
    },
    !isPlaceholder(site.email) && {
      icon: "mail",
      label: t("email"),
      value: site.email,
      href: `mailto:${site.email}`,
    },
    !isPlaceholder(site.hours[0]?.days) && {
      icon: "clock",
      label: t("hours"),
      value: site.hours
        .map((h) => `${h.days} ${h.open}–${h.close}`)
        .join(" · "),
    },
  ].filter(Boolean) as {
    icon: IconName;
    label: string;
    value: string;
    href?: string;
  }[];

  return (
    <div className="reveal rounded-4xl border border-brand-sand bg-brand-white p-8">
      {rows.length > 0 ? (
        <dl className="space-y-5">
          {rows.map((row) => (
            <div key={row.label} className="flex gap-4">
              <dt className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-porcelain text-brand-green">
                <Icon name={row.icon} className="size-5" />
                <span className="sr-only">{row.label}</span>
              </dt>
              <dd className="pt-2.5">
                {row.href ? (
                  <a
                    href={row.href}
                    className="link-underline hover:text-brand-green"
                  >
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-sm leading-relaxed text-brand-muted">
          {t("contactSoon")}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {wa && (
          <Button external={wa} leadingIcon="whatsapp" icon={null}>
            {t("whatsappCta")}
          </Button>
        )}
        <Button
          external={site.social.instagram}
          variant="secondary"
          leadingIcon="instagram"
          icon={null}
        >
          @albaniadental_clinic
        </Button>
      </div>
    </div>
  );
}
