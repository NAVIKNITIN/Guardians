"use client";

import type { MarketingHeroNegativeContentShift } from "@/utils/heroNegativePadding";
import { useViewportIsMobile } from "@/hooks/useViewportIsMobile";
import {
  hasActiveNegativePadding,
  resolveNegativePaddingForViewport,
} from "@/utils/heroNegativePadding";

export const DEFAULT_VIEWPORT_HEIGHT_BREAKPOINT = 1024;

export function isCustomHeroHeight(heightPx?: number): heightPx is number {
  return heightPx != null && Number.isFinite(heightPx) && heightPx > 0;
}

export type MarketingHeroViewportOptions = {
  useViewportHeightFlag?: boolean;
  heightPx?: number;
  mobileHeightPx?: number;
  viewportHeightBreakpointPx?: number;
  negativePadding?: MarketingHeroNegativeContentShift;
};

/** Shared mobile/desktop hero height + negative-padding resolution for marketing heroes. */
export function useMarketingHeroViewport({
  useViewportHeightFlag,
  heightPx,
  mobileHeightPx,
  viewportHeightBreakpointPx = DEFAULT_VIEWPORT_HEIGHT_BREAKPOINT,
  negativePadding,
}: MarketingHeroViewportOptions) {
  const shouldUseViewportHeightFlag =
    Boolean(useViewportHeightFlag) &&
    isCustomHeroHeight(heightPx) &&
    isCustomHeroHeight(mobileHeightPx);
  const shouldDetectMobileViewport =
    shouldUseViewportHeightFlag || hasActiveNegativePadding(negativePadding);
  const isMobileViewport = useViewportIsMobile(
    shouldDetectMobileViewport,
    viewportHeightBreakpointPx,
  );
  const resolvedHeightPx =
    shouldUseViewportHeightFlag && isMobileViewport ? mobileHeightPx : heightPx;
  const resolvedNegativePadding = resolveNegativePaddingForViewport(
    negativePadding,
    isMobileViewport,
  );

  return {
    heightPx: resolvedHeightPx,
    negativePadding: resolvedNegativePadding,
    isMobileViewport,
  };
}
