import { useTranslations } from "next-intl";
import { cx, stagger } from "@/lib/style";

export interface StepListProps {
  steps: { title: string; text: string }[];
  /** "timeline" = vertical line with numbered nodes; "grid" = numbered cards. */
  layout?: "timeline" | "grid";
  className?: string;
  /** "blue" for travel/digital flows. */
  tone?: "green" | "blue";
}

/** Numbered steps with a CSS-drawn timeline. Semantic ordered list. */
export function StepList({ steps, layout = "timeline", className, tone = "green" }: StepListProps) {
  const blue = tone === "blue";
  const t = useTranslations("ui");
  if (steps.length === 0) return null;

  if (layout === "grid") {
    return (
      <ol className={cx("reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal-flip lift relative rounded-[1.75rem] border border-brand-sand bg-brand-white p-7"
            style={stagger(i)}
          >
            <span className={cx("eyebrow", blue && "text-brand-blue")}>
              {t("step")} {i + 1}
            </span>
            <h3 className="mt-3 text-2xl">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cx("relative space-y-4", className)}>
      <span
        aria-hidden
        className={cx("absolute bottom-6 left-[1.6rem] top-6 w-px bg-gradient-to-b to-transparent", blue ? "from-brand-blue via-brand-blue/50" : "from-brand-gold via-brand-gold/50")}
      />
      {steps.map((step, i) => (
        <li key={step.title} className="reveal-left group relative flex gap-6" style={stagger(i)}>
          <span className={cx("reveal-spin relative z-10 grid size-[3.25rem] shrink-0 place-items-center rounded-full border bg-brand-white font-heading text-xl transition-colors duration-500 group-hover:text-brand-white", blue ? "border-brand-blue text-brand-blue group-hover:bg-brand-blue" : "border-brand-gold text-brand-green group-hover:bg-brand-green")}>
            {i + 1}
          </span>
          <div className="flex-1 rounded-[1.5rem] bg-brand-white p-6 shadow-[0_1px_0_rgb(239_232_223)] transition-shadow duration-500 group-hover:shadow-card">
            <h3 className="text-2xl">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-brand-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
