import { cn } from "@/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export const primaryCtaClassName = cn(
  base,
  "bg-brand-accent text-white border border-brand-accent hover:bg-brand-accent-hover hover:border-brand-accent-hover shadow-md hover:shadow-lg",
);

/** Marketing hero — solid black “Enquire now”. */
export const heroEnquireCtaClassName = cn(
  "inline-flex items-center justify-center gap-4 rounded-none border border-black bg-black px-8 py-3.5 text-[11px]  uppercase tracking-[0.22em] text-white shadow-sm transition-colors duration-300 ease-out",
  "min-w-[200px] hover:bg-neutral-900",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
);

/**
 * Our Work — full-width black bar, flat, white label + arrow (Figma).
 * Use with `MarketingEnquireLink` `variant="ourWork"`.
 */
export const ourWorkReadMoreLinkClassName = cn(
  "flex w-full min-w-0 items-center justify-center gap-4 rounded-none border-0 bg-black",
  "min-h-[52px] px-6 py-0 text-[12px] leading-none n-bold uppercase tracking-[0.2em] text-white",
  "shadow-none transition-colors duration-300 ease-out hover:bg-[#1a1a1a]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
);
