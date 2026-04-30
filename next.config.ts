import type { NextConfig } from "next";

/** Server-side only — where `/gw-api/*` is forwarded (JSON API under `/api`). */
const API_PROXY_TARGET =
  process.env.API_PROXY_TARGET?.replace(/\/$/, "") ??
  "https://guardians-service-production.up.railway.app/api";

const nextConfig: NextConfig = {
  // Keep Tailwind v4 / lightningcss native bindings out of the Turbopack bundle so
  // `lightningcss-darwin-arm64` (and other platform packages) resolve correctly.
  serverExternalPackages: [
    "lightningcss",
    "@tailwindcss/node",
    "@tailwindcss/postcss",
  ],
  async rewrites() {
    return [
      {
        source: "/gw-api/:path*",
        destination: `${API_PROXY_TARGET}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "guardians-service-production.up.railway.app",
      },
      {
        protocol: "https",
        hostname: "guardians-service.up.railway.app",
      },
      {
        protocol: "http",
        hostname: "guardians-service-production.up.railway.app",
      },
      {
        protocol: "http",
        hostname: "guardians-service.up.railway.app",
      },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
