import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Name, icon and colours used when the site is added to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Albania Dental",
    description: "Dental implants and same-day teeth in Vlorë, Albania.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#090c0b",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
