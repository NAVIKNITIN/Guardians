import type { ServicePanel, ServiceTile } from "@/components/services/ServicesGrid";
import { CONTACT } from "./audience-marketing-shared";

const KNOW_MORE = CONTACT;

export const DEVELOPER_SERVICE_TILES: ServiceTile[] = [
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
    label: "Retail Services",
    imageSrc: "/images/Buyer/services/retail.svg",
    imageAlt: "Retail Services",
    href: KNOW_MORE,
  },
  {
    label: "Land Services",
    imageSrc: "/images/Buyer/services/land.svg",
    imageAlt: "Land Services",
    href: KNOW_MORE,
  },
  {
    label: "Financial Services",
    imageSrc: "/images/Buyer/services/market.svg",
    imageAlt: "Financial Services",
    href: KNOW_MORE,
  },
  {
    label: "Marketing Consulting Services",
    imageSrc: "/images/Buyer/services/market.svg",
    imageAlt: "Marketing Consulting Services",
    href: KNOW_MORE,
  },
];

export const DEVELOPER_SERVICE_PANELS: ServicePanel[] = [
  {
    title: "Residential Services",
    imageSrc: "/images/Buyer/services/resident.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "We go beyond advisory. We become an extension of your team, driving every stage of your residential project with the rigour and accountability that delivers results.",
      },
      {
        title: "Market Intelligence",
        description:
          "Extensive primary and secondary research to identify market trends, pricing benchmarks, competitive positioning and buyer behaviour specific to your micro-market.",
      },
      {
        title: "Product Planning and Strategy",
        description:
          "We help you develop product concepts that strike the right balance between volume and value, covering unit mix, configurations, dimensions, finishes and pricing architecture.",
      },
      {
        title: "Pricing Strategy",
        description:
          "After thorough market research and partner analysis, we build a pricing strategy that positions your project optimally and maximises realisation at every stage of sales.",
      },
      {
        title: "Sales Strategy Advising",
        description:
          "We advise on a sales strategy designed to drive volume, value and velocity, with a clear and actionable plan built around your specific project objectives.",
      },
      {
        title: "Marketing and Communication Strategy",
        description:
          "We craft a 360-degree communication approach covering all the marketing activities your project needs to cut through the market and connect with the right buyers.",
      },
      {
        title: "Campaign Design, Media Planning and Budgeting",
        description:
          "From concept to execution, we envision and deliver marketing campaigns within agreed budgets, with media planning that ensures your project stands out.",
      },
      {
        title: "Channel Partner Sourcing and Outreach",
        description:
          "We identify, meet and onboard channel partners to expand your project's reach, with no conflict of interest since we operate without a retail sales division.",
      },
      {
        title: "Customer Sourcing",
        description:
          "We generate prospective leads through ATL, BTL and digital activities, building a strong pipeline of qualified buyers for your project.",
      },
      {
        title: "Investment Advisory",
        description:
          "We conduct due diligence on investments, analyse correlations and returns, assist in investment execution and review ongoing investment performance.",
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
          "Our commercial advisory covers the full lifecycle of your asset, from absorption strategy and investor targeting to long-term revenue planning.",
      },
      {
        title: "Transaction Management",
        description:
          "Our transaction management services cover sale and leasing, working with clients to ensure the most successful acquisitions, disposals, lease renewals and commercial rent reviews.",
      },
      {
        title: "Investment Sales",
        description:
          "We provide private and institutional clients, equity capital providers, lenders and government agencies with high-quality brokerage services at optimal pricing and deal terms.",
      },
      {
        title: "Investment Advisory",
        description:
          "We conduct thorough due diligence, analyse investment correlations and returns, assist in execution and review performance on an ongoing basis.",
      },
      {
        title: "Joint Ventures",
        description:
          "We facilitate JV structures that bring together developers with real estate experience and capital providers, creating partnerships built for project success.",
      },
      {
        title: "Financial Modelling",
        description:
          "We analyse your commercial asset from both an equity and debt investor perspective, building detailed financial models to support sound investment decisions.",
      },
    ],
  },
  {
    title: "Retail Services",
    imageSrc: "/images/Buyer/services/retail.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "From tenant profiling and absorption strategy to long-term revenue planning, we help you unlock the full potential of your retail asset.",
      },
      {
        title: "Transaction Management",
        description:
          "We handle sale and leasing for retail assets, managing acquisitions, disposals, lease renewals and rent reviews to deliver the best possible outcomes for your project.",
      },
      {
        title: "Investment Sales",
        description:
          "We connect retail assets with the right investors, delivering institutional-quality brokerage with optimal pricing and deal terms through a holistic advisory approach.",
      },
      {
        title: "Investment Advisory",
        description:
          "We do the due diligence, analyse the numbers and assist you in making sound investment decisions while keeping a close eye on ongoing performance.",
      },
      {
        title: "Joint Ventures",
        description:
          "We structure JV arrangements that align developers with the right capital partners, ensuring your retail project is set up for long-term success.",
      },
      {
        title: "Financial Modelling",
        description:
          "We build detailed financial models for your retail asset, helping you understand returns from both an equity and debt perspective before committing capital.",
      },
    ],
  },
  {
    title: "Land Services",
    imageSrc: "/images/Buyer/services/land.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "Whether you are acquiring a site, planning a development or navigating approvals, our land advisory team brings the expertise to move your project forward.",
      },
      {
        title: "Site Selection and Analysis",
        description:
          "We identify the most suitable locations for your development, evaluating zoning, environmental impact, market potential and long-term value.",
      },
      {
        title: "Planning and Design",
        description:
          "We collaborate with architects, engineers and planners to create sustainable, high-value designs that make the most of every square foot.",
      },
      {
        title: "Permitting and Approvals",
        description:
          "We help you navigate the regulatory landscape, managing the approvals process to keep your project on track and on schedule.",
      },
      {
        title: "Project Management",
        description:
          "We oversee every aspect of the development from construction to final delivery, ensuring quality, adherence to timelines and accountability at every stage.",
      },
    ],
  },
  {
    title: "Financial Services",
    imageSrc: "/images/Buyer/services/market.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "The right financing structure can make or break a project. We help you find it.",
      },
      {
        title: "Retail Loan Advisory",
        description:
          "We advise on permanent financing options for the acquisition or recapitalisation of retail properties, helping you drive down costs and improve leverage and returns.",
      },
      {
        title: "Working Capital and Business Loans",
        description:
          "We help finance your everyday operations and short-term requirements, ensuring your business keeps moving without disruption.",
      },
      {
        title: "Construction Finance",
        description:
          "We arrange construction loans tailored to your project, with customised offerings built around your acquisition and construction cost structure.",
      },
    ],
  },
  {
    title: "Marketing Consulting Services",
    imageSrc: "/images/Buyer/services/market.svg",
    knowMoreHref: KNOW_MORE,
    items: [
      {
        title: "Introduction",
        description:
          "Great projects deserve great marketing. We bring the strategy, creativity and execution to make your project the one people talk about.",
      },
      {
        title: "Strategy and Brand Alliances",
        description:
          "We build collaborations with leading brands across the globe to enhance your product, elevate its positioning and add aspirational value to your project.",
      },
      {
        title: "Customer Experience Guidelines",
        description:
          "We help you build customer experience frameworks that drive satisfaction, strengthen retention and grow your reputation in the market.",
      },
      {
        title: "Campaign Design, Media Planning and Budgeting",
        description:
          "We envision, create and execute campaigns that make your project stand out, with smart media planning that delivers results within your budget.",
      },
      {
        title: "Channel Partner Sourcing and Outreach",
        description:
          "We identify and onboard the right channel partners for your project, expanding your reach with no conflict of interest.",
      },
      {
        title: "Customer Sourcing",
        description:
          "We generate qualified leads through a full mix of ATL, BTL and digital activities, building the pipeline your sales team needs to perform.",
      },
    ],
  },
];

/** Default right-hand panel before a tile is selected (Residential). */
export const DEVELOPER_SERVICES_GRID_DEFAULT = {
  accordionTitle: DEVELOPER_SERVICE_PANELS[0]!.title,
  accordionItems: DEVELOPER_SERVICE_PANELS[0]!.items,
  accordionImageSrc: DEVELOPER_SERVICE_PANELS[0]!.imageSrc,
  knowMoreHref: KNOW_MORE,
} as const;
