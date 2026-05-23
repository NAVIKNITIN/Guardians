import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

const VIEWPORT_HEIGHT_BREAKPOINT_PX = 1024;

export function CareerHero() {
  return (
    <MarketingPageHero
      heroId="career"
      heightPx={513}
      mobileHeightPx={340}
      useViewportHeightFlag
      viewportHeightBreakpointPx={VIEWPORT_HEIGHT_BREAKPOINT_PX}
      shiftUnderHeader={false}
      shiftTillSearch={false}
      shiftExtraContentTopPx={72}
      mobileShiftExtraContentTopPx={0}
      negativePadding={16}
    />
  );
}
