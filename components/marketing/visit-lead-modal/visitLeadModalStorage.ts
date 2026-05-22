/** localStorage key — when `"true"`, the home visit lead modal must not auto-open again. */
export const VISIT_FORM_SUBMITTED_KEY = "hasSubmittedVisitForm";

export function hasSubmittedVisitForm(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(VISIT_FORM_SUBMITTED_KEY) === "true";
  } catch {
    return false;
  }
}

export function markVisitFormSubmitted(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(VISIT_FORM_SUBMITTED_KEY, "true");
  } catch {
    // Private mode / quota — submission still succeeds; modal may reappear later.
  }
}
