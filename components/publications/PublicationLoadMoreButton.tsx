import { cn } from "@/utils/cn";
import Image from "next/image";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PublicationLoadMoreButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Gradient "View More" / "Load More" CTA used at the bottom of the
 * publications grids (gazette, magazine).
 */
export function PublicationLoadMoreButton({
  children,
  className,
  type = "button",
  ...buttonProps
}: PublicationLoadMoreButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "btn-primary-gradient",
        "inline-flex w-full max-w-sm items-center justify-center gap-4 px-8 py-3.5",
        "n-bold fs-20 lh-24 uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
        "sm:w-auto sm:max-w-none sm:gap-5 sm:px-12 sm:py-[18px] sm:text-base lg:text-lg",
        className,
      )}
      {...buttonProps}
    >
      {children}
      <Image
        src="/images/arrowwhite.svg"
        alt=""
        width={15}
        height={15}
        className="object-cover"
        aria-hidden
      />
    </button>
  );
}
