import axios, { isAxiosError } from "axios";
import {
  API_BASE_URL,
  AXIOS_TIMEOUT_MS,
  getResolvedApiBaseUrl,
} from "./config";
import { isAuthenticated, logout } from "@/src/utils/auth";
import { normalizeApiError } from "@/src/utils/apiErrorHandler";
import { showError } from "@/src/utils/toast";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: AXIOS_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = getResolvedApiBaseUrl();
  if (isAuthenticated()) {
    config.headers.set("x-auth", "true");
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const requestUrl = String(error.config?.url ?? "");
    const isLoginRequest = requestUrl.includes("users/login");

    if (error.response?.status === 401) {
      if (!isLoginRequest && isAuthenticated()) {
        logout();
        showError("Your session has expired. Please sign in again.");
        if (typeof window !== "undefined") {
          window.location.assign("/admin/login");
        }
      }
      return Promise.reject(error);
    }

    const normalized = normalizeApiError(error);
    const isAdminContext =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin");

    if (error.response?.status && error.response.status >= 500) {
      showError(normalized.message);
    } else if (!error.response) {
      // Network / CORS — only toast on admin (marketing pages fail silently + empty states).
      if (isAdminContext) {
        showError(normalized.message);
      }
    }

    return Promise.reject(error);
  },
);

export { API_BASE_URL };
