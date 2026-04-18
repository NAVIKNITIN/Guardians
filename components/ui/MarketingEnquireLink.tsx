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
  const base =
    variant === "ourWork" ? ourWorkReadMoreLinkClassName : heroEnquireCtaClassName;
  const arrow =
    variant === "ourWork" ? (
      <IconArrowUpRight className="h-[14px] w-[14px] shrink-0 text-white" />
    ) : (
      <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    );

  return (
    <Link {...props} className={cn(base, "group", className)}>
      {children}
      {arrow}
    </Link>
  );
}
