import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function MagazineHero() {
  return <MarketingPageHero heroId="magazine" heightPx={500} mobileHeightPx={320} useViewportHeightFlag viewportHeightBreakpointPx={1024} shiftExtraContentTopPx={0} shiftUnderHeader={true} shiftTillSearch={false} negativePadding={24} />;
}
