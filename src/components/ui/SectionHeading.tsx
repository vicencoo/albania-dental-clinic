import type { ReactNode } from "react";
import { cx, stagger } from "@/lib/style";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cx(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <p className={cx("eyebrow reveal-right", tone === "dark" && "text-brand-gold-light")}>{eyebrow}</p>
      )}
      <Tag
        className={cx(
          "reveal mt-4 text-4xl sm:text-5xl lg:text-[3.4rem]",
          tone === "light" ? "text-brand-ink" : "text-brand-white",
        )}
        style={stagger(1)}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cx(
            "reveal mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            tone === "light" ? "text-brand-muted" : "text-brand-white/75",
          )}
          style={stagger(2)}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
