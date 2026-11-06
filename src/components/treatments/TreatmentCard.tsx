import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { treatmentHref } from "@/content/treatments";
import type { Treatment } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { categoryTone, tone } from "@/lib/tone";

export interface TreatmentCardProps {
  treatment: Treatment;
  label: string;
  /** Compact row style (used in lists); default is an image card. */
  variant?: "card" | "row";
}

export function TreatmentCard({ treatment, label, variant = "card" }: TreatmentCardProps) {
  const t = useTranslations("treatments.desc");
  const description = t.has(treatment.slug) ? t(treatment.slug) : undefined;

  if (variant === "row") {
    return (
      <Link
        href={treatmentHref(treatment)}
        className="group flex items-center justify-between gap-6 border-b border-brand-sand py-5 transition-colors hover:border-brand-gold"
      >
        <span>
          <span className="block font-heading text-2xl transition-colors group-hover:text-brand-green">{label}</span>
          {description && <span className="mt-1 line-clamp-1 block text-sm text-brand-muted">{description}</span>}
        </span>
        <Icon
          name="arrow"
          className="size-5 shrink-0 text-brand-gold transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </Link>
    );
  }

  return (
    <Link
      href={treatmentHref(treatment)}
      className="lift group flex h-full flex-col overflow-clip rounded-[2rem] border border-brand-sand bg-brand-white"
    >
      <div className="relative aspect-[16/11] overflow-clip bg-brand-sand">
        {treatment.image && (
          <Image
            src={treatment.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="reveal-img-zoom zoom-target object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-center gap-2.5 text-2xl">
          <span aria-hidden className={`size-2 shrink-0 rounded-full ${tone[categoryTone[treatment.category]].dot}`} />
          {label}
        </h3>
        {description && <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{description}</p>}
        <Icon
          name="arrow"
          className="mt-5 size-5 text-brand-gold transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </div>
    </Link>
  );
}
