import type { MarketingPageContent } from "./audience-marketing-types";
import { DEVELOPER_MARKETING_PAGE } from "./developer-marketing";

/**
 * Buyer marketing page: same sections and copy as the developer page (`DEVELOPER_MARKETING_PAGE`),
 * except the hero (buyer visuals + `ariaHeadingId`).
 */
export const BUYER_MARKETING_PAGE = {
  ...DEVELOPER_MARKETING_PAGE,
  ourWork: undefined,
  testimonials: undefined,
  hero: {
    ...DEVELOPER_MARKETING_PAGE.hero,
    isBuyer: true,
    backgroundImageSrc: "/images/Buyer/hero.svg",
    ariaHeadingId: "buyer-hero-heading",
  },
} satisfies MarketingPageContent;
