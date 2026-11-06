import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { AppPath } from "@/content/types";
import { cx } from "@/lib/style";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "shine bg-brand-green text-brand-white hover:bg-brand-green-dark shadow-soft",
  secondary: "border border-brand-gold/70 text-brand-ink hover:border-brand-gold hover:bg-brand-porcelain",
  ghost: "px-0! text-brand-green link-underline",
  light: "shine bg-brand-white text-brand-green-dark hover:bg-brand-porcelain",
  "outline-light": "border border-brand-white/40 text-brand-white hover:border-brand-white hover:bg-brand-white/10",
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Trailing icon. "arrow" slides on hover. */
  icon?: IconName | null;
  leadingIcon?: IconName;
} & (
  | ({ href: AppPath } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined; external?: undefined } & Omit<ComponentProps<"button">, "className">)
  | ({ href?: undefined; external: string } & Omit<ComponentProps<"a">, "className" | "href">)
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
          className="size-4 transition-transform duration-300 ease-(--ease-luxe) group-hover:translate-x-1"
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
      <a href={external} target="_blank" rel="noopener noreferrer" {...rest} className={classes}>
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
