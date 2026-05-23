/**
 * Project API (base URL: `API_BASE_URL` in `src/api/config.ts`):
 *
 * - `GET /api/projects?per_page=10&page=1` → `getAllProjects`
 * - `GET /api/projects/:id` → `getProjectById`
 * - `POST /api/projects` → `createProject` (body: name, type, rera_number, files: [{ file_id }], …)
 * - `PUT /api/projects/:id` → `updateProject`
 */
import { axiosInstance } from "../axiosInstance";
import { buildQueryString } from "../params";

export type GetAllProjectsParams = {
  per_page?: number;
  page?: number;
  /** Laravel eager-load hint when the index omits `files` without it. */
  with?: string;
};

/**
 * Deduplicate concurrent list requests for the same query (e.g. React Strict Mode).
 */
const inflightGetAllProjects = new Map<string, Promise<unknown>>();

/**
 * Get all projects (paginated). Example: `?per_page=10&page=1`
 */
export function getAllProjects(params: GetAllProjectsParams = {}) {
  const query = buildQueryString({
    per_page: params.per_page ?? 10,
    page: params.page ?? 1,
    ...(params.with != null && params.with !== ""
      ? { with: params.with }
      : {}),
  });
  const inflight = inflightGetAllProjects.get(query);
  if (inflight) {
    return inflight;
  }
  const promise = axiosInstance
    .get<unknown>(`/projects?${query}`)
    .then((r) => r.data)
    .finally(() => {
      inflightGetAllProjects.delete(query);
    });
  inflightGetAllProjects.set(query, promise);
  return promise;
}

/** @deprecated use `getAllProjects` — alias for admin list with a larger first page. */
export function listProjects() {
  return getAllProjects({ per_page: 100, page: 1 });
}

/** Deduplicate concurrent fetches of the same project (e.g. React Strict Mode, remounts). */
const inflightGetProjectById = new Map<string, Promise<unknown>>();

export function getProjectById(id: string | number) {
  const key = String(id);
  const inflight = inflightGetProjectById.get(key);
  if (inflight) {
    return inflight;
  }
  const promise = axiosInstance
    .get<unknown>(`/projects/${key}`)
    .then((r) => r.data)
    .finally(() => {
      inflightGetProjectById.delete(key);
    });
  inflightGetProjectById.set(key, promise);
  return promise;
}

/** Nested configuration row for `POST/PUT /api/projects` (`configurations[].location`, etc.). */
export type ProjectConfigurationApiRow = {
  id?: number;
  bhk_type: string;
  price_min: number;
  price_max: number;
  location: string | null;
  carpet_area?: number | null;
  builtup_area?: number | null;
  total_units?: number | null;
  available_units?: number | null;
  active?: boolean;
  status?: string | null;
};

export type ProjectMutationPayload = {
  name: string;
  configurations?: ProjectConfigurationApiRow[];
  [key: string]: unknown;
};

export function createProject(payload: ProjectMutationPayload | object) {
  return axiosInstance
    .post<unknown>("/projects", payload, {
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.data);
}

export function updateProject(
  id: string | number,
  payload: ProjectMutationPayload | object,
) {
  return axiosInstance
    .put<unknown>(`/projects/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.data);
}
