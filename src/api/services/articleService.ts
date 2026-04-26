/**
 * Articles API:
 *
 * - `POST /api/articles` — `createArticle` (type, title, file_id, categories, …)
 * - `GET /api/articles?per_page=10` — `getAllArticles`
 * - `GET /api/articles/:id` — `getArticleById`
 * - `GET /api/articles/filter?type=NEWS&year=2026&from=...&to=...` — `filterArticles`
 * - `GET /api/articles/search?search=...` — `searchArticles`
 * - `PUT /api/articles/:id` — `updateArticle`
 */
import { axiosInstance } from "../axiosInstance";
import { buildQueryString } from "../params";

export type GetAllArticlesParams = {
  per_page?: number;
  page?: number;
};

export type FilterArticlesParams = {
  type?: string;
  year?: string;
  from?: string;
  to?: string;
};

/**
 * `GET /api/articles?per_page=10&page=1` — paginated list (raw envelope from backend).
 */
export function getAllArticles(params: GetAllArticlesParams = {}) {
  const query = buildQueryString({
    per_page: params.per_page ?? 10,
    page: params.page ?? 1,
  });
  return axiosInstance.get<unknown>(`/articles?${query}`).then((r) => r.data);
}

/**
 * @deprecated use `getAllArticles` — this builds the query string for you
 */
export function listArticles(queryString: string) {
  return axiosInstance.get<unknown>(`/articles?${queryString}`).then((r) => r.data);
}

/**
 * Filter articles. `GET /articles/filter?type=NEWS&year=2026&from=...&to=...`
 */
export function filterArticles(params: FilterArticlesParams = {}) {
  const query = buildQueryString({ ...params });
  const path = query
    ? `/articles/filter?${query}`
    : "/articles/filter";
  return axiosInstance.get<unknown>(path).then((r) => r.data);
}

/**
 * Search articles. `GET /articles/search?search=keyword`
 */
export function searchArticles(params: { search: string }) {
  const query = buildQueryString({
    search: params.search,
  });
  const path = query
    ? `/articles/search?${query}`
    : "/articles/search";
  return axiosInstance.get<unknown>(path).then((r) => r.data);
}

/**
 * `GET /api/articles/:id` — single article
 */
export function getArticleById(id: string | number) {
  return axiosInstance.get<unknown>(`/articles/${id}`).then((r) => r.data);
}

/** `POST /api/articles` — create */
export function createArticle(payload: object) {
  return axiosInstance.post<unknown>("/articles", payload).then((r) => r.data);
}

export function updateArticle(id: string | number, payload: object) {
  return axiosInstance.put<unknown>(`/articles/${id}`, payload).then((r) => r.data);
}
