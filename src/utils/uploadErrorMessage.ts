import { normalizeApiError } from "@/src/utils/apiErrorHandler";

/** Per-file limit for single uploads (logo, hero, articles). */
export const MAX_UPLOAD_FILE_BYTES = 5 * 1024 * 1024;

/** Per-file limit for admin project gallery bulk upload. */
export const MAX_BULK_UPLOAD_FILE_BYTES = 15 * 1024 * 1024;

export function formatMaxUploadSizeMb(
  maxBytes: number = MAX_UPLOAD_FILE_BYTES,
): string {
  return `${maxBytes / (1024 * 1024)} MB`;
}

export function formatMaxBulkUploadSizeMb(): string {
  return formatMaxUploadSizeMb(MAX_BULK_UPLOAD_FILE_BYTES);
}

/**
 * User-facing copy for failed logo/hero/gallery uploads (axios, 413, API `message`, etc.).
 */
export function getUploadErrorMessage(
  error: unknown,
  fallback = "Upload failed. Please try again.",
  maxBytes: number = MAX_UPLOAD_FILE_BYTES,
): string {
  const { message, status } = normalizeApiError(error);

  if (status === 413) {
    return `Upload is too large for the server. Use images under ${formatMaxUploadSizeMb(maxBytes)} each, or upload fewer files at once.`;
  }

  if (status === 408 || status === 504) {
    return "Upload timed out. Try smaller images or upload again.";
  }

  const trimmed = message.trim();
  if (
    trimmed &&
    trimmed !== "Network Error" &&
    !/^Request failed with status code \d+$/i.test(trimmed)
  ) {
    return trimmed;
  }

  if (status) {
    return `${fallback} (HTTP ${status}).`;
  }

  return fallback;
}
