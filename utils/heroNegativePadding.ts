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

/** On mobile viewports, drop upward content nudge so hero copy is not clipped. */
export function resolveNegativePaddingForViewport(
  negativePadding: MarketingHeroNegativeContentShift | undefined,
  isMobileViewport: boolean,
): MarketingHeroNegativeContentShift | undefined {
  if (!isMobileViewport || !hasActiveNegativePadding(negativePadding)) {
    return negativePadding;
  }
  return 0;
}
