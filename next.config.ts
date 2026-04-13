import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Tailwind v4 / lightningcss native bindings out of the Turbopack bundle so
  // `lightningcss-darwin-arm64` (and other platform packages) resolve correctly.
  serverExternalPackages: [
    "lightningcss",
    "@tailwindcss/node",
    "@tailwindcss/postcss",
  ],
};

export default nextConfig;
