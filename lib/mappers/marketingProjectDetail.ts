import { LOCAL_IMAGES } from "@/lib/local-images";
import { resolveApiAssetUrl } from "@/lib/api/resolveAssetUrl";
import {
  catalogThumbnailForAmenityName,
  catalogThumbnailForImageFileId,
} from "@/lib/admin/amenityCatalog";

type ApiUploadedFile = {
  id: number;
  file_url: string;
  file_name: string;
  file_type: string;
  sequence_no: number | null;
};

type ApiConfig = {
  id: number;
  bhk_type?: string | null;
  price_min?: number | string | null;
  price_max?: number | string | null;
  location?: string | null;
};

type ApiProjectLocation = {
  id: number;
  place_name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  pincode: string | null;
  latitude: string | number | null;
  longitude: string | number | null;
  walking_time: string | null;
  driving_time: string | null;
};

type ApiAmenity = {
  id: number;
  name: string;
  /** API may send number or numeric string. */
  amenities_image_id: number | string | null;
  /** Laravel may load `files` relation on the amenity row. */
  file?: ApiUploadedFile | null;
  uploaded_file?: ApiUploadedFile | null;
};

export type ProjectAmenityItem = {
  id: number;
  label: string;
  imageSrc: string;
};

export type ProjectDetailView = {
  id: number;
  /** `false` from API = inactive / read as completed for marketing. */
  status: boolean;
  statusLabel: "Ongoing Project" | "Completed Project";
  title: string;
  rera: string;
  developerLogo: string;
  buildingHeroSrc: string;
  stats: { label: string; value: string; unit: string }[];
  description: string;
  gallery: { src: string; span: "half" | "full" | "third" }[];
  /** From API `amenities[]` + `files` via `amenities_image_id`. */
  amenities: ProjectAmenityItem[];
  mapCenter: [number, number];
  mapZoom: number;
  locationItems: {
    name: string;
    time: string;
    type: "walk" | "drive";
    lat: number;
    lng: number;
  }[];
  caseStudy: { posterSrc: string; videoUrl: string; paragraphs: string[] };
  bookVisitBg: string;
  /** @deprecated Use `configurationLocation` — kept for compatibility. */
  bookVisitAddressLine: string;
  /** Display line from API `configurations[0].location` (admin configuration). */
  configurationLocation: string;
  /** Display line from API `configurations[0].bhk_type` (admin configuration). */
  configurationBhkType: string;
};

const DEFAULT_MAP_CENTER: [number, number] = [19.076, 72.8777];
const DEFAULT_ZOOM = 12;

function fileByType(files: ApiUploadedFile[], t: string) {
  const wanted = t.trim().toUpperCase();
  const norm = (v: string | null | undefined) =>
    String(v ?? "")
      .trim()
      .toUpperCase();

  // Prefer exact match first, then tolerant "contains" (legacy inconsistent values).
  return (
    files.find((f) => norm(f.file_type) === wanted) ??
    files.find((f) => norm(f.file_type).includes(wanted))
  );
}

function fileById(files: ApiUploadedFile[], id: number | string | null) {
  if (id == null || id === "") return undefined;
  const n = Number(id);
  if (!Number.isFinite(n)) return undefined;
  return files.find((f) => Number(f.id) === n);
}

function urlFromNestedAmenityFile(a: ApiAmenity): string | null {
  const row = a.file ?? a.uploaded_file;
  return resolveApiAssetUrl(row?.file_url);
}

/**
 * Amenity image resolution. Preset `amenities_image_id` values (catalog 1–9) use
 * public `/images/Projects/Amenities/*.svg` first. Then nested relation, `project.files`
 * by id, then name catalog. Remote `file_url` values go through `resolveApiAssetUrl`
 * (path join + HTTPS upgrade for Hostinger on secure pages).
 */
function resolveAmenityImageSrc(
  a: ApiAmenity,
  files: ApiUploadedFile[],
  fallback: string,
): string {
  const imageId = a.amenities_image_id;
  if (imageId != null && imageId !== "") {
    const preset = catalogThumbnailForImageFileId(imageId);
    if (preset) return preset;
  }

  const nested = urlFromNestedAmenityFile(a);
  if (nested) return nested;

  if (imageId != null && imageId !== "") {
    const fileRow = fileById(files, imageId);
    const u = resolveApiAssetUrl(fileRow?.file_url);
    if (u) return u;
  }

  const fromCatalogName = catalogThumbnailForAmenityName(a.name);
  if (fromCatalogName) return fromCatalogName;

  return fallback;
}

