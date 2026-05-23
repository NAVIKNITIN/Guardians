import { cn } from "@/utils/cn";

/** Shared outline CTA sizing for buyer/developer marketing bands. */
export const audienceMarketingOutlineCtaClass =
  "inline-flex h-[55px] w-full max-w-[min(100%,250px)] n-bold fs-16 uppercase sm:w-[250px] md:fs-18 lg:fs-20";

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
    "flex w-full justify-center max-lg:justify-center lg:hidden",
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
