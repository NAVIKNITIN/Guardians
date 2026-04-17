/**
 * Local image paths used in place of remote URLs (Unsplash, Builder.io, etc.).
 * Assets live under `/public/images`.
 */
export const LOCAL_IMAGES = {
  heroPrimary: "/images/Buyer/hero.svg",
  heroSecondary: "/images/Developer/services/hero.svg",
  partnerHero: "/images/partner-hero.svg",
  citylife: "/images/citylife.svg",
  newsroom: "/images/newsroom.svg",
  magazine: "/images/magazine.svg",
  workWithUs: "/images/Frame 236.svg",
  holding: "/images/holdingImg.svg",
  tgreaHero: "/images/tgreaHero.svg",
  projectCompleted: "/images/Projects/completed.svg",
  buyerServicesHero: "/images/Buyer/services/hero.svg",
  marketService: "/images/Buyer/services/market.svg",
  retailService: "/images/Buyer/services/retail.svg",
  landService: "/images/Buyer/services/land.svg",
  projectImage: "/images/Projects/image 118.svg",
  gazette: "/images/gazette.svg",
} as const;

/** Rotating placeholders for grids, galleries, and lists */
export const LOCAL_IMAGE_CYCLE = [
  LOCAL_IMAGES.heroPrimary,
  LOCAL_IMAGES.heroSecondary,
  LOCAL_IMAGES.partnerHero,
  LOCAL_IMAGES.citylife,
  LOCAL_IMAGES.newsroom,
  LOCAL_IMAGES.magazine,
  LOCAL_IMAGES.workWithUs,
  LOCAL_IMAGES.holding,
] as const;

export function localImageByIndex(index: number): string {
  return LOCAL_IMAGE_CYCLE[index % LOCAL_IMAGE_CYCLE.length]!;
}
