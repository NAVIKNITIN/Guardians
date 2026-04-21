import { cn } from "@/utils/cn";

/** Page root */
export const aboutPageRoot = cn(
  "min-w-0 bg-white text-[#2a2626]",
  "mb-16 sm:mb-20 md:mb-24 lg:mb-25 xl:mb-28",
);

/** Hero: image + headline — fluid height on small viewports, fixed on large. */
export const aboutHeroSection = cn(
  "border-b border-[#d8d2d2] bg-[linear-gradient(180deg,#fbfbfb_0%,#f7f5f5_50%,#efeded_100%)]",
  "lg:h-[650px]",
);

export const aboutHeroImageFrame = cn(
  "relative overflow-hidden",
  "min-h-[min(22rem,72svh)] sm:min-h-[380px] md:min-h-[480px] lg:h-[650px] lg:min-h-0",
);

export const aboutHeroTitle = cn(
  "break-words px-1 qs-reg uppercase leading-[0.94] tracking-[0.02em]",
  "text-[clamp(1.75rem,calc(0.9rem+5vw),4.375rem)]",
  "sm:text-[clamp(2rem,calc(1rem+5.5vw),4.5rem)]",
  "md:text-[clamp(2.25rem,calc(1.1rem+5vw),4.75rem)]",
  "lg:text-[clamp(2.5rem,1.5rem+3vw,4.375rem)]",
  "xl:text-[clamp(3rem,2rem+2vw,4.5rem)]",
  "2xl:text-[4.375rem]",
);

export const aboutHeroSubtitle = cn(
  "mx-auto max-w-[min(1180px,100%)] text-[#000000] n-book",
  "mt-3 sm:mt-4 md:mt-5",
  "text-[clamp(0.875rem,0.35rem+2vw,1.125rem)] leading-[1.2]",
  "sm:text-[15px] sm:leading-[1.15]",
  "md:text-base md:leading-[1.15]",
  "lg:fs-18 lg:lh-22",
);

export const aboutHeroHeadingSlot = cn(
  "absolute inset-x-0 text-center",
  "top-[5%] sm:top-[6%] md:top-[6.5%] lg:top-[7.5%]",
  "pt-4 sm:pt-6 md:pt-8 lg:pt-25",
);

/** Brand Promise block */
export const aboutBrandPromiseSection = cn(
  "mt-8 py-10 sm:mt-10 sm:py-12 md:py-14 lg:mt-10 lg:py-10 xl:py-12",
);

export const aboutBrandPromiseH2 = cn(
  "text-center qs-reg uppercase tracking-[0.03em] text-[#2a2626]",
  "text-[clamp(1.65rem,calc(1rem+2.4vw),3rem)]",
  "sm:text-[clamp(1.85rem,calc(1.05rem+2.5vw),3rem)]",
  "md:text-[clamp(2rem,calc(1.1rem+2.2vw),3rem)]",
  "lg:text-[clamp(1.9rem,2.6vw,3rem)]",
);

export const aboutBrandPromiseIntroBox = cn("mt-2 bg-white py-3 sm:py-4 lg:py-5");

export const aboutBrandPromiseParagraph = cn(
  "leading-[1.38] text-[#3c393a]",
  "text-[clamp(0.92rem,calc(0.85rem+0.35vw),1.05rem)]",
  "sm:text-[clamp(0.95rem,0.9rem+0.4vw,1.05rem)]",
  "md:text-[clamp(0.98rem,0.95rem+0.25vw,1.0625rem)]",
);

export const aboutBrandPromiseParagraphWrap = cn(
  "mx-auto max-w-[min(1180px,100%)] text-center",
  "px-4 sm:px-6 md:px-10 lg:px-4",
  "md:mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl",
);

/** “Revolutionising…” + stats row */
export const aboutRevolutionGrid = cn(
  "grid items-start justify-items-center gap-y-8 text-center",
  "mt-16 sm:mt-20 sm:gap-y-10 md:mt-28 md:gap-y-12 lg:mt-36 lg:grid-cols-[2fr_3fr] lg:justify-items-stretch lg:gap-x-12 lg:gap-y-0 lg:text-left xl:mt-40 xl:gap-x-16 2xl:mt-44 2xl:gap-x-20",
);

export const aboutRevolutionHeading = cn(
  "mx-auto n-bold font-semibold leading-[1.08] tracking-[-0.03em] text-[#161616] lg:mx-0",
  "text-[clamp(1.5rem,calc(1rem+2vw),2.6rem)]",
  "sm:text-[clamp(1.6rem,calc(1.05rem+2.1vw),2.6rem)]",
  "md:text-[clamp(1.72rem,calc(1.1rem+2vw),2.6rem)]",
);

export const aboutRevolutionBody = cn(
  "mx-auto text-[#161616] nexa-bold lg:mx-0",
  "mt-6 sm:mt-7 md:mt-8",
  "max-w-[min(355px,100%)] sm:max-w-md md:max-w-lg lg:max-w-[355px]",
  "text-[clamp(0.8125rem,0.75rem+0.35vw,1rem)] leading-[1.28]",
  "sm:text-[14px] md:text-[15px] lg:text-[14px] fs-16 lh-20",
);

/** Leadership */
export const aboutLeadershipSection = cn("py-10 sm:py-14 lg:py-25");

export const aboutLeadershipH2 = cn(
  "qs-reg uppercase tracking-[0.05em] text-[#000000] mb-3 sm:mb-4 md:mb-5",
  "text-[clamp(1.75rem,calc(1rem+2.5vw),3.125rem)]",
  "sm:text-[clamp(2rem,calc(1.1rem+2.4vw),3.125rem)]",
  "md:text-[clamp(2.25rem,calc(1.2rem+2.2vw),3.125rem)]",
  "lg:text-[clamp(2.5rem,2vw,3.125rem)]",
);

/** Partner brands */
export const aboutBrandsSection = cn("bg-[#F2F2F2] py-10 sm:py-14 lg:py-12 xl:py-16");

export const aboutBrandsEyebrow = cn(
  "text-center n-bold uppercase leading-none tracking-[0.1em] text-[#161616]",
  "text-[clamp(0.8rem,calc(0.7rem+0.5vw),1.25rem)]",
  "sm:text-[0.9rem] md:text-[0.95rem] lg:fs-20",
);

export const aboutBrandsGrid = cn(
  "mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3 md:gap-[15px] lg:mt-12 xl:gap-6",
);

export const aboutBrandCardShell = cn(
  "flex w-full min-w-0 max-w-full items-center justify-center border border-[#ece7e7] bg-white text-center",
  "min-h-[160px] px-4 py-6 sm:min-h-[172px] sm:px-6 sm:py-7 md:min-h-[182px] md:px-6 md:py-8 xl:min-h-[190px]",
);

export const aboutBrandsCtaWrap = cn("mt-10 flex justify-center sm:mt-12 lg:mt-14");
