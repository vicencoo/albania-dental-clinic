import type { CSSProperties } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { TeamMember } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { Icon } from "@/components/ui/Icon";

export interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const locale = useLocale() as AppLocale;
  const href = member.isLead ? "/clinic/dr-donela-dede" : `/clinic/team/${member.slug}`;

  return (
    <Link href={href} className="lift group block overflow-clip rounded-[2rem] bg-brand-white">
      <div className="arch relative aspect-[4/5] bg-brand-porcelain" style={{ "--arch-v": "40%" } as CSSProperties}>
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="reveal-img-zoom zoom-target object-cover object-top"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-brand-gold">
            <Icon name="user" className="size-14" />
          </span>
        )}
      </div>
      <div className="p-6 text-center">
        <p className="font-heading text-2xl transition-colors group-hover:text-brand-green">{member.name}</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-brand-muted">{member.role[locale]}</p>
      </div>
    </Link>
  );
}
