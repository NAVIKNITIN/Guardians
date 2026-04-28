import { cn } from "@/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white border-0 btn-grad focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export const primaryCtaClassName = base;

/**
 * Marketing hero CTA — dark Figma bar (`#1D2124` via `btn-grad--dark`), same coral gradient
 * sweep on hover as other CTAs.
 */
export const heroEnquireCtaClassName = cn(
  "inline-flex min-h-[52px] w-full max-w-full items-center justify-center gap-4 rounded-none border-0 btn-grad--dark px-5 text-center uppercase tracking-[0.1em] text-white sm:h-[55px] sm:w-auto sm:min-w-[16rem] sm:px-8",
  "text-xs n-bold sm:fs-18 sm:ls-8",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
);

/**
 * Our Work — full-width black bar, flat, white label + arrow (Figma).
 * Use with `MarketingEnquireLink` `variant="ourWork"`. Set `min-h` / width overrides in `className` at the call site.
 */
export const ourWorkReadMoreLinkClassName = cn(
  "flex w-full min-w-0 items-center justify-center gap-4 rounded-none border-0 btn-grad--dark",
  "px-6 py-0 text-[12px] leading-none n-bold uppercase tracking-[0.2em] text-white",
  "shadow-none",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
);
