import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { TeamMember } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { ArchImage } from "@/components/ui/ArchImage";
import { Icon } from "@/components/ui/Icon";
import { paragraphs, stagger } from "@/lib/style";

export interface DoctorProfileProps {
  member: TeamMember;
}

/** Full profile: photo, bio, specialties. */
export function DoctorProfile({ member }: DoctorProfileProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("drDede");

  return (
    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
        {member.photo ? (
          <ArchImage
            src={member.photo}
            alt={member.name}
            ratio="aspect-[4/5]"
            position="50% 20%"
            className="shadow-soft"
          />
        ) : (
          <div
            className="arch grid aspect-4/5 place-items-center bg-brand-porcelain text-brand-gold"
            style={{ "--arch-v": "40%" } as CSSProperties}
          >
            <Icon name="user" className="size-16" />
          </div>
        )}
        <p className="mt-6 text-center font-heading text-3xl">{member.name}</p>
        <p className="mt-1 text-center text-sm uppercase tracking-widest text-brand-muted">
          {member.role[locale]}
        </p>
      </div>

      <div>
        <div className="space-y-5 text-lg leading-relaxed text-brand-muted">
          {paragraphs(member.bio[locale]).map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "reveal font-heading text-3xl leading-snug text-brand-ink"
                  : "reveal"
              }
            >
              {p}
            </p>
          ))}
        </div>

        <h2 className="reveal mt-14 text-3xl">{t("specialtiesTitle")}</h2>
        <ul className="reveal-alternate mt-6 grid gap-3 sm:grid-cols-2">
          {member.specialties.map((s, i) => (
            <li
              key={s.en}
              className="reveal-left flex items-center gap-3 rounded-2xl border border-brand-sand bg-brand-white px-5 py-4"
              style={stagger(i)}
            >
              <Icon name="check" className="size-5 text-brand-gold" />
              {s[locale]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
