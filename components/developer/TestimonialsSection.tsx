"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import type { TestimonialsSectionContent } from "@/data/audience-marketing";
import { TestimonialCard } from "@/components/developer/TestimonialCard";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { useMemo } from "react";
import { OutlineArrowButton } from "../common/OutlineArrowButton";

const DESKTOP_VISIBLE = 3;

export function TestimonialsSection({
  content,
  isBuyer,
}: {
  isBuyer: boolean;
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
    <SectionSurface
      variant="compact"
      aria-labelledby="testimonials-heading"
      className="py-0!"
    >
      <ScrollReveal direction="up" distance={34}>
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
      </ScrollReveal>

      <StaggerContainer className="mt-10 hidden md:grid md:grid-cols-3 md:items-stretch md:gap-4 xl:gap-5 2xl:gap-6" staggerChildren={0.18}>
        {desktopVisible.map((item, cardIndex) => (
          <ScrollReveal key={`${item.id}-${index}`} direction="up" delay={cardIndex * 0.08} distance={30}>
            <TestimonialCard
              item={item}
              className="h-full min-h-[26rem] w-full"
            />
          </ScrollReveal>
        ))}
      </StaggerContainer>
      <div className="mt-10 md:hidden">
        <ScrollReveal direction="up" delay={0.08} distance={30}>
          <TestimonialCard item={items[index]!} />
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up" delay={0.12} className="mt-10 flex justify-center ">
        <OutlineArrowButton
          href={content.viewMoreHref}
          className="w-[250px] h-[55px] n-bold fs-16 md:fs-18 lg:fs-20 uppercase"
        >
          {content.viewMoreLabel}
        </OutlineArrowButton>
      </ScrollReveal>
    </SectionSurface>
  );
}
