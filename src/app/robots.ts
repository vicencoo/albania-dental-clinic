import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/og (link-preview images) must stay crawlable, or WhatsApp/X/Facebook previews lose their image.
    rules: [{ userAgent: "*", allow: ["/", "/api/og"], disallow: ["/api/"] }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
