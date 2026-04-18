import { cn } from "@/utils/cn";

/** Shared marketing page surfaces & display type. */
export const marketingClasses = {
  sectionMuted:
    " bg-brand-background-muted py-16 sm:py-20 lg:py-24",
  section:
    " bg-brand-background py-16 sm:py-20 lg:py-24",
  sectionCompact:
    " bg-brand-background py-16 sm:py-20",
  sectionPartners:
    " bg-brand-background-subtle py-16 sm:py-20",
  sectionStats:
    " bg-brand-background-muted py-14 sm:py-16",
  headingDisplay:
    "md:mt-20 qs-reg text-[clamp(1.75rem,3.5vw,3.125rem)] fs-5xl uppercase leading-tight ls-5 text-brand-text-primary mt-5",
  headingDisplayMd:
    "qs-reg text-[clamp(1.75rem,3.5vw,3.125rem)] uppercase leading-tight ls-5 text-brand-text-primary",
  headingDisplaySm:
    "qs-reg text-[clamp(1.5rem,2.5vw,2rem)]  uppercase leading-tight tracking-[0.08em] text-brand-text-primary",
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