function safeUrlFromFile(f: ApiUploadedFile | undefined, fallback: string) {
  return resolveApiAssetUrl(f?.file_url) ?? fallback;
}

function parseCoord(
  v: string | number | null | undefined,
  fallback: number,
): number {
  const n = parseFloat(String(v ?? "").replace(/^\s+|\s+$/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

function formatNumArea(area: string | null | undefined): string {
  if (area == null || String(area).trim() === "") return "—";
  return String(area).replace(/\s*sq\.?\s*ft\.?/i, "").trim() || "—";
}

function formatCompletionDate(raw: string | null | undefined): string {
  if (raw == null || raw === "") return "—";
  const s = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const d = new Date(s.slice(0, 10));
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      });
    }
  }
  return s;
}

/** Primary marketing address from `configurations[0].location` only. */
function configurationLocationLine(config: ApiConfig | null | undefined): string {
  const text = String(config?.location ?? "").trim();
  return text || "—";
}

/** BHK / unit type from `configurations[0].bhk_type` only. */
function configurationBhkTypeLine(config: ApiConfig | null | undefined): string {
  const text = String(config?.bhk_type ?? "").trim();
  return text || "—";
}

function primaryConfiguration(
  configurations: ApiConfig[] | null | undefined,
): ApiConfig | null {
  if (!configurations) return null;
  if (Array.isArray(configurations)) {
    return configurations[0] ?? null;
  }
  if (typeof configurations === "object") {
    return configurations as ApiConfig;
  }
  return null;
}

/**
 * Map gallery file URLs to the existing grid pattern: 2 half, 1 full, 3 third (repeat for more).
 */
function buildGalleryLayout(urls: string[]): ProjectDetailView["gallery"] {
  if (urls.length === 0) {
    return [
      { src: LOCAL_IMAGES.projectImage, span: "full" as const },
    ];
  }
  const pattern: Array<"half" | "full" | "third"> = [
    "half",
    "half",
    "full",
    "third",
    "third",
    "third",
  ];
  return urls.map((src, i) => ({
    src,
    span: pattern[i % pattern.length] ?? "third",
  }));
}

/**
 * Show connectivity times as minutes on the marketing page; bare numbers get a ` min` suffix.
 */
function asMinutesDisplay(raw: string | null | undefined): string {
  const t = String(raw ?? "").trim();
  if (t === "") return "";
  if (/\bmin(ute)?s?\b/i.test(t)) return t;
  if (/^\d+(\.\d+)?$/.test(t)) return `${t} min`;
  return t;
}

/**
 * One row per API location; connect walking/driving; map point from lat/lng when present.
 */
function buildLocationItems(
  locations: ApiProjectLocation[],
  center: [number, number],
): ProjectDetailView["locationItems"] {
  if (locations.length === 0) {
    return [
      {
        name: "Project area",
        time: "—",
        type: "walk" as const,
        lat: center[0],
        lng: center[1],
      },
    ];
  }
  return locations.map((loc) => {
    const walk = asMinutesDisplay(loc.walking_time);
    const drive = asMinutesDisplay(loc.driving_time);
    let time = "—";
    if (walk && drive) {
      time = `Walk ${walk} · Drive ${drive}`;
    } else if (walk) {
      time = `Walk ${walk}`;
    } else if (drive) {
      time = `Drive ${drive}`;
    }
    const name =
      [loc.place_name, loc.city, loc.state].filter(Boolean).join(" · ") ||
      loc.address ||
      "Location";
    const lat = parseCoord(loc.latitude, center[0]);
    const lng = parseCoord(loc.longitude, center[1]);
    const type: "walk" | "drive" =
      drive && !walk ? "drive" : walk && !drive ? "walk" : "walk";
    return { name, time, type, lat, lng };
  });
}

type ApiProjectDetails = {
  id: number;
  name: string;
  type: string | null;
  rera_number: string | null;
  area: string | null;
  description: string | null;
  completion_date: string | null;
  case_study_info: string | null;
  status?: boolean;
  files: ApiUploadedFile[];
  configurations: ApiConfig[];
  locations: ApiProjectLocation[];
  amenities: ApiAmenity[];
};

