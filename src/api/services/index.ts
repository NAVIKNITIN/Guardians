/**
 * Public API layer — use these modules from UI code; do not use `axios` directly.
 * Interceptors and base URL: `@/src/api/axiosInstance`.
 */
export * as authService from "./authService";
export * as fileService from "./fileService";
export * as projectService from "./projectService";
export * as articleService from "./articleService";
export * as visitService from "./visitService";
/** @deprecated use `visitService` — same module, older name */
export * as bookVisitService from "./visitService";
export { userService } from "./userService";
