"use client";

import type { TestimonialsSectionContent } from "@/data/audience-marketing";
import { TestimonialCard } from "@/components/developer/TestimonialCard";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { useMemo } from "react";

const DESKTOP_VISIBLE = 3;

export function TestimonialsSection({
  content,
}: {
  content: TestimonialsSectionContent;
}) {
  const items = content.items;
  const n = items.length;
  const { index, advance } = useCycleIndex(n, 0);

  /** Three-card window (wraps) so prev/next updates the desktop row. */
  const desktopVisible = useMemo(
    () =>
      Array.from({ length: DESKTOP_VISIBLE }, (_, offset) => {
        const i = (index + offset) % n;
        return items[i]!;
      }),
    [index, n, items],
  );

  return (
    <SectionSurface variant="compact" aria-labelledby="testimonials-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between xl:gap-8 2xl:gap-10">
        <h2
          id="testimonials-heading"
          className={cn(marketingClasses.headingDisplayMd, "min-w-0 flex-1 pr-2")}
        >
          {content.sectionTitle}
        </h2>
        <CarouselControls
          currentIndex={index}
          total={n}
          onPrev={() => advance(-1)}
          onNext={() => advance(1)}
          prevLabel="Previous testimonial"
          nextLabel="Next testimonial"
        />
      </div>

      <div className="mt-10 hidden md:grid md:grid-cols-3 md:items-stretch md:gap-4 xl:gap-5 2xl:gap-6">
        {desktopVisible.map((item) => (
          <TestimonialCard
            key={`${item.id}-${index}`}
            item={item}
            className="h-[459px] w-[385.33px] max-w-full"
          />
        ))}
      </div>
      <div className="mt-10 md:hidden">
        <TestimonialCard item={items[index]!} />
      </div>

      <div className="mt-10 flex justify-center ">
        <MarketingEnquireLink
          href={content.viewMoreHref}
          className="fs-16 n-bold w-[272.01px] h-[55px]"
        >
          {content.viewMoreLabel}
        </MarketingEnquireLink>
      </div>
    </SectionSurface>
  );
}
