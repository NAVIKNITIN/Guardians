/**
 * Project amenity helpers for the admin add/update project wizard.
 */

import {
  findPresetByName,
  isPresetAmenityKey,
  presetImageSrc,
} from "@/lib/admin/projectAmenityPresets";

/** Shared amenity icon file id on the API — used when "Use local image" is checked. */
export const LOCAL_AMENITY_IMAGE_FILE_ID = 265;

export { isPresetAmenityKey } from "@/lib/admin/projectAmenityPresets";

/** Amenity row in the add/update project wizard (upload + label). */
export type WizardProjectAmenity = {
  key: string;
  name: string;
  imageFileId: number | null;
  /** Optional preview URL after upload — list UI uses `GET /api/files/:id` when empty. */
  thumbnailSrc: string;
  /** Persisted API amenity row id — included on project update. */
  apiId?: number | null;
};

/** Parse `amenity-api-123` wizard keys back to API row ids. */
export function parseAmenityApiIdFromKey(key: string): number | null {
  const match = /^amenity-api-(\d+)$/.exec(key);
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isFinite(id) ? id : null;
}

/** Legacy import ids 1–9 — not real uploaded amenity icons; re-upload preset assets. */
export const LEGACY_AMENITY_IMAGE_IDS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

/** @deprecated Use `WizardProjectAmenity` */
export type WizardCustomAmenity = WizardProjectAmenity;

export function isCustomAmenityKey(key: string): boolean {
  return (
    !isPresetAmenityKey(key) &&
    (key.startsWith("custom-") || key.startsWith("amenity-"))
  );
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

/** Map API project amenities to wizard rows (presets + custom amenities). */
export function projectAmenitiesForWizard(
  items: Array<{ id?: number; name: string; amenities_image_id: number | null }>,
): WizardProjectAmenity[] {
  const amenities: WizardProjectAmenity[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const label = (item.name || "").trim() || "Amenity";
    const imageId = item.amenities_image_id;
    const preset = findPresetByName(label);

    if (preset) {
      if (seen.has(preset.key)) continue;
      seen.add(preset.key);
      amenities.push({
        key: preset.key,
        name: preset.name,
        imageFileId: null,
        thumbnailSrc: presetImageSrc(preset),
        apiId: item.id ?? null,
      });
      continue;
    }

    if (isLegacyPresetAmenity(item)) continue;

    const key =
      item.id != null
        ? `amenity-api-${item.id}`
        : imageId != null
          ? `amenity-file-${imageId}`
          : `amenity-name-${label.toLowerCase().replace(/\s+/g, "-")}`;
    if (seen.has(key)) continue;
    seen.add(key);

    amenities.push({
      key,
      name: label,
      imageFileId:
        imageId != null && LEGACY_AMENITY_IMAGE_IDS.has(imageId) ? null : imageId,
      thumbnailSrc: "",
      apiId: item.id ?? null,
    });
  }

  return amenities;
}
