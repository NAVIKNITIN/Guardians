import type { DeveloperStat, StatsSectionContent } from "./audience-marketing-types";

/**
 * About “Brand Promise” block: same figures as developer marketing, order matches design
 * (row 2: Units Sold | Projects Delivered).
 */
export const ABOUT_STATS_CONTENT = {
  metrics: [
    { label: "Cr. Worth of Inventory Sold", end: 37850, format: "comma" },
    {
      label: "Sq. Ft. Area Developed",
      end: 2,
      format: "suffix",
      suffix: " Million+",
    },
    { label: "Units Sold", end: 29669, format: "comma" },
    { label: "Projects Delivered", end: 307, format: "suffix", suffix: "+" },
  ] as const satisfies readonly DeveloperStat[],
} satisfies StatsSectionContent;
