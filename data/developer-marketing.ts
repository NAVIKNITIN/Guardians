import { LOCAL_IMAGES, localImageByIndex } from "@/lib/local-images";
import type {
  AwardSlide,
  DeveloperStat,
  LandmarkProject,
  MarketingPageContent,
} from "./audience-marketing-types";
import {
  CONTACT,
  DEFAULT_HERO_CTA,
  DEFAULT_KNOW_MORE,
  DEFAULT_READ_MORE,
  DEFAULT_VIEW_MORE,
  partnersBand,
} from "./audience-marketing-shared";

const PLACEHOLDER_SERVICE_DESC =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const DEV_LANDMARK_ONGOING: LandmarkProject[] = [
  {
    id: "ms",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra | 2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc: LOCAL_IMAGES.holding,
  },
  {
    id: "p2",
    brand: "SKYLINE",
    projectLine: "RESIDENTIAL TOWER",
    projectName: "ELEVATE ONE",
    location: "Western Suburbs, Mumbai",
    imageSrc: LOCAL_IMAGES.partnerHero,
  },
  {
    id: "p3",
    brand: "URBAN",
    projectLine: "MIXED-USE",
    projectName: "HARBOUR VIEW",
    location: "Navi Mumbai",
    imageSrc: LOCAL_IMAGES.citylife,
  },
];

export const DEV_LANDMARK_COMPLETED: LandmarkProject[] = DEV_LANDMARK_ONGOING.map(
  (p) => ({
    ...p,
    id: `${p.id}-done`,
    projectName: `${p.projectName} — delivered`,
  }),
);

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

const DEV_AWARD_SLIDES: AwardSlide[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  company: "[COMPANY NAME HERE]",
  achievement: "[Achievement here]",
  year: "[YEAR RECEIVED]",
  imageSrc: AWARD_ROTATION_IMAGES[i % AWARD_ROTATION_IMAGES.length],
}));

export const DEVELOPER_MARKETING_PAGE = {
  hero: {
    isBuyer: false,
    backgroundImageSrc: "/images/Mask group.svg",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ...DEFAULT_HERO_CTA,
    ariaHeadingId: "developer-hero-heading",
  },
  services: {
    sectionTitle: "Our services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    knowMoreHref: CONTACT,
    knowMoreLabel: DEFAULT_KNOW_MORE.knowMoreLabel,
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
  ourWork: {
    sectionTitle: "Our work",
    ...DEFAULT_READ_MORE,
    slides: [
      {
        id: "1",
        title: "The Guardians Assists with Elme Communities’ Evolution.",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        imageSrc: "/images/ourwork.svg",
      },
      {
        id: "2",
        title: "Strategic positioning for mixed-use corridors.",
        body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        imageSrc: localImageByIndex(1),
      },
      {
        id: "3",
        title: "Institutional sales velocity and channel design.",
        body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        imageSrc: localImageByIndex(2),
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        id: String(i + 4),
        title: `Featured collaboration ${i + 4}`,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageSrc: localImageByIndex(i + 3),
      })),
    ],
  },
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
      { label: "Cr. Worth of Inventory Sold", end: 37850, format: "comma" },
      {
        label: "Sq. Ft. Area Developed",
        end: 2,
        format: "suffix",
        suffix: " Million+",
      },
      { label: "Projects Delivered", end: 307, format: "suffix", suffix: "+" },
      { label: "Units Sold", end: 29669, format: "comma" },
    ] as const satisfies readonly DeveloperStat[],
  },
  partners: partnersBand(
    "Partnered with revolutionary",
    "startups & global organizations",
  ),
  testimonials: {
    sectionTitle: "What our clients say",
    ...DEFAULT_VIEW_MORE,
    items: [
      {
        id: "1",
        brandLabel: "adani Realty",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "Abhishek Naagar",
        role: "Project Manager, Adani Realty",
        location: "BKC, Mumbai",
      },
      {
        id: "2",
        brandLabel: "Marathon Group",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "Priya Shah",
        role: "Head of Sales",
        location: "Mumbai",
      },
      {
        id: "3",
        brandLabel: "Sunteck",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "Rahul Verma",
        role: "Director — Projects",
        location: "Pune",
      },
      {
        id: "4",
        brandLabel: "Piramal Realty",
        quote:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        name: "Ananya Desai",
        role: "VP — Customer Experience",
        location: "Lower Parel, Mumbai",
      },
      {
        id: "5",
        brandLabel: "Sheth Creators",
        quote:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
        name: "Karan Mehta",
        role: "Associate Director",
        location: "Thane",
      },
      {
        id: "6",
        brandLabel: "Guru Prerna",
        quote:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
        name: "Neha Kulkarni",
        role: "Sales Lead",
        location: "Navi Mumbai",
      },
    ],
  },
  awards: {
    starIconSrc: "/images/Developer/award/star.svg",
    headingLine1: "Awards &",
    headingLine2: "Recognitions",
    slides: DEV_AWARD_SLIDES,
  },
} satisfies MarketingPageContent;
