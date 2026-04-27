/**
 * App route pathnames for public/private guard redirects.
 * (Next.js App Router; no React Router here.)
 */
export const ROUTES = {
  adminLogin: "/admin/login" as const,
  /** Default post-login destination */
  adminDashboard: "/admin/projects" as const,
} as const;
