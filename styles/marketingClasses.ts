import {
  arrowIconLinkIconClassName,
  arrowIconLinkSurfaceClassName,
  arrowIconTileClassName,
} from "@/components/ui/ArrowIconLink";
import { cn } from "@/utils/cn";

/**
 * Shared marketing layout + display classes.
 *
 * **Project theme UI (taupe `#8f8183` / `--color-brand-footer`):**
 * - **Arrow link tiles** — `arrowLinkTile`, `arrowLinkSurface`, `arrowLinkIcon` (source: `components/ui/ArrowIconLink.tsx`).
 * - **Scrollbars (page + overflow strips)** — `horizontalScroll` / `horizontalScrollTall` and root `<html class="scrollbar-brand">` in `app/layout.tsx` (see `app/globals.css`).
 */
export const marketingClasses = {
  sectionMuted:
    " bg-brand-background-muted ",
  section:
    " bg-brand-background ",
  sectionCompact:
    " bg-brand-background ",
  sectionPartners:
    " bg-brand-background-subtle ",
  sectionStats:
    " bg-brand-background-muted ",
  headingDisplay:
    "md:mt-26 qs-reg text-[clamp(1.75rem,3.5vw,3.125rem)] fs-5xl uppercase leading-tight ls-5 text-brand-text-primary mt-5 text-[#202225]",
  headingDisplayMd:
    "qs-reg text-[clamp(1.75rem,3.5vw,3.125rem)] uppercase leading-tight ls-5 text-brand-text-primary",
  headingDisplaySm:
    "qs-reg text-[clamp(1.5rem,2.5vw,2rem)]  uppercase leading-tight tracking-[0.08em] text-brand-text-primary",
  roundNavButton:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white text-brand-text-primary transition-colors hover:border-black/30",
  /** Matches `Container` horizontal padding without `max-w` — full-bleed section content alignment. */
  pageGutter:
    "px-5 xs:px-6 sm:px-8 md:px-10 tablet:px-12 lg:px-16 xl:px-24 2xl:px-32 xxl:px-44 xxxl:px-52 3xl:px-56",
  /** Same scale as `pageGutter` but left edge only — pair with full-bleed content on the right. */
  pageGutterLeft:
    "pl-5 pr-0 xs:pl-6 xs:pr-0 sm:pl-8 sm:pr-0 md:pl-10 md:pr-0 tablet:pl-12 tablet:pr-0 lg:pl-16 lg:pr-0 xl:pl-24 xl:pr-0 2xl:pl-32 2xl:pr-0 xxl:pl-44 xxl:pr-0 xxxl:pl-52 xxxl:pr-0 3xl:pl-56 3xl:pr-0",
  /** Full-bleed horizontal strips — taupe thumb via `.scrollbar-brand` in `globals.css` (see `/projects` filter styling). */
  horizontalScroll:
    "overflow-x-auto scroll-smooth overscroll-x-contain [-webkit-overflow-scrolling:touch] scrollbar-brand",
  /** Same as `horizontalScroll` with a thicker horizontal scrollbar (e.g. Our services card strip). */
  horizontalScrollTall:
    "overflow-x-auto scroll-smooth overscroll-x-contain [-webkit-overflow-scrolling:touch] scrollbar-brand-tall",

  /** Square taupe tile (base) — pair with `group-hover:brightness-90` inside a card `Link` if needed. */
  arrowLinkTile: arrowIconTileClassName,
  /** Tile + hover + focus ring — default for standalone `ArrowIconLink`. */
  arrowLinkSurface: arrowIconLinkSurfaceClassName,
  /** Arrow glyph size inside the tile. */
  arrowLinkIcon: arrowIconLinkIconClassName,
} as const;

export function marketingSection(
  variant: keyof Pick<
    typeof marketingClasses,
    | "section"
    | "sectionMuted"
    | "sectionCompact"
    | "sectionPartners"
    | "sectionStats"
  >,
  className?: string,
) {
  return cn(marketingClasses[variant], className);
}
