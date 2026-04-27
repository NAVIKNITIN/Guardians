"use client";

import type { AwardSlide, AwardsSectionContent } from "@/data/audience-marketing";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { cn } from "@/utils/cn";
import { RollingText } from "@/components/ui/RollingText";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

/** Static deck behind the active page — edges + stitch read as bound pages. */
function BookSpineStack({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      aria-hidden
    >
      {[3, 2, 1].map((step) => (
        <div
          key={step}
          className="absolute rounded-sm border border-black/[0.06] bg-gradient-to-b from-neutral-50 to-neutral-200/95 shadow-[0_8px_22px_rgba(0,0,0,0.12)]"
          style={{
            left: `${step * 2.4}%`,
            right: `${step * 2.4}%`,
            top: `${-step * 2.8}%`,
            bottom: `${step * 1.2}%`,
            transform: `translateY(${step * 2}px)`,
            zIndex: -step,
          }}
        />
      ))}
      {/* Spine thread — subtle inner stitch lines */}
      <div
        className="absolute top-[7%] bottom-[7%] left-[13%] w-px opacity-28"
        style={{
          background:
            "repeating-linear-gradient(to bottom, #8f8183 0px, #8f8183 3px, transparent 3px, transparent 6px)",
        }}
      />
      <div
        className="absolute top-[7%] bottom-[7%] left-[calc(13%+6px)] w-px opacity-16"
        style={{
          background:
            "repeating-linear-gradient(to bottom, #bcbdc0 0px, #bcbdc0 2px, transparent 2px, transparent 5px)",
        }}
      />
    </div>
  );
}

/** Back of the turning page — paper + thread pattern. */
function BookPageBack({ slide }: { slide: AwardSlide }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-sm border border-black/12 bg-[#f3efe8] shadow-inner"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg, transparent, transparent 11px, rgba(0,0,0,0.04) 11px, rgba(0,0,0,0.04) 12px)",
            "repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(0,0,0,0.03) 9px, rgba(0,0,0,0.03) 10px)",
          ].join(","),
        }}
      />
      <div
        className="absolute top-[10%] bottom-[10%] left-[18%] w-[2px] opacity-50"
        style={{
          background:
            "repeating-linear-gradient(to bottom, #6b6560 0px, #6b6560 4px, transparent 4px, transparent 8px)",
        }}
      />
      <div
        className="absolute top-[10%] bottom-[10%] left-[calc(18%+6px)] w-px opacity-30"
        style={{
          background:
            "repeating-linear-gradient(to bottom, #8f8183 0px, #8f8183 2px, transparent 2px, transparent 5px)",
        }}
      />
    </div>
  );
}

/** Front of the award card (ghost stack + image). */
const BookPageFront = memo(function BookPageFront({ slide }: { slide: AwardSlide }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-sm shadow-lg"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div
        className="absolute inset-0 z-0 translate-x-3 translate-y-3 rounded-sm border border-black/6 bg-neutral-100/90 shadow-sm"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-1 translate-x-1.5 translate-y-1.5 rounded-sm border border-black/8 bg-white shadow-md"
        aria-hidden
      />
      <div className="absolute inset-0 z-10 overflow-hidden rounded-sm border border-black/8 bg-white">
        <Image
          src={slide.imageSrc}
          alt=""
          fill
          className=""
          sizes="(max-width: 1024px) min(100vw, 385px), 385px"
        />
      </div>
    </div>
  );
});

/** Half the previous turn (~44°) — subtle “half page” sweep instead of a near-flat fold. */
const BOOK_TURN_DEG = 82;

const bookFlipFull = {
  enter: (dir: 1 | -1) => ({
    rotateY: dir > 0 ? BOOK_TURN_DEG : -BOOK_TURN_DEG,
    transformOrigin: dir > 0 ? "right center" : "left center",
    opacity: 1,
  }),
  center: {
    rotateY: 0,
    transformOrigin: "center center",
    opacity: 1,
  },
  exit: (dir: 1 | -1) => ({
    rotateY: dir > 0 ? -BOOK_TURN_DEG : BOOK_TURN_DEG,
    transformOrigin: dir > 0 ? "left center" : "right center",
    opacity: 1,
  }),
};

