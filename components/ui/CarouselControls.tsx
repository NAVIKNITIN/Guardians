"use client";

import { RoundIconButton } from "@/components/ui/RoundIconButton";
import { cn } from "@/utils/cn";
import Image from "next/image";

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
}: CarouselControlsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <RoundIconButton label={prevLabel} onClick={onPrev}>
        <Image
          src={CAROUSEL_PREV}
          alt=""
          width={20}
          height={20}
          className="h-5 "
          // unoptimized
        />
      </RoundIconButton>
      {showCounter ? (
        <span className="min-w-[1.5rem] text-center text-sm tabular-nums text-brand-text-secondary">
          {currentIndex + 1} / {total}
        </span>
      ) : null}
      <RoundIconButton label={nextLabel} onClick={onNext}>
        <Image
          src={CAROUSEL_NEXT}
          alt=""
          width={20}
          height={20}
          className="h-5  bg-transparent"
          // unoptimized
        />
      </RoundIconButton>
    </div>
  );
}
