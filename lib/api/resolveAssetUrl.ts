import { PUBLIC_FILES_ORIGIN } from "@/src/api/config";

/** Trims API `file_url` / path fragment — returns `null` when empty. */
export function rawFileUrl(fileUrl: string | null | undefined): string | null {
  const t = String(fileUrl ?? "").trim();
  return t || null;
}

/**
 * Absolute URLs: returned trimmed. Path-only values: prefixed with `PUBLIC_FILES_ORIGIN`.
 * No protocol rewriting — URLs are used as the API returns them.
 */
export function resolveApiAssetUrl(fileUrl: string | null | undefined): string | null {
  const trimmed = rawFileUrl(fileUrl);
  if (trimmed == null) return null;
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const origin = PUBLIC_FILES_ORIGIN;
  if (trimmed.startsWith("/")) {
    return `${origin}${trimmed}`;
  }
  return `${origin}/${trimmed}`;
}
