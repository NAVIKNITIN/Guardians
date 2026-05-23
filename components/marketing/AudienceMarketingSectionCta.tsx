"use client";

import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  audienceDesktopOnlyCta,
  audienceMarketingOutlineCtaClass,
  audienceMobileBottomCtaWrap,
  audienceMobileCtaCenter,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type AudienceMarketingSectionCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function ctaButtonClass(centerOnMobile: boolean | undefined, className?: string) {
  return cn(
    audienceMarketingOutlineCtaClass,
    audienceMobileCtaCenter(centerOnMobile, className),
  );
}

/** In-column CTA — hidden below `lg` when `centerOnMobile` (use with mobile bottom CTA). */
export function AudienceMarketingSectionCtaDesktop({
  href,
  children,
  centerOnMobile = false,
  className,
}: AudienceMarketingSectionCtaProps & { centerOnMobile?: boolean }) {
  return (
    <OutlineArrowButton
      href={href}
      className={audienceDesktopOnlyCta(
        centerOnMobile,
        ctaButtonClass(centerOnMobile, className),
      )}
    >
      {children}
    </OutlineArrowButton>
  );
}

/** Centered CTA below media/carousel — visible below `lg` only when `centerOnMobile`. */
export function AudienceMarketingSectionCtaMobile({
  href,
  children,
  centerOnMobile = false,
  className,
  wrapClassName,
}: AudienceMarketingSectionCtaProps & {
  centerOnMobile?: boolean;
  wrapClassName?: string;
}) {
  if (!centerOnMobile) return null;

  return (
    <div className={audienceMobileBottomCtaWrap(true, wrapClassName)}>
      <OutlineArrowButton href={href} className={ctaButtonClass(true, className)}>
        {children}
      </OutlineArrowButton>
    </div>
  );
}

/** Single CTA for all breakpoints (when `centerOnMobile` is false). */
export function AudienceMarketingSectionCta({
  href,
  children,
  centerOnMobile = false,
  className,
}: AudienceMarketingSectionCtaProps & { centerOnMobile?: boolean }) {
  if (centerOnMobile) {
    return (
      <AudienceMarketingSectionCtaDesktop
        href={href}
        centerOnMobile
        className={className}
      >
        {children}
      </AudienceMarketingSectionCtaDesktop>
    );
  }

  return (
    <OutlineArrowButton href={href} className={ctaButtonClass(false, className)}>
      {children}
    </OutlineArrowButton>
  );
}
