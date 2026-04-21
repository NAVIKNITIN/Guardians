import { cn } from "@/utils/cn";

/**
 * Home hero — one Tailwind scale for all viewports (mobile → 2xl).
 * Used by both `HeroSectionMobile` and `HeroSectionDesktop`; media queries follow the real viewport.
 */

/** H1 — matches prior max cap 70px; fluid between breakpoints. */
export const heroTitleTypography = cn(
  "w-full max-w-[760px] qs-reg not-italic uppercase tracking-[0.05em] text-[#202225] leading-none",
  "text-[clamp(1.5rem,calc(0.65rem+4.5vw),70px)]",
  "min-[400px]:tracking-[0.055em]",
  "sm:tracking-[0.05em]",
  "md:max-w-[min(760px,92vw)]",
  "lg:max-w-[760px]",
  "xl:tracking-[0.045em]",
  "2xl:tracking-[0.04em]",
);

/** Subtitle — shared body scale; margin top steps with layout. */
export const heroSubtitleTypography = cn(
  "mx-auto max-w-[42rem] n-reg lh-22 text-[#000000]",
  "text-sm sm:text-base",
  "mt-4 sm:mt-8 sm:leading-relaxed",
  "md:mt-7 md:text-[17px] md:leading-relaxed",
  "lg:mt-4 lg:text-[18px] lg:leading-normal",
  "xl:mt-5 xl:text-[19px]",
  "2xl:mt-6 2xl:text-[20px]",
);

/** Mobile / tablet hero shell (< `lg` branch). */
export const heroSectionShellMobile = cn(
  "relative overflow-hidden bg-[#E4E4E4]",
  "min-h-[min(35rem,92svh)] sm:min-h-[560px] md:min-h-[580px]",
  "pt-8 pb-12 sm:pt-14 sm:pb-14 md:pt-12 md:pb-16",
);

/** Desktop hero shell (`lg+` branch). */
export const heroSectionShellDesktop = cn(
  "relative overflow-hidden bg-[#E4E4E4]",
  "min-h-[540px] xl:min-h-[560px] 2xl:min-h-[580px]",
  "pt-10 pb-16 xl:pt-12 xl:pb-20 2xl:pb-24",
);

/** Inner column padding — mobile/tablet. */
export const heroInnerColumnMobile = cn(
  "mx-auto flex min-w-0 max-w-[760px] flex-col items-center text-center",
  "px-2 min-[400px]:px-3 sm:px-0",
);

/** Inner column — desktop. */
export const heroInnerColumnDesktop = cn(
  "mx-auto flex min-w-0 max-w-[760px] flex-col items-center px-0 text-center",
);

/** CTA row spacing under subtitle. */
export const heroCtaRowMobile = cn("mt-8 flex w-full justify-center sm:mt-10 md:mt-11");

export const heroCtaRowDesktop = cn(
  "mt-10 flex w-full justify-center xl:mt-11 2xl:mt-12",
);

export const heroContainerTopMobile = "pt-4 sm:pt-8 md:pt-9";

export const heroContainerTopDesktop = "pt-10 xl:pt-11 2xl:pt-12";

/** Desktop “Know More” — no full-width stretch; scales slightly on xl / 2xl. */
export const heroDesktopKnowMoreButton = cn(
  "btn-1 inline-flex w-auto shrink-0 max-h-[55px] rounded-none border-0 n-bold whitespace-nowrap",
  "text-[20px] px-[50px] py-5",
  "xl:text-[21px] xl:px-[52px] xl:py-[1.35rem]",
  "2xl:text-[22px] 2xl:px-14 2xl:py-6",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48183]",
);
