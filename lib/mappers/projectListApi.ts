import { resolveProjectListingThumbnail } from "@/lib/mappers/projectListingThumbnail";

/** Aligned with marketing `projects` page filters (`budget` buckets match the UI). */
export type ProjectRowFilterShape = {
  id: number;
  imageSrc: string;
  title: string;
  subtitle: string;
  badge?: { label?: string; count?: number; variant: "units-left" | "completed" };
  budget: string;
  /** Often API `type` (e.g. Residential) — filter matches exact string or "All". */
  builder: string;
  /** Display label, e.g. "2 BHK" or "2 BHK · 3 BHK". */
  configuration: string;
  /**
   * Normalized BHK bucket per configuration row, for filter (e.g. `["2 BHK", "3 BHK"]`).
   * Excludes "All" and unknown labels that did not map to 1/2/3 BHK.
   */
  configurationBuckets: string[];
  /** API `rera_number` — used for search. */
  rera: string;
  /** `description` and `area` from API — used for search. */
  description: string;
  area: string;
  /** Amenity names joined — used for search. */
  amenitiesSearch: string;
  caseStudyInfo: string;
  completionDate: string;
};

/** Uploaded row on project list/detail payloads. */
export type ApiProjectListFile = {
  id?: number;
  file_type?: string;
  file_url?: string;
  file_name?: string;
  sequence_no?: number | null;
  active?: boolean;
};

/**
 * `GET /api/projects` paginated `data[]` item (Laravel — decimals often arrive as strings).
 */
export type ApiProjectListItem = {
  id: number;
  name: string;
  type?: string | null;
  rera_number?: string | null;
  description?: string | null;
  area?: string | null;
  completion_date?: string | null;
  case_study_info?: string | null;
  status?: boolean;
  isCompleted?: boolean;
  created_at?: string;
  updated_at?: string;
  files?: ApiProjectListFile[];
  /** Some serializers expose the relation under another key. */
  uploaded_files?: ApiProjectListFile[];
  configurations?: Array<{
    bhk_type?: string | null;
    price_min?: number | string | null;
    price_max?: number | string | null;
    available_units?: number | string | null;
  }>;
  locations?: Array<{
    place_name?: string;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    address?: string | null;
  }>;
  amenities?: Array<{
    id?: number;
    name?: string;
  }>;
};

/** Laravel/API may return rupee amounts as strings (`"5000000.00"`). */
function parseMoneyRupee(
  raw: number | string | null | undefined,
): number | undefined {
  if (raw == null || raw === "") return undefined;
  if (typeof raw === "number") {
    return Number.isFinite(raw) && raw > 0 ? raw : undefined;
  }
  const n = parseFloat(String(raw).replace(/,/g, "").trim());
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function priceRupeesToBudgetBucket(
  configurations: ApiProjectListItem["configurations"],
): string {
  const mins = (configurations ?? [])
    .map((c) => parseMoneyRupee(c?.price_min))
    .filter((n): n is number => n != null);
  const priceMin = mins.length ? Math.min(...mins) : undefined;
  if (priceMin == null) {
    return "2-5 Cr";
  }
  const crores = priceMin / 10_000_000;
  if (crores < 2) return "Under 2 Cr";
  if (crores <= 5) return "2-5 Cr";
  return "5+ Cr";
}

function normalizeBhk(raw: string | null | undefined): string {
  if (raw == null) return "All";
  const s = String(raw).trim();
  if (/1\s*BHK/i.test(s)) return "1 BHK";
  if (/2\s*BHK/i.test(s)) return "2 BHK";
  if (/3\s*BHK/i.test(s)) return "3 BHK";
  return s || "2 BHK";
}

/** Merge `files` + `uploaded_files`, dedupe by `id` when present. */
function coalesceProjectListFiles(item: ApiProjectListItem): ApiProjectListFile[] {
  const merged = [...(item.files ?? []), ...(item.uploaded_files ?? [])];
  if (merged.length === 0) return [];

  const seen = new Set<number>();
  const out: ApiProjectListFile[] = [];
  for (const f of merged) {
    const id = f.id;
    if (id != null) {
      if (seen.has(id)) continue;
      seen.add(id);
    }
    out.push(f);
  }
  return out;
}

function subtitleFor(item: ApiProjectListItem): string {
  const loc = item.locations?.[0];
  const area = item.area?.trim() || "";
  if (!loc) {
    return [item.type, area].filter(Boolean).join(" · ") || "—";
  }
  const place =
    loc.place_name ||
    [loc.address, loc.city, loc.state, loc.country]
      .filter(Boolean)
      .join(", ");
  const parts: string[] = [];
  if (item.type?.trim()) parts.push(String(item.type).trim());
  if (place) parts.push(place);
  if (area) parts.push(area);
  if (parts.length) return parts.join(" · ");
  return "—";
}

/** Distinct 1/2/3 BHK bucket labels for filter; preserves order. */
function configurationBucketsFrom(
  configurations: ApiProjectListItem["configurations"],
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const c of configurations ?? []) {
    const b = normalizeBhk(c?.bhk_type);
    if (b === "All" || !b) continue;
    if (BUILDER_BHK_SET.has(b) && !seen.has(b)) {
      seen.add(b);
      out.push(b);
    }
  }
  return out;
}

