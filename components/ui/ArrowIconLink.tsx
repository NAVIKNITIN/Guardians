import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

/** Square black tile sizing + base fill — no interactive states (use inside a card `Link` with `group-hover:*`). */
export const arrowIconTileClassName =
  "inline-flex h-16 w-24 shrink-0 items-center justify-center bg-black text-white transition-colors sm:h-15 sm:w-20 lg:h-[65px] lg:w-[65px]";

/** Full `ArrowIconLink` surface: tile + hover + focus ring. */
export const arrowIconLinkSurfaceClassName = cn(
  arrowIconTileClassName,
  "hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
);

export const arrowIconLinkIconClassName = "h-6 w-6 sm:h-5 sm:w-5";

export type ArrowIconLinkProps = Omit<
  ComponentProps<typeof Link>,
  "children" | "className"
> & {
  className?: string;
  /** Required: icon-only control */
  "aria-label": string;
};

/** Standalone link: black square + arrow (e.g. service cards). */
export function ArrowIconLink({ className, ...props }: ArrowIconLinkProps) {
  return (
    <Link {...props} className={cn(arrowIconLinkSurfaceClassName, className)}>
      <IconArrowUpRight className={arrowIconLinkIconClassName} />
    </Link>
  );
}
