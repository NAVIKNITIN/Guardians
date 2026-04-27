import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function ContactHero() {
  return <MarketingPageHero heroId="contact" heightPx={500} mobileHeightPx={220} useViewportHeightFlag viewportHeightBreakpointPx={1024} shiftExtraContentTopPx={0} shiftUnderHeader={true} shiftTillSearch={false} negativePadding={50} />;
}
