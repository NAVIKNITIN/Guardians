"use client";

import { IconChevronLeft, IconChevronRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import { RoundIconButton } from "@/components/ui/RoundIconButton";

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
    <div className={cn("flex items-center gap-3", className)}>
      <RoundIconButton label={prevLabel} onClick={onPrev}>
        <IconChevronLeft className="h-5 w-5" />
      </RoundIconButton>
      {showCounter ? (
        <span className="min-w-[3.25rem] text-center text-sm tabular-nums text-brand-text-secondary">
          {currentIndex + 1} / {total}
        </span>
      ) : null}
      <RoundIconButton label={nextLabel} onClick={onNext}>
        <IconChevronRight className="h-5 w-5" />
      </RoundIconButton>
    </div>
  );
}
