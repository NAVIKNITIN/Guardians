const IS_LOGGED_IN_KEY = "isLoggedIn" as const;
const IS_LOGGED_IN_VALUE = "true" as const;

/**
 * @returns `true` when the lightweight login flag is set in `localStorage`.
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(IS_LOGGED_IN_KEY) === IS_LOGGED_IN_VALUE;
}

/**
 * Set the post-login flag (intended to be called after a successful API login).
 */
export function login(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(IS_LOGGED_IN_KEY, IS_LOGGED_IN_VALUE);
}

/**
 * Remove the login flag and clear the lightweight “session”.
 */
export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(IS_LOGGED_IN_KEY);
}
