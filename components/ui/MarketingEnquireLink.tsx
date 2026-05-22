import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  heroEnquireCtaClassName,
  ourWorkReadMoreLinkClassName,
} from "@/styles/buttonStyles";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export type MarketingEnquireLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  /** `ourWork` = full-width Figma bar (developer Our Work band). Default matches hero CTA. */
  variant?: "default" | "ourWork";
};

/** Black marketing CTA with arrow hover nudge. */
export function MarketingEnquireLink({
  children,
  className,
  variant = "default",
  href,
}: MarketingEnquireLinkProps) {
  return (
    <OutlineArrowButton
      href={href}
      className={cn(
        variant === "ourWork"
          ? ourWorkReadMoreLinkClassName
          : heroEnquireCtaClassName,
        className,
      )}
      iconClassName="h-[15px] w-[15px]"
      iconAlt=""
    >
      {children}
    </OutlineArrowButton>
  );
}
