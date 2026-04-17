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
  "flex items-center justify-center gap-5",
  "border border-black/30 px-12 py-2.5",
  "n-bold text-base uppercase tracking-[0.1em] text-[#202225]",
  "transition-colors hover:border-[#202225] hover:bg-[#202225] hover:text-white",
  "[&:hover_svg_path]:stroke-white",
);

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
      className={cn("object-cover", className)}
      aria-hidden={alt === ""}
    />
  );
}

/**
 * Outlined CTA with an arrow icon that inverts colors on hover.
 * Used as "Read More", "Open File", etc. across cards.
 *
 * Renders a `<Link>` when `href` is provided, otherwise a `<button>`.
 */
export function OutlineArrowButton(props: OutlineArrowButtonProps) {
  if ("href" in props && props.href) {
    const { href, children, className, iconClassName, iconAlt = "" } = props;
    return (
      <Link href={href} className={cn(baseClassName, className)}>
        {children}
        <ArrowIcon alt={iconAlt} className={iconClassName} />
      </Link>
    );
  }

  const {
    children,
    className,
    iconClassName,
    iconAlt = "",
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={cn(baseClassName, "cursor-pointer", className)}
      {...buttonProps}
    >
      {children}
      <ArrowIcon alt={iconAlt} className={iconClassName} />
    </button>
  );
}
