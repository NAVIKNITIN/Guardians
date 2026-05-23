import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

const VIEWPORT_HEIGHT_BREAKPOINT_PX = 1024;

export function CareerHero() {
  return (
    <MarketingPageHero
      heroId="career"
      heightPx={550}
      mobileHeightPx={500}
      useViewportHeightFlag
      viewportHeightBreakpointPx={VIEWPORT_HEIGHT_BREAKPOINT_PX}
      shiftUnderHeader={false}
      shiftTillSearch={false}
      shiftExtraContentTopPx={120}
      mobileShiftExtraContentTopPx={0}
      negativePadding={16}
    />
  );
}
