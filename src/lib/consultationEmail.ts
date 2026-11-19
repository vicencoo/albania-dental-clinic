/**
 * The email the clinic receives for each website request.
 *
 * Built for Gmail / Outlook / Apple Mail: table layout, inline styles, solid colours (Gmail drops
 * gradients and most <style> rules), 600 px wide, and a hidden preheader for the inbox preview.
 * Images (logo, X-ray preview) are embedded in the email itself ("cid:" inline attachments), so
 * Gmail shows them without loading anything from the website.
 */

/** Content-IDs of the inline attachments added by the API route. */
export const LOGO_CID = "clinic-logo";
export const XRAY_CID = "xray-preview";

export interface ConsultationEmailInput {
  get: (field: string) => string;
  xrayName?: string;
  /** True when the X-ray is a JPEG/PNG embedded inline (PDFs etc. are only attached). */
  xrayInline?: boolean;
  /** Time the request was received. */
  receivedAt: Date;
}

const c = {
  obsidian: "#090c0b",
  green: "#0f6a4c",
  leaf: "#45c49a",
  azure: "#6cb8e6",
  ink: "#0b0d0c",
  muted: "#6b7280",
  sand: "#e7e2d8",
  porcelain: "#f4f5f2",
  white: "#ffffff",
};

const interests: Record<string, string> = {
  sameDay: "Same-day teeth",
  implants: "Implants",
  aesthetic: "Aesthetic dentistry",
  general: "General dentistry",
  tourism: "Dental tourism & apartments",
  other: "Other",
};

const languages: Record<string, string> = { sq: "Albanian (Shqip)", it: "Italian (Italiano)", en: "English" };

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

/** "+355 69 729 8567" → "355697298567" for wa.me links; null if it does not look like a number. */
function phoneDigits(phone: string): string | null {
  const digits = phone.replace(/[^\d]/g, "").replace(/^00/, "");
  return digits.length >= 8 ? digits : null;
}

function button(href: string, label: string, primary = false): string {
  return `<td style="padding:0 8px 8px 0">
    <a href="${esc(href)}" style="display:inline-block;white-space:nowrap;padding:11px 18px;border-radius:999px;font:600 14px Arial,sans-serif;text-decoration:none;${
      primary ? `background:${c.green};color:${c.white};` : `background:${c.white};color:${c.green};border:1px solid ${c.green};`
    }">${label}</a>
  </td>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:12px 0;border-bottom:1px solid ${c.sand};width:150px;vertical-align:top;font:600 12px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:${c.muted}">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid ${c.sand};vertical-align:top;font:15px/1.5 Arial,sans-serif;color:${c.ink}">${value}</td>
  </tr>`;
}

function chip(text: string, bg: string, color: string): string {
  return `<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 12px;border-radius:999px;background:${bg};color:${color};font:600 12px Arial,sans-serif">${esc(text)}</span>`;
}

export function consultationEmail({ get, xrayName, xrayInline, receivedAt }: ConsultationEmailInput) {
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const message = get("message");
  const interest = interests[get("interest")] ?? get("interest");
  const isApartment = get("topic") === "apartment";
  const digits = phone ? phoneDigits(phone) : null;
  const when = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Tirane",
  }).format(receivedAt);

  const heading = isApartment ? "New apartment request" : "New consultation request";
  const subject = `${heading}: ${name}${interest ? ` · ${interest}` : ""}${xrayName ? " · X-ray attached" : ""}`;
  const preheader = [interest, get("country"), xrayName && "X-ray attached", message.slice(0, 90)].filter(Boolean).join(" · ");

  const actions = [
    email && button(`mailto:${email}?subject=${encodeURIComponent("Albania Dental Clinic – your request")}`, "Reply by email", true),
    digits && button(`https://wa.me/${digits}`, "WhatsApp"),
    phone && button(`tel:${phone.replace(/[^\d+]/g, "")}`, "Call"),
  ]
    .filter(Boolean)
    .join("");

  const details = [
    email && row("Email", `<a href="mailto:${esc(email)}" style="color:${c.green}">${esc(email)}</a>`),
    phone && row("Phone / WhatsApp", esc(phone)),
    get("country") && row("Country", esc(get("country"))),
    interest && row("Interested in", esc(interest)),
    get("apartment") && row("Apartment", esc(get("apartment"))),
    get("arrival") && row("Arrival", esc(get("arrival"))),
    get("departure") && row("Departure", esc(get("departure"))),
    get("guests") && row("Guests", esc(get("guests"))),
    row("Website language", esc(languages[get("locale")] ?? get("locale"))),
    row("Received", esc(when)),
  ]
    .filter(Boolean)
    .join("");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(heading)}</title></head>
