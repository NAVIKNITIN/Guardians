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
  const arrow = (
    <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  );

  return (
    <Link {...props} className={cn(heroEnquireCtaClassName, "group", className)}>
      {children}
      {arrow}
    </Link>
  );
}
