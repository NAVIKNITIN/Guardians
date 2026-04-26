/**
 * Preset amenities for the add-project wizard (multi-select).
 * Each `imageFileId` must exist in your `files` table — align these IDs with
 * seeded uploads in your environment, or update after uploading each asset once.
 * `thumbnailSrc` is only for the admin UI (public SVGs).
 */
export type AmenityCatalogItem = {
  key: string;
  name: string;
  imageFileId: number;
  thumbnailSrc: string;
};

export const AMENITY_CATALOG: AmenityCatalogItem[] = [
  {
    key: "gymnasium",
    name: "Gymnasium",
    imageFileId: 1,
    thumbnailSrc: "/images/Projects/Amenities/1.svg",
  },
  {
    key: "high-tech-security",
    name: "High Tech Security",
    imageFileId: 2,
    thumbnailSrc: "/images/Projects/Amenities/2.svg",
  },
  {
    key: "multipurpose-hall",
    name: "Multipurpose Hall",
    imageFileId: 3,
    thumbnailSrc: "/images/Projects/Amenities/3.svg",
  },
  {
    key: "kids-play-area",
    name: "Kids Play Area",
    imageFileId: 4,
    thumbnailSrc: "/images/Projects/Amenities/4.svg",
  },
  {
    key: "rooftop-lounge",
    name: "Rooftop Lounge",
    imageFileId: 5,
    thumbnailSrc: "/images/Projects/Amenities/Group 3176.svg",
  },
  {
    key: "landscaped-garden",
    name: "Landscaped Garden",
    imageFileId: 6,
    thumbnailSrc: "/images/Projects/Amenities/Group 3182.svg",
  },
  {
    key: "high-speed-elevators",
    name: "High Speed Elevators",
    imageFileId: 7,
    thumbnailSrc: "/images/Projects/Amenities/Group 3183.svg",
  },
  {
    key: "fire-safety",
    name: "Latest Fire Safety System",
    imageFileId: 8,
    thumbnailSrc: "/images/Projects/Amenities/Group 3184.svg",
  },
  {
    key: "valet",
    name: "Valet",
    imageFileId: 9,
    thumbnailSrc: "/images/Projects/Amenities/Group 3185.svg",
  },
];

/**
 * When `GET /projects/:id` lists amenities with `amenities_image_id` but does not
 * include those rows in `project.files`, map known catalog ids to public thumbnails.
 */
export function catalogThumbnailForImageFileId(
  imageFileId: number | string | null | undefined,
): string | null {
  if (imageFileId == null || imageFileId === "") return null;
  const n = Number(imageFileId);
  if (!Number.isFinite(n)) return null;
  const c = AMENITY_CATALOG.find((x) => x.imageFileId === n);
  return c?.thumbnailSrc ?? null;
}

/** Match preset amenity by exact name when id alone does not resolve to a file. */
export function catalogThumbnailForAmenityName(
  name: string | null | undefined,
): string | null {
  const n = (name || "").trim().toLowerCase();
  if (!n) return null;
  const c = AMENITY_CATALOG.find((x) => x.name.trim().toLowerCase() === n);
  return c?.thumbnailSrc ?? null;
}

export function catalogKeysFromProjectAmenities(
  items: Array<{ name: string; amenities_image_id: number | null }>,
): string[] {
  const keys: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const byId = AMENITY_CATALOG.find(
      (c) => c.imageFileId === item.amenities_image_id,
    );
    const byName =
      byId ||
      AMENITY_CATALOG.find(
        (c) =>
          c.name.trim().toLowerCase() === (item.name || "").trim().toLowerCase(),
      );
    if (byName && !seen.has(byName.key)) {
      seen.add(byName.key);
      keys.push(byName.key);
    }
  }
  return keys;
}
