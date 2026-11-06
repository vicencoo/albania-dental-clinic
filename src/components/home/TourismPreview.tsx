import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AppPath } from "@/content/types";

const cards: { icon: IconName; href: AppPath }[] = [
  { icon: "calendar", href: "/dental-tourism/how-it-works" },
  { icon: "home", href: "/dental-tourism/apartments" },
  { icon: "map", href: "/dental-tourism/discover-albania" },
];


/** Dental tourism + apartments preview. */
export function TourismPreview() {
  const t = useTranslations("home.tourism");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="obsidian relative overflow-clip bg-[radial-gradient(ellipse_60%_60%_at_80%_10%,rgb(31_111_163/0.35),transparent_70%),radial-gradient(ellipse_50%_50%_at_10%_90%,rgb(15_106_76/0.2),transparent_70%)] py-28 lg:py-40">
      <svg
        aria-hidden
        viewBox="0 0 800 200"
        className="pointer-events-none absolute inset-x-0 top-10 w-full text-brand-azure/20"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150 C 200 40, 400 40, 600 120 S 800 60, 800 60"
          fill="none"
          stroke="currentColor"
          strokeDasharray="4 10"
        />
      </svg>
      <div className="container-luxe relative">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} align="center" tone="dark" />
        <ul className="reveal-sides mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title}>
              <Link
                href={cards[i]?.href ?? "/dental-tourism"}
                className="group flex h-full flex-col rounded-xl border border-white/[0.08] bg-white/[0.03] p-9 transition-[border-color,background-color,translate] duration-700 ease-(--ease-luxe) hover:-translate-y-1 hover:border-brand-azure/40 hover:bg-white/[0.05]"
              >
                <span className="grid size-14 place-items-center rounded-full border border-brand-azure/40 text-brand-azure transition-colors duration-500 group-hover:bg-brand-azure group-hover:text-brand-obsidian">
                  <Icon name={cards[i]?.icon ?? "plane"} className="size-6" />
                </span>
                <h3 className="mt-8 text-3xl text-brand-white">{item.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-brand-white/55">{item.text}</p>
                <Icon
                  name="arrow"
                  className="mt-8 size-5 text-brand-azure transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="reveal-scale mt-14 text-center">
          <Button href="/dental-tourism">{t("cta")}</Button>
        </div>
      </div>
    </section>
  );
}
