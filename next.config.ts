import type { NextConfig } from "next";
import { DEFAULT_API_PROXY_TARGET } from "./src/api/config";

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
