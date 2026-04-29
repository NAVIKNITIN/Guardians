/** Default public API (Railway production). */
export const DEFAULT_API_BASE_URL =
  "https://guardians-service-production.up.railway.app/api";

/**
 * Explicit override for uploaded-file origin (optional).
 * Useful when JSON API and file host are different.
 */
const RAW_PUBLIC_FILES_ORIGIN =
  process.env.NEXT_PUBLIC_FILES_ORIGIN?.trim() || "";

/**
 * Next.js `rewrites` forward this prefix → Railway `/api` so the browser does not
 * hit cross-origin CORS (axios otherwise reports “Network Error”).
 *
 * Set `NEXT_PUBLIC_USE_BROWSER_API_PROXY=false` only if your backend sends CORS
 * for your production domain and you want direct `NEXT_PUBLIC_API_BASE_URL` calls.
 */
export const BROWSER_API_PROXY_PREFIX = "/gw-api";

function isLikelyLoopbackApiUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const u = new URL(trimmed);
    return (
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname === "[::1]"
    );
  } catch {
    return (
      trimmed.includes("localhost") ||
      trimmed.includes("127.0.0.1")
    );
  }
}

/**
 * Resolves axios `baseURL`:
 * - **Browser on a deployed host:** same-origin `/gw-api` (rewritten to Railway `/api`).
 * - **Browser on localhost:** direct URL from env (local backend).
 * - **SSR / Node:** HTTPS env or default (no CORS in Node).
 */
export function getResolvedApiBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

  const proxyDisabled =
    process.env.NEXT_PUBLIC_USE_BROWSER_API_PROXY === "false";

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const viewingLocalSite =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".localhost");

    if (!viewingLocalSite && !proxyDisabled) {
      return BROWSER_API_PROXY_PREFIX;
    }

    if (isLikelyLoopbackApiUrl(raw)) {
      return viewingLocalSite ? raw : DEFAULT_API_BASE_URL;
    }

    return raw;
  }

  if (isLikelyLoopbackApiUrl(raw)) {
    if (process.env.NODE_ENV === "production") {
      return DEFAULT_API_BASE_URL;
    }
    return raw;
  }

  return raw;
}

/**
 * Resolve origin used for relative uploaded file URLs.
 * Never returns `/gw-api`; it always returns a real absolute origin.
 */
export function getResolvedPublicFilesOrigin(): string {
  if (RAW_PUBLIC_FILES_ORIGIN) {
    return RAW_PUBLIC_FILES_ORIGIN.replace(/\/$/, "");
  }

  const rawApi =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const viewingLocalSite =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".localhost");

    if (!viewingLocalSite && isLikelyLoopbackApiUrl(rawApi)) {
      return DEFAULT_API_BASE_URL.replace(/\/api\/?$/, "");
    }
  } else if (process.env.NODE_ENV === "production" && isLikelyLoopbackApiUrl(rawApi)) {
    return DEFAULT_API_BASE_URL.replace(/\/api\/?$/, "");
  }

  return rawApi.replace(/\/api\/?$/, "");
}

export const API_BASE_URL = getResolvedApiBaseUrl();
export const PUBLIC_FILES_ORIGIN = getResolvedPublicFilesOrigin();

export const AXIOS_TIMEOUT_MS = 30_000;
