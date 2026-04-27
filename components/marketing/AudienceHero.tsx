import type { MarketingHeroContent } from "@/data/audience-marketing";
import { MarketingAudienceHero } from "@/components/marketing/MarketingPageHero";

export function AudienceHero({
  content,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  shiftExtraContentTopPx,
}: {
  content: MarketingHeroContent;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  heightPx?: number;
  /**
   * Extra top padding (px) when shift flags apply. If set, overrides
   * `content.shiftExtraContentTopPx` from page data; otherwise the hero content value
   * (or the default in `MarketingAudienceHero`) is used.
   */
  shiftExtraContentTopPx?: number;
}) {
  const resolvedExtraTop =
    shiftExtraContentTopPx !== undefined
      ? shiftExtraContentTopPx
      : content.shiftExtraContentTopPx;

  return (
    <MarketingAudienceHero
      content={content}
      heightPx={heightPx}
      shiftUnderHeader={shiftUnderHeader}
      shiftTillSearch={shiftTillSearch}
      shiftExtraContentTopPx={resolvedExtraTop}
    />
  );
}
