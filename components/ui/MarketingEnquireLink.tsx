import { IconArrowUpRight } from "@/components/common/icons";
import { heroEnquireCtaClassName } from "@/styles/buttonStyles";
import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type MarketingEnquireLinkProps = Omit<
  ComponentProps<typeof Link>,
  "className" | "children"
> & {
  children: ReactNode;
  className?: string;
};

/** Black marketing CTA with arrow hover nudge. */
export function MarketingEnquireLink({
  children,
  className,
  ...props
}: MarketingEnquireLinkProps) {
  return (
    <Link
      {...props}
      className={cn(heroEnquireCtaClassName, "group", className)}
    >
      {children}
      <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
