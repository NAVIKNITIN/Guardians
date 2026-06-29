import type { PartnerLogo, PartnersSectionContent } from "./audience-marketing-types";
import { partnerLogoFromGroup } from "./partners-logo-grid";

export const CONTACT = "/contact" as const;
export const BUYER_SERVICES = "/buyer/services" as const;
export const DEVELOPER_SERVICES = "/developer/services" as const;

/** Project listing — pre-filtered by stage (see `app/(marketing)/projects/page.tsx`). */
export const PROJECTS_ONGOING = "/projects?stage=ongoing" as const;
export const PROJECTS_COMPLETED = "/projects?stage=completed" as const;

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
  knowMoreLabel: "Explore More",
} as const;


/** Marquee row 1 — colour logos (matches partners grid assets). */
export const DEV_PARTNER_ROW1: readonly PartnerLogo[] = [
  partnerLogoFromGroup(39),
  partnerLogoFromGroup(36),
  partnerLogoFromGroup(32),
  partnerLogoFromGroup(47),
  partnerLogoFromGroup(38),
  partnerLogoFromGroup(30),
];

/** Marquee row 2 — colour logos (matches partners grid assets). */
export const DEV_PARTNER_ROW2: readonly PartnerLogo[] = [
  partnerLogoFromGroup(45),
  partnerLogoFromGroup(48),
  partnerLogoFromGroup(37),
  partnerLogoFromGroup(42),
  partnerLogoFromGroup(34),
  partnerLogoFromGroup(50),
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
    ctaHref: "/partners",
    ctaLabel: "Explore More",
  };
}
