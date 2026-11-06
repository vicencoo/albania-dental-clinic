import { NextResponse } from "next/server";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB — TODO: confirm limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]; // TODO: DICOM?

/**
 * POST /api/consultation — free consultation request with optional X-ray upload.
 * Expects multipart/form-data: name, email, phone, message, locale, consent, xray (file, optional).
 * Optional: topic ("consultation" | "apartment"), country, interest, apartment, arrival, departure, guests.
 *
 * TODO:
 *  - proper validation (zod or similar) + spam protection (honeypot / captcha / rate limit)
 *  - send email to the clinic ([EMAIL]) with the attachment (Resend / SMTP / …)
 *  - patient-data handling: GDPR-compliant storage/retention of medical images
 */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field — pretend success, store nothing.
  if (String(form.get("company") ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const consent = form.get("consent");
  const xray = form.get("xray");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!email && !phone) errors.contact = "email_or_phone_required";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "invalid";
  if (!consent) errors.consent = "required";

  if (xray instanceof File && xray.size > 0) {
    if (xray.size > MAX_FILE_BYTES) errors.xray = "too_large";
    else if (!ALLOWED_TYPES.includes(xray.type)) errors.xray = "unsupported_type";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // TODO: send email / store request.

  return NextResponse.json({ ok: true });
}
