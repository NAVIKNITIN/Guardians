import { IconArrowUpRight } from "@/components/common/icons";
import {
  heroEnquireCtaClassName,
  ourWorkReadMoreLinkClassName,
} from "@/styles/buttonStyles";
import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type MarketingEnquireLinkProps = Omit<
  ComponentProps<typeof Link>,
  "className" | "children"
> & {
  children: ReactNode;
  className?: string;
  /** `ourWork` = full-width Figma bar (developer Our Work band). Default matches hero CTA. */
  variant?: "default" | "ourWork";
};

/** Black marketing CTA with arrow hover nudge. */
export function MarketingEnquireLink({
  children,
  className,
  variant = "default",
  ...props
}: MarketingEnquireLinkProps) {
  const baseClass =
    heroEnquireCtaClassName;

  const arrow = (
    <IconArrowUpRight className="cta-icon-hover h-[15px] w-[15px] shrink-0" />
  );

  return (
    <Link
      {...props}
      className={cn(baseClass, "group cta-hover-trigger", className)}
    >
      {children}
      {arrow}
    </Link>
  );
}
