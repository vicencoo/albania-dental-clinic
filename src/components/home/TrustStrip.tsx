import { useTranslations } from "next-intl";

/** Verified, qualitative trust signals as an infinite CSS marquee (pauses on hover). */
export function TrustStrip() {
  const t = useTranslations("home");
  const items = t.raw("trust") as string[];

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 font-heading text-base font-light italic text-brand-white/70 sm:text-lg">
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="size-1 shrink-0 rotate-45 bg-brand-leaf" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={items.join(", ")} className="reveal-fade overflow-clip border-y border-white/[0.06] bg-brand-obsidian py-3.5">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
