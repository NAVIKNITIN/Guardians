import { cn } from "@/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export const primaryCtaClassName = cn(
  base,
  "bg-brand-accent text-white border border-brand-accent hover:bg-brand-accent-hover hover:border-brand-accent-hover shadow-md hover:shadow-lg",
);

/** Marketing hero — solid black “Enquire now”. */
export const heroEnquireCtaClassName = cn(
  "inline-flex items-center justify-center gap-2 rounded-none border border-black bg-black px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-sm transition-colors duration-300 ease-out",
  "min-w-[200px] hover:bg-neutral-900",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
);
