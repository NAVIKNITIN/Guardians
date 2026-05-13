import { PUBLIC_FILES_ORIGIN } from "@/src/api/config";

/** Trims API `file_url` / path fragment — returns `null` when empty. */
export function rawFileUrl(fileUrl: string | null | undefined): string | null {
  const t = String(fileUrl ?? "").trim();
  return t || null;
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
 * Map absolute `…/storage/…` URLs on Hostinger (or `PUBLIC_FILES_ORIGIN` host) to
 * same-origin `/gw-storage/…` (rewritten by Next to the real storage URL).
 */
function toSameOriginStorageSrc(url: string): string | null {
  try {
    const u = new URL(url);
    const match = /^\/storage\/(.+)$/i.exec(u.pathname);
    if (!match) return null;
    const tail = match[1];
    if (!tail) return null;

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

    if (!isHostinger && !matchesFilesOrigin) return null;
    return `/gw-storage/${tail}${u.search}${u.hash}`;
  } catch {
    return null;
  }
}

/**
 * Absolute URLs: trimmed; known `/storage/…` on file host → `/gw-storage/…` proxy.
 * Other cases: HTTPS upgrade for known hosts. Path-only: join `PUBLIC_FILES_ORIGIN`, then same.
 */
export function resolveApiAssetUrl(fileUrl: string | null | undefined): string | null {
  const trimmed = rawFileUrl(fileUrl);
  if (trimmed == null) return null;

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
