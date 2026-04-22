import { CONTACT } from "./audience-marketing-shared";
import type { LandmarkProject, MarketingPageContent } from "./audience-marketing-types";
import { DEV_LANDMARK_COMPLETED, DEVELOPER_MARKETING_PAGE } from "./developer-marketing";


export const DEV_LANDMARK_ONGOING: LandmarkProject[] = [
  {
    id: "1",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra ",
    bhkRange: "2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc: "/images/image 44.svg",
  },
  {
    id: "2",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra ",
    bhkRange: "2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc: "/images/image 44.svg",
  },
  {
    id: "3",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra ",
    bhkRange: "2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc: "/images/image 44.svg",
  },
];

export const BUYER_LANDMARK_ONGOING: LandmarkProject[] = [
  {
    id: "1",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra ",
    bhkRange: "2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc: "/images/image 67.svg",
  },
  {
    id: "2",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra ",
    bhkRange: "2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc: "/images/image 67.svg",
  },
  {
    id: "3",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra ",
    bhkRange: "2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc: "/images/image 67.svg",
  },
];

export const BUYER_LANDMARK_COMPLETED: LandmarkProject[] = BUYER_LANDMARK_ONGOING.map(
  (p) => ({
    ...p,
    id: `${p.id}-done`,
    projectName: `${p.projectName} — delivered`,
  }),
);
export const BUYER_LANDMARK_COMPLETED_BUYER_MARKETING: LandmarkProject[] = BUYER_LANDMARK_ONGOING.map(
  (p) => ({
    ...p,
    id: `${p.id}-done`,
    projectName: `${p.projectName} — delivered`,
  }),
);

export const BUYER_MARKETING_PAGE = {
  ...DEVELOPER_MARKETING_PAGE,
  ourWork: undefined,
  hero: {
    ...DEVELOPER_MARKETING_PAGE.hero,
    isBuyer: true,
    backgroundImageSrc: "/images/Buyer/hero.svg",
    ariaHeadingId: "buyer-hero-heading",
  },
  testimonials: undefined,
  banner: {
    headline: "Lorem ipsum dolor sit amet, consectetur",
    imageSrc: "/images/image 59.svg",
    ctaLabel: "Explore",
    ctaHref: "/projects",
    imageAlt: "",
    ariaHeadingId: "buyer-explore-banner-heading",
  },
  landmark: {
    sectionTitle: "Our landmark projects",
    tabOngoingLabel: "Ongoing",
    tabCompletedLabel: "Completed",
    ongoing: BUYER_LANDMARK_ONGOING,
    completed: BUYER_LANDMARK_COMPLETED,
    ctaHref: CONTACT,
    ctaLabel: "Know more",
  },
} satisfies MarketingPageContent;