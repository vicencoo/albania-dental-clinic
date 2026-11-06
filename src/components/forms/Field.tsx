import type { ReactNode } from "react";
import { cx } from "@/lib/style";

export const inputClass =
  "w-full rounded-2xl border border-brand-sand bg-brand-white px-4 py-3.5 text-[0.95rem] text-brand-ink placeholder:text-brand-muted/60 transition-[border-color,box-shadow] duration-300 outline-none focus:border-brand-gold focus:shadow-[0_0_0_4px_rgb(176_141_87/0.15)] aria-[invalid=true]:border-brand-red";

/** Label + control + error message, wired with aria-describedby by the caller. */
export function Field({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-brand-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-brand-muted">({optional})</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-brand-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="rise text-xs text-brand-red">
          {error}
        </p>
      )}
    </div>
  );
}
