import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

/** Home marketing hero — content from `utils/static.json`. */
export function HeroSection() {
  return (
    <MarketingPageHero
      heroId="home"
      shiftUnderHeader
      shiftTillSearch
      shiftExtraContentTopPx={60}
      useViewportHeightFlag
      viewportHeightBreakpointPx={1024}
      mobileHeightPx={230}
      heightPx={650}
    />
  );
}
