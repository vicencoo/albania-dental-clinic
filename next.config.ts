import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    globalNotFound: true,
  },
  cacheComponents: true,
  // Old URL kept working after the page was renamed.
  async redirects() {
    return [
      {
        source: "/:locale(al|it|en)/clinic/why-one-of-two",
        destination: "/:locale/clinic/why-choose-us",
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
