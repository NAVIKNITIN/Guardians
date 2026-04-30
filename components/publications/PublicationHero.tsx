import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

type PublicationHeroProps = {
  edition: "gazette" | "magazine";
};

/** @deprecated Use `<MarketingPageHero heroId="gazette" | "magazine" />`. */
export function PublicationHero({ edition }: PublicationHeroProps) {
  return (
    <MarketingPageHero
      heroId={edition}
      heightPx={edition === "gazette" ? 600 : 500}
      mobileHeightPx={320}
      useViewportHeightFlag
      viewportHeightBreakpointPx={1024}
      shiftExtraContentTopPx={0}
      shiftUnderHeader
      shiftTillSearch
      negativePadding={50}
    />
  );
}
