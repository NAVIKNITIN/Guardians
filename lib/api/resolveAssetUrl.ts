import { PUBLIC_FILES_ORIGIN } from "@/src/api/config";

/**
 * Laravel often returns `http://` storage URLs; HTTPS marketing sites load images via
 * Next/Image or `<img>` — upgrade known hosts so passive mixed content does not block.
 */
function upgradeInsecureKnownAssetOrigin(url: string): string {
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
    const isRailwayApp = /\.railway\.app$/i.test(host);
    const matchesConfiguredOrigin =
      configuredHost != null && host === configuredHost;

    if (isRailwayApp || matchesConfiguredOrigin) {
      u.protocol = "https:";
      return u.href;
    }
  } catch {
    return url;
  }
  return url;
}

/**
 * If the API returns a path-only `file_url`, prefix it with `PUBLIC_FILES_ORIGIN`.
 */
export function resolveApiAssetUrl(fileUrl: string | null | undefined): string | null {
  if (fileUrl == null) {
    return null;
  }
  const trimmed = String(fileUrl).trim();
  if (trimmed === "") {
    return null;
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
  return upgradeInsecureKnownAssetOrigin(resolved);
}
