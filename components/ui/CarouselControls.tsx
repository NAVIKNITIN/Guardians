"use client";

import { RoundIconButton } from "@/components/ui/RoundIconButton";
import { cn } from "@/utils/cn";
import Image from "next/image";
import type { ReactNode } from "react";

const CAROUSEL_PREV = "/images/leftcarousel.svg";
const CAROUSEL_NEXT = "/images/rightcarousel.svg";

export type CarouselControlsProps = {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  /** @default true */
  showCounter?: boolean;
  className?: string;
  /** Merged into each round prev/next button */
  buttonClassName?: string;
  /** Merged into the `n / total` counter */
  counterClassName?: string;
  /** Replace default `n / total` text (e.g. rolling digits). */
  renderCounter?: (info: {
    currentIndex: number;
    total: number;
  }) => ReactNode;
};

/**
 * Prev / next with optional `n / total` counter — used across marketing carousels.
 */
export function CarouselControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  showCounter = true,
  className,
  buttonClassName,
  counterClassName,
  renderCounter,
}: CarouselControlsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <RoundIconButton
        label={prevLabel}
        onClick={onPrev}
        className={buttonClassName}
      >
        <Image
          src={CAROUSEL_PREV}
          alt=""
          width={40}
          height={40}
          className="object-cover"
        />
      </RoundIconButton>
      {showCounter ? (
        renderCounter ? (
          renderCounter({ currentIndex, total })
        ) : (
          <span
            className={cn(
              "min-w-[1.5rem] text-center text-sm tabular-nums text-brand-text-secondary",
              counterClassName,
            )}
          >
            {currentIndex + 1} / {total}
          </span>
        )
      ) : null}
      <RoundIconButton
        label={nextLabel}
        onClick={onNext}
        className={buttonClassName}
      >
        <Image
          src={CAROUSEL_NEXT}
          alt=""
          width={40}
          height={40}
          className=" bg-transparent object-cover"
        />
      </RoundIconButton>
    </div>
  );
}
