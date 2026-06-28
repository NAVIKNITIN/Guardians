import type { LandmarkProject } from "@/data/audience-marketing-types";
import { LOCAL_IMAGES } from "@/lib/local-images";
import type { ApiProjectListItem } from "@/lib/mappers/projectListApi";
import { resolveProjectListingThumbnail } from "@/lib/mappers/projectListingThumbnail";

const LANDMARK_FALLBACK_IMAGES = [
  LOCAL_IMAGES.img1,
  LOCAL_IMAGES.img2,
  LOCAL_IMAGES.img3,
  LOCAL_IMAGES.img4,
] as const;

/** Matches admin wizard, project detail, and marketing listings. */
export function isApiProjectCompleted(item: ApiProjectListItem): boolean {
  if (typeof item.isCompleted === "boolean") {
    return item.isCompleted;
  }

  if (typeof item.status === "boolean") {
    return !item.status;
  }

  const raw = item.completion_date;
  if (raw == null || String(raw).trim() === "") {
    return false;
  }

  const s = String(raw).trim();
  let year: number;
  let month: number;

  if (/^\d{4}-\d{2}/.test(s)) {
    year = Number(s.slice(0, 4));
    month = Number(s.slice(5, 7));
  } else {
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) {
      return false;
    }
    year = d.getUTCFullYear();
    month = d.getUTCMonth() + 1;
  }

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    month < 1 ||
    month > 12
  ) {
    return false;
  }

  const now = new Date();
  const projectIndex = year * 12 + (month - 1);
  const nowIndex = now.getFullYear() * 12 + now.getMonth();
  return projectIndex < nowIndex;
}

function coalesceListFiles(item: ApiProjectListItem) {
  return [...(item.files ?? []), ...(item.uploaded_files ?? [])];
}

function formatLandmarkLocation(item: ApiProjectListItem): string {
  const loc = item.locations?.[0];
  if (loc) {
    const parts = [
      loc.place_name?.trim(),
      loc.city?.trim(),
      loc.state?.trim(),
    ].filter(Boolean);
    if (parts.length) {
      return parts.join(", ");
    }
  }

  const configLoc = item.configurations?.[0]?.location?.trim();
  if (configLoc) {
    return configLoc;
  }

  return item.area?.trim() || "—";
}

function formatBhkRange(item: ApiProjectListItem): string {
  const types = (item.configurations ?? [])
    .map((c) => String(c.bhk_type ?? "").trim())
    .filter(Boolean);
  const unique = [...new Set(types)];
  if (!unique.length) {
    return "—";
  }
  return `${unique.join(" · ")} Residences`;
}

function formatBrand(type: string | null | undefined, name: string): string {
  const builder = type?.trim();
  if (builder) {
    return builder.toUpperCase();
  }
  const first = name.trim().split(/\s+/)[0];
  return first?.toUpperCase() || "PROJECT";
}

function formatProjectLine(
  type: string | null | undefined,
  isBuyer: boolean,
): string {
  if (isBuyer) {
    return "Handpicked for You";
  }
  const builder = type?.trim();
  if (builder) {
    return `${builder.toUpperCase()}'S`;
  }
  return "FEATURED PROJECT";
}

export function mapApiProjectToLandmarkProject(
  item: ApiProjectListItem,
  index: number,
  isBuyer: boolean,
): LandmarkProject {
  const name = item.name?.trim() || "—";
  const type = item.type?.trim() || null;
  const thumb = resolveProjectListingThumbnail(coalesceListFiles(item));
  const fallback =
    LANDMARK_FALLBACK_IMAGES[index % LANDMARK_FALLBACK_IMAGES.length]!;

  return {
    id: String(item.id),
    brand: formatBrand(type, name),
    projectLine: formatProjectLine(type, isBuyer),
    projectName: name.toUpperCase(),
    location: formatLandmarkLocation(item),
    bhkRange: formatBhkRange(item),
    imageSrc: thumb ?? fallback,
  };
}

export function splitLandmarkProjectsFromApi(
  items: ApiProjectListItem[],
  isBuyer: boolean,
): { ongoing: LandmarkProject[]; completed: LandmarkProject[] } {
  const ongoing: LandmarkProject[] = [];
  const completed: LandmarkProject[] = [];
  let ongoingIdx = 0;
  let completedIdx = 0;

  for (const item of items) {
    if (isApiProjectCompleted(item)) {
      completed.push(
        mapApiProjectToLandmarkProject(item, completedIdx++, isBuyer),
      );
    } else {
      ongoing.push(
        mapApiProjectToLandmarkProject(item, ongoingIdx++, isBuyer),
      );
    }
  }

  return { ongoing, completed };
}
