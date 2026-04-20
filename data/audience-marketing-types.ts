export type DeveloperServiceCard = {
  id: string;
  title: string;
  src: string;
  description: string;
};

export type OurWorkSlide = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
};

export type LandmarkProject = {
  id: string;
  brand: string;
  projectLine: string;
  projectName: string;
  location: string;
  bhkRange: string;
  imageSrc: string;
};

export type DeveloperStat =
  | { readonly label: string; readonly end: number; readonly format: "comma" }
  | {
      readonly label: string;
      readonly end: number;
      readonly format: "suffix";
      readonly suffix: string;
    };

export function formatDeveloperStatValue(stat: DeveloperStat, n: number): string {
  const v = Math.min(Math.max(0, Math.round(n)), stat.end);
  if (stat.format === "comma") return v.toLocaleString("en-US");
  return `${v}${stat.suffix}`;
}

export type PartnerLogo = { readonly src: string; readonly alt: string };

export type Testimonial = {
  id: string;
  brandLabel: string;
  quote: string;
  name: string;
  role: string;
  location: string;
};

export type AwardSlide = {
  id: string;
  company: string;
  achievement: string;
  year: string;
  imageSrc: string;
};

export type MarketingHeroContent = {
  /** `true` → “Looking To” + “Buy”; `false` → “Looking to” + “sell?” */
  isBuyer: boolean;
  backgroundImageSrc: string;
  body: string;
  enquireHref: string;
  enquireLabel: string;
  /** `aria-labelledby` target — must be unique per page */
  ariaHeadingId: string;
  /** Dark semibold segment — overrides default from `isBuyer` */
  headingLead?: string;
  /** Light accent segment — overrides default from `isBuyer` */
  headingAccent?: string;
};

export type ServicesBandContent = {
  sectionTitle: string;
  description: string;
  knowMoreHref: string;
  knowMoreLabel: string;
  cards: DeveloperServiceCard[];
};

export type OurWorkBandContent = {
  sectionTitle: string;
  slides: OurWorkSlide[];
  readMoreHref: string;
  readMoreLabel: string;
};

export type LandmarkSectionContent = {
  sectionTitle: string;
  tabOngoingLabel: string;
  tabCompletedLabel: string;
  ongoing: LandmarkProject[];
  completed: LandmarkProject[];
  ctaHref: string;
  ctaLabel: string;
};

export type StatsSectionContent = {
  metrics: readonly DeveloperStat[];
};

export type PartnersSectionContent = {
  headlineLine1: string;
  headlineLine2: string;
  row1: readonly PartnerLogo[];
  row2: readonly PartnerLogo[];
  closing: string;
  ctaHref: string;
  ctaLabel: string;
};

export type TestimonialsSectionContent = {
  sectionTitle: string;
  items: Testimonial[];
  viewMoreHref: string;
  viewMoreLabel: string;
};

export type AwardsSectionContent = {
  starIconSrc: string;
  headingLine1: string;
  headingLine2: string;
  slides: AwardSlide[];
};

/** Wide split banner: headline + CTA left, image right (e.g. buyer explore strip). */
export type MarketingBannerContent = {
  headline: string;
  imageSrc: string;
  ctaLabel: string;
  ctaHref: string;
  /** Optional — defaults to decorative empty alt */
  imageAlt?: string;
  /** `aria-labelledby` for the headline */
  ariaHeadingId?: string;
};

export type MarketingPageContent = {
  hero: MarketingHeroContent;
  services?: ServicesBandContent;
  ourWork?: OurWorkBandContent;
  landmark?: LandmarkSectionContent;
  stats?: StatsSectionContent;
  partners?: PartnersSectionContent;
  testimonials?: TestimonialsSectionContent;
  awards?: AwardsSectionContent;
  banner?: MarketingBannerContent;
};
