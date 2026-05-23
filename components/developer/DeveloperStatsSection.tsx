"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  IconChevronLeft,
  IconChevronRight,
} from "@/components/common/icons";
import { SectionSurface } from "@/components/ui/SectionSurface";
import {
  type DeveloperStat,
  type StatsSectionContent,
} from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import {
  startTransition,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const CAROUSEL_PREV = "/images/leftcarousel.svg";
const CAROUSEL_NEXT = "/images/rightcarousel.svg";

const bandValueClassName =
  "n-book tabular-nums text-center text-brand-footer leading-none tracking-[-0.03em] text-[clamp(1.35rem,5.5vw,2rem)] text-balance max-md:whitespace-normal md:whitespace-nowrap sm:text-4xl md:text-[clamp(2.25rem,4vw,2.85rem)] md:tracking-[-0.04em]";

export function StatFigure({
  stat,
  compact,
  centerOnMobile = false,
}: {
  stat: DeveloperStat;
  /**
   * About-page inline column: avoid viewport-`md:` sizing (numbers explode in a narrow grid cell).
   */
  compact?: boolean;
  centerOnMobile?: boolean;
}) {
  return (
    <p
      className={cn(
        compact
          ? cn(
            "n-bold max-w-full wrap-break-word whitespace-normal font-semibold leading-none tracking-[-0.04em] tabular-nums text-brand-footer",
            centerOnMobile
              ? "text-center max-lg:mx-auto lg:text-left"
              : "text-left",
            "text-[clamp(1.65rem,min(13cqw,4.2vw),2.65rem)]",
            "xl:text-[clamp(1.75rem,min(12cqw,3.4vw),2.85rem)]",
            "2xl:text-[clamp(1.85rem,min(11cqw,3vw),3rem)]",
          )
          : bandValueClassName,
      )}
    >
      {stat.value}
    </p>
  );
}

export type DeveloperStatsSectionProps = {
  content: StatsSectionContent;
  /** `band`: full stats section with surface + container (marketing pages). `inline`: grid only for embedding (e.g. About two-column). */
  layout?: "band" | "inline";
  /** When `layout` is `inline`, cap the grid at this many columns (`md` never exceeds 4). Ignored for `band`. */
  inlineColumns?: 2 | 4;
  /** Center stat figures and labels below `lg`. */
  centerOnMobile?: boolean;
  /** Used by audience marketing pages; reserved for future buyer/developer styling. */
  isBuyer?: boolean;
};

export function DeveloperStatsSection({
  content,
  layout = "band",
  inlineColumns = 4,
  centerOnMobile = false,
  isBuyer: _isBuyer = false,
}: DeveloperStatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const metrics = content.metrics;

  const isTwoColInline = layout === "inline" && inlineColumns === 2;

  const gridClassName = cn(
    "w-full min-w-0",
    isTwoColInline
      ? cn(
        "grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 md:grid-cols-2 lg:gap-x-14 lg:gap-y-16",
        centerOnMobile
          ? "justify-items-center max-lg:justify-items-center lg:justify-items-stretch"
          : "justify-items-stretch",
      )
      : cn(
        "grid w-full auto-rows-fr grid-cols-1 items-stretch gap-y-10",
        "sm:grid-cols-2 sm:gap-y-12",
        "md:grid-cols-4 md:gap-y-0",
      ),
  );

  const grid = (
    <div ref={ref} className={cn(gridClassName)}>
      {metrics.map((stat, idx) => (
        <ScrollReveal key={stat.label} direction="up" distance={24} delay={idx * 0.05}>
          <div
            className={cn(
              "flex min-h-0 min-w-0 flex-col",
              isTwoColInline
                ? cn(
                  "gap-3",
                  centerOnMobile
                    ? "items-center text-center max-lg:mx-auto lg:items-start lg:text-left"
                    : "items-start text-left",
                )
                : cn(
                  "relative h-full w-full min-w-0 items-center text-center",
                  "px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5",
                  "max-md:even:before:absolute max-md:even:before:left-0 max-md:even:before:top-1/2 max-md:even:before:z-10 max-md:even:before:h-5.5 max-md:even:before:w-px max-md:even:before:-translate-y-1/2 max-md:even:before:bg-[#8F8183] max-md:even:before:content-['']",
                  idx > 0 &&
                  "md:before:absolute md:before:left-0 md:before:top-1/2 md:before:z-10 md:before:h-5.5 md:before:w-px md:before:-translate-y-1/2 md:before:bg-[#8F8183] md:before:content-['']",
                ),
            )}
          >
            {isTwoColInline ? (
              <>
                <StatFigure
                  stat={stat}
                  compact
                  centerOnMobile={centerOnMobile}
                />
                <p
                  className={cn(
                    "max-w-68 text-pretty text-sm leading-snug text-[#5f5a5b] n-book font-normal normal-case tracking-normal",
                    centerOnMobile && "max-lg:mx-auto max-lg:text-center",
                  )}
                >
                  {stat.label}
                </p>
              </>
            ) : (
              <div className="flex w-full min-w-0 flex-col items-center gap-1 md:gap-1.5">
                <StatFigure stat={stat} />
                <p className="w-full max-w-full shrink-0 fs-12 lh-20 n-bold text-center uppercase leading-snug tracking-wide text-pretty text-black">
                  {stat.label}
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );

  if (layout === "inline") {
    return grid;
  }

  return (
    <SectionSurface
      aria-label="Key statistics"
      className="w-full bg-transparent my-0! py-0!"
      containerClassName="w-full max-w-none !px-0"
    >
      {grid}
    </SectionSurface>
  );
}

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

const leadershipTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

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
          <div className="relative mx-auto w-full max-w-[min(100%,519px)] px-4 pt-4 pb-4 lg:max-w-none lg:px-0 lg:pl-[20px] lg:pt-[20px] lg:pb-[20px]">
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
          <div className="flex flex-col justify-between py-2 max-lg:items-center max-lg:text-center lg:py-6 md:mr-6 lg:items-stretch lg:text-left">
            <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={`${activeSlide.id}-top`}
                  custom={direction}
                  variants={shouldReduceMotion ? undefined : leadershipTopVariants}
                  initial={shouldReduceMotion ? false : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  transition={leadershipTransition}
                  className="w-full max-lg:flex max-lg:flex-col max-lg:items-center"
                >
                  <div className="flex items-start gap-4 max-lg:flex-col max-lg:items-center max-lg:gap-3">
                    <Image
                      alt="quote"
                      src="/images/“.svg"
                      width={68}
                      height={85}
                      className="object-cover max-lg:h-[56px] max-lg:w-[44px]"
                      sizes="100px"
                    />
                    <h3 className="n-bold max-w-[560px] text-balance text-[clamp(1.35rem,4.5vw,2.625rem)] leading-[1.15] text-[#161616] max-lg:px-2 lg:fs-42 lg:lh-60 lg:pl-4 lg:pr-1">
                      {activeSlide.title}
                    </h3>
                  </div>
                  <p className="mt-5 max-w-[560px] text-pretty n-book text-sm leading-[1.55] text-[#5d5859] max-lg:px-3 sm:mt-7 sm:text-[15px] lg:fs-16 lg:lh-24">
                    {activeSlide.body}
                  </p>


                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 w-full sm:mt-10">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={`${activeSlide.id}-bottom`}
                  custom={direction}
                  variants={shouldReduceMotion ? undefined : leadershipBottomVariants}
                  initial={shouldReduceMotion ? false : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  transition={leadershipTransition}
                  className="flex items-end justify-between gap-4 max-lg:flex-col max-lg:items-center max-lg:text-center"
                >
                  <div>
                    <p className="text-[clamp(1.5rem,5vw,2.7rem)] font-semibold leading-tight text-brand-footer-dark">
                      {activeSlide.name}
                    </p>
                    <p className="mt-1 n-bold text-sm uppercase tracking-[0.18em] text-[#867f80] sm:fs18 sm:tracking-[0.22em]">
                      {activeSlide.role}
                    </p>
                  </div>

                  <div className="hidden leading-none text-[#c8c5c6] sm:block sm:text-[6.5rem] lg:font-serif">
                    <Image
                      alt=""
                      src="/images/“.svg"
                      width={68}
                      height={79}
                      className="object-cover -rotate-180"
                      sizes="100px"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* onclick logic*/}
            <div className="mt-6 flex items-center justify-center gap-8 text-[#a8a3a4] lg:mt-0 lg:justify-start">
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
