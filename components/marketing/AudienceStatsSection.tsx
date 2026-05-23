"use client";

import {
  DeveloperStatsSection,
  type DeveloperStatsSectionProps,
} from "@/components/developer/DeveloperStatsSection";

/**
 * Stats band for audience marketing pages (buyer / developer).
 * Centers figures and labels on viewports below `lg` by default.
 */
export function AudienceStatsSection({
  centerOnMobile = true,
  ...props
}: DeveloperStatsSectionProps) {
  return <DeveloperStatsSection {...props} centerOnMobile={centerOnMobile} />;
}
