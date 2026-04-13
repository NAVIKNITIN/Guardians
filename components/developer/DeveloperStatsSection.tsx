"use client";

import {
  formatDeveloperStatValue,
  type DeveloperStat,
  type StatsSectionContent,
} from "@/data/audience-marketing";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { useCountUp } from "@/hooks/useCountUp";
import { nexaFont } from "@/styles/fonts";
import { cn } from "@/utils/cn";
import { useInView } from "framer-motion";
import { useRef } from "react";

function StatFigure({
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
        nexaFont.className,
        "font-nexa text-3xl font-medium tabular-nums text-brand-footer tracking-[-0.03em] sm:text-4xl md:text-[clamp(2.25rem,4vw,2.85rem)] md:tracking-[-0.04em]",
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
    <SectionSurface variant="stats" aria-label="Key metrics">
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4">
        {metrics.map((stat, idx) => (
          <div
            key={stat.label}
            className={cn(
              "flex min-w-0 flex-col items-center px-2 py-6 text-center sm:px-6 sm:py-8",
              idx % 2 === 1 && "border-l border-black/[0.08]",
              idx >= 2 && "border-t border-black/[0.08] md:border-t-0",
              idx > 0 && "md:border-l md:border-black/[0.08]",
            )}
          >
            <StatFigure stat={stat} index={idx} isInView={isInView} />
            <p className="mt-2 max-w-[11rem] text-[10px] font-semibold uppercase leading-snug tracking-wide text-brand-text-primary sm:max-w-[12rem] sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SectionSurface>
  );
}
