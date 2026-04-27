const DEFAULT_API_BASE_URL =
  "https://guardians-service-production.up.railway.app/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export const AXIOS_TIMEOUT_MS = 30_000;
