import type { PartnerLogo, PartnersSectionContent } from "./audience-marketing-types";

export const CONTACT = "/contact" as const;

export const DEFAULT_HERO_CTA = {
  enquireHref: CONTACT,
  enquireLabel: "Enquire now",
} as const;

export const DEFAULT_READ_MORE = {
  readMoreHref: CONTACT,
  readMoreLabel: "Read more",
} as const;

export const DEFAULT_VIEW_MORE = {
  viewMoreHref: CONTACT,
  viewMoreLabel: "View more",
} as const;

export const DEFAULT_KNOW_MORE = {
  knowMoreHref: CONTACT,
  knowMoreLabel: "KNOW more",
} as const;


export function partnerLogoSrc(filename: string): string {
  return `/images/Developer/partners/${encodeURIComponent(filename)}`;
}

export const DEV_PARTNER_ROW1: readonly PartnerLogo[] = [
  { src: partnerLogoSrc("Group 32.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 33.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 34.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 36.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 38.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 39.svg"), alt: "Partner logo" },
];

export const DEV_PARTNER_ROW2: readonly PartnerLogo[] = [
  { src: partnerLogoSrc("Group 42.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 44.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 47.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 48.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 49.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 50.svg"), alt: "Partner logo" },
];

export function partnersBand(
  headlineLine1: string,
  headlineLine2: string,
): PartnersSectionContent {
  return {
    headlineLine1,
    headlineLine2,
    row1: DEV_PARTNER_ROW1,
    row2: DEV_PARTNER_ROW2,
    closing: "…AND MANY MORE TO",
    ctaHref: CONTACT,
    ctaLabel: "Know More",
  };
}
