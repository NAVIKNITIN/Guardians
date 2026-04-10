/** Copy & media for `/developer` — replace with CMS later. */

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

export const STATS = [
  { value: "37,850", label: "Cr. Worth of Inventory Sold" },
  { value: "2 Million+", label: "Sq. Ft. Area Developed" },
  { value: "307+", label: "Projects Delivered" },
  { value: "29,669", label: "Units Sold" },
] as const;

export const PARTNER_LOGOS_ROW1 = [
  "Marathon",
  "Sunteck",
  "Piramal Realty",
  "Sheth Creators",
  "Guru Prerna",
  "Integrated",
] as const;

export const PARTNER_LOGOS_ROW2 = [
  "Crystal",
  "Crescent",
  "Ashford",
  "Ashish Group",
  "ID Group",
  "Sonam",
] as const;

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
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Priya Shah",
    role: "Head of Sales",
    location: "Mumbai",
  },
  {
    id: "3",
    brandLabel: "Sunteck",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "Rahul Verma",
    role: "Director — Projects",
    location: "Pune",
  },
];

export type AwardSlide = {
  id: string;
  company: string;
  achievement: string;
  year: string;
  imageSrc: string;
};

export const AWARD_SLIDES: AwardSlide[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  company: "[COMPANY NAME HERE]",
  achievement: "[Achievement here]",
  year: "[YEAR RECEIVED]",
  imageSrc:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
}));
