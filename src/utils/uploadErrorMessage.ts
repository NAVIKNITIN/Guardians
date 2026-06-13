import { normalizeApiError } from "@/src/utils/apiErrorHandler";

/** Per-file limit for single uploads (logo, hero, articles). */
export const MAX_UPLOAD_FILE_BYTES = 5 * 1024 * 1024;

/** Per-file limit for admin project gallery bulk upload. */
export const MAX_BULK_UPLOAD_FILE_BYTES = 15 * 1024 * 1024;

/** Matches Laravel `files/upload` validation (jpg, jpeg, png). */
export const ALLOWED_UPLOAD_IMAGE_ACCEPT =
  "image/jpeg,image/png,.jpg,.jpeg,.png";

const ALLOWED_UPLOAD_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/pjpeg",
]);

function hasAllowedImageExtension(name: string) {
  return /\.(jpe?g|png)$/i.test(name.trim());
}

/** @returns User-facing error, or `null` when the file is allowed. */
export function validateUploadImageFile(
  file: File,
  maxBytes: number = MAX_UPLOAD_FILE_BYTES,
): string | null {
  const typeOk =
    (file.type && ALLOWED_UPLOAD_IMAGE_TYPES.has(file.type)) ||
    hasAllowedImageExtension(file.name);

  if (!typeOk) {
    return "Only JPG, JPEG, and PNG images are allowed.";
  }

  if (file.size <= 0) {
    return "The selected file is empty. Choose a valid image and try again.";
  }

  if (file.size > maxBytes) {
    return `Image size must be less than ${formatMaxUploadSizeMb(maxBytes)}.`;
  }

  return null;
}

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
  const { message, status, data } = normalizeApiError(error);
  const validationMessage = firstLaravelValidationMessage(data);

  if (status === 413) {
    return `Upload is too large for the server. Use images under ${formatMaxUploadSizeMb(maxBytes)} each, or upload fewer files at once.`;
  }

  if (status === 408 || status === 504) {
    return "Upload timed out. Try smaller images or upload again.";
  }

  const trimmed = (validationMessage || message).trim();
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

function firstLaravelValidationMessage(data: unknown): string | null {
  if (typeof data !== "object" || data === null || !("errors" in data)) {
    return null;
  }

  const errors = (data as { errors?: unknown }).errors;
  if (typeof errors !== "object" || errors === null) {
    return null;
  }

  for (const value of Object.values(errors as Record<string, unknown>)) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
    if (Array.isArray(value)) {
      const first = value.find(
        (item) => typeof item === "string" && item.trim(),
      );
      if (typeof first === "string") {
        return first.trim();
      }
    }
  }

  return null;
}
