import type { DeveloperStat, StatsSectionContent } from "./audience-marketing-types";

/**
 * About “Brand Promise” block: same figures as developer marketing, order matches design
 * (row 2: Units Sold | Projects Delivered).
 */
export const ABOUT_STATS_CONTENT = {
  metrics: [
    { label: "Cr. Worth of Inventory Sold", value: "37,850 Cr+" },
    { label: "Sq. Ft. Area Developed", value: "2 Million+" },
    { label: "Units Sold", value: "29,669" },
    { label: "Projects Delivered", value: "307+" },
  ] as const satisfies readonly DeveloperStat[],
} satisfies StatsSectionContent;
