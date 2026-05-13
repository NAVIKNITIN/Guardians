import type { NextConfig } from "next";
import { DEFAULT_API_PROXY_TARGET } from "./src/api/config";

/**
 * Where `/gw-api/*` is forwarded at build time (Laravel `/api` root, no trailing slash).
 * - Prefer `API_PROXY_TARGET` (server-only; not exposed to the client bundle).
 * - Else use `NEXT_PUBLIC_API_BASE_URL` so Netlify/Vercel only need one var.
 * - Else use the same default as `src/api/config.ts` (avoids Railway vs Hostinger drift).
 */
function normalizeProxyTarget(raw: string | undefined | null): string | null {
  const t = String(raw ?? "")
    .trim()
    .replace(/\/+$/, "");
  return t.length > 0 ? t : null;
}

const API_PROXY_TARGET =
  normalizeProxyTarget(process.env.API_PROXY_TARGET) ??
  normalizeProxyTarget(process.env.NEXT_PUBLIC_API_BASE_URL) ??
  DEFAULT_API_PROXY_TARGET;

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
      { protocol: "https", hostname: "**.hstgr.cloud" },
      { protocol: "http", hostname: "**.hstgr.cloud" },
    ],
  },
};

export default nextConfig;
