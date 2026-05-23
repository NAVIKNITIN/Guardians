import { cn } from "@/utils/cn";

/** Shared outline CTA sizing for buyer/developer marketing bands (mobile compact; desktop from `sm`). */
export const audienceMarketingOutlineCtaClass = cn(
  "inline-flex w-fit max-w-full shrink-0 uppercase",
  "h-[36px] gap-1.5 px-3 py-2 n-bold text-[11px] leading-[16px] tracking-normal",
  "sm:h-[55px] sm:w-fit sm:max-w-full sm:gap-5 sm:px-[45px] sm:py-[15px] sm:text-base sm:leading-none sm:tracking-widest sm:fs-16",
  "md:fs-18 lg:fs-20 lg:max-w-[min(100%,250px)] lg:w-[250px]",
);

export const audienceMarketingOutlineCtaIconClass =
  "h-[11px] w-[11px] shrink-0 sm:h-[15px] sm:w-[15px]";

/** Listing “View More” on newsroom, blog, gazette, magazine grids (`lg` ≈ 273px). */
export const publicationViewMoreCtaClass = cn(
  audienceMarketingOutlineCtaClass,
  "lg:w-[273px] lg:max-w-[min(100%,273px)]",
);

/** Card “Read More” / “Download” — content width below `lg`, centered on small viewports. */
export const publicationCardOutlineCtaClass = cn(
  audienceMarketingOutlineCtaClass,
  "max-lg:mx-auto max-lg:self-center max-lg:!w-fit max-lg:!max-w-full",
);

/** Card CTA left-aligned from `lg` (newsroom / blog grids). */
export const publicationCardOutlineCtaClassLgStart = cn(
  publicationCardOutlineCtaClass,
  "lg:self-start",
);

/** Copy block (title, body) centered below `lg` on buyer/developer marketing bands. */
export function audienceMobileCopyCenter(
  centerOnMobile: boolean | undefined,
  className?: string,
) {
  return cn(className, centerOnMobile && "max-lg:text-center max-lg:mx-auto mt-4");
}

/** Vertical stack centered below `lg`. */
export function audienceMobileStackCenter(
  centerOnMobile: boolean | undefined,
  className?: string,
) {
  return cn(
    className,
    centerOnMobile && "max-lg:flex max-lg:flex-col max-lg:items-center",
  );
}

/** Primary CTA centered below `lg`. */
export function audienceMobileCtaCenter(
  centerOnMobile: boolean | undefined,
  className?: string,
) {
  return cn(className, centerOnMobile && "max-lg:mx-auto");
}

/**
 * Hide in-column CTA below `lg` when `centerOnMobile` — pair with `audienceMobileBottomCtaWrap`.
 * Use on the desktop-positioned OutlineArrowButton.
 */
export function audienceDesktopOnlyCta(
  centerOnMobile: boolean | undefined,
  className?: string,
) {
  return cn(
    className,
    centerOnMobile && "max-lg:!hidden lg:!inline-flex",
  );
}

/**
 * Wrapper for a duplicate CTA placed after media/carousel on mobile (buyer/developer pages).
 */
export function audienceMobileBottomCtaWrap(
  centerOnMobile: boolean | undefined,
  className?: string,
) {
  if (!centerOnMobile) return "hidden";
  return cn(
    "flex w-full justify-center lg:hidden",
    "[&_a]:w-fit [&_a]:max-w-full [&_button]:w-fit [&_button]:max-w-full",
    className,
  );
}

/** Hide a block below `lg` (pair with `audienceMobileOnlyBlock` on ScrollReveal / section wrappers). */
export function audienceDesktopOnlyBlock(
  centerOnMobile: boolean | undefined,
  className?: string,
) {
  return cn(className, centerOnMobile && "hidden lg:block");
}

/** Show a block below `lg` only (mobile bottom CTA row). */
export function audienceMobileOnlyBlock(
  centerOnMobile: boolean | undefined,
  className?: string,
) {
  if (!centerOnMobile) return "hidden";
  return cn("block lg:hidden", className);
}
