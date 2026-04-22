/**
 * Build `key=value&...` for URL query strings; skips null, undefined, and "".
 */
export function buildQueryString(
  record: Record<string, string | number | boolean | null | undefined>,
) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(record)) {
    if (value == null) continue;
    if (value === "") continue;
    search.set(key, String(value));
  }
  return search.toString();
}
