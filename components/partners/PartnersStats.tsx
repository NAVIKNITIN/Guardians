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

export const StatBlock = ({
  stat,
  index,
  isInView,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
}) => {
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
    <div className="flex w-full min-w-0 flex-col items-center justify-center bg-[#DADADB] px-4 py-8 text-center mt-10 md:mt-15 lg:mt-20">
      {/* Number — remove fixed fs-56/lh-24 so the clamp can actually scale on small screens */}
      <p className="n-bold text-[clamp(2rem,9vw,3.5rem)] leading-none tabular-nums text-[#8F8183] sm:text-[clamp(2.25rem,5vw,3.5rem)]">
        {formatted}
        {stat.suffix && (
          <span className="text-[clamp(1rem,5vw,1.75rem)]  leading-[20px]">
            {stat.suffix}
          </span>
        )}
        {stat.unit && (
          <span className="ml-1 text-[clamp(0.875rem,3.5vw,1.5rem)] sm:text-[clamp(1rem,2vw,1.5rem)]">
            {stat.unit}
          </span>
        )}
      </p>
      {/* Label */}
      <p className="mt-1 n-bold text-[0.75rem] uppercase leading-snug tracking-wide text-[#202225] sm:text-xs">
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
      className="bg-brand-background pt-4 pb-12 sm:pt-5 sm:pb-25"
      aria-label="Key metrics"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "grid gap-3 sm:gap-5",
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
