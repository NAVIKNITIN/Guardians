import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

const VIEWPORT_HEIGHT_BREAKPOINT_PX = 1024;

export function NewsroomHero() {
  return (
    <MarketingPageHero
      heroId="newsroom"
      heightPx={600}
      mobileHeightPx={500}
      useViewportHeightFlag
      viewportHeightBreakpointPx={VIEWPORT_HEIGHT_BREAKPOINT_PX}
      shiftUnderHeader
      shiftTillSearch={false}
      shiftExtraContentTopPx={200}
      mobileShiftExtraContentTopPx={0}
      negativePadding={50}
      mobileNegativePadding={80}
    />
  );
}
