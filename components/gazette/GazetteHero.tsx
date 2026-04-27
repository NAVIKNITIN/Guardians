import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import type { ComponentProps } from "react";

/** Props forwarded to `MarketingPageHero` — `gazette` data comes from `utils/static.json` → `marketingHeroes.gazette`. */
type GazetteHeroProps = Omit<ComponentProps<typeof MarketingPageHero>, "heroId" | "projectsStage">;

const defaultProps: Partial<GazetteHeroProps> = {
  heightPx: 600,
  mobileHeightPx: 250,
  useViewportHeightFlag: true,
  viewportHeightBreakpointPx: 1024,
  shiftExtraContentTopPx: 0,
  shiftUnderHeader: true,
  shiftTillSearch: true,
  negativePadding: true,
};

export function GazetteHero(props: GazetteHeroProps) {
  return <MarketingPageHero heroId="gazette" {...defaultProps} {...props} negativePadding={50} />;
}
