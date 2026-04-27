import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type GradientCtaButtonProps = {
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  variant?: "primary" | "know-more";
  showArrow?: boolean;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClassMap: Record<NonNullable<GradientCtaButtonProps["variant"]>, string> = {
  primary: "btn-primary-gradient",
  "know-more": "btn-know-more-gradient",
};

/** Figma idle: 0px radius, no border/shadow, white label + em-sized arrow, Nexa semibold, +tracking */
const baseClassName =
  "!text-[clamp(0.76rem,calc(0.5rem+0.87vw),1.125rem)] group cta-hover-trigger btn-grad inline-flex items-center justify-center gap-4 rounded-none border-0 px-8 py-3.5 shadow-none n-bold text-[11px] uppercase tracking-[0.1em] text-white";

export function GradientCtaButton({
  children,
  className,
  iconClassName,
  variant = "primary",
  showArrow = true,
  href,
  type = "button",
  ...buttonProps
}: GradientCtaButtonProps) {
  const classes = cn(baseClassName, variantClassMap[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {showArrow ? (
          <IconArrowUpRight
            className={cn(
              "cta-icon-hover h-[1em] w-[1em] shrink-0",
              iconClassName,
            )}
          />
        ) : null}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
      {showArrow ? (
        <IconArrowUpRight
          className={cn(
            "cta-icon-hover h-[1em] w-[1em] shrink-0",
            iconClassName,
          )}
        />
      ) : null}
    </button>
  );
}
