import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function BlogHero() {
  return <MarketingPageHero heroId="blog" heightPx={500} shiftExtraContentTopPx={0} shiftUnderHeader={true} shiftTillSearch={false} negativePadding={50} />;
}
