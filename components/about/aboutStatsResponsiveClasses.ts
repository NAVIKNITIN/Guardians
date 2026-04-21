import { cn } from "@/utils/cn";

/**
 * About page — stats block beside “Revolutionising real estate…” (`AboutStatsGrid`).
 * Mobile / tablet: full-width, centered, padded. `lg+`: anchored in the right column (matches two-column grid).
 */

export const aboutStatsGridOuter = cn(
  "@container relative w-full min-w-0",
  /* Stacked layout */
  "mx-auto max-w-lg px-4 py-6 sm:max-w-xl sm:px-6 sm:py-8 md:max-w-2xl md:px-8",
  /* Laptop+: right rail — was `absolute right-0 md:right-10 w-[40%]` + invalid `pr-4%` */
  "lg:mx-0 lg:max-w-none lg:px-0 lg:py-0",
  "lg:absolute lg:right-10 lg:top-0 lg:w-[40%]",
  "xl:right-12 xl:w-[38%]",
  "2xl:right-16 2xl:w-[min(36%,32rem)]",
  "lg:pr-[4%] xl:pr-[5%] 2xl:pr-[6%]",
);
