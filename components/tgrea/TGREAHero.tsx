import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function TGREAHero() {
  return (
    <MarketingPageHero
      heroId="tgrea"
      heightPx={650}
      mobileHeightPx={500}
      useViewportHeightFlag
      shiftUnderHeader={false}
      shiftTillSearch={false}
      shiftExtraContentTopPx={0}
      mobileShiftExtraContentTopPx={100}
      viewportHeightBreakpointPx={1024}
    />
  );
}
