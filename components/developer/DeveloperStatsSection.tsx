import { STATS } from "@/data/developer-page";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { cn } from "@/utils/cn";

export function DeveloperStatsSection() {
  return (
    <SectionSurface variant="stats" aria-label="Key metrics">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center px-3 py-8 text-center sm:px-6",
              idx % 2 === 1 && "border-l border-black/[0.08]",
              idx >= 2 && "border-t border-black/[0.08] md:border-t-0",
              idx > 0 && "md:border-l md:border-black/[0.08]",
            )}
          >
            <p className="font-sans text-3xl font-light tabular-nums tracking-tight text-brand-text-primary sm:text-4xl md:text-[2.75rem]">
              {stat.value}
            </p>
            <p className="mt-2 max-w-[12rem] text-[11px] font-semibold uppercase leading-snug tracking-wide text-brand-text-secondary sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SectionSurface>
  );
}
