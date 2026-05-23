"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import {
  AudienceMarketingSectionCtaDesktop,
  AudienceMarketingSectionCtaMobile,
} from "@/components/marketing/AudienceMarketingSectionCta";
import type { OurWorkBandContent } from "@/data/audience-marketing";
import { Container } from "@/components/common/Container";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { cn } from "@/utils/cn";
import {
  audienceDesktopOnlyBlock,
  audienceMobileCopyCenter,
  audienceMobileOnlyBlock,
  audienceMobileStackCenter,
} from "@/styles/audienceMarketingCenter";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const slideTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/** Figma: light neutral surface, serif “OUR WORK”, sans headline/body, black READ MORE, gray carousel. */
export function OurWorkSection({
  content,
  isBuyer: _isBuyer,
  centerOnMobile = false,
}: {
  content: OurWorkBandContent;
  isBuyer: boolean;
  centerOnMobile?: boolean;
}) {
  const slides = content.slides;
  const total = slides.length;
  const { index, advance } = useCycleIndex(total, 0);
  const slide = slides[index]!;

  const carouselControls = (controlsClassName?: string) => (
    <CarouselControls
      className={cn(
        "flex w-full items-center",
        controlsClassName,
        centerOnMobile ? "max-lg:justify-center" : "justify-start",
      )}
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
  );

  return (
    <section
      className="w-full bg-[#F4F4F4] py-2 md:py-4 lg:py-4 xl:py-5"
      aria-labelledby="our-work-heading"
    >
      <Container className="min-w-0 ">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <StaggerContainer
            className={audienceMobileStackCenter(
              centerOnMobile,
              "flex min-w-0 flex-col",
            )}
            staggerChildren={0.16}
          >
            <ScrollReveal direction="left" distance={40}>
              <h2
                id="our-work-heading"
                className={audienceMobileCopyCenter(
                  centerOnMobile,
                  "sm:mt-3 md:mt-6 qs-reg text-[clamp(2rem,4.2vw,3.25rem)] uppercase leading-[1.05] tracking-[0.02em] text-brand-text-primary",
                )}
              >
                {content.sectionTitle}
              </h2>
            </ScrollReveal>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={slideTransition}
              >
                <h3
                  className={audienceMobileCopyCenter(
                    centerOnMobile,
                    "mt-10 max-w-xl n-bold text-[clamp(1.125rem,2.1vw,1.75rem)] leading-[1.3] text-[#161616] lg:mt-20",
                  )}
                >
                  {slide.title}
                </h3>
                <p
                  className={audienceMobileCopyCenter(
                    centerOnMobile,
                    "mt-6 max-w-lg n-book text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.65] text-[#161616]",
                  )}
                >
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <ScrollReveal
              direction="up"
              delay={0.2}
              distance={24}
              className={audienceDesktopOnlyBlock(centerOnMobile)}
            >
              {carouselControls("mt-10 lg:mt-18")}
            </ScrollReveal>

            <ScrollReveal
              direction="up"
              delay={0.12}
              distance={28}
              className={audienceDesktopOnlyBlock(centerOnMobile)}
            >
              <AudienceMarketingSectionCtaDesktop
                href={content.readMoreHref}
                centerOnMobile={centerOnMobile}
                className="mt-10"
              >
                {content.readMoreLabel}
              </AudienceMarketingSectionCtaDesktop>
            </ScrollReveal>
          </StaggerContainer>

          <ScrollReveal direction="right" delay={0.12} className="relative flex w-full justify-center lg:justify-end">
            <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-neutral-200/80 sm:aspect-[5/4] md:w-[588px] md:h-[610px] md:aspect-auto")}>
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
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={0.12}
            distance={24}
            className={audienceMobileOnlyBlock(centerOnMobile, "w-full")}
          >
            {carouselControls("mt-6")}
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={0.14}
            distance={28}
            className={audienceMobileOnlyBlock(centerOnMobile)}
          >
            <AudienceMarketingSectionCtaMobile
              href={content.readMoreHref}
              centerOnMobile={centerOnMobile}
              wrapClassName="mt-6 mb-5"
            >
              {content.readMoreLabel}
            </AudienceMarketingSectionCtaMobile>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
