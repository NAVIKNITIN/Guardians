import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function CareerHero() {
  return <MarketingPageHero heroId="career" heightPx={513} mobileHeightPx={230} useViewportHeightFlag viewportHeightBreakpointPx={1024} shiftExtraContentTopPx={100} shiftUnderHeader={false} shiftTillSearch={false} />;
}
