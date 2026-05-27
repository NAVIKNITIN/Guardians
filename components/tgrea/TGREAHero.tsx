import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

const VIEWPORT_HEIGHT_BREAKPOINT_PX = 1024;

export function TGREAHero() {
  return (
    <MarketingPageHero
      heroId="tgrea"
      heightPx={650}
      mobileHeightPx={500}
      useViewportHeightFlag
      viewportHeightBreakpointPx={VIEWPORT_HEIGHT_BREAKPOINT_PX}
      shiftUnderHeader={false}
      shiftTillSearch={false}
      shiftExtraContentTopPx={0}
      mobileShiftExtraContentTopPx={24}
    />
  );
}
