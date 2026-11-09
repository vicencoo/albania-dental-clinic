import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { AppPath } from "@/content/types";
import { cx } from "@/lib/style";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "shine bg-brand-green text-brand-white shadow-glow hover:bg-brand-leaf hover:text-brand-obsidian",
  // secondary / ghost adapt automatically inside dark (.obsidian) sections — always readable.
  secondary:
    "border border-brand-ink/20 text-brand-ink hover:border-brand-green hover:text-brand-green in-[.obsidian]:border-white/30 in-[.obsidian]:text-brand-white in-[.obsidian]:hover:border-brand-leaf in-[.obsidian]:hover:text-brand-leaf",
  ghost: "px-0! text-brand-green link-underline in-[.obsidian]:text-brand-leaf",
  light: "shine bg-brand-white text-brand-obsidian hover:bg-brand-leaf",
  "outline-light":
    "border border-brand-white/30 text-brand-white hover:border-brand-leaf hover:text-brand-leaf",
};

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 font-label text-[0.72rem] uppercase tracking-[0.2em] transition-[background-color,border-color,color,transform] duration-500 ease-(--ease-luxe) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Trailing icon. "arrow" slides on hover. */
  icon?: IconName | null;
  leadingIcon?: IconName;
} & (
  | ({ href: AppPath } & Omit<
      ComponentProps<typeof Link>,
      "href" | "className"
    >)
  | ({ href?: undefined; external?: undefined } & Omit<
      ComponentProps<"button">,
      "className"
    >)
  | ({ href?: undefined; external: string } & Omit<
      ComponentProps<"a">,
      "className" | "href"
    >)
);

export function Button({
  variant = "primary",
  className = "",
  children,
  icon = "arrow",
  leadingIcon,
  ...props
}: ButtonProps) {
  const classes = cx(base, variants[variant], className);
  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} className="size-4.5" />}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-1"
        />
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <Link {...props} className={classes}>
        {content}
      </Link>
    );
  }
  if ("external" in props && props.external) {
    const { external, ...rest } = props;
    return (
      <a
        href={external}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
        className={classes}
      >
        {content}
      </a>
    );
  }
  const { type = "button", ...rest } = props as ComponentProps<"button">;
  return (
    <button type={type} {...rest} className={classes}>
      {content}
    </button>
  );
}
