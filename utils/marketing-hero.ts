import type { MarketingHeroContent } from "@/data/audience-marketing-types";
import staticData from "./static.json";

export const marketingHeroes = staticData.marketingHeroes;

export type MarketingHeroId = keyof typeof marketingHeroes;

export function getMarketingHeroConfig(id: MarketingHeroId) {
  return marketingHeroes[id];
}

export function getAudienceHero(
  key: "buyer" | "developer",
): MarketingHeroContent {
  return staticData.audienceHeroes[key] as MarketingHeroContent;
}
