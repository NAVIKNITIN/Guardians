import { cn } from "@/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export const primaryCtaClassName = cn(
  base,
  "bg-brand-accent text-white border border-brand-accent hover:bg-brand-accent-hover hover:border-brand-accent-hover shadow-md hover:shadow-lg",
);
