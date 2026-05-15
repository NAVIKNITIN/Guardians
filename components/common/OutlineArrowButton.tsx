import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  /** Extra classes — primarily for adjusting padding, gap, and type sizes. */
  className?: string;
  /** Extra classes applied to the arrow icon (e.g. responsive sizing). */
  iconClassName?: string;
  /** Accessible label for the arrow icon. Empty = decorative. */
  iconAlt?: string;
};

type LinkVariantProps = CommonProps & {
  href: string;
};

type ButtonVariantProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type OutlineArrowButtonProps = LinkVariantProps | ButtonVariantProps;

const baseClassName = cn(
  /* Named group so nested `group` on cards does not trigger arrow styles on card hover */
  "group/outline divider-card-cta-slow outline-arrow-grad-anim inline-flex w-fit max-w-full cursor-pointer flex-nowrap items-center justify-center gap-5",
  "rounded-none border-0 px-[45px] py-[15px]",
  "n-bold text-base  tracking-widest text-white",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
);

function Label({ children }: { children: ReactNode }) {
  return <span className="shrink-0 whitespace-nowrap">{children}</span>;
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
        className,
      )}
      aria-hidden={alt === ""}
    />
  );
}

/**
 * Dark “Know more” CTA with black/gray gradient sweep (see `globals.css` `.outline-arrow-grad-anim`).
 * Renders a `<Link>` when `href` is provided, otherwise a `<button>`.
 */
export function OutlineArrowButton(props: OutlineArrowButtonProps) {
  if ("href" in props && props.href) {
    const { href, children, className, iconClassName, iconAlt = "" } = props;
    return (
      <Link href={href} className={cn(baseClassName, className)}>
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