const bookFlipReduced = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export function AwardsSection({
  content,
  isBuyer,
}: {
  isBuyer: boolean;
  content: AwardsSectionContent;
}) {
  const slides = content.slides;
  const total = slides.length;
  const { index, advance } = useCycleIndex(total, 0);
  const slide = slides[index]!;
  const reduceMotion = useReducedMotion();
  const [rollDir, setRollDir] = useState<1 | -1>(1);
  /** Index of the slide that is turning away; cleared after mount so AnimatePresence can run `exit`. */
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  /** True from click until exit animation finishes — not tied to `outgoingIndex` (cleared early to trigger exit). */
  const [transitionLock, setTransitionLock] = useState(false);

  const goNext = () => {
    if (transitionLock) return;
    setRollDir(1);
    setTransitionLock(true);
    setOutgoingIndex(index);
    advance(1);
  };

  const goPrev = () => {
    if (transitionLock) return;
    setRollDir(-1);
    setTransitionLock(true);
    setOutgoingIndex(index);
    advance(-1);
  };

  // Exit only runs when this child leaves the tree; after one frame, drop `outgoingIndex` so removal starts the flip.
  useEffect(() => {
    if (outgoingIndex === null) return;
    const id = requestAnimationFrame(() => {
      setOutgoingIndex(null);
    });
    return () => cancelAnimationFrame(id);
  }, [outgoingIndex]);

  return (
    <SectionSurface
      variant="stats"
      aria-labelledby="awards-heading"
      className="border-t-0 border-b-0 bg-transparent "
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-14 2xl:gap-16">
        <div className="flex w-full min-w-0 flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-left">
          <Image
            src={content.starIconSrc}
            alt=""
            width={90}
            height={75}
            className=" w-auto shrink-0 object-cover object-center  lg:object-left"
          />
          <h2
            id="awards-heading"
            className={cn(
              "qs-reg fs-50 lh-50 mt-10 md:mt-30",
              " w-full min-w-0 max-w-full px-0",
              "text-balance uppercase leading-tight tracking-[0.08em] text-[#202225]",
              /* Fluid type: no fixed fs-45 / max-w-48 — those clipped “Recognitions” on narrow screens */
              "text-[clamp(1.125rem,calc(0.5rem+3.4vw),2.25rem)] sm:text-[clamp(1.35rem,calc(0.55rem+2.4vw),2.35rem)]  lg:text-[clamp(1.5rem,2.5vw,2rem)]",
            )}
          >
            {content.headingLine1}
            <br />
            {content.headingLine2}
          </h2>
        </div>

        {/* Book-style page turn + spine stack behind */}
        <div className="relative flex justify-center lg:col-span-5 lg:justify-center lg:pl-10">
          <div
            className={cn(
              "relative mx-auto w-full max-w-[min(100%,385.33px)]",
              /* Figma: award carousel frame 385.33 × 459 */
              "aspect-[385.33/459] min-h-0 max-h-[min(459px,65.5vh)]",
            )}
          >
            <BookSpineStack />

            <div
              className="relative z-10 h-full w-full [perspective:1200px]"
              style={{ perspectiveOrigin: "50% 50%" }}
            >
              {/* Incoming slide stays flat underneath so it shows through the turn */}
              <div className="absolute inset-0 z-0">
                <BookPageFront slide={slide} />
              </div>

              <AnimatePresence
                initial={false}
                custom={rollDir}
                onExitComplete={() => setTransitionLock(false)}
              >
                {outgoingIndex !== null && (
                  <motion.div
                    key={slides[outgoingIndex]!.id}
                    custom={rollDir}
                    variants={reduceMotion ? bookFlipReduced : bookFlipFull}
                    initial="center"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: reduceMotion ? 0.2 : 0.62,
                      ease: [0.22, 0.82, 0.28, 1],
                    }}
                    className="preserve-3d absolute inset-0 z-10 h-full w-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="relative h-full w-full"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <BookPageFront slide={slides[outgoingIndex]!} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 w-full min-w-0 flex-col items-center text-center lg:col-span-4 lg:h-full lg:items-stretch lg:text-left">
          <div className="mb-8 flex w-full shrink-0 justify-center lg:mb-10 lg:justify-start">
            <CarouselControls
              currentIndex={index}
              total={total}
              onPrev={goPrev}
              onNext={goNext}
              prevLabel="Previous award"
              nextLabel="Next award"
              buttonClassName="border-0 bg-transparent hover:bg-transparent"
              counterClassName="min-w-[2.75rem] px-1 text-xs font-medium text-brand-text-primary sm:text-sm"
              renderCounter={({ currentIndex, total }) => (
                <span className="inline-flex min-w-[2.75rem] text-[#141414] items-baseline justify-center gap-0.5 px-1 text-xs font-medium text-brand-text-primary tabular-nums sm:text-sm">
                  <RollingText
                    value={String(currentIndex + 1)}
                    direction={rollDir}
                  />
                  <span className="opacity-70" aria-hidden>
                    /
                  </span>
                  <span>{total}</span>
                </span>
              )}
            />
          </div>

          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col justify-between gap-6 lg:mt-25">
            <div className="w-full min-w-0">
              <RollingText
                value={slide.company}
                direction={rollDir}
                className="text-[#161616] n-bold text-[clamp(0.875rem,2.5vw,1.125rem)] uppercase tracking-[0.05em] text-brand-text-primary sm:text-[18px]"
              />
              <div className="w-full min-w-0">
                <RollingText
                  block
                  value={slide.achievement}
                  direction={rollDir}
                  className="text-[#161616] n-bold text-[clamp(1.5rem,6vw,2.25rem)] tracking-[0.02em] text-brand-text-primary sm:text-[36px]"
                />
              </div>
            </div>
            <RollingText
              value={slide.year}
              direction={rollDir}
              className="n-bold text-[14px] uppercase tracking-[0.2em] text-brand-text-secondary lg:mb-5 fw-600"
            />
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
