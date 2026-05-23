import {
  BUYER_SERVICES,
  CONTACT,
  partnersBand,
  PROJECTS_ONGOING,
} from "./audience-marketing-shared";
import { getAudienceHero } from "@/utils/marketing-hero";
import type { DeveloperStat, LandmarkProject, MarketingPageContent } from "./audience-marketing-types";
import { DEV_LANDMARK_COMPLETED, DEVELOPER_MARKETING_PAGE, PLACEHOLDER_SERVICE_DESC } from "./developer-marketing";


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
  {
    id: "4",
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
    projectLine: "Handpicked for You",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra",
    bhkRange: "2, 3 and 3.5 BHK Residences",
    imageSrc: "/images/image 67.svg",
  },
  {
    id: "2",
    brand: "MARATHON",
    projectLine: "Handpicked for You",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra",
    bhkRange: "2, 3 and 3.5 BHK Residences",
    imageSrc: "/images/image 67.svg",
  },
  {
    id: "3",
    brand: "MARATHON",
    projectLine: "Handpicked for You",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra",
    bhkRange: "2, 3 and 3.5 BHK Residences",
    imageSrc: "/images/image 67.svg",
  },
  {
    id: "4",
    brand: "MARATHON",
    projectLine: "Handpicked for You",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra",
    bhkRange: "2, 3 and 3.5 BHK Residences",
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
  partners: partnersBand(
    "Backed by trusted developers and global partners","who help us bring you exceptional choices.",
  ),
  services: {
    ...DEVELOPER_MARKETING_PAGE.services,
    knowMoreHref: BUYER_SERVICES,
    description:"Everything you need to discover a home that feels like the right fit.",
    cards: [
      {
        id: "residential",
        title: "Residential",
        src: "/images/Developer/ourservices/1.svg",
        description: "Explore homes that match your taste, your lifestyle and your future plans. We shortlist, guide and simplify it all for you.",
      },
      {
        id: "business",
        title: "Business Solutions",
        src: "/images/Developer/ourservices/2.svg",
        description: "If your next move is commercial, we help you find smart, well-connected spaces that keep your goals growing.",
      },
      {
        id: "buyer-assist",
        title: "Buyer Assist",
        src: "/images/Developer/ourservices/2.svg",
        description: "From project comparisons to site visits and documentation, consider us your personal support team throughout the journey.",
      },
    ]
  },
  ourWork: undefined,
  hero: getAudienceHero("buyer"),
  testimonials: undefined,
  banner: {
    headline: "Ready to explore spaces that truly feel like home? Let’s take the next step together.",
    imageSrc: "/images/image 59.svg",
    ctaLabel: "Connect with Us ",
    ctaHref: "/contact",
    imageAlt: "",
    ariaHeadingId: "buyer-explore-banner-heading",
  },
  landmark: {
    sectionTitle: "Our landmark projects",
    tabOngoingLabel: "Ongoing",
    tabCompletedLabel: "Completed",
    ongoing: BUYER_LANDMARK_ONGOING,
    completed: BUYER_LANDMARK_COMPLETED,
    ctaHref: PROJECTS_ONGOING,
    ctaLabel: "Explore More ",
  },
  stats: {
    metrics: [
      { label: "In Homes Sold", value: "37,850 Cr+" },
      { label: "Of Proven Guidance", value: "9+ Years" },
      { label: "Handpicked for You", value: "307+ Projects" },
      { label: "Dreams Realised", value: "29,669 Homes" },
    ] as const satisfies readonly DeveloperStat[],
  },
} satisfies MarketingPageContent;