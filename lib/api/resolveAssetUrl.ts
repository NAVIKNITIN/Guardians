import { PUBLIC_FILES_ORIGIN } from "@/src/api/config";

/** Trims API `file_url` / path fragment — returns `null` when empty. */
export function rawFileUrl(fileUrl: string | null | undefined): string | null {
  const t = String(fileUrl ?? "").trim();
  return t || null;
}

/**
 * On HTTPS pages, `http://` storage URLs are blocked (mixed content). Upgrade known
 * API/storage hosts to `https://` so `<img>` and links work on Netlify etc.
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
 * Absolute URLs: trimmed (and insecure storage hosts upgraded to HTTPS).
 * Path-only values: prefixed with `PUBLIC_FILES_ORIGIN`, then upgraded when applicable.
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
  return upgradeInsecureAssetUrl(resolved);
}
