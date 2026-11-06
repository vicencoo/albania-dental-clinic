import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ArchImage } from "@/components/ui/ArchImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadDoctor } from "@/content/team";
import type { AppLocale } from "@/i18n/routing";
import { stagger } from "@/lib/style";

/** Dr. Donela Dede preview. */
export function TeamPreview() {
  const t = useTranslations("home.team");
  const locale = useLocale() as AppLocale;

  return (
    <section className="relative overflow-clip bg-brand-green py-24 text-brand-white lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(176_141_87/0.25),transparent_45%)]"
      />
      <div className="container-luxe relative grid items-center gap-16 lg:grid-cols-2">
        <div className="reveal-right relative mx-auto w-full max-w-sm">
          {leadDoctor.photo && (
            <ArchImage
              src={leadDoctor.photo}
              alt={leadDoctor.name}
              ratio="aspect-[4/5]"
              position="50% 20%"
              className="shadow-soft"
            />
          )}
          <span
            aria-hidden
            className="float absolute -right-6 -top-6 size-28 rounded-full border border-brand-gold-light/50"
          />
        </div>

        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} tone="dark" />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {leadDoctor.specialties.map((s, i) => (
              <li
                key={s.en}
                className="reveal-zoom rounded-full border border-brand-white/25 px-4 py-2 text-sm text-brand-white/90"
                style={stagger(i)}
              >
                {s[locale]}
              </li>
            ))}
          </ul>
          <div className="reveal-left mt-10">
            <Button href="/clinic/dr-donela-dede" variant="light">
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
