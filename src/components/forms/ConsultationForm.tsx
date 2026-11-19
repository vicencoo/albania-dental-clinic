"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Field, inputClass } from "./Field";
import { useRequestForm } from "./useRequestForm";

const interests = [
  "sameDay",
  "implants",
  "aesthetic",
  "general",
  "tourism",
  "other",
] as const;

/** Free consultation form with optional X-ray upload → POST /api/consultation. */
export function ConsultationForm({
  defaultInterest,
  apartment,
}: {
  defaultInterest?: (typeof interests)[number];
  /** Slug of the apartment the patient is looking at (sent with the request). */
  apartment?: string;
}) {
  const t = useTranslations("form");
  const id = useId();
  const { errors, pending, onSubmit, has } = useRequestForm();
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{
    name: string;
    size: string;
    preview: string | null;
  } | null>(null);

  // Free the temporary preview URL when the file changes or the form unmounts.
  useEffect(
    () => () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    },
    [file],
  );

  function onFileChange(selected: File | undefined) {
    if (!selected) return setFile(null);
    const kb = selected.size / 1024;
    setFile({
      name: selected.name,
      size:
        kb < 1024
          ? `${Math.max(1, Math.round(kb))} KB`
          : `${(kb / 1024).toFixed(1)} MB`,
      preview: selected.type.startsWith("image/")
        ? URL.createObjectURL(selected)
        : null,
    });
  }

  function removeFile() {
    if (fileInput.current) fileInput.current.value = "";
    setFile(null);
  }

  const f = (name: string) => `${id}-${name}`;
  const described = (name: string, error: boolean, hint = false) =>
    error ? `${f(name)}-error` : hint ? `${f(name)}-hint` : undefined;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      encType="multipart/form-data"
      className="relative grid grid-cols-1 gap-6 rounded-[2.25rem] border border-brand-sand bg-brand-white p-6 shadow-card sm:grid-cols-2 sm:p-10"
    >
      {/* Honeypot (hidden from people and assistive tech) */}
      <div aria-hidden className="absolute left-[-9999px] h-0 overflow-clip">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="topic" value="consultation" />
      {apartment && <input type="hidden" name="apartment" value={apartment} />}

      <Field
        id={f("name")}
        label={t("name")}
        error={has("name") ? t("errors.name") : undefined}
        className="sm:col-span-2"
      >
        <input
          id={f("name")}
          name="name"
          autoComplete="name"
          required
          aria-invalid={has("name")}
          aria-describedby={described("name", has("name"))}
          className={inputClass}
        />
      </Field>

      <Field
        id={f("email")}
        label={t("email")}
        error={
          has("email")
            ? t("errors.email")
            : has("contact")
              ? t("errors.contact")
              : undefined
        }
      >
        <input
          id={f("email")}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={has("email") || has("contact")}
          aria-describedby={described("email", has("email") || has("contact"))}
          className={inputClass}
        />
      </Field>

      <Field id={f("phone")} label={t("phone")}>
        <input
          id={f("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={has("contact")}
          className={inputClass}
        />
      </Field>

      <Field id={f("country")} label={t("country")} optional={t("optional")}>
        <input
          id={f("country")}
          name="country"
          autoComplete="country-name"
          className={inputClass}
        />
      </Field>

      <Field id={f("interest")} label={t("interest")}>
        <select
          id={f("interest")}
          name="interest"
          defaultValue={defaultInterest ?? "sameDay"}
          className={inputClass}
        >
          {interests.map((key) => (
            <option key={key} value={key}>
              {t(`interestOptions.${key}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={f("message")}
        label={t("message")}
        optional={t("optional")}
        className="sm:col-span-2"
      >
        <textarea
          id={f("message")}
          name="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <Field
        id={f("xray")}
        label={t("xray")}
        hint={t("xrayHint")}
        error={has("xray") ? t("errors.xray") : undefined}
        className="sm:col-span-2"
      >
        <div>
          <input
            ref={fileInput}
            id={f("xray")}
            name="xray"
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            aria-invalid={has("xray")}
            aria-describedby={described("xray", has("xray"), true)}
            onChange={(e) => onFileChange(e.target.files?.[0])}
            className="peer sr-only"
          />
          {file ? (
            /* Selected: preview + name + change / remove */
            <div className="rise flex items-center gap-4 rounded-2xl border border-brand-green/40 bg-brand-green/[0.05] p-3 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold">
              <div className="relative grid size-20 shrink-0 place-items-center overflow-clip rounded-xl bg-brand-obsidian sm:size-24">
                {file.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not an optimisable asset
                  <img
                    src={file.preview}
                    alt={t("xrayPreview")}
                    className="size-full object-contain"
                  />
                ) : (
                  <span className="flex flex-col items-center gap-1 text-brand-white">
                    <Icon name="upload" className="size-6" />
                    <span className="font-label text-[0.65rem] tracking-[0.2em]">
                      PDF
                    </span>
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-green">
                  <Icon name="check" className="size-4" />
                  {t("xraySelected")}
                </p>
                <p className="mt-1 truncate text-sm text-brand-ink">
                  {file.name}
                </p>
                <p className="text-xs text-brand-muted">{file.size}</p>
                <div className="mt-2 flex gap-4 text-xs font-semibold">
                  <label
                    htmlFor={f("xray")}
                    className="cursor-pointer text-brand-green underline-offset-4 hover:underline"
                  >
                    {t("xrayChange")}
                  </label>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-brand-muted underline-offset-4 hover:text-brand-red hover:underline"
                  >
                    {t("xrayRemove")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <label
              htmlFor={f("xray")}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-brand-gold/60 bg-brand-porcelain px-5 py-5 transition-colors hover:border-brand-gold hover:bg-brand-sand/60 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-white text-brand-green transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon name="upload" className="size-5" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-brand-muted">
                {t("xrayChoose")}
              </span>
            </label>
          )}
        </div>
      </Field>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-brand-muted">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            aria-invalid={has("consent")}
            aria-describedby={has("consent") ? f("consent-error") : undefined}
            className="mt-0.5 size-5 shrink-0 rounded accent-brand-green"
          />
          <span>
            {t("consent")}{" "}
            <Link
              href="/privacy"
              className="text-brand-green underline underline-offset-4"
            >
              {t("privacyLink")}
            </Link>
          </span>
        </label>
        {has("consent") && (
          <p
            id={f("consent-error")}
            className="rise mt-2 text-xs text-brand-red"
          >
            {t("errors.consent")}
          </p>
        )}
      </div>

      {has("generic") && (
        <p
          role="alert"
          className="rise rounded-2xl bg-brand-red/10 px-4 py-3 text-sm text-brand-red sm:col-span-2"
        >
          {t("errors.generic")}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? t("sending") : t("submit")}
        </Button>
        <p className="sr-only" aria-live="polite">
          {pending ? t("sending") : errors.length ? t("required") : ""}
        </p>
      </div>
    </form>
  );
}
