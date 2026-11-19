/**
 * Branded link-preview image for any page: GET /api/og?l=<locale>&p=<path>&v=<version>
 *
 * Best practices followed (WhatsApp, Facebook, LinkedIn, X, Telegram, iMessage):
 * - 1200×630 (1.91:1), the size every platform shows as a large preview.
 * - JPEG under ~300 KB: WhatsApp silently drops preview images that are too heavy.
 * - Title kept inside the safe centre area and large enough to read on a phone.
 * - Long cache headers; the `v` parameter is bumped when the design changes.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { isLocale, resolveShareCard, SHARE_SIZE } from "@/lib/share";
import { routing } from "@/i18n/routing";

const fontDir = path.join(process.cwd(), "src/assets/og");
const [serif, sans, sansBold, logo] = await Promise.all([
  readFile(path.join(fontDir, "CormorantGaramond-Medium.ttf")),
  readFile(path.join(fontDir, "Manrope-Medium.ttf")),
  readFile(path.join(fontDir, "Manrope-Bold.ttf")),
  readFile(path.join(process.cwd(), "public/images/brand/logo-mark.png")),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const PHOTO_WIDTH = 520;

const color = {
  obsidian: "#090c0b",
  forest: "#06231a",
  leaf: "#45c49a",
  azure: "#6cb8e6",
  white: "#ffffff",
};

/** Photo as a JPEG data URI, cropped to the photo panel (local file or remote https URL). */
async function loadPhoto(src: string): Promise<string | null> {
  try {
    let input: Buffer;
    if (src.startsWith("https://")) {
      const res = await fetch(src);
      if (!res.ok) return null;
      input = Buffer.from(await res.arrayBuffer());
    } else {
      const file = path.join(process.cwd(), "public", path.normalize(src).replace(/^(\.\.[/\\])+/, ""));
      input = await readFile(file);
    }
    const jpeg = await sharp(input)
      .resize(PHOTO_WIDTH, SHARE_SIZE.height, { fit: "cover", position: "attention" })
      .jpeg({ quality: 85 })
      .toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  } catch {
    return null;
  }
}

function titleSize(title: string): number {
  if (title.length <= 22) return 84;
  if (title.length <= 38) return 72;
  if (title.length <= 56) return 62;
  return 54;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const l = searchParams.get("l");
  const locale = isLocale(l) ? l : routing.defaultLocale;
  const card = await resolveShareCard(locale, searchParams.get("p") ?? "/");
  const photo = await loadPhoto(card.photo);

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: color.obsidian,
          backgroundImage: `radial-gradient(circle at 0% 0%, ${color.forest} 0%, ${color.obsidian} 60%)`,
          fontFamily: "Manrope",
          color: color.white,
        }}
      >
        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: SHARE_SIZE.width - PHOTO_WIDTH,
            padding: "56px 56px 52px 64px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
            <img src={logoSrc} width={58} height={58} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Cormorant", fontSize: 34, letterSpacing: 4, lineHeight: 1 }}>ALBANIA</span>
              <span style={{ fontSize: 14, letterSpacing: 6.5, opacity: 0.7, marginTop: 6 }}>DENTAL CLINIC</span>
            </div>
          </div>

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: color.leaf,
              }}
            >
              {card.eyebrow}
            </span>
            <span
              style={{
                fontFamily: "Cormorant",
                fontSize: titleSize(card.title),
                lineHeight: 1.04,
                marginTop: 18,
                letterSpacing: -0.5,
              }}
            >
              {card.title}
            </span>
            {card.subtitle && (
              <span style={{ fontSize: 26, lineHeight: 1.35, marginTop: 20, color: "rgba(255,255,255,0.72)" }}>
                {card.subtitle}
              </span>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                width: 96,
                height: 3,
                borderRadius: 3,
                backgroundImage: `linear-gradient(90deg, ${color.leaf}, ${color.azure})`,
              }}
            />
            <span style={{ fontSize: 19, color: "rgba(255,255,255,0.6)" }}>{card.tagline}</span>
          </div>
        </div>

        {/* Photo panel, fading into the dark side */}
        <div style={{ display: "flex", position: "relative", width: PHOTO_WIDTH, height: "100%" }}>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser
            <img
              src={photo}
              width={PHOTO_WIDTH}
              height={SHARE_SIZE.height}
              alt=""
              style={{ position: "absolute", inset: 0, objectFit: "cover" }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(90deg, ${color.obsidian} 0%, rgba(9,12,11,0.55) 22%, rgba(9,12,11,0) 48%)`,
            }}
          />
        </div>
      </div>
    ),
    {
      ...SHARE_SIZE,
      fonts: [
        { name: "Cormorant", data: serif, weight: 500, style: "normal" },
        { name: "Manrope", data: sans, weight: 500, style: "normal" },
        { name: "Manrope", data: sansBold, weight: 700, style: "normal" },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(jpeg.length),
      "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=2592000",
    },
  });
}
