import { DeveloperStatsSection } from "@/components/developer/DeveloperStatsSection";
import { ABOUT_STATS_CONTENT } from "@/data/about-stats";
import type { StatsSectionContent } from "@/data/audience-marketing";

type AboutStatsGridProps = {
  /** Defaults to `ABOUT_STATS_CONTENT` (order: inventory / sq ft | units / projects). */
  content?: StatsSectionContent;
};

/**
 * About page stats: 2×2 grid (two per row), spacing and type tuned for the Brand Promise column.
 */
export function AboutStatsGrid({
  content = ABOUT_STATS_CONTENT,
}: AboutStatsGridProps) {
  return (
    <div className="@container w-[40%] min-w-0 max-w-full absolute right-0 md:right-10 pr-4%">
      <DeveloperStatsSection
        layout="inline"
        inlineColumns={2}
        content={content}
      />
    </div>
  );
}
