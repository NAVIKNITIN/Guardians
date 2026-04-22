"use client";

import { SectionSurface } from "@/components/ui/SectionSurface";
import {
  formatDeveloperStatValue,
  type DeveloperStat,
  type StatsSectionContent,
} from "@/data/audience-marketing";

// CHANGE: same about section ke old buttons and image 
import {
  IconChevronLeft,
  IconChevronRight,
} from "@/components/common/icons";

const CAROUSEL_PREV = "/images/leftcarousel.svg";
const CAROUSEL_NEXT = "/images/rightcarousel.svg";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";

// CHANGE: smooth image/text transition ke liye.
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

// CHANGE: leadership images render karne ke liye.
import Image from "next/image";

// CHANGE: slider state ke liye.
import {
  startTransition,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export function StatFigure({
  stat,
  index,
  isInView,
  compact,
}: {
  stat: DeveloperStat;
  index: number;
  isInView: boolean;
  /**
   * About-page inline column: avoid viewport-`md:` sizing (numbers explode in a narrow grid cell).
   */
  compact?: boolean;
}) {
  const count = useCountUp(stat.end, isInView, {
    duration: 1800,
    delay: index * 75,
  });
  const text = formatDeveloperStatValue(stat, count);

  return (
    <p
      className={cn(
        "tabular-nums text-brand-footer",
        compact
          ? "n-bold max-w-full wrap-break-word whitespace-normal text-left font-semibold text-[clamp(1.65rem,min(13cqw,4.2vw),2.65rem)] leading-none tracking-[-0.04em]"
          : "n-book  tracking-[-0.03em] text-center text-[clamp(1.75rem,6.5vw,2.25rem)] whitespace-nowrap sm:whitespace-normal sm:text-4xl md:text-[clamp(2.25rem,4vw,2.85rem)] md:tracking-[-0.04em]",
      )}
    >
      {text}
    </p>
  );
}

export function DeveloperStatsSection({
  content,
  layout = "band",
  inlineColumns = 4,
  isBuyer: _isBuyer = false,
}: {
  content: StatsSectionContent;
  /** `band`: full stats section with surface + container (marketing pages). `inline`: grid only for embedding (e.g. About two-column). */
  layout?: "band" | "inline";
  /** When `layout` is `inline`, cap the grid at this many columns (`md` never exceeds 4). Ignored for `band`. */
  inlineColumns?: 2 | 4;
  /** Used by audience marketing pages; reserved for future buyer/developer styling. */
  isBuyer?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const metrics = content.metrics;

  const isTwoColInline = layout === "inline" && inlineColumns === 2;

  const gridClassName = cn(
    "w-full min-w-0",
    isTwoColInline
      ? "grid grid-cols-1 justify-items-stretch gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 md:grid-cols-2 lg:gap-x-14 lg:gap-y-16 fs-56 "
      : "grid grid-cols-1 gap-x-4 gap-y-0 sm:grid-cols-2 md:grid-cols-4",
  );

  const grid = (
    <div ref={ref} className={cn(gridClassName)}>
      {metrics.map((stat, idx) => (
        <div
          key={stat.label}
          className={cn(
            "flex min-h-0 min-w-0 flex-col",
            isTwoColInline
              ? "items-start gap-3 text-left"
              : "items-center justify-center px-4 py-0 text-center sm:px-8 md:px-6 lg:px-12",
            !isTwoColInline &&
            idx > 0 &&
            "relative md:before:absolute md:before:left-0 md:before:top-1/2 md:before:h-5.5 md:before:w-px md:before:-translate-y-1/2 md:before:bg-[#8F8183] md:before:content-['']",
          )}
        >
          <StatFigure
            stat={stat}
            index={idx}
            isInView={isInView}
            compact={isTwoColInline}
          />
          <p
            className={cn(
              isTwoColInline
                ? "max-w-[17rem] text-pretty text-sm leading-snug text-[#5f5a5b] n-book font-normal normal-case tracking-normal"
                : "fs-12 lh-20 n-bold uppercase leading-snug tracking-wide text-black whitespace-nowrap",
            )}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );

  if (layout === "inline") {
    return grid;
  }

  return (
    <SectionSurface
      aria-label="Key statistics"
      className="bg-transparent !my-0 !py-0"
    >
      {grid}
    </SectionSurface>
  );
}

// CHANGE: About page ke 4 leadership slides ke liye type.
export type LeadershipSlide = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  body: string;
  name: string;
  role: string;
  imagePositionClassName?: string;
};

// CHANGE: smooth slide timing.
const leadershipTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

// CHANGE: image transition.
const leadershipImageVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 20 : -20,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -20 : 20,
  }),
};

// CHANGE: title/body transition.
const leadershipTopVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 16 : -16,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -16 : 16,
  }),
};

