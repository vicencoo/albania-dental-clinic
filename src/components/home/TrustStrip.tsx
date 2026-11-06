import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";

/** Verified, qualitative trust signals as an infinite CSS marquee (pauses on hover). */
export function TrustStrip() {
  const t = useTranslations("home");
  const items = t.raw("trust") as string[];

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 font-heading text-2xl text-brand-white sm:text-3xl">
          <span className="whitespace-nowrap">{item}</span>
          <Icon name="tooth" className="size-5 shrink-0 text-brand-gold-light" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={items.join(", ")} className="overflow-clip bg-brand-green py-6">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
