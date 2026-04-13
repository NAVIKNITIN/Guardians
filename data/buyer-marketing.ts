import type {
  AwardSlide,
  DeveloperStat,
  MarketingPageContent,
} from "./audience-marketing-types";
import {
  CONTACT,
  DEFAULT_HERO_CTA,
  DEFAULT_READ_MORE,
  DEFAULT_VIEW_MORE,
  partnersBand,
} from "./audience-marketing-shared";
import { LOCAL_IMAGES } from "@/lib/local-images";
import {
  DEV_LANDMARK_COMPLETED,
  DEV_LANDMARK_ONGOING,
} from "./developer-marketing";
const AWARD_ROTATION_IMAGES = [
  "/images/ourwork.svg",
  "/images/developer-hero.svg",
  "/images/Home/Banner1.svg",
  "/images/Developer/ourservices/1.svg",
  "/images/Developer/ourservices/2.svg",
  "/images/Developer/Group%204.svg",
  "/images/image_1.svg",
  "/images/Buyer/BuyerVector.svg",
] as const;
const PLACEHOLDER_SERVICE_DESC =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const DEV_AWARD_SLIDES: AwardSlide[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  company: "[COMPANY NAME HERE]",
  achievement: "[Achievement here]",
  year: "[YEAR RECEIVED]",
  imageSrc: AWARD_ROTATION_IMAGES[i % AWARD_ROTATION_IMAGES.length],
}));

export const BUYER_MARKETING_PAGE = {
  hero: {
    isBuyer: true,
    backgroundImageSrc: "/images/Buyer/hero.svg",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ...DEFAULT_HERO_CTA,
    ariaHeadingId: "buyer-hero-heading",
  },
  services: {
    sectionTitle: "Our services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    ...DEFAULT_READ_MORE,
    cards: [
      {
        id: "residential",
        title: "Residential",
        src: "/images/Developer/ourservices/1.svg",
        description: PLACEHOLDER_SERVICE_DESC,
      },
      {
        id: "business",
        title: "Business solution",
        src: "/images/Developer/ourservices/2.svg",
        description: PLACEHOLDER_SERVICE_DESC,
      },
      {
        id: "market",
        title: "Market intelligence",
        src: LOCAL_IMAGES.marketService,
        description: PLACEHOLDER_SERVICE_DESC,
      },
      {
        id: "partner",
        title: "Partner network",
        src: LOCAL_IMAGES.buyerServicesHero,
        description: PLACEHOLDER_SERVICE_DESC,
      },
      {
        id: "institutional",
        title: "Institutional sales",
        src: LOCAL_IMAGES.retailService,
        description: PLACEHOLDER_SERVICE_DESC,
      },
      {
        id: "advisory",
        title: "Structured advisory",
        src: LOCAL_IMAGES.landService,
        description: PLACEHOLDER_SERVICE_DESC,
      },
    ],
  },
  // ourWork: {
  //   sectionTitle: "Buyer stories",
  //   ...DEFAULT_READ_MORE,
  //   slides: [
  //     {
  //       id: "b1",
  //       title: "From first visit to keys in Lower Parel.",
  //       body: "We helped a family compare three corridors, stress-test EMIs, and close on a timeline that matched their school admissions window.",
  //       imageSrc: "/images/Buyer/image%2041.svg",
  //     },
  //     {
  //       id: "b2",
  //       title: "Relocating from Delhi with zero guesswork.",
  //       body: "Neighborhood fit, commute trials, and a diligence pack on the builder track record before the token went through.",
  //       imageSrc: "/images/Buyer/services/market.svg",
  //     },
  //     {
  //       id: "b3",
  //       title: "Upgrade path from rental to owned.",
  //       body: "Structured milestones for sale of the older asset, bridge planning, and synchronized possession dates.",
  //       imageSrc: "/images/Buyer/services/retail.svg",
  //     },
  //   ],
  // },
  landmark: {
    sectionTitle: "Our landmark projects",
    tabOngoingLabel: "Ongoing",
    tabCompletedLabel: "Completed",
    ongoing: DEV_LANDMARK_ONGOING,
    completed: DEV_LANDMARK_COMPLETED,
    ctaHref: CONTACT,
    ctaLabel: "Know more",
  },
  stats: {
    metrics: [
      { label: "Families guided to closure", end: 850, format: "comma" },
      {
        label: "Avg. days saved vs DIY search",
        end: 32,
        format: "suffix",
        suffix: "+",
      },
      {
        label: "Lenders & legal partners",
        end: 48,
        format: "suffix",
        suffix: "+",
      },
      { label: "Cities with on-ground support", end: 6, format: "comma" },
    ] as const satisfies readonly DeveloperStat[],
  },
  partners: partnersBand(
    "Partnered with Revolutionary",
    "Startups & Global Organizations",
  ),
  // testimonials: {
  //   sectionTitle: "What buyers say",
  //   ...DEFAULT_VIEW_MORE,
  //   items: [
  //     {
  //       id: "bb1",
  //       brandLabel: "First-time buyer",
  //       quote:
  //         "We always knew what milestone came next. The shortlist was brutally honest — not just what was selling fastest.",
  //       name: "Isha Malhotra",
  //       role: "Product lead",
  //       location: "Bandra",
  //     },
  //     {
  //       id: "bb2",
  //       brandLabel: "Upgrade buyer",
  //       quote:
  //         "They synchronized our sale and purchase timelines so we were never between homes longer than planned.",
  //       name: "Sameer Khanna",
  //       role: "Finance director",
  //       location: "Powai",
  //     },
  //     {
  //       id: "bb3",
  //       brandLabel: "NRI buyer",
  //       quote:
  //         "Video walk-throughs, diligence PDFs, and a single thread for every question made remote buying workable.",
  //       name: "Anita Deshpande",
  //       role: "Consultant",
  //       location: "Singapore → Pune",
  //     },
  //   ],
  // },
  awards: {
    starIconSrc: "/images/Developer/award/star.svg",
    headingLine1: "Awards &",
    headingLine2: "Recognitions",
    slides: DEV_AWARD_SLIDES,
  },
  banner: {
    headline: "Lorem ipsum dolor sit amet, consectetur",
    imageSrc: "/images/Buyer/image%2059.svg",
    ctaLabel: "Explore",
    ctaHref: "/projects",
    imageAlt: "",
    ariaHeadingId: "buyer-explore-banner-heading",
  },
} satisfies MarketingPageContent;
