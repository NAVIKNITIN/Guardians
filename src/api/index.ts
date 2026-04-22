/**
 * Central entry for the HTTP layer. Prefer importing specific services, e.g.
 * `import { getAllProjects } from "@/src/api/services/projectService"`.
 */
export { API_BASE_URL, axiosInstance } from "./axiosInstance";
export { buildQueryString } from "./params";
export * from "./services";
