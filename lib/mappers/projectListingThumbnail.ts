import { resolveApiAssetUrl } from "@/lib/api/resolveAssetUrl";
import { LOCAL_IMAGES } from "@/lib/local-images";

/** Uploaded row shape shared by list + detail API payloads. */
export type ProjectListingFileRow = {
  id?: number;
  file_url?: string;
  file_type?: string;
  sequence_no?: number | null;
  active?: boolean;
};

function normType(raw: string | undefined): string {
  return String(raw ?? "")
    .trim()
    .toUpperCase();
}

/** Same matching rules as `marketingProjectDetail` `fileByType`. */
function fileByType(files: ProjectListingFileRow[], wanted: string) {
  const w = wanted.trim().toUpperCase();
  return (
    files.find((f) => normType(f.file_type) === w) ??
    files.find((f) => normType(f.file_type).includes(w))
  );
}

function firstResolvedUrlFrom(files: ProjectListingFileRow[]): string | null {
  for (const f of files) {
    const u = resolveApiAssetUrl(f.file_url);
    if (u) return u;
  }
  return null;
}

function firstNonLogoWithUrl(
  files: ProjectListingFileRow[],
): ProjectListingFileRow | undefined {
  return files.find(
    (f) =>
      normType(f.file_type) !== "LOGO" && Boolean(String(f.file_url ?? "").trim()),
  );
}

function firstRowWithUrl(
  files: ProjectListingFileRow[],
): ProjectListingFileRow | undefined {
  return files.find((f) => Boolean(String(f.file_url ?? "").trim()));
}

/**
 * Card thumbnail URL — aligned with project detail hero priority:
 * HERO → BANNER → COVER → SEQUENCE (by `sequence_no`) → first non-LOGO asset → any URL → LOGO-only projects.
 */
export function resolveProjectListingThumbnail(
  filesInput: ProjectListingFileRow[] | undefined | null,
): string {
  const files = filesInput ?? [];
  const CARD_FALLBACK = LOCAL_IMAGES.projectImage;

  if (files.length === 0) {
    return CARD_FALLBACK;
  }

  const hero =
    fileByType(files, "HERO") ??
    fileByType(files, "BANNER") ??
    fileByType(files, "COVER");
  const sequence = files
    .filter((f) => normType(f.file_type) === "SEQUENCE")
    .sort(
      (a, b) => (a.sequence_no ?? 0) - (b.sequence_no ?? 0) || 0,
    );

  const candidate =
    hero ??
    sequence[0] ??
    firstNonLogoWithUrl(files) ??
    firstRowWithUrl(files) ??
    files[0];

  let url = resolveApiAssetUrl(candidate?.file_url);
  if (url) return url;

  url = firstResolvedUrlFrom(sequence);
  if (url) return url;

  for (const f of files) {
    if (normType(f.file_type) === "LOGO") continue;
    url = resolveApiAssetUrl(f.file_url);
    if (url) return url;
  }

  url = firstResolvedUrlFrom(files);
  if (url) return url;

  return CARD_FALLBACK;
}
