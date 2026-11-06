import Image from "next/image";
import { useLocale } from "next-intl";
import type { Technology } from "@/content/types";
import type { AppLocale } from "@/i18n/routing";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/style";

export interface TechnologyCardProps {
  technology: Technology;
  /** Alternate image side on wide screens. */
  reverse?: boolean;
  index?: number;
}

/** Alternating image/text row for each technology. */
export function TechnologyCard({ technology, reverse, index = 0 }: TechnologyCardProps) {
  const locale = useLocale() as AppLocale;

  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={cx(reverse ? "reveal-left md:order-2" : "reveal-right")}>
        <div className="relative aspect-[4/3] overflow-clip rounded-[2rem] bg-brand-sky">
          {technology.image ? (
            <Image
              src={technology.image}
              alt={technology.name[locale]}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <Icon name="scan" className="size-20 text-brand-blue/60" />
            </div>
          )}
        </div>
      </div>
      <div className={reverse ? "reveal-right" : "reveal-left"}>
        <span className="font-heading text-6xl text-brand-blue/35">{String(index + 1).padStart(2, "0")}</span>
        <h2 className="mt-2 text-4xl">{technology.name[locale]}</h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-muted">{technology.description[locale]}</p>
      </div>
    </article>
  );
}
