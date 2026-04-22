import { axiosInstance } from "../axiosInstance";
import { buildQueryString } from "../params";

export type GetAllProjectsParams = {
  per_page?: number;
  page?: number;
};

/**
 * Get all projects (paginated). Example: `?per_page=10&page=1`
 */
export function getAllProjects(params: GetAllProjectsParams = {}) {
  const query = buildQueryString({
    per_page: params.per_page ?? 10,
    page: params.page ?? 1,
  });
  return axiosInstance.get<unknown>(`/projects?${query}`).then((r) => r.data);
}

/** @deprecated use `getAllProjects` — alias for admin list with a larger first page. */
export function listProjects() {
  return getAllProjects({ per_page: 100, page: 1 });
}

export function getProjectById(id: string | number) {
  return axiosInstance.get<unknown>(`/projects/${id}`).then((r) => r.data);
}

export function createProject(payload: object) {
  return axiosInstance.post<unknown>("/projects", payload).then((r) => r.data);
}

export function updateProject(id: string | number, payload: object) {
  return axiosInstance
    .put<unknown>(`/projects/${id}`, payload)
    .then((r) => r.data);
}
