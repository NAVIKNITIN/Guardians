import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function PartnersHero() {
  return <MarketingPageHero heroId="partners" heightPx={600} mobileHeightPx={360} useViewportHeightFlag viewportHeightBreakpointPx={1024} shiftExtraContentTopPx={0} shiftUnderHeader={true} shiftTillSearch={false} />;
}