<body style="margin:0;padding:0;background:${c.porcelain}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.porcelain}">
    <tr><td align="center" style="padding:28px 12px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${c.white};border-radius:16px;overflow:hidden;border:1px solid ${c.sand}">

        <!-- Brand header -->
        <tr><td style="background:${c.obsidian};padding:22px 32px">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:14px;vertical-align:middle"><img src="cid:${LOGO_CID}" width="44" height="44" alt="" style="display:block;border:0"></td>
            <td style="vertical-align:middle">
              <div style="font:400 22px Georgia,'Times New Roman',serif;letter-spacing:.18em;color:${c.white}">ALBANIA</div>
              <div style="font:600 10px Arial,sans-serif;letter-spacing:.42em;color:${c.white};opacity:.65;margin-top:4px">DENTAL CLINIC</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="font-size:0;line-height:0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td height="3" style="background:${c.leaf};width:50%"></td><td height="3" style="background:${c.azure};width:50%"></td>
          </tr></table>
        </td></tr>

        <!-- Title + patient -->
        <tr><td style="padding:30px 32px 6px">
          <div style="font:700 12px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${c.green}">${esc(heading)}</div>
          <div style="font:400 30px/1.2 Georgia,'Times New Roman',serif;color:${c.ink};margin-top:10px">${esc(name)}</div>
          <div style="margin-top:14px">
            ${interest ? chip(interest, "#e6f4ee", c.green) : ""}
            ${xrayName ? chip("X-ray attached", "#e7f2fa", "#1f6fa3") : chip("No X-ray", c.porcelain, c.muted)}
          </div>
        </td></tr>

        <!-- Quick actions -->
        ${actions ? `<tr><td style="padding:14px 32px 8px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${actions}</tr></table></td></tr>` : ""}

        <!-- Message -->
        ${
          message
            ? `<tr><td style="padding:18px 32px 4px">
          <div style="font:600 12px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:${c.muted};margin-bottom:8px">Message</div>
          <div style="background:${c.porcelain};border-left:3px solid ${c.leaf};border-radius:8px;padding:16px 18px;font:15px/1.6 Arial,sans-serif;color:${c.ink};white-space:pre-wrap">${esc(message)}</div>
        </td></tr>`
            : ""
        }

        <!-- Details -->
        <tr><td style="padding:18px 32px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${details}</table>
        </td></tr>

        ${
          xrayName
            ? `<tr><td style="padding:18px 32px 0">
          <div style="font:600 12px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:${c.muted};margin-bottom:8px">X-ray</div>
          ${
            xrayInline
              ? `<img src="cid:${XRAY_CID}" alt="X-ray ${esc(xrayName)}" width="536" style="display:block;width:100%;max-width:536px;height:auto;border-radius:10px;border:1px solid ${c.sand};background:${c.obsidian}">`
              : ""
          }
          <div style="margin-top:8px;font:13px Arial,sans-serif;color:${c.muted}">📎 <strong style="color:${c.ink}">${esc(xrayName)}</strong> is also attached in full size${xrayInline ? "" : " (open the attachment to view it)"}.</div>
        </td></tr>`
            : ""
        }

        <!-- Footer -->
        <tr><td style="padding:26px 32px 30px">
          <div style="border-top:1px solid ${c.sand};padding-top:16px;font:12px/1.6 Arial,sans-serif;color:${c.muted}">
            Sent from the Albania Dental Clinic website. The patient agreed to the processing of their data for this request.
            Replying to this email answers the patient directly.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `${heading}: ${name}`,
    "",
    email && `Email: ${email}`,
    phone && `Phone / WhatsApp: ${phone}`,
    get("country") && `Country: ${get("country")}`,
    interest && `Interested in: ${interest}`,
    get("apartment") && `Apartment: ${get("apartment")}`,
    get("arrival") && `Arrival: ${get("arrival")}`,
    get("departure") && `Departure: ${get("departure")}`,
    get("guests") && `Guests: ${get("guests")}`,
    `Website language: ${languages[get("locale")] ?? get("locale")}`,
    `Received: ${when}`,
    xrayName ? `X-ray attached: ${xrayName}` : "No X-ray",
    message && `\nMessage:\n${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
