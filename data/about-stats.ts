import type { DeveloperStat, StatsSectionContent } from "./audience-marketing-types";

/**
 * About “Brand Promise” block: same figures as developer marketing, order matches design
 * (row 2: Units Sold | Projects Delivered).
 */
export const ABOUT_STATS_CONTENT = {
  metrics: [
    {
      label: "Cr. Worth of Inventory Sold",
      value: "37,850 Cr+",
      countUp: { end: 37850, suffix: " Cr+" },
    },
    {
      label: "Sq. Ft. Area Developed",
      value: "17.3 Million+",
      countUp: { end: 17.3, unit: " Million+", decimals: 1 },
    },
    {
      label: "Units Sold",
      value: "29,669",
      countUp: { end: 29669 },
    },
    {
      label: "Projects Delivered",
      value: "307+",
      countUp: { end: 307, suffix: "+" },
    },
  ] as const satisfies readonly DeveloperStat[],
} satisfies StatsSectionContent;
