import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type GradientCtaButtonProps = {
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  /** @deprecated Arrow is always shown via `OutlineArrowButton`. */
  showArrow?: boolean;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClassName =
  "!text-[clamp(0.76rem,calc(0.5rem+0.87vw),1.125rem)] py-3.5 shadow-none n-bold uppercase tracking-[0.1em]";

/**
 * @deprecated Prefer `OutlineArrowButton` directly. Thin wrapper for legacy call sites.
 */
export function GradientCtaButton({
  children,
  className,
  iconClassName,
  href,
  type = "button",
  ...buttonProps
}: GradientCtaButtonProps) {
  const classes = cn(baseClassName, className);
  const iconCls = cn("h-[1em] w-[1em]", iconClassName);

  if (href) {
    return (
      <OutlineArrowButton
        href={href}
        className={classes}
        iconClassName={iconCls}
        iconAlt=""
      >
        {children}
      </OutlineArrowButton>
    );
  }

  return (
    <OutlineArrowButton
      type={type}
      className={classes}
      iconClassName={iconCls}
      iconAlt=""
      {...buttonProps}
    >
      {children}
    </OutlineArrowButton>
  );
}
