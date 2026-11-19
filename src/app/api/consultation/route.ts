import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { consultationEmail, LOGO_CID, XRAY_CID } from "@/lib/consultationEmail";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB — TODO: confirm limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]; // TODO: DICOM?

/**
 * POST /api/consultation — free consultation request with optional X-ray upload.
 * Expects multipart/form-data: name, email, phone, message, locale, consent, xray (file, optional).
 * Optional: topic ("consultation" | "apartment"), country, interest, apartment, arrival, departure, guests.
 *
 * Each valid request is emailed to the clinic (with the X-ray attached) through Resend's HTTP API
 * — no extra package. Configure in .env.local (see .env.example):
 *   RESEND_API_KEY, CONSULTATION_TO_EMAIL, CONSULTATION_FROM_EMAIL
 * Nothing is stored on the server. If sending fails, the visitor sees an error (never a false "sent").
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

  try {
    await sendToClinic(form, xray instanceof File && xray.size > 0 ? xray : null);
  } catch (error) {
    console.error("[consultation] email not sent:", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

/* ------------------------------------------------------------------ Email */

async function sendToClinic(form: FormData, xray: File | null) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONSULTATION_TO_EMAIL;
  const from = process.env.CONSULTATION_FROM_EMAIL;
  if (!apiKey || !to || !from) throw new Error("Email is not configured (RESEND_API_KEY / CONSULTATION_TO_EMAIL / CONSULTATION_FROM_EMAIL)");

  const email = String(form.get("email") ?? "").trim();
  // JPEG/PNG X-rays are also shown inside the email; other formats (PDF…) are only attached.
  const xrayInline = !!xray && ["image/jpeg", "image/png"].includes(xray.type);
  const xrayName = xray ? xray.name || "x-ray" : undefined;
  const { subject, html, text } = consultationEmail({
    get: (key) => String(form.get(key) ?? "").trim(),
    xrayName,
    xrayInline,
    receivedAt: new Date(),
  });

  const logo = await readFile(path.join(process.cwd(), "public/images/brand/logo-mark.png"));
  const attachments: Record<string, string>[] = [
    { filename: "albania-dental-clinic.png", content: logo.toString("base64"), content_type: "image/png", content_id: LOGO_CID },
  ];
  if (xray) {
    const content = Buffer.from(await xray.arrayBuffer()).toString("base64");
    attachments.push({
      filename: xrayName!,
      content,
      content_type: xray.type,
      ...(xrayInline ? { content_id: XRAY_CID } : {}),
    });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((a) => a.trim()),
      reply_to: email || undefined,
      subject,
      html,
      text,
      attachments,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
