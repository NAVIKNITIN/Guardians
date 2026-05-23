/**
 * Nudges the main content block up: `true` = default responsive `-mt` (see `mergeNegativeContentPad`),
 * a positive number = `-mt` by that many px, `false` / `0` / omitted = off.
 */
export type MarketingHeroNegativeContentShift = boolean | number;

export function hasActiveNegativePadding(
  negativePadding?: MarketingHeroNegativeContentShift,
): boolean {
  return (
    negativePadding !== undefined &&
    negativePadding !== false &&
    negativePadding !== 0
  );
}

/**
 * Resolves upward content nudge per viewport.
 * On mobile: uses `mobileNegativePadding` when provided; otherwise clears desktop `negativePadding` (legacy).
 */
export function resolveNegativePaddingForViewport(
  negativePadding: MarketingHeroNegativeContentShift | undefined,
  isMobileViewport: boolean,
  mobileNegativePadding?: MarketingHeroNegativeContentShift,
): MarketingHeroNegativeContentShift | undefined {
  if (!isMobileViewport) {
    return negativePadding;
  }
  if (mobileNegativePadding !== undefined) {
    if (mobileNegativePadding === false || mobileNegativePadding === 0) {
      return undefined;
    }
    return mobileNegativePadding;
  }
  if (!hasActiveNegativePadding(negativePadding)) {
    return negativePadding;
  }
  return 0;
}
