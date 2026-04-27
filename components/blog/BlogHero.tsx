import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function BlogHero() {
  return <MarketingPageHero heroId="blog" heightPx={500} mobileHeightPx={220} useViewportHeightFlag viewportHeightBreakpointPx={1024} shiftExtraContentTopPx={0} shiftUnderHeader={true} shiftTillSearch={false} negativePadding={50} />;
}
