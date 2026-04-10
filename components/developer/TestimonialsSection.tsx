"use client";

import { TESTIMONIALS } from "@/data/developer-page";
import { TestimonialCard } from "@/components/developer/TestimonialCard";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { marketingClasses } from "@/styles/marketingClasses";
import { useCycleIndex } from "@/hooks/useCycleIndex";

export function TestimonialsSection() {
  const n = TESTIMONIALS.length;
  const { index, advance } = useCycleIndex(n, 0);

  return (
    <SectionSurface variant="compact" aria-labelledby="testimonials-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="testimonials-heading"
          className={marketingClasses.headingDisplayMd}
        >
          What our clients say
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

      <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-10 md:hidden">
        <TestimonialCard item={TESTIMONIALS[index]!} />
      </div>

      <div className="mt-10 flex justify-center">
        <MarketingEnquireLink href="/contact">View more</MarketingEnquireLink>
      </div>
    </SectionSurface>
  );
}
