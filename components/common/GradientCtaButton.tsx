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

const baseClassName =
  "group inline-flex items-center justify-center gap-4 px-8 py-3.5 n-reg  text-sm  uppercase tracking-[0.1em] text-white shadow-md transition-all duration-300 ease-out";

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
              "h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
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
            "h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            iconClassName,
          )}
        />
      ) : null}
    </button>
  );
}
