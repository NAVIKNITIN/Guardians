import { PUBLIC_FILES_ORIGIN } from "@/src/api/config";

/** Trims API `file_url` / path fragment — returns `null` when empty. */
export function rawFileUrl(fileUrl: string | null | undefined): string | null {
  const t = String(fileUrl ?? "").trim();
  return t || null;
}

/**
 * Object key under `/storage/` (e.g. `files/foo.jpg`) from any API `file_url` shape.
 * Laravel may return stale hosts (e.g. Railway) while files live on Hostinger.
 */
function storageObjectTail(fileUrl: string): string | null {
  const trimmed = fileUrl.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/storage/")) {
    const tail = trimmed.slice("/storage/".length).trim();
    return tail || null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const match = /^\/storage\/(.+)$/i.exec(new URL(trimmed).pathname);
      return match?.[1]?.trim() || null;
    } catch {
      return null;
    }
  }

  const relativeMatch = /^storage\/(.+)$/i.exec(trimmed);
  return relativeMatch?.[1]?.trim() || null;
}

/** Canonical Hostinger URL for a storage object (ignores stale API hostnames). */
function canonicalStorageUrl(tail: string): string {
  return `${PUBLIC_FILES_ORIGIN}/storage/${tail}`;
}

/**
 * On HTTPS pages, `http://` asset URLs are blocked (mixed content). Upgrade known
 * hosts to `https://` when the URL is still loaded directly (non-proxied paths).
 */
function upgradeInsecureAssetUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:") return url;

    let configuredHost: string | null = null;
    try {
      configuredHost = new URL(PUBLIC_FILES_ORIGIN).hostname;
    } catch {
      /* ignore */
    }

    const host = u.hostname;
    const isHostinger = /\.hstgr\.cloud$/i.test(host);
    const matchesFilesOrigin =
      configuredHost != null && host === configuredHost;

    if (isHostinger || matchesFilesOrigin) {
      u.protocol = "https:";
      return u.href;
    }
  } catch {
    return url;
  }
  return url;
}

/**
 * Map canonical Hostinger `/storage/…` URLs to same-origin `/gw-storage/…`
 * (rewritten by Next to the real storage URL).
 */
function toSameOriginStorageSrc(canonicalUrl: string): string | null {
  try {
    const u = new URL(canonicalUrl);
    const configuredHost = new URL(PUBLIC_FILES_ORIGIN).hostname;
    if (u.hostname !== configuredHost) return null;

    const match = /^\/storage\/(.+)$/i.exec(u.pathname);
    const tail = match?.[1]?.trim();
    if (!tail) return null;

    return `/gw-storage/${tail}${u.search}${u.hash}`;
  } catch {
    return null;
  }
}

/**
 * Resolve API `file_url` for display:
 * - Any `/storage/…` path is served from `PUBLIC_FILES_ORIGIN` (Hostinger), even when
 *   the API returns a stale Railway (or other) hostname.
 * - Hostinger storage URLs are proxied via `/gw-storage/…` when possible.
 */
export function resolveApiAssetUrl(fileUrl: string | null | undefined): string | null {
  const trimmed = rawFileUrl(fileUrl);
  if (trimmed == null) return null;

  const storageTail = storageObjectTail(trimmed);
  if (storageTail != null) {
    const canonical = canonicalStorageUrl(storageTail);
    const proxied = toSameOriginStorageSrc(canonical);
    if (proxied != null) return proxied;
    return upgradeInsecureAssetUrl(canonical);
  }

  let resolved: string;
  if (/^https?:\/\//i.test(trimmed)) {
    resolved = trimmed;
  } else {
    const origin = PUBLIC_FILES_ORIGIN;
    if (trimmed.startsWith("/")) {
      resolved = `${origin}${trimmed}`;
    } else {
      resolved = `${origin}/${trimmed}`;
    }
  }

  const proxied = toSameOriginStorageSrc(resolved);
  if (proxied != null) return proxied;

  return upgradeInsecureAssetUrl(resolved);
}
