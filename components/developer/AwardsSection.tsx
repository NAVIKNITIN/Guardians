"use client";

import { AWARD_SLIDES } from "@/data/developer-page";
import { IconLaurelAward } from "@/components/common/icons";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { marketingClasses } from "@/styles/marketingClasses";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function AwardsSection() {
  const total = AWARD_SLIDES.length;
  const { index, advance } = useCycleIndex(total, 0);
  const slide = AWARD_SLIDES[index]!;

  return (
    <SectionSurface variant="default" aria-labelledby="awards-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-left">
          <IconLaurelAward className="h-16 w-16 text-brand-text-primary" />
          <h2
            id="awards-heading"
            className={cn("mt-6", marketingClasses.headingDisplaySm)}
          >
            Awards &amp; recognitions
          </h2>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border border-black/[0.08] bg-neutral-100 shadow-md">
            <Image
              key={slide.id}
              src={slide.imageSrc}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            <div
              className="absolute inset-2 -z-10 translate-x-2 translate-y-2 rounded-sm border border-black/10 bg-white shadow-sm"
              aria-hidden
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-text-muted">
            {slide.company}
          </p>
          <p className="mt-3 font-qasbyne text-2xl font-normal leading-snug text-brand-text-primary sm:text-3xl">
            {slide.achievement}
          </p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">
            {slide.year}
          </p>
          <CarouselControls
            className="mt-8 gap-4"
            currentIndex={index}
            total={total}
            onPrev={() => advance(-1)}
            onNext={() => advance(1)}
            prevLabel="Previous award"
            nextLabel="Next award"
          />
        </div>
      </div>
    </SectionSurface>
  );
}
