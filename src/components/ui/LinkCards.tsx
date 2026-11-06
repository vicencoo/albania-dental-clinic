import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { AppPath } from "@/content/types";
import { stagger } from "@/lib/style";
import { Icon, type IconName } from "./Icon";

export interface LinkCardItem {
  href: AppPath;
  title: string;
  text?: string;
  image?: string;
  icon?: IconName;
}

/** Grid of navigation cards used on section overview pages. */
export function LinkCards({
  items,
  columns = 3,
  tone = "green",
}: {
  items: LinkCardItem[];
  columns?: 2 | 3;
  /** Icon colour: "blue" on travel/digital pages. */
  tone?: "green" | "blue";
}) {
  const iconTone =
    tone === "blue"
      ? "bg-brand-sky text-brand-blue group-hover:bg-brand-blue"
      : "bg-brand-porcelain text-brand-green group-hover:bg-brand-green";
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item, i) => (
        <li key={item.href} className="reveal-rotate" style={stagger(i % 3)}>
          <Link
            href={item.href}
            className="lift group flex h-full flex-col overflow-clip rounded-[2rem] border border-brand-sand bg-brand-white"
          >
            {item.image ? (
              <div className="relative aspect-[16/10] overflow-clip bg-brand-sand">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="zoom-target object-cover"
                />
              </div>
            ) : (
              <div className="px-7 pt-7">
                <span className={`reveal-spin grid size-12 place-items-center rounded-full transition-colors duration-500 group-hover:text-brand-white ${iconTone}`}>
                  <Icon name={item.icon ?? "tooth"} className="size-5" />
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col p-7">
              <h3 className="text-2xl">{item.title}</h3>
              {item.text && <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{item.text}</p>}
              <Icon
                name="arrow"
                className="mt-5 size-5 text-brand-gold transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
