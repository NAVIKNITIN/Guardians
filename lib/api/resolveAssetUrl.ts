import { getResolvedApiBaseUrl } from "@/src/api/config";

/**
 * If the API returns a path-only `file_url`, prefix it with the service origin
 * (strip `/api` from `NEXT_PUBLIC_API_BASE_URL`).
 */
export function resolveApiAssetUrl(fileUrl: string | null | undefined): string | null {
  if (fileUrl == null || fileUrl === "") {
    return null;
  }
  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }
  const origin = getResolvedApiBaseUrl().replace(/\/api\/?$/, "");
  if (fileUrl.startsWith("/")) {
    return `${origin}${fileUrl}`;
  }
  return `${origin}/${fileUrl}`;
}
