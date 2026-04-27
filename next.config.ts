import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Tailwind v4 / lightningcss native bindings out of the Turbopack bundle so
  // `lightningcss-darwin-arm64` (and other platform packages) resolve correctly.
  serverExternalPackages: [
    "lightningcss",
    "@tailwindcss/node",
    "@tailwindcss/postcss",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "guardians-service-production.up.railway.app",
      },
      {
        protocol: "http",
        hostname: "guardians-service-production.up.railway.app",
      },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
