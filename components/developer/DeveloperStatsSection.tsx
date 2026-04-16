"use client";

import {
  formatDeveloperStatValue,
  type DeveloperStat,
  type StatsSectionContent,
} from "@/data/audience-marketing";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function StatFigure({
  stat,
  index,
  isInView,
}: {
  stat: DeveloperStat;
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.end, isInView, {
    duration: 1800,
    delay: index * 75,
  });
  const text = formatDeveloperStatValue(stat, count);

  return (
    <p
      className={cn(
        "n-book  text-3xl fw-200 tabular-nums text-brand-footer tracking-[-0.03em] sm:text-4xl md:text-[clamp(2.25rem,4vw,2.85rem)] md:tracking-[-0.04em]",
      )}
    >
      {text}
    </p>
  );
}

export function DeveloperStatsSection({
  content,
}: {
  content: StatsSectionContent;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const metrics = content.metrics;

  return (
    // <SectionSurface variant="stats" className="bg-transparent" aria-label="Key metrics">
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4">
      {metrics.map((stat, idx) => (
        <div
          key={stat.label}
          className={cn(
            "flex min-w-0 flex-col items-center justify-center text-center px-14 sm:px-16 lg:px-20 md:border-l md:border-black/[0.18] h-5 mb-8 md:mb-12 lg:mb-23 mt-2 md:mt-3 lg:mt-5",
          )}
        >
          <StatFigure stat={stat} index={idx} isInView={isInView} />
          <p className=" fs-10 lh-20 n-bold  uppercase leading-snug tracking-wide text-brand-text-primary sm:max-w-[12rem] sm:text-xs">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
    // </SectionSurface>
  );
}
