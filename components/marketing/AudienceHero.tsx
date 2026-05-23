import type { MarketingHeroContent } from "@/data/audience-marketing";
import {
  MarketingAudienceHero,
  type MarketingHeroNegativeContentShift,
} from "@/components/marketing/MarketingPageHero";

export type AudienceHeroProps = {
  content: MarketingHeroContent;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  heightPx?: number;
  mobileHeightPx?: number;
  useViewportHeightFlag?: boolean;
  viewportHeightBreakpointPx?: number;
  negativePadding?: MarketingHeroNegativeContentShift;
  /**
   * Extra top padding (px) when shift flags apply. If set, overrides
   * `content.shiftExtraContentTopPx` from page data; otherwise the hero content value
   * (or the default in `MarketingAudienceHero`) is used.
   */
  shiftExtraContentTopPx?: number;
};

export function AudienceHero({
  content,
  heightPx,
  mobileHeightPx,
  useViewportHeightFlag,
  viewportHeightBreakpointPx,
  negativePadding,
  shiftUnderHeader,
  shiftTillSearch,
  shiftExtraContentTopPx,
}: AudienceHeroProps) {
  const resolvedExtraTop =
    shiftExtraContentTopPx !== undefined
      ? shiftExtraContentTopPx
      : content.shiftExtraContentTopPx;

  return (
    <MarketingAudienceHero
      content={content}
      heightPx={heightPx}
      mobileHeightPx={mobileHeightPx}
      useViewportHeightFlag={useViewportHeightFlag}
      viewportHeightBreakpointPx={viewportHeightBreakpointPx}
      negativePadding={negativePadding}
      shiftUnderHeader={shiftUnderHeader}
      shiftTillSearch={shiftTillSearch}
      shiftExtraContentTopPx={resolvedExtraTop}
    />
  );
}
