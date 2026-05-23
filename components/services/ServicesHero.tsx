import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

type ServicesHeroProps = {
  /** Buyer's or Developer's services — maps to `utils/static.json` entries. */
  audience: "buyer" | "developer";
};

/**
 * Shared hero for Buyer's and Developer's service pages.
 * Copy and images are defined in `utils/static.json` (`servicesBuyer` / `servicesDeveloper`).
 * `negativePadding` is cleared on mobile inside `MarketingPageHero`.
 */
export function ServicesHero({ audience }: ServicesHeroProps) {
  return (
    <MarketingPageHero
      heroId={audience === "buyer" ? "servicesBuyer" : "servicesDeveloper"}
      heightPx={710}
      mobileHeightPx={500}
      useViewportHeightFlag
      viewportHeightBreakpointPx={1024}
      shiftExtraContentTopPx={audience === "buyer" ? 100 : 160}
      shiftUnderHeader={true}
      shiftTillSearch={false}
      negativePadding={50}
    />
  );
}