const BUILDER_BHK_SET = new Set(["1 BHK", "2 BHK", "3 BHK"]);

function configurationDisplay(
  configurations: ApiProjectListItem["configurations"],
): string {
  const buckets = configurationBucketsFrom(configurations);
  if (buckets.length) return buckets.join(" · ");
  const first = (configurations?.[0]?.bhk_type || "").trim();
  return first || "—";
}

function parseWholeNumber(raw: number | string | null | undefined): number | null {
  if (raw == null || raw === "") return null;
  const n =
    typeof raw === "number"
      ? raw
      : Number(String(raw).replace(/,/g, "").trim());
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.floor(n));
}

function ongoingBadgeCount(
  configurations: ApiProjectListItem["configurations"],
): number | null {
  const counts = (configurations ?? [])
    .map((c) => parseWholeNumber(c?.available_units))
    .filter((n): n is number => n != null);
  if (!counts.length) {
    return null;
  }
  const totalAvailable = counts.reduce((sum, n) => sum + n, 0);
  return totalAvailable;
}

/**
 * Map a project row from the list API to marketing card + filter fields.
 */
export function mapApiProjectListItemToRow(
  item: ApiProjectListItem,
): ProjectRowFilterShape {
  const isCompleted = item.isCompleted === true;
  const buckets = configurationBucketsFrom(item.configurations);
  const rera = (item.rera_number || "").trim();
  const description = (item.description || "").trim();
  const caseStudyInfo = (item.case_study_info || "").trim();
  const area = (item.area || "").trim();
  const completionDate = (item.completion_date || "").trim();
  const amenityNames = (item.amenities ?? [])
    .map((a) => (a.name || "").trim())
    .filter(Boolean);

  return {
    id: item.id,
    imageSrc: resolveProjectListingThumbnail(coalesceProjectListFiles(item)),
    title: item.name || "—",
    subtitle: subtitleFor(item),
    badge: isCompleted
      ? { label: "Completed", variant: "completed" }
      : {
          count: ongoingBadgeCount(item.configurations) ?? undefined,
          variant: "units-left",
        },
    budget: priceRupeesToBudgetBucket(item.configurations),
    builder: item.type?.trim() || "—",
    configuration: configurationDisplay(item.configurations),
    configurationBuckets:
      buckets.length > 0
        ? buckets
        : (() => {
            const single = normalizeBhk(item.configurations?.[0]?.bhk_type);
            return single !== "All" && single ? [single] : [];
          })(),
    rera,
    description,
    area,
    amenitiesSearch: amenityNames.join(" "),
    caseStudyInfo,
    completionDate,
  };
}

export type ProjectListApiEnvelope = {
  success?: boolean;
  data?: {
    data: ApiProjectListItem[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from?: number;
    to?: number;
  };
};

/**
 * Parse list response — supports `{ data: { data, total, ... } }` or a loose shape.
 */
export function parseProjectListResponse(payload: unknown): {
  items: ApiProjectListItem[];
  total: number;
  meta: {
    perPage: number;
    currentPage: number;
    lastPage: number;
  } | null;
} {
  if (payload == null || typeof payload !== "object") {
    return { items: [], total: 0, meta: null };
  }
  const p = payload as ProjectListApiEnvelope;
  const inner = p.data;
  if (inner && Array.isArray(inner.data)) {
    const total = inner.total ?? inner.data.length;
    return {
      items: inner.data,
      total,
      meta: {
        perPage: inner.per_page ?? inner.data.length,
        currentPage: inner.current_page ?? 1,
        lastPage: inner.last_page ?? 1,
      },
    };
  }
  const alt = (payload as { data?: ApiProjectListItem[] }).data;
  if (Array.isArray(alt)) {
    return { items: alt, total: alt.length, meta: null };
  }
  return { items: [], total: 0, meta: null };
}
