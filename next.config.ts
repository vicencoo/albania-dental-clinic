import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    globalNotFound: true,
  },
  cacheComponents: true,
  // Blog images are served from Sanity's CDN.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // 90 is used only for the hero portrait, where detail matters most.
    qualities: [75, 90],
  },
  // Old URL kept working after the page was renamed.
  async redirects() {
    return [
      {
        source: "/:locale(al|it|en)/clinic/why-one-of-two",
        destination: "/:locale/clinic/why-choose-us",
        permanent: true,
      },
      // The journal was renamed to blog.
      {
        source: "/:locale(al|it|en)/journal/:slug*",
        destination: "/:locale/blog/:slug*",
        permanent: true,
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
