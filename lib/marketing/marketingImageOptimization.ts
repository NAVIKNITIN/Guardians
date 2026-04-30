/**
 * Prefer Next/Image optimization for remote raster URLs (same as project gallery).
 * Bypass optimization only for SVG — optimizer commonly mishandles complex SVGs.
 */
export function marketingImageUnoptimized(src: string): boolean {
  return /\.svg(\?|#|$)/i.test(src);
}
