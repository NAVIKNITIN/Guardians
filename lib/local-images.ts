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
  blog: "/images/blog.svg",
  blogDetail: "/images/blog-detail.svg",
  contactHeroPrimary: "/images/image 152.svg",
  contactHeroSecondary: "/images/image 153.svg",
  /** Project listing thumbnails — files in `public/images/Projects/ongoing` */
  img1: "/images/Projects/ongoing/image 106.svg",
  img2: "/images/Projects/ongoing/image 107.svg",
  img3: "/images/Projects/ongoing/image 108.svg",
  img4: "/images/Projects/ongoing/image 109.svg",
  /** `image 110.svg` not in repo; using `image 111.svg` */
  img5: "/images/Projects/ongoing/image 111.svg",
  img6: "/images/Projects/ongoing/image 112.svg",
  img7: "/images/Projects/ongoing/image 113.svg",
  img8: "/images/Projects/ongoing/Frame 189.svg",
  img9: "/images/Projects/Frame 230.svg", // project details screen images
  img10: "/images/Projects/Frame 231.svg",
  img11: "/images/Projects/Frame 232.svg",
  img12: "/images/Projects/Frame 233.svg",
  img13: "/images/Projects/Frame 234.svg",
  img14: "/images/Projects/Frame 235.svg",
  img15: "/images/Projects/Frame 236.svg",
  img16: "/images/Projects/Frame 237.svg",
  img17: "/images/Projects/Frame 240.svg",
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
