/** Default public API (Railway production). */
export const DEFAULT_API_BASE_URL =
  "https://guardians-service-production.up.railway.app/api";

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
 * Resolves the API base URL for browser + SSR.
 *
 * If `NEXT_PUBLIC_API_BASE_URL` points at localhost but the app is opened from a
 * non-local hostname (e.g. production deployment), we fall back to {@link DEFAULT_API_BASE_URL}.
 * This avoids axios "Network Error" when a prod build accidentally bundles a dev-only API URL.
 */
export function getResolvedApiBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

  if (!isLikelyLoopbackApiUrl(raw)) {
    return raw;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const viewingLocalSite =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".localhost");
    return viewingLocalSite ? raw : DEFAULT_API_BASE_URL;
  }

  // SSR: production builds should not call loopback (misconfigured env on host).
  if (process.env.NODE_ENV === "production") {
    return DEFAULT_API_BASE_URL;
  }

  return raw;
}

export const API_BASE_URL = getResolvedApiBaseUrl();

export const AXIOS_TIMEOUT_MS = 30_000;
