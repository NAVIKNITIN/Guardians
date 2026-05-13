"use client";

import { cn } from "@/utils/cn";
import {
  useEffect,
  useState,
  type ImgHTMLAttributes,
} from "react";

export type MarketingImgWithFallbackProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "onError"
> & {
  src: string;
  fallbackSrc: string;
  /** Cover the positioned parent (`relative` + `overflow-hidden` on parent). */
  fill?: boolean;
  /** When true, load eagerly with high fetch priority (LCP-style). */
  priority?: boolean;
  /** Ignored — native `<img>` loads the URL as-is. */
  unoptimized?: boolean;
  onError?: ImgHTMLAttributes<HTMLImageElement>["onError"];
};

/**
 * Remote or local image with `onError` → `fallbackSrc`. Uses `<img>` so API storage
 * URLs load directly (no `next/image` host allowlist or optimizer).
 */
export function MarketingImgWithFallback({
  src,
  fallbackSrc,
  alt = "",
  className,
  fill,
  width,
  height,
  priority,
  unoptimized: _unoptimized,
  onError,
  ...rest
}: MarketingImgWithFallbackProps) {
  const [displaySrc, setDisplaySrc] = useState(src);

  useEffect(() => {
    setDisplaySrc(src);
  }, [src]);

  const handleError: ImgHTMLAttributes<HTMLImageElement>["onError"] = (e) => {
    if (displaySrc !== fallbackSrc) {
      setDisplaySrc(fallbackSrc);
      return;
    }
    onError?.(e);
  };

  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : undefined;

  if (fill) {
    return (
      <img
        {...rest}
        src={displaySrc}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onError={handleError}
        className={cn("absolute inset-0 h-full w-full", className)}
      />
    );
  }

  return (
    <img
      {...rest}
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
}
