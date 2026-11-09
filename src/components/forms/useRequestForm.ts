"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { trackConversion } from "@/lib/ads";

export type FieldError = "name" | "contact" | "email" | "consent" | "xray" | "generic";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Client-side validation mirroring /api/consultation. */
function validate(form: FormData): FieldError[] {
  const errors: FieldError[] = [];
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  if (!String(form.get("name") ?? "").trim()) errors.push("name");
  if (!email && !phone) errors.push("contact");
  if (email && !EMAIL.test(email)) errors.push("email");
  if (!form.get("consent")) errors.push("consent");
  const file = form.get("xray");
  if (file instanceof File && file.size > 0 && (file.size > MAX_FILE_BYTES || !ALLOWED_TYPES.includes(file.type))) {
    errors.push("xray");
  }
  return errors;
}

/** Submits a request form to /api/consultation and redirects to /thank-you. */
export function useRequestForm() {
  const router = useRouter();
  const locale = useLocale();
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    data.set("locale", locale);

    const found = validate(data);
    setErrors(found);
    if (found.length) {
      requestAnimationFrame(() => formEl.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/consultation", { method: "POST", body: data });
      if (!res.ok) throw new Error(String(res.status));
      trackConversion("lead");
      router.push("/thank-you");
    } catch {
      setErrors(["generic"]);
      setPending(false);
    }
  }

  return { errors, pending, onSubmit, has: (k: FieldError) => errors.includes(k) };
}
