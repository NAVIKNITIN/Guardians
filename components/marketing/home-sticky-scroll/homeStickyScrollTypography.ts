import { cn } from "@/utils/cn";

/**
 * Desktop sticky copy (`md`+): four lines, scales from tablet to ultrawide.
 * Caps at 50px on `2xl` (design was 56px before the size reduction).
 */
export const HOME_STICKY_DESKTOP_TYPOGRAPHY = cn(
  "tracking-[-0.01em]",
  "md:text-[clamp(1.375rem,0.65rem+2.5vw,2.625rem)] md:leading-[1.22]",
  "lg:text-[38px] lg:leading-[1.22]",
  "xl:text-[40px] xl:leading-[1.2]",
  "2xl:text-[45px] 2xl:leading-[1.18]",
);