function parseProjectDetailsPayload(payload: unknown): ApiProjectDetails | null {
  if (payload == null || typeof payload !== "object") return null;
  const p = payload as { success?: boolean; data?: unknown };
  const data = (p.success !== false && p.data ? p.data : p) as
    | ApiProjectDetails
    | null;
  if (data == null || typeof data !== "object" || !("id" in data)) {
    return null;
  }
  return data as ApiProjectDetails;
}

/**
 * Map `GET /projects/:id` (envelope or raw `data`) to the marketing project detail view model.
 */
export function mapProjectDetailsToViewModel(
  apiPayload: unknown,
): ProjectDetailView | null {
  const project = parseProjectDetailsPayload(apiPayload);
  if (!project) return null;

  const files = project.files ?? [];
  const logo =
    fileByType(files, "LOGO") ??
    fileByType(files, "BRAND") ??
    fileByType(files, "ICON");
  const hero =
    fileByType(files, "HERO") ??
    fileByType(files, "BANNER") ??
    fileByType(files, "COVER");
  const sequence = files
    .filter((f) => (f.file_type || "").toUpperCase() === "SEQUENCE")
    .sort(
      (a, b) => (a.sequence_no ?? 0) - (b.sequence_no ?? 0),
    );
  const galleryUrls = sequence
    .map((f) => resolveApiAssetUrl(f.file_url))
    .filter((u): u is string => u != null);

  const buildingHeroSrc = safeUrlFromFile(
    hero ?? sequence[0] ?? files[0],
    LOCAL_IMAGES.tgreaHero,
  );

  const developerLogo = safeUrlFromFile(
    logo ?? files[0],
    "/images/Projects/Group 45.svg",
  );
  const bookVisitBg = buildingHeroSrc;

  const primary = primaryConfiguration(project.configurations);
  const configurationLocation = configurationLocationLine(primary);
  const configurationBhkType = configurationBhkTypeLine(primary);
  const firstLoc = project.locations?.[0];
  const lat0 = parseCoord(
    firstLoc?.latitude,
    DEFAULT_MAP_CENTER[0],
  );
  const lng0 = parseCoord(
    firstLoc?.longitude,
    DEFAULT_MAP_CENTER[1],
  );
  const mapCenter: [number, number] = [lat0, lng0];

  const statusBool = project.status !== false;
  const statusLabel: ProjectDetailView["statusLabel"] = statusBool
    ? "Ongoing Project"
    : "Completed Project";

  const description =
    project.description?.trim() ||
    "Details for this project will be available soon.";

  const caseText = (project.case_study_info || "").trim();
  const caseStudyParagraphs: string[] = caseText
    ? [caseText]
    : [description];

  const amenities: ProjectAmenityItem[] = (project.amenities ?? []).map(
    (a) => ({
      id: a.id,
      label: (a.name || "").trim() || "—",
      imageSrc: resolveAmenityImageSrc(a, files, LOCAL_IMAGES.holding),
    }),
  );
  if (amenities.length === 0) {
    amenities.push({
      id: 0,
      label: "—",
      imageSrc: LOCAL_IMAGES.holding,
    });
  }

  return {
    id: project.id,
    status: project.status !== false,
    statusLabel,
    title: project.name || "Project",
    rera: project.rera_number?.trim() || "—",
    developerLogo,
    buildingHeroSrc,
    stats: [
      {
        label: "Area",
        value: formatNumArea(project.area),
        unit: "sq. ft.",
      },
      {
        label: "Type",
        value: configurationBhkType,
        unit: "",
      },
      {
        label: "Location",
        value: configurationLocation,
        unit: "",
      },
      {
        label: "Project completed in",
        value: formatCompletionDate(project.completion_date ?? null),
        unit: "",
      },
    ],
    description,
    gallery: buildGalleryLayout(galleryUrls),
    amenities,
    mapCenter,
    mapZoom: DEFAULT_ZOOM,
    locationItems: buildLocationItems(
      project.locations ?? [],
      mapCenter,
    ),
    caseStudy: {
      posterSrc: galleryUrls[0] ?? buildingHeroSrc,
      videoUrl: "",
      paragraphs: caseStudyParagraphs,
    },
    bookVisitBg,
    bookVisitAddressLine: configurationLocation,
    configurationLocation,
    configurationBhkType,
  };
}
