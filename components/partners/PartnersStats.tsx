"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";
import { useInView } from "framer-motion";
import { useRef } from "react";

type StatItem = {
  /** Numeric value for count-up animation */
  end: number;
  /** Text rendered before the animated number (optional) */
  prefix?: string;
  /** Text rendered after the animated number */
  suffix?: string;
  /** Smaller suffix (unit label) rendered inline after the main number */
  unit?: string;
  label: string;
};

const STATS: StatItem[] = [
  {
    end: 250,
    suffix: "+",
    label: "Projects Completed Successfully",
  },
  {
    end: 52565,
    unit: " sq.ft.",
    label: "Property Sold",
  },
  {
    end: 100,
    unit: " units",
    label: "Sold Under 10 Days",
  },
];

function StatBlock({
  stat,
  index,
  isInView,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.end, isInView, {
    duration: 1800,
    delay: index * 100,
  });
  const value = Math.min(Math.round(count), stat.end);
  const formatted =
    stat.end >= 10000
      ? value.toLocaleString("en-US")
      : String(value);

  return (
    <div className="flex flex-col items-center justify-center bg-[#DADADB] px-6 py-10 text-center sm:py-12">
      {/* Number */}
      <p className="n-reg  text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-none tabular-nums text-[#8F8183]">
        {formatted}
        {stat.suffix && (
          <span className="text-[clamp(2.25rem,5vw,3.5rem)]">{stat.suffix}</span>
        )}
        {stat.unit && (
          <span className="ml-1 text-[clamp(1.25rem,2.5vw,2rem)] font-bold">
            {stat.unit}
          </span>
        )}
      </p>
      {/* Label */}
      <p className="mt-3 n-reg  text-[11px] font-bold uppercase leading-snug tracking-wide text-[#202225] sm:text-xs">
        {stat.label}
      </p>
    </div>
  );
}

export function PartnersStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <section
      className="border-t border-black/[0.06] bg-brand-background py-16 sm:py-20"
      aria-label="Key metrics"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "grid gap-4 sm:gap-5",
            "grid-cols-1 sm:grid-cols-3",
          )}
        >
          {STATS.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
