import { PUBLIC_FILES_ORIGIN } from "@/src/api/config";

/**
 * If the API returns a path-only `file_url`, prefix it with the Railway app origin.
 * (Do not use the browser proxy prefix — assets are not guaranteed under `/api`.)
 */
export function resolveApiAssetUrl(fileUrl: string | null | undefined): string | null {
  if (fileUrl == null || fileUrl === "") {
    return null;
  }
  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }
  const origin = PUBLIC_FILES_ORIGIN;
  if (fileUrl.startsWith("/")) {
    return `${origin}${fileUrl}`;
  }
  return `${origin}/${fileUrl}`;
}
