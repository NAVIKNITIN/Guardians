"use client";

import { MarketingImgWithFallback } from "@/components/common/MarketingImgWithFallback";
import { fetchFileDisplayUrlById } from "@/lib/api/fileById";
import { LOCAL_IMAGES } from "@/lib/local-images";
import Image from "next/image";
import { useEffect, useState } from "react";

type AmenityImageByFileIdProps = {
  imageFileId: number | string | null | undefined;
  alt?: string;
  /** Optional pre-resolved URL (e.g. fresh upload preview). Skips fetch when set. */
  src?: string | null;
  fallbackSrc?: string;
  width: number;
  height: number;
  className?: string;
  /** Use Next/Image `unoptimized` (admin thumbnails). */
  unoptimized?: boolean;
};

/**
 * Renders an amenity icon by fetching `GET /api/files/:id` when needed.
 */
export function AmenityImageByFileId({
  imageFileId,
  alt = "",
  src,
  fallbackSrc = LOCAL_IMAGES.holding,
  width,
  height,
  className,
  unoptimized = false,
}: AmenityImageByFileIdProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(
    src?.trim() ? src : null,
  );

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const fileId =
        imageFileId == null || imageFileId === ""
          ? null
          : Number(imageFileId);

      if (fileId != null && Number.isFinite(fileId)) {
        const url = await fetchFileDisplayUrlById(fileId);
        if (!cancelled) {
          setResolvedSrc(url ?? src?.trim() ?? null);
        }
        return;
      }

      if (!cancelled) {
        setResolvedSrc(src?.trim() ?? null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageFileId, src]);

  const displaySrc = resolvedSrc ?? fallbackSrc;

  if (unoptimized) {
    return (
      <Image
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className={className}
      />
    );
  }

  return (
    <MarketingImgWithFallback
      src={displaySrc}
      fallbackSrc={fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
