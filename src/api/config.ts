/** Laravel app origin (no `/api`) — joins relative `file_url` paths. */
export const PUBLIC_FILES_ORIGIN = "http://srv1662424.hstgr.cloud";

/** Laravel API root — axios `baseURL` and Next `/gw-api` rewrite destination. */
export const API_BASE_URL = `${PUBLIC_FILES_ORIGIN}/api`;

export const AXIOS_TIMEOUT_MS = 30_000;
