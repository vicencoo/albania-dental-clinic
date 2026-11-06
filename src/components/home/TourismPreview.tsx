import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AppPath } from "@/content/types";
import { stagger } from "@/lib/style";

const cards: { icon: IconName; href: AppPath }[] = [
  { icon: "calendar", href: "/dental-tourism/how-it-works" },
  { icon: "home", href: "/dental-tourism/apartments" },
  { icon: "map", href: "/dental-tourism/discover-albania" },
];

/** Cards slide in from the sides and rise in the middle. */
const slide = ["reveal-right", "reveal", "reveal-left"];

/** Dental tourism + apartments preview. */
export function TourismPreview() {
  const t = useTranslations("home.tourism");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="relative overflow-clip py-24 sky-wash lg:py-32">
      <svg
        aria-hidden
        viewBox="0 0 800 200"
        className="pointer-events-none absolute inset-x-0 top-10 w-full text-brand-blue/30"
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
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} align="center" />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title} className={slide[i] ?? "reveal"} style={stagger(i)}>
              <Link
                href={cards[i]?.href ?? "/dental-tourism"}
                className="lift group flex h-full flex-col rounded-[2rem] bg-brand-white p-8"
              >
                <span className="reveal-spin grid size-14 place-items-center rounded-full bg-brand-blue text-brand-white transition-transform duration-500 group-hover:rotate-6">
                  <Icon name={cards[i]?.icon ?? "plane"} className="size-6" />
                </span>
                <h3 className="mt-6 text-3xl">{item.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-brand-muted">{item.text}</p>
                <Icon
                  name="arrow"
                  className="mt-6 size-5 text-brand-blue transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="reveal-scale mt-12 text-center">
          <Button href="/dental-tourism">{t("cta")}</Button>
        </div>
      </div>
    </section>
  );
}
