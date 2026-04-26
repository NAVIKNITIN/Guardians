import { LOCAL_IMAGES } from "@/lib/local-images";
import { resolveApiAssetUrl } from "@/lib/api/resolveAssetUrl";

type ApiUploadedFile = {
  id: number;
  file_url: string;
  file_name: string;
  file_type: string;
  sequence_no: number | null;
};

type ApiConfig = {
  id: number;
  bhk_type: string;
  price_min: number;
  price_max: number;
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
  amenities_image_id: number | null;
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
  /** Amenity names only (no images on marketing). */
  amenities: string[];
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
  bookVisitAddressLine: string;
};

const DEFAULT_MAP_CENTER: [number, number] = [19.076, 72.8777];
const DEFAULT_ZOOM = 12;

function fileByType(files: ApiUploadedFile[], t: string) {
  return files.find(
    (f) => (f.file_type || "").toUpperCase() === t.toUpperCase(),
  );
}

function safeUrlFromFile(f: ApiUploadedFile | undefined, fallback: string) {
  if (!f?.file_url) return fallback;
  return resolveApiAssetUrl(f.file_url) ?? fallback;
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

function firstLocationLine(loc: ApiProjectLocation | undefined) {
  if (!loc) return "—";
  const parts = [
    loc.address,
    [loc.place_name, loc.city, loc.state].filter(Boolean).join(", "),
  ]
    .map((p) => (p || "").trim())
    .filter(Boolean);
  return parts[0] || "—";
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
    const walk = (loc.walking_time || "").trim();
    const drive = (loc.driving_time || "").trim();
    let time = "—";
    if (walk && drive) {
      time = `Walk ${walk} · Drive ${drive}`;
    } else if (walk) {
      time = walk;
    } else if (drive) {
      time = drive;
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
  const logo = fileByType(files, "LOGO");
  const hero = fileByType(files, "HERO");
  const sequence = files
    .filter((f) => (f.file_type || "").toUpperCase() === "SEQUENCE")
    .sort(
      (a, b) => (a.sequence_no ?? 0) - (b.sequence_no ?? 0),
    );
  const galleryUrls = sequence
    .map((f) => resolveApiAssetUrl(f.file_url))
    .filter((u): u is string => u != null);

  const buildingHeroSrc = safeUrlFromFile(hero, LOCAL_IMAGES.tgreaHero);
  const developerLogo = safeUrlFromFile(logo, "/images/Projects/Group 45.svg");
  const bookVisitBg = buildingHeroSrc;

  const primary = project.configurations?.[0] ?? null;
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

  const amenityNames = (project.amenities ?? [])
    .map((a) => (a.name || "").trim())
    .filter(Boolean);
  const amenities: ProjectDetailView["amenities"] =
    amenityNames.length > 0 ? amenityNames : ["—"];

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
        value: primary?.bhk_type || project.type || "—",
        unit: "",
      },
      {
        label: "Location",
        value: firstLocationLine(firstLoc),
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
    bookVisitAddressLine: firstLocationLine(firstLoc),
  };
}
