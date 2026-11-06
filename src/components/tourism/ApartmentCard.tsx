import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isPlaceholder } from "@/content/site";
import type { Apartment } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { Icon } from "@/components/ui/Icon";

export interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("ui");
  const cover = apartment.images[0];

  return (
    <Link
      href={`/dental-tourism/apartments/${apartment.slug}`}
      className="lift group grid overflow-clip rounded-[2rem] border border-brand-sand bg-brand-white md:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-clip bg-brand-porcelain md:aspect-auto">
        {cover ? (
          <Image src={cover} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="zoom-target object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(176_141_87/0.2),transparent_60%)]">
            <Icon name="home" className="size-16 text-brand-gold" />
          </div>
        )}
      </div>
      <div className="flex flex-col p-8 lg:p-10">
        <h2 className="text-3xl transition-colors group-hover:text-brand-green">{apartment.name[locale]}</h2>
        <p className="mt-3 flex-1 leading-relaxed text-brand-muted">{apartment.description[locale]}</p>
        <ul className="mt-6 flex flex-wrap gap-2 text-sm text-brand-muted">
          {!isPlaceholder(apartment.distanceToClinic) && (
            <li className="flex items-center gap-1.5 rounded-full bg-brand-porcelain px-3 py-1.5">
              <Icon name="pin" className="size-4" /> {apartment.distanceToClinic}
            </li>
          )}
          {apartment.capacity && (
            <li className="flex items-center gap-1.5 rounded-full bg-brand-porcelain px-3 py-1.5">
              <Icon name="user" className="size-4" /> {apartment.capacity}
            </li>
          )}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 text-sm text-brand-green">
          {t("learnMore")}
          <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
