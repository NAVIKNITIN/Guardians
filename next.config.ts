import type { NextConfig } from "next";
import { API_BASE_URL } from "./src/api/config";

/** Strip trailing `/api` for storage rewrites (`/storage/...` lives on app origin). */
function storageOriginFromApiBase(apiBase: string): string {
  return apiBase.replace(/\/api$/i, "");
}

const API_PROXY_TARGET = API_BASE_URL.replace(/\/+$/, "");
const STORAGE_ORIGIN = storageOriginFromApiBase(API_PROXY_TARGET);

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
      {
        source: "/gw-storage/:path*",
        destination: `${STORAGE_ORIGIN}/storage/:path*`,
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
