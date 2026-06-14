/**
 * Project amenity helpers for the admin add/update project wizard.
 */

/** Shared amenity icon file id on the API — used when "Use local image" is checked. */
export const LOCAL_AMENITY_IMAGE_FILE_ID = 265;

/** Amenity row in the add/update project wizard (upload + label). */
export type WizardProjectAmenity = {
  key: string;
  name: string;
  imageFileId: number | null;
  /** Optional preview URL after upload — list UI uses `GET /api/files/:id` when empty. */
  thumbnailSrc: string;
};

/** @deprecated Use `WizardProjectAmenity` */
export type WizardCustomAmenity = WizardProjectAmenity;

export function isCustomAmenityKey(key: string): boolean {
  return key.startsWith("custom-") || key.startsWith("amenity-");
}

/**
 * Former hardcoded wizard presets (file ids 1–9). Still stored on many projects
 * from imports or older saves — skip when loading edit data so only custom rows show.
 */
const LEGACY_PRESET_AMENITY_BY_IMAGE_ID: Readonly<Record<number, string>> = {
  1: "Gymnasium",
  2: "High Tech Security",
  3: "Multipurpose Hall",
  4: "Kids Play Area",
  5: "Rooftop Lounge",
  6: "Landscaped Garden",
  7: "High Speed Elevators",
  8: "Latest Fire Safety System",
  9: "Valet",
};

function isLegacyPresetAmenity(item: {
  name: string;
  amenities_image_id: number | null;
}): boolean {
  const imageId = item.amenities_image_id;
  if (imageId == null) return false;
  const legacyName = LEGACY_PRESET_AMENITY_BY_IMAGE_ID[imageId];
  if (!legacyName) return false;
  return item.name.trim().toLowerCase() === legacyName.toLowerCase();
}

/** Map API project amenities to wizard rows (custom amenities only). */
export function projectAmenitiesForWizard(
  items: Array<{ id?: number; name: string; amenities_image_id: number | null }>,
): WizardProjectAmenity[] {
  const amenities: WizardProjectAmenity[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (isLegacyPresetAmenity(item)) continue;
    const imageId = item.amenities_image_id;
    const key =
      item.id != null
        ? `amenity-api-${item.id}`
        : imageId != null
          ? `amenity-file-${imageId}`
          : `amenity-name-${(item.name || "").trim().toLowerCase().replace(/\s+/g, "-")}`;
    if (seen.has(key)) continue;
    seen.add(key);

    amenities.push({
      key,
      name: (item.name || "").trim() || "Amenity",
      imageFileId: imageId,
      thumbnailSrc: "",
    });
  }

  return amenities;
}
