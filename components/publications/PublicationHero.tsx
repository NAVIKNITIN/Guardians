import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

type PublicationHeroProps = {
  edition: "gazette" | "magazine";
};

/** @deprecated Use `<MarketingPageHero heroId="gazette" | "magazine" />`. */
export function PublicationHero({ edition }: PublicationHeroProps) {
  return <MarketingPageHero heroId={edition} />;
}
