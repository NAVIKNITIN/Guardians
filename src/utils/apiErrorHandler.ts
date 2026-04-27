import { isAxiosError } from "axios";

export type NormalizedApiError = {
  message: string;
  status: number | null;
  data: unknown;
};

/**
 * Produces a stable shape for API failures (Axios, network, or unknown).
 */
export function normalizeApiError(error: unknown): NormalizedApiError {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const data = error.response?.data ?? null;
    const message = extractMessage(data, error.message);
    return { message, status, data };
  }

  if (error instanceof Error) {
    if (isLikelyNetworkError(error)) {
      return {
        message: "Network error. Please check your connection and try again.",
        status: null,
        data: null,
      };
    }
    return { message: error.message, status: null, data: null };
  }

  return {
    message: "Something went wrong. Please try again.",
    status: null,
    data: null,
  };
}

function isLikelyNetworkError(error: Error) {
  const message = error.message.toLowerCase();
  return (
    message.includes("network") ||
    message === "network error" ||
    error.name === "NetworkError" ||
    message.includes("load failed")
  );
}

function extractMessage(data: unknown, fallback: string) {
  if (typeof data === "object" && data !== null && "message" in data) {
    const m = (data as { message?: unknown }).message;
    if (typeof m === "string" && m.trim()) return m;
  }
  return fallback || "Request failed";
}
