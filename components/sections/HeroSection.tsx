import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

/** Home marketing hero — content from `utils/static.json`. */
export function HeroSection() {
  return <MarketingPageHero heroId="home" shiftUnderHeader={true} shiftTillSearch={true} shiftExtraContentTopPx={80} />;
}
