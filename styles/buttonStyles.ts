import { cn } from "@/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export const primaryCtaClassName = cn(
  base,
  "bg-brand-accent text-white border border-brand-accent hover:bg-brand-accent-hover hover:border-brand-accent-hover shadow-md hover:shadow-lg",
);

/**
 * Marketing hero CTA — Figma Auto Layout: row, gap 20px, padding 20px × 50px,
 * align middle-left (`items-center` + `justify-start`), hug W/H, fill `#161616`, radius 0.
 */
export const heroEnquireCtaClassName = cn(
  "inline-flex items-center justify-center gap-5 rounded-none border border-[#161616] bg-[#161616] w-[306.01px] h-[55px] uppercase tracking-[0.1em] text-white transition-colors duration-300 ease-out",
  "hover:bg-neutral-900 fs-18 n-bold ls-8",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black h-[55px]",
  "w-[306.01px]"
);

/**
 * Our Work — full-width black bar, flat, white label + arrow (Figma).
 * Use with `MarketingEnquireLink` `variant="ourWork"`. Set `min-h` / width overrides in `className` at the call site.
 */
export const ourWorkReadMoreLinkClassName = cn(
  "flex w-full min-w-0 items-center justify-center gap-4 rounded-none border-0 bg-black",
  "px-6 py-0 text-[12px] leading-none n-bold uppercase tracking-[0.2em] text-white",
  "shadow-none transition-colors duration-300 ease-out hover:bg-[#1a1a1a]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
);
