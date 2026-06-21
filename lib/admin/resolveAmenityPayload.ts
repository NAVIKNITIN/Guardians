import {
  LEGACY_AMENITY_IMAGE_IDS,
  LOCAL_AMENITY_IMAGE_FILE_ID,
  isPresetAmenityKey,
} from "@/lib/admin/amenityCatalog";
import {
  findPresetByKey,
  findPresetByName,
  presetImageSrc,
} from "@/lib/admin/projectAmenityPresets";

export type AmenityPayloadInput = {
  key: string;
  name: string;
  apiId: number | null;
  /** Already persisted file id (edit flow, unchanged custom rows). */
  imageFileId: number | null;
  /** `/images/projects_amenities/...` for standard presets. */
  localAssetPath: string | null;
  /** Custom amenity file waiting for submit-time upload. */
  pendingFile: File | null;
};

export type AmenityPayloadRow = {
  id?: number;
  name: string;
  amenities_image_id: number;
};

type ResolveAmenityPayloadOptions = {
  amenities: AmenityPayloadInput[];
  isEditMode: boolean;
  uploadLocalAsset: (assetPath: string) => Promise<number>;
  uploadFile: (file: File) => Promise<number>;
};

function pendingFileCacheKey(file: File): string {
  return `pending:${file.name}:${file.size}:${file.lastModified}`;
}

function resolveLocalAssetPath(amenity: AmenityPayloadInput): string | null {
  if (amenity.localAssetPath) return amenity.localAssetPath;

  if (isPresetAmenityKey(amenity.key)) {
    const preset = findPresetByKey(amenity.key);
    if (!preset) return null;
    const path = `/images/projects_amenities/${encodeURIComponent(preset.imageFileName)}`;
    return path.split("?")[0] ?? path;
  }

  return null;
}

/**
 * Upload all amenity images at project submit and build the API payload rows.
 * Presets always upload from local assets; custom rows upload pending files or reuse ids.
 */
export async function resolveAmenityPayloadForSubmit({
  amenities,
  isEditMode,
  uploadLocalAsset,
  uploadFile,
}: ResolveAmenityPayloadOptions): Promise<AmenityPayloadRow[]> {
  const assetUploadCache = new Map<string, number>();
  const fileUploadCache = new Map<string, number>();

  const rows: AmenityPayloadRow[] = [];

  for (const amenity of amenities) {
    const localAssetPath = resolveLocalAssetPath(amenity);
    let amenities_image_id: number;

    if (localAssetPath) {
      const cached = assetUploadCache.get(localAssetPath);
      if (cached != null) {
        amenities_image_id = cached;
      } else {
        amenities_image_id = await uploadLocalAsset(localAssetPath);
        assetUploadCache.set(localAssetPath, amenities_image_id);
      }
    } else if (amenity.pendingFile) {
      const cacheKey = pendingFileCacheKey(amenity.pendingFile);
      const cached = fileUploadCache.get(cacheKey);
      if (cached != null) {
        amenities_image_id = cached;
      } else {
        amenities_image_id = await uploadFile(amenity.pendingFile);
        fileUploadCache.set(cacheKey, amenities_image_id);
      }
    } else if (amenity.imageFileId === LOCAL_AMENITY_IMAGE_FILE_ID) {
      amenities_image_id = LOCAL_AMENITY_IMAGE_FILE_ID;
    } else if (
      amenity.imageFileId != null &&
      !LEGACY_AMENITY_IMAGE_IDS.has(amenity.imageFileId)
    ) {
      amenities_image_id = amenity.imageFileId;
    } else {
      const presetByName = findPresetByName(amenity.name);
      const fallbackPath = presetByName
        ? (presetImageSrc(presetByName).split("?")[0] ?? presetImageSrc(presetByName))
        : null;
      if (fallbackPath) {
        const cached = assetUploadCache.get(fallbackPath);
        if (cached != null) {
          amenities_image_id = cached;
        } else {
          amenities_image_id = await uploadLocalAsset(fallbackPath);
          assetUploadCache.set(fallbackPath, amenities_image_id);
        }
      } else {
        throw new Error(`Missing image for amenity "${amenity.name.trim()}".`);
      }
    }

    rows.push({
      ...(isEditMode && amenity.apiId != null ? { id: amenity.apiId } : {}),
      name: amenity.name.trim(),
      amenities_image_id,
    });
  }

  return rows;
}
