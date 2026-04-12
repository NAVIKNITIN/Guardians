/** Copy & media for `/developer` — replace with CMS later. */

export type DeveloperServiceCard = {
  id: string;
  title: string;
  src: string;
};

/** Service tiles for the “Our services” band — horizontal scroll supports any length. */
export const OUR_SERVICES_CARDS: DeveloperServiceCard[] = [
  {
    id: "residential",
    title: "Residential",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "business",
    title: "Business solution",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "market",
    title: "Market intelligence",
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "partner",
    title: "Partner network",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "institutional",
    title: "Institutional sales",
    src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "advisory",
    title: "Structured advisory",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
];

export type OurWorkSlide = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
};

export const OUR_WORK_SLIDES: OurWorkSlide[] = [
  {
    id: "1",
    title: "The Guardians Assists with Elme Communities’ Evolution.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    imageSrc:
      "https://images.unsplash.com/photo-1486325202020-763d971de886?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    title: "Strategic positioning for mixed-use corridors.",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageSrc:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Institutional sales velocity and channel design.",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    imageSrc:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 4),
    title: `Featured collaboration ${i + 4}`,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=${70 + i}`,
  })),
];

export type LandmarkProject = {
  id: string;
  brand: string;
  projectLine: string;
  projectName: string;
  location: string;
  imageSrc: string;
};

export const LANDMARK_ONGOING: LandmarkProject[] = [
  {
    id: "ms",
    brand: "MARATHON",
    projectLine: "MARATHON GROUP'S",
    projectName: "MONTE SOUTH",
    location: "Byculla, Mumbai, Maharashtra | 2, 2.5, 3 & 3.5 BHK Residences",
    imageSrc:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "p2",
    brand: "SKYLINE",
    projectLine: "RESIDENTIAL TOWER",
    projectName: "ELEVATE ONE",
    location: "Western Suburbs, Mumbai",
    imageSrc:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "p3",
    brand: "URBAN",
    projectLine: "MIXED-USE",
    projectName: "HARBOUR VIEW",
    location: "Navi Mumbai",
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
];

export const LANDMARK_COMPLETED: LandmarkProject[] = LANDMARK_ONGOING.map(
  (p) => ({
    ...p,
    id: `${p.id}-done`,
    projectName: `${p.projectName} — delivered`,
  }),
);

export type DeveloperStat =
  | { readonly label: string; readonly end: number; readonly format: "comma" }
  | {
      readonly label: string;
      readonly end: number;
      readonly format: "suffix";
      readonly suffix: string;
    };

export const STATS = [
  { label: "Cr. Worth of Inventory Sold", end: 37850, format: "comma" },
  {
    label: "Sq. Ft. Area Developed",
    end: 2,
    format: "suffix",
    suffix: " Million+",
  },
  { label: "Projects Delivered", end: 307, format: "suffix", suffix: "+" },
  { label: "Units Sold", end: 29669, format: "comma" },
] as const satisfies readonly DeveloperStat[];

export function formatDeveloperStatValue(stat: DeveloperStat, n: number): string {
  const v = Math.min(Math.max(0, Math.round(n)), stat.end);
  if (stat.format === "comma") return v.toLocaleString("en-US");
  return `${v}${stat.suffix}`;
}

const partnerLogoSrc = (filename: string) =>
  `/images/Developer/partners/${encodeURIComponent(filename)}`;

export type PartnerLogo = { readonly src: string; readonly alt: string };

/** Filenames under `public/images/Developer/partners` — two rows of six. */
export const PARTNER_LOGOS_ROW1: readonly PartnerLogo[] = [
  { src: partnerLogoSrc("Group 32.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 33.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 34.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 36.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 38.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 39.svg"), alt: "Partner logo" },
];

export const PARTNER_LOGOS_ROW2: readonly PartnerLogo[] = [
  { src: partnerLogoSrc("Group 42.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 44.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 47.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 48.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 49.svg"), alt: "Partner logo" },
  { src: partnerLogoSrc("Group 50.svg"), alt: "Partner logo" },
];

export type Testimonial = {
  id: string;
  brandLabel: string;
  quote: string;
  name: string;
  role: string;
  location: string;
};

export const TESTIMONIALS: Testimonial[] = [
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
];

export type AwardSlide = {
  id: string;
  company: string;
  achievement: string;
  year: string;
  imageSrc: string;
};

/** First award uses the hero trophy asset; others rotate through local `/public/images` art. */
const AWARD_OTHER_IMAGES = [
  "/images/ourwork.svg",
  "/images/developer-hero.svg",
  "/images/Home/Banner1.svg",
  "/images/Developer/ourservices/1.svg",
  "/images/Developer/ourservices/2.svg",
  "/images/Developer/Group%204.svg",
  "/images/image_1.svg",
  "/images/Buyer/BuyerVector.svg",
] as const;

export const AWARD_SLIDES: AwardSlide[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  company: "[COMPANY NAME HERE]",
  achievement: "[Achievement here]",
  year: "[YEAR RECEIVED]",
  imageSrc:AWARD_OTHER_IMAGES[i % AWARD_OTHER_IMAGES.length],
}));
