/**
 * Book visits API:
 *
 * - `POST /api/book-visits` — `createVisit` (first_name, last_name, email, phone_no, location, message, `upload_cv_file_id`, …)
 * - `GET /api/book-visits?per_page=10` — `getAllVisits`
 * - `GET /api/book-visits/:id` — `getVisitById`
 */
import { isAxiosError } from "axios";
import { normalizeApiError } from "@/src/utils/apiErrorHandler";
import { axiosInstance } from "../axiosInstance";
import { buildQueryString } from "../params";

export type GetAllVisitsParams = {
  per_page?: number;
  page?: number;
};

/** Body for `POST /api/book-visits` (marketing forms + admin). */
export type CreateBookVisitPayload = {
  first_name: string;
  last_name: string | null;
  email: string;
  phone_no: string;
  location: string | null;
  message: string | null;
  upload_cv_file_id: number | null;
};

export type BookVisitRecord = {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  phone_no: string;
  location: string | null;
  message: string | null;
  cv_file_url: string | null;
  created_at: string;
  updated_at: string;
};

export type BookVisitCreateResponse = {
  success: boolean;
  message: string;
  data: BookVisitRecord;
};

/** `POST /api/book-visits` */
export function createVisit(payload: CreateBookVisitPayload | object) {
  return axiosInstance
    .post<BookVisitCreateResponse>("/book-visits", payload, {
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.data);
}

/**
 * Saves a book-a-visit lead. Used by the home popup and project detail form.
 * Throws with a user-facing message when the request or `success` flag fails.
 */
export async function submitBookVisit(
  payload: CreateBookVisitPayload,
): Promise<BookVisitCreateResponse> {
  try {
    const result = await createVisit(payload);

    if (!result?.success) {
      throw new Error(result?.message || "Failed to submit book visit.");
    }

    return result;
  } catch (error) {
    if (error instanceof Error && !isAxiosError(error)) {
      throw error;
    }
    const { message } = normalizeApiError(error);
    throw new Error(message);
  }
}

/**
 * Get all book visits. Example: `?per_page=10&page=1`
 */
export function getAllVisits(params: GetAllVisitsParams = {}) {
  const query = buildQueryString({
    per_page: params.per_page ?? 10,
    page: params.page ?? 1,
  });
  return axiosInstance.get<unknown>(`/book-visits?${query}`).then((r) => r.data);
}

/**
 * Get one book visit by id.
 */
export function getVisitById(id: string | number) {
  return axiosInstance.get<unknown>(`/book-visits/${id}`).then((r) => r.data);
}

// ---------------------------------------------------------------------------
// Backward-compatible names used by existing components
// ---------------------------------------------------------------------------

/** @deprecated use `createVisit` */
export const createBookVisit = createVisit;

/**
 * @deprecated use `getAllVisits` with a params object
 * Accepts a raw query string, e.g. `per_page=6&page=1`
 */
export function listBookVisits(queryString: string) {
  return axiosInstance
    .get<unknown>(`/book-visits?${queryString}`)
    .then((r) => r.data);
}
