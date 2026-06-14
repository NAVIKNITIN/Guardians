import { resolveApiAssetUrl } from "@/lib/api/resolveAssetUrl";
import { getFileById } from "@/src/api/services/fileService";

export type ApiFileRecord = {
  id: number;
  file_url: string;
  file_name?: string;
  file_type?: string;
  sequence_no?: number | null;
};

type FileByIdResponse = {
  success?: boolean;
  data?: ApiFileRecord;
};

const displayUrlCache = new Map<number, string | null>();

function parseFileId(id: number | string | null | undefined): number | null {
  if (id == null || id === "") return null;
  const n = Number(id);
  return Number.isFinite(n) ? n : null;
}

/**
 * Resolve a display URL for a file row via `GET /api/files/:id`.
 * Results are cached for the lifetime of the page session.
 */
export async function fetchFileDisplayUrlById(
  id: number | string | null | undefined,
): Promise<string | null> {
  const fileId = parseFileId(id);
  if (fileId == null) return null;

  if (displayUrlCache.has(fileId)) {
    return displayUrlCache.get(fileId) ?? null;
  }

  try {
    const result = (await getFileById(fileId)) as FileByIdResponse;
    const url =
      result?.success !== false
        ? resolveApiAssetUrl(result?.data?.file_url)
        : null;
    displayUrlCache.set(fileId, url);
    return url;
  } catch {
    displayUrlCache.set(fileId, null);
    return null;
  }
}

/** Batch-fetch display URLs for many file ids (deduped, parallel). */
export async function fetchFileDisplayUrlsByIds(
  ids: Array<number | string | null | undefined>,
): Promise<Map<number, string | null>> {
  const unique = [
    ...new Set(
      ids
        .map(parseFileId)
        .filter((id): id is number => id != null),
    ),
  ];

  await Promise.all(unique.map((id) => fetchFileDisplayUrlById(id)));

  const out = new Map<number, string | null>();
  for (const id of unique) {
    out.set(id, displayUrlCache.get(id) ?? null);
  }
  return out;
}
