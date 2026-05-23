import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  /** Extra classes — primarily for adjusting padding, gap, and type sizes. */
  className?: string;
  /** Extra classes applied to the arrow icon (e.g. responsive sizing). */
  iconClassName?: string;
  /** Accessible label for the arrow icon. Empty = decorative. */
  iconAlt?: string;
};

type LinkVariantProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

type ButtonVariantProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type OutlineArrowButtonProps = LinkVariantProps | ButtonVariantProps;

const baseClassName = cn(
  /* Named group so nested `group` on cards does not trigger arrow styles on card hover */
  "group/outline divider-card-cta-slow uppercase outline-arrow-grad-anim inline-flex w-fit max-w-full cursor-pointer flex-nowrap items-center justify-center",
  "gap-2 rounded-none border-0 px-4 py-2.5",
  "n-bold text-[12px] leading-[18px] tracking-normal text-white",
  "sm:gap-5 sm:px-[45px] sm:py-[15px] sm:text-base sm:leading-none sm:tracking-widest",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
);

const defaultIconClassName =
  "h-[11px] w-[11px] sm:h-[15px] sm:w-[15px]";

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center whitespace-nowrap leading-none">
      {children}
    </span>
  );
}

function ArrowIcon({
  alt,
  className,
}: {
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src="/images/arrow.svg"
      alt={alt}
      width={15}
      height={15}
      className={cn(
        "cta-icon-hover invert object-cover transition-[filter] duration-300",
        defaultIconClassName,
        className,
      )}
      aria-hidden={alt === ""}
    />
  );
}

/**
 * Dark “Explore More” CTA with black/gray gradient sweep (see `globals.css` `.outline-arrow-grad-anim`).
 * Renders a `<Link>` when `href` is provided, otherwise a `<button>`.
 */
export function OutlineArrowButton(props: OutlineArrowButtonProps) {
  if ("href" in props && props.href) {
    const {
      href,
      children,
      className,
      iconClassName,
      iconAlt = "",
      ...linkProps
    } = props;
    return (
      <Link href={href} className={cn(baseClassName, className)} {...linkProps}>
        <Label>{children}</Label>
        <ArrowIcon alt={iconAlt} className={iconClassName} />
      </Link>
    );
  }

  const btn = props as ButtonVariantProps;
  const {
    children,
    className,
    iconClassName,
    iconAlt = "",
    type = "button",
    ...buttonProps
  } = btn;

  return (
    <button
      type={type}
      className={cn(baseClassName, className)}
      {...buttonProps}
    >
      <Label>{children}</Label>
      <ArrowIcon alt={iconAlt} className={iconClassName} />
    </button>
  );
}
