import { DeveloperStatsSection } from "@/components/developer/DeveloperStatsSection";
import { ABOUT_STATS_CONTENT } from "@/data/about-stats";
import type { StatsSectionContent } from "@/data/audience-marketing";
import { aboutStatsGridOuter } from "./aboutStatsResponsiveClasses";

type AboutStatsGridProps = {
  /** Defaults to `ABOUT_STATS_CONTENT` (order: inventory / sq ft | units / projects). */
  content?: StatsSectionContent;
};

/**
 * About page stats: 2×2 grid (two per row), spacing and type tuned for the Brand Promise column.
 * Responsive shell lives in `aboutStatsResponsiveClasses.ts`.
 */
export function AboutStatsGrid({
  content = ABOUT_STATS_CONTENT,
}: AboutStatsGridProps) {
  return (
    <div className={aboutStatsGridOuter}>
      <DeveloperStatsSection
        layout="inline"
        inlineColumns={2}
        centerOnMobile
        content={content}
      />
    </div>
  );
}
