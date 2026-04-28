import { cn } from "@/utils/cn";

/**
 * About page — stats block beside “Revolutionising real estate…” (`AboutStatsGrid`).
 * Mobile / tablet: full-width, centered, padded. `lg+`: anchored in the right column (matches two-column grid).
 */

export const aboutStatsGridOuter = cn(
  "@container w-full min-w-0 max-w-full",
  "lg:ml-auto",
);
