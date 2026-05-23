"use client";

import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { useViewportIsMobile } from "@/hooks/useViewportIsMobile";

const VIEWPORT_HEIGHT_BREAKPOINT_PX = 1024;

/** Home marketing hero — content from `utils/static.json`. */
export function HeroSection() {
  const isMobile = useViewportIsMobile(true, VIEWPORT_HEIGHT_BREAKPOINT_PX);

  return (
    <MarketingPageHero
      heroId="home"
      shiftUnderHeader
      shiftTillSearch
      shiftExtraContentTopPx={isMobile ? 60 : 100}
      useViewportHeightFlag
      viewportHeightBreakpointPx={VIEWPORT_HEIGHT_BREAKPOINT_PX}
      mobileHeightPx={500}
      heightPx={650}
      negativePadding={50}
    />
  );
}
