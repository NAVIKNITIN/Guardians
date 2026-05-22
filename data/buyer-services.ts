import type { ServicePanel, ServiceTile } from "@/components/services/ServicesGrid";
import { CONTACT } from "./audience-marketing-shared";

const KNOW_MORE = CONTACT;

export const BUYER_SERVICE_TILES: ServiceTile[] = [
  {
    label: "Residential Services",
    imageSrc: "/images/Buyer/services/resident.svg",
    imageAlt: "Residential Services",
    href: KNOW_MORE,
  },
  {
    label: "Commercial Services",
    imageSrc: "/images/Developer/services/commercial.svg",
    imageAlt: "Commercial Services",
    href: KNOW_MORE,
  },
  {
    label: "Buyer Assist",
    imageSrc: "/images/Developer/ourservices/2.svg",
    imageAlt: "Buyer Assist",
    href: KNOW_MORE,
  },
];

export const BUYER_SERVICE_PANELS: ServicePanel[] = [
  {
    title: "Residential Services",
    imageSrc: "/images/Buyer/services/resident.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "Finding the right home is about more than square feet and price points. We take the time to understand what you are looking for and guide you to spaces that truly fit your life.",
      },
      {
        title: "End-to-End Support",
        description:
          "We are with you from the very first shortlist to the day you get your keys. Site visits, documentation, negotiations — consider it handled.",
      },
      {
        title: "Market Intelligence",
        description:
          "We give you a clear, honest picture of the market so you can make decisions with confidence and clarity.",
      },
      {
        title: "Tailored Shortlisting",
        description:
          "No generic lists. We match properties to your lifestyle, budget and future plans, so every option we bring you is worth your time.",
      },
      {
        title: "Site Visits and Evaluation",
        description:
          "We accompany you through every visit, helping you assess each property with a trained eye and an unbiased view.",
      },
      {
        title: "Documentation Support",
        description:
          "From agreements to registrations, we make sure every piece of paperwork is in order and nothing is left to chance.",
      },
    ],
  },
  {
    title: "Commercial Services",
    imageSrc: "/images/Developer/services/commercial.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "Whether you are looking for office space, a retail outlet or a business address that works as hard as you do, we help you find it.",
      },
      {
        title: "End-to-End Service",
        description:
          "From identifying the right space to closing the deal, we handle the entire process so you can stay focused on your business.",
      },
      {
        title: "Local Expertise, Global Reach",
        description:
          "We bring deep knowledge of local markets combined with a wide network that gives you access to the best commercial opportunities available.",
      },
      {
        title: "Tailored Solutions",
        description:
          "Every business has different needs. We listen first, then build a search strategy that is specific to your goals and your budget.",
      },
      {
        title: "Seamless Transactions",
        description:
          "We manage every aspect of the transaction, from negotiations to documentation, ensuring a smooth and stress-free experience.",
      },
      {
        title: "A Trusted Partner",
        description:
          "We do not disappear after the deal is done. We stay available to support you as your business grows and your space needs evolve.",
      },
    ],
  },
  {
    title: "Buyer Assist",
    imageSrc: "/images/Developer/ourservices/2.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "Buying property can feel overwhelming. Our Buyer Assist service exists to make the entire journey simpler, clearer and far less stressful.",
      },
      {
        title: "Project Comparisons",
        description:
          "We do the research so you do not have to. We compare projects across location, pricing, amenities and developer track record to help you make the right call.",
      },
      {
        title: "Site Visit Coordination",
        description:
          "We plan and coordinate your site visits, making sure you see the right properties at the right time without the back and forth.",
      },
      {
        title: "Negotiation Support",
        description:
          "We negotiate on your behalf, using our market knowledge and developer relationships to get you the best possible deal.",
      },
      {
        title: "Documentation Assistance",
        description:
          "We guide you through every document, explaining what you are signing and making sure everything is legally sound.",
      },
      {
        title: "Home Loan Advisory",
        description:
          "We connect you with the right financing options, helping you find competitive rates on residential and investment loans that fit your situation.",
      },
    ],
  },
];

/** Default right-hand panel before a tile is selected (Residential). */
export const BUYER_SERVICES_GRID_DEFAULT = {
  accordionTitle: BUYER_SERVICE_PANELS[0]!.title,
  accordionItems: BUYER_SERVICE_PANELS[0]!.items,
  accordionImageSrc: BUYER_SERVICE_PANELS[0]!.imageSrc,
  knowMoreHref: KNOW_MORE,
} as const;
