"use client";

import { OUR_WORK_SLIDES } from "@/data/developer-page";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { marketingClasses } from "@/styles/marketingClasses";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const slideTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

const total = OUR_WORK_SLIDES.length;

export function OurWorkSection() {
  const { index, advance } = useCycleIndex(total, 0);
  const slide = OUR_WORK_SLIDES[index]!;

  return (
    <SectionSurface
      variant="muted"
      aria-labelledby="our-work-heading"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="our-work-heading" className={marketingClasses.headingDisplay}>
            Our work
          </h2>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={slideTransition}
            >
              <h3 className="mt-6 text-lg font-semibold leading-snug text-brand-text-primary sm:text-xl">
                {slide.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-text-secondary sm:text-base">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>
          <MarketingEnquireLink href="/contact" className="mt-8 inline-flex px-7">
            Read more
          </MarketingEnquireLink>
          <CarouselControls
            className="mt-10 gap-4"
            currentIndex={index}
            total={total}
            onPrev={() => advance(-1)}
            onNext={() => advance(1)}
            prevLabel="Previous slide"
            nextLabel="Next slide"
          />
        </div>

        <div className="relative">
          <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-sm border border-black/[0.08] bg-neutral-200 shadow-sm lg:ml-auto">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={slideTransition}
              >
                <Image
                  src={slide.imageSrc}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
            <div
              className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 pb-3"
              aria-hidden
            >
              {OUR_WORK_SLIDES.slice(0, 6).map((_, dot) => (
                <span
                  key={dot}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    dot === index % 6 ? "bg-white" : "bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