/** Portrait frame for leadership carousel (design: 519×550). */
const LEADERSHIP_IMAGE_WIDTH = 519;
const LEADERSHIP_IMAGE_HEIGHT = 550;

// CHANGE: bottom name/role transition.
const leadershipBottomVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 12 : -12,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -12 : 12,
  }),
};

// CHANGE: same old about leadership layout rakha gaya hai.
// Sirf image/text switch hoga. Button same jagah par fixed rahega.
export function AboutLeadershipSection({
  slides,
}: {
  slides: readonly LeadershipSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const shouldReduceMotion = Boolean(useReducedMotion());

  if (slides.length === 0) return null;

  const activeSlide = slides[activeIndex]!;

  // CHANGE: same previous/next button logic.
  const moveBy = (step: 1 | -1) => {
    setDirection(step);

    startTransition(() => {
      setActiveIndex((current) => {
        const total = slides.length;
        return (current + step + total) % total;
      });
    });
  };

  return (
    <div className="mx-auto w-full min-w-0  bg-[#F2F2F2]">
      <div className=" border-[#000000]  ">
        <div
          className="p-2 grid gap-8 lg:grid-cols-[minmax(0,var(--leadership-image-w))_minmax(0,1fr)] lg:gap-10"
          style={
            {
              "--leadership-image-w": `${LEADERSHIP_IMAGE_WIDTH}px`,
            } as CSSProperties
          }
        >
          <div className="relative w-full pl-[20px] pt-[20px] pb-[20px]">
            <div
              className="relative w-full overflow-hidden bg-neutral-200/80"
              style={{
                aspectRatio: `${LEADERSHIP_IMAGE_WIDTH} / ${LEADERSHIP_IMAGE_HEIGHT}`,
              }}
            >
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={activeSlide.id}
                  custom={direction}
                  variants={shouldReduceMotion ? undefined : leadershipImageVariants}
                  initial={shouldReduceMotion ? false : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  transition={leadershipTransition}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeSlide.imageSrc}
                    alt={activeSlide.imageAlt}
                    fill
                    className={cn(
                      "object-cover",
                      activeSlide.imagePositionClassName,
                    )}
                    sizes={`(max-width: 1024px) 100vw, ${LEADERSHIP_IMAGE_WIDTH}px`}
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* dot wil work  */}
              <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5">
                {slides.map((slide, index) => (
                  <span
                    key={slide.id}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "h-1.5 w-6 bg-white"
                        : "h-1.5 w-1.5 bg-white/85",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/*  */}
          <div className="flex flex-col justify-between py-2 lg:py-6 md:mr-6">
            <div className="">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={`${activeSlide.id}-top`}
                  custom={direction}
                  variants={shouldReduceMotion ? undefined : leadershipTopVariants}
                  initial={shouldReduceMotion ? false : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  transition={leadershipTransition}
                >
                  <div className="flex items-start gap-4 ">
                    <Image
                      alt="quote"
                      src="/images/“.svg"
                      width={68}
                      height={85}
                      className="object-cover"
                      sizes="100px"
                    />
                    <span>
                      <h3 className="n-bold fs-42 lg:fs-42 lh-50 lg:lh-60 pl-4 pr-1">
                        {activeSlide.title}
                      </h3>


                    </span>
                  </div>
                  <p className="mt-7 max-w-[560px] fs-16 lh-24 n-book fw-100 leading-8 text-[#5d5859] sm:text-[15px] ">
                    {activeSlide.body}
                  </p>


                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 ">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={`${activeSlide.id}-bottom`}
                  custom={direction}
                  variants={shouldReduceMotion ? undefined : leadershipBottomVariants}
                  initial={shouldReduceMotion ? false : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  transition={leadershipTransition}
                  className="flex items-end justify-between gap-4"
                >
                  <div>
                    <p className="text-[clamp(2rem,2.6vw,2.7rem)] font-semibold text-[#2a2626]">
                      {activeSlide.name}
                    </p>
                    <p className=" fs18 n-bold uppercase tracking-[0.22em] text-[#867f80]">
                      {activeSlide.role}
                    </p>
                  </div>

                  <div className="font-serif text-[5.5rem] leading-none text-[#c8c5c6] sm:text-[6.5rem]">
                    <Image
                      alt="quote"
                      src="/images/“.svg"
                      width={68}
                      height={79}
                      className="object-cover transform -rotate-180"
                      sizes="100px"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* onclick logic*/}
            <div className=" flex items-center gap-8 text-[#a8a3a4] ">
              <button
                type="button"
                onClick={() => moveBy(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-current/50 bg-white/40"
                aria-label="Previous"
              >
                <Image
                  src={CAROUSEL_PREV}
                  alt=""
                  width={45}
                  height={45}
                  className="object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => moveBy(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-current/50 bg-white/40"
                aria-label="Next"
              >
                <Image
                  src={CAROUSEL_NEXT}
                  alt=""
                  width={45}
                  height={45}
                  className="object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
