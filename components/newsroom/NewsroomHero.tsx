import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function NewsroomHero() {
  return <MarketingPageHero heroId="newsroom" heightPx={600} mobileHeightPx={340} useViewportHeightFlag viewportHeightBreakpointPx={1024} shiftExtraContentTopPx={20} shiftUnderHeader={true} shiftTillSearch={false} />;
}
