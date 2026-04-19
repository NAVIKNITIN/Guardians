"use client";

import type { OurWorkBandContent } from "@/data/audience-marketing";
import { Container } from "@/components/common/Container";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const slideTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/** Figma: light neutral surface, serif “OUR WORK”, sans headline/body, black READ MORE, gray carousel. */
export function OurWorkSection({ content }: { content: OurWorkBandContent }) {
  const slides = content.slides;
  const total = slides.length;
  const { index, advance } = useCycleIndex(total, 0);
  const slide = slides[index]!;

  return (
    <section
      className="w-full bg-[#F4F4F4] pb-14 sm:py-5 lg:py-5 2xl:py-8"
      aria-labelledby="our-work-heading"
    >
      <Container className="min-w-0">
        <div className="grid items-start lg:grid-cols-2">
        <div className="flex min-w-0 flex-col">
          <h2
            id="our-work-heading"
            className="sm:mt-3 md:mt-6 font-qasbyne qs-reg text-[clamp(2rem,4.2vw,3.25rem)] uppercase leading-[1.05] tracking-[0.02em] text-[#202225]"
          >
            {content.sectionTitle}
          </h2>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={slideTransition}
            >
              {/* ~40–50px below “OUR WORK” (Figma) */}
              <h3 className="mt-10 max-w-xl n-bold text-[clamp(1.125rem,2.1vw,1.75rem)] leading-[1.3] text-[#161616] lg:mt-20">
                {slide.title}
              </h3>
              {/* ~20–30px headline → body */}
              <p className="mt-6 lh-20 max-w-lg n-book lh-24 text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.65] text-[#161616] md:max-h-[40px]">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>

          <MarketingEnquireLink
            href={content.readMoreHref}
            variant="ourWork"
            className="mt-20 inline-flex h-[55px] w-[276.01px] bg-[#161616] px-7 lh-30 text-white lg:px-6"
          >
            {content.readMoreLabel}
          </MarketingEnquireLink>

          <CarouselControls
            className="mt-10 lg:mt-18 flex items-center justify-start"
            currentIndex={index}
            total={total}
            onPrev={() => advance(-1)}
            onNext={() => advance(1)}
            prevLabel="Previous slide"
            nextLabel="Next slide"
            buttonClassName={cn(
              " shrink-0 rounded-full  bg-transparent",
              "text-[#737373] hover:border-[#9e9e9e] hover:bg-black/[0.03]",
            )}
            counterClassName="min-w-[3.25rem] text-center text-sm tabular-nums text-[#737373] n-reg"
          />
        </div>

        <div className="relative flex w-full justify-center lg:justify-end">
          <div
            className={cn(
              "relative w-full md:w-[588px] md:h-[610px] overflow-hidden",
              "bg-neutral-200/80",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                className="absolute inset-0 "
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={slideTransition}
              >
                <Image
                  src={slide.imageSrc}
                  alt=""
                  fill
                  className="object-cover object-center "
                  sizes="(max-width: 1024px) 100vw, 42vw"

                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}
