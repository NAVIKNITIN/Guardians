import { axiosInstance } from "../axiosInstance";
import { buildQueryString } from "../params";

export type GetAllVisitsParams = {
  per_page?: number;
  page?: number;
};

/**
 * Create a book visit.
 */
export function createVisit(payload: object) {
  return axiosInstance.post<unknown>("/book-visits", payload).then((r) => r.data);
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
