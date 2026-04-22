// CHANGE: common frontend -> backend API helper for cross-origin requests

const DEFAULT_API_BASE_URL = "https://guardians-service-production.up.railway.app/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

// CHANGE: JSON-safe primitive types
type JsonPrimitive = string | number | boolean | null;

// CHANGE: recursive JSON type
type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

// CHANGE: custom request options for JSON or multipart/form-data
type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: JsonValue | FormData;
  headers?: HeadersInit;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // CHANGE: main reusable request method
  async request<T = unknown>(path: string, options: RequestOptions = {}) {
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");

    let requestBody: BodyInit | undefined;

    // CHANGE: if body is FormData, pass it directly
    if (options.body instanceof FormData) {
      requestBody = options.body;
    }

    // CHANGE: if body exists and is not FormData, convert it into JSON string
    else if (options.body !== undefined) {
      headers.set("Content-Type", "application/json");
      requestBody = JSON.stringify(options.body);
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
      body: requestBody,
    });

    const contentType = response.headers.get("content-type") ?? "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
          ? data.message
          : "Request failed";

      throw new Error(message);
    }

    return data as T;
  }

  // CHANGE: GET helper
  get<T = unknown>(
    path: string,
    options: Omit<RequestOptions, "body" | "method"> = {},
  ) {
    return this.request<T>(path, {
      ...options,
      method: "GET",
    });
  }

  // CHANGE: POST helper
  post<T = unknown>(
    path: string,
    body?: JsonValue,
    options: Omit<RequestOptions, "body" | "method"> = {},
  ) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body,
    });
  }

  // CHANGE: PUT helper
  put<T = unknown>(
    path: string,
    body?: JsonValue,
    options: Omit<RequestOptions, "body" | "method"> = {},
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body,
    });
  }

  // CHANGE: PATCH helper
  patch<T = unknown>(
    path: string,
    body?: JsonValue,
    options: Omit<RequestOptions, "body" | "method"> = {},
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body,
    });
  }

  // CHANGE: DELETE helper
  delete<T = unknown>(
    path: string,
    options: Omit<RequestOptions, "body" | "method"> = {},
  ) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }

  // CHANGE: multipart/form-data helper for file uploads
  postForm<T = unknown>(
    path: string,
    formData: FormData,
    options: Omit<RequestOptions, "body" | "method"> = {},
  ) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: formData,
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
