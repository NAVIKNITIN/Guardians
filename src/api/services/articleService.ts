import { axiosInstance } from "../axiosInstance";
import { buildQueryString } from "../params";

export type FilterArticlesParams = {
  type?: string;
  year?: string;
  from?: string;
  to?: string;
};

/**
 * List articles (generic paginated / filtered query on `/articles`)
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

export function createArticle(payload: object) {
  return axiosInstance.post<unknown>("/articles", payload).then((r) => r.data);
}

export function updateArticle(id: string | number, payload: object) {
  return axiosInstance.put<unknown>(`/articles/${id}`, payload).then((r) => r.data);
}
