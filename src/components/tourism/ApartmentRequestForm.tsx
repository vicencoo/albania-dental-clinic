"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/forms/Field";
import { useRequestForm } from "@/components/forms/useRequestForm";

export interface ApartmentRequestFormProps {
  apartmentSlug: string;
}

/** Availability request form → POST /api/consultation (topic=apartment). */
export function ApartmentRequestForm({ apartmentSlug }: ApartmentRequestFormProps) {
  const t = useTranslations("form");
  const id = useId();
  const { pending, onSubmit, has } = useRequestForm();
  const f = (name: string) => `${id}-${name}`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative grid gap-5 rounded-[2.25rem] border border-brand-sand bg-brand-white p-6 shadow-card sm:grid-cols-2 sm:p-8"
    >
      <div className="sm:col-span-2">
        <h2 className="text-3xl">{t("apartmentTitle")}</h2>
        <p className="mt-2 text-sm text-brand-muted">{t("apartmentText")}</p>
      </div>
      <input type="hidden" name="topic" value="apartment" />
      <input type="hidden" name="apartment" value={apartmentSlug} />
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-clip">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id={f("name")} label={t("name")} error={has("name") ? t("errors.name") : undefined} className="sm:col-span-2">
        <input
          id={f("name")}
          name="name"
          autoComplete="name"
          aria-invalid={has("name")}
          aria-describedby={has("name") ? `${f("name")}-error` : undefined}
          className={inputClass}
        />
      </Field>
      <Field
        id={f("email")}
        label={t("email")}
        error={has("email") ? t("errors.email") : has("contact") ? t("errors.contact") : undefined}
      >
        <input
          id={f("email")}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={has("email") || has("contact")}
          aria-describedby={has("email") || has("contact") ? `${f("email")}-error` : undefined}
          className={inputClass}
        />
      </Field>
      <Field id={f("phone")} label={t("phone")}>
        <input id={f("phone")} name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </Field>
      <Field id={f("arrival")} label={t("arrival")}>
        <input id={f("arrival")} name="arrival" type="date" className={inputClass} />
      </Field>
      <Field id={f("departure")} label={t("departure")}>
        <input id={f("departure")} name="departure" type="date" className={inputClass} />
      </Field>
      <Field id={f("guests")} label={t("guests")}>
        <input id={f("guests")} name="guests" type="number" min={1} max={8} defaultValue={1} className={inputClass} />
      </Field>
      <Field id={f("message")} label={t("message")} optional={t("optional")}>
        <input id={f("message")} name="message" className={inputClass} />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-brand-muted">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            aria-invalid={has("consent")}
            className="mt-0.5 size-5 shrink-0 accent-brand-green"
          />
          <span>
            {t("consent")}{" "}
            <Link href="/privacy" className="text-brand-green underline underline-offset-4">
              {t("privacyLink")}
            </Link>
          </span>
        </label>
        {has("consent") && <p className="rise mt-2 text-xs text-brand-red">{t("errors.consent")}</p>}
      </div>
      {has("generic") && (
        <p role="alert" className="text-sm text-brand-red sm:col-span-2">
          {t("errors.generic")}
        </p>
      )}
      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? t("sending") : t("apartmentSubmit")}
        </Button>
      </div>
    </form>
  );
}
