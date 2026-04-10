import { cn } from "@/utils/cn";

/** Shared marketing page surfaces & display type. */
export const marketingClasses = {
  sectionMuted:
    "border-t border-black/[0.06] bg-brand-background-muted py-16 sm:py-20 lg:py-24",
  section:
    "border-t border-black/[0.06] bg-brand-background py-16 sm:py-20 lg:py-24",
  sectionCompact:
    "border-t border-black/[0.06] bg-brand-background py-16 sm:py-20",
  sectionPartners:
    "border-t border-black/[0.06] bg-brand-background-subtle py-16 sm:py-20",
  sectionStats:
    "border-t border-black/[0.06] bg-brand-background-muted py-14 sm:py-16",
  headingDisplay:
    "font-qasbyne text-[clamp(1.75rem,3vw,2.5rem)] font-normal uppercase leading-tight tracking-[0.08em] text-brand-text-primary",
  headingDisplayMd:
    "font-qasbyne text-[clamp(1.75rem,3vw,2.35rem)] font-normal uppercase leading-tight tracking-[0.08em] text-brand-text-primary",
  headingDisplaySm:
    "font-qasbyne text-[clamp(1.5rem,2.5vw,2rem)] font-normal uppercase leading-tight tracking-[0.08em] text-brand-text-primary",
  roundNavButton:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white text-brand-text-primary transition-colors hover:border-black/30",
} as const;

export function marketingSection(
  variant: keyof Pick<
    typeof marketingClasses,
    | "section"
    | "sectionMuted"
    | "sectionCompact"
    | "sectionPartners"
    | "sectionStats"
  >,
  className?: string,
) {
  return cn(marketingClasses[variant], className);
}
