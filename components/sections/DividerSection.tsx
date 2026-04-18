"use client";

import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export const DIVIDER_BANNER_SRC = "/images/Home/Banner1.svg";

/** Design + behavior notes: `docs/DividerSection.md` (avoid regressions). */

/** Figma “Selection colors”: #BCBDC0, #000000, #8F8183, #202225; surface #F2F2F2; linear gradient @ 20%. */

/* Full class strings so Tailwind can compile arbitrary values. */
const FIGMA_CARD_BG = "bg-[#F2F2F2]";
const FIGMA_TAUPE_TEXT = "text-[#8F8183]";

/** Figma linear gradient @ 20% (#BCBDC0 → #8F8183); static classes for Tailwind. */
const FIGMA_GRAD_OVERLAY_BUYER =
  "bg-[linear-gradient(90deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";
const FIGMA_GRAD_OVERLAY_DEVELOPER =
  "bg-[linear-gradient(270deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";

/* Figma: transparent fill, black border, charcoal label; “Know More” sentence case. */
const dividerCardCtaClassName = cn(
  "inline-flex items-center justify-center gap-2 rounded-none border border-[#000000] bg-transparent px-7 py-[0.875rem]",
  "n-bold text-[13px] leading-none tracking-normal text-[#202225]",
  "transition-colors duration-300 hover:bg-black/5",
);

// --- Fixed Profile Cards with 100% Height ---

function BuyerProfileCard({
  className,
  articleId,
}: {
  className?: string;
  articleId?: string;
}) {
  return (
    <article
      id={articleId}
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden",
        FIGMA_CARD_BG,
        className,
      )}
    >
      <div
        className={cn("pointer-events-none absolute inset-0 z-1", FIGMA_GRAD_OVERLAY_BUYER)}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[330px] flex-1 flex-col px-7 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8 lg:min-h-0 lg:h-full lg:flex-row lg:items-stretch lg:gap-0 lg:pb-0 lg:pl-10 lg:pr-0 lg:pt-6">
        <div className="flex w-full min-w-0 flex-1 flex-col items-start justify-between gap-6 self-stretch  lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%]">
          <Image
            src="/images/Buyer/Vector.svg"
            alt=""
            width={47}
            height={50}
            className={cn("h-[50px] w-[47px] shrink-0 object-contain ", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />

          <div className="text-left">
            <p className="n-bold text-xs uppercase tracking-[0.2em] text-[#000000]">
              I am a
            </p>
            <h3
              className={cn(
                "mt-2 qs-reg text-[clamp(2rem,4.2vw,2.875rem)] uppercase leading-[0.92] tracking-tight",
                FIGMA_TAUPE_TEXT,
              )}
            >
              Buyer
            </h3>
          </div>

          <Link href="/buyer" className={cn(dividerCardCtaClassName, "w-fit shrink-0 mb-5")}>
            Know More
            <IconArrowUpRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>

        <CardImageColumn
          portraitSrc="/images/Buyer/image 41.svg"
          patternSrc="/images/Buyer/Group 4.svg"
          portraitAlt="Professional representing property buyers"
          objectPositionClass="object-[right_bottom]"
        />
      </div>
    </article>
  );
}

function DeveloperProfileCard({
  className,
  articleId,
}: {
  className?: string;
  articleId?: string;
}) {
  return (
    <article
      id={articleId}
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden",
        FIGMA_CARD_BG,
        className,
      )}
    >
      <div
        className={cn("pointer-events-none absolute inset-0 z-1", FIGMA_GRAD_OVERLAY_DEVELOPER)}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[330px] flex-1 flex-col px-7 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8 lg:min-h-0 lg:h-full lg:flex-row-reverse lg:items-stretch lg:gap-0 lg:pb-0 lg:pl-0 lg:pr-10 lg:pt-6">
        <div className="flex w-full min-w-0 flex-1 flex-col items-end justify-between gap-6 self-stretch text-right lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:pb-6">
          <div className="flex shrink-0 items-center self-end">
            <Image
              src="/images/Developer/DeveloperFilterIcon.svg"
              alt=""
              width={47}
              height={50}
              className={cn("h-[50px] w-[47px] shrink-0 object-contain", FIGMA_TAUPE_TEXT)}
              aria-hidden
            />
          </div>

          <div>
            <p className="n-bold text-xs uppercase tracking-[0.2em] text-[#000000]">
              I am a
            </p>
            <h3
              className={cn(
                "mt-2 qs-reg text-[clamp(2rem,4.2vw,2.875rem)] uppercase leading-[0.92] tracking-tight",
                FIGMA_TAUPE_TEXT,
              )}
            >
              Developer
            </h3>
          </div>

          <Link href="/developer" className={cn(dividerCardCtaClassName, "w-fit shrink-0 self-end")}>
            Know More
            <IconArrowUpRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>

        <CardImageColumn
          portraitSrc="/images/Developer/image 42.svg"
          patternSrc="/images/Developer/Group 4.svg"
          portraitAlt="Professional representing real estate developers"
          objectPositionClass="object-[left_bottom]"
        />
      </div>
    </article>
  );
}

type CardImageColumnProps = {
  portraitSrc: string;
  patternSrc: string;
  portraitAlt: string;
  /** `object-position` for the portrait (bottom + toward center gutter). */
  objectPositionClass: string;
  className?: string;
};

function CardImageColumn({
  portraitSrc,
  patternSrc,
  portraitAlt,
  objectPositionClass,
  className,
}: CardImageColumnProps) {
  return (
    <div
      className={cn(
        "relative w-full min-h-[330px] shrink-0 overflow-hidden lg:flex lg:h-full lg:min-h-0 lg:w-1/2 lg:min-w-0 lg:max-w-[50%] lg:flex-col lg:self-stretch",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={patternSrc}
          alt=""
          fill
          className="object-cover opacity-[0.22] grayscale"
          sizes="(max-width: 1024px) 100vw, 25vw"
        />
      </div>
      {/* Full image column: `object-cover` fills height so people aren’t small vs `object-contain`. */}
      <div className="pointer-events-none absolute inset-0 z-1">
        <Image
          src={portraitSrc}
          alt={portraitAlt}
          fill
          className={cn(
            "rounded-none object-cover opacity-100 grayscale",
            objectPositionClass,
          )}
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
    </div>
  );
}

// --- Main Section ---

export function DividerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const clamp = { clamp: true } as const;

  /** Split completes in this window; values stay at end state after (clamp). */
  const leftSplitX = useTransform(smoothProgress, [0.2, 0.48], ["0%", "-100%"], clamp);
  const rightSplitX = useTransform(smoothProgress, [0.2, 0.48], ["0%", "100%"], clamp);
  const cardsScale = useTransform(smoothProgress, [0.2, 0.46], [0.92, 1], clamp);
  const cardsOpacity = useTransform(smoothProgress, [0.2, 0.46], [0, 1], clamp);

  /** After split + cards ramp, fade the banner layer out so cards are fully unobstructed. */
  const bannerLayerOpacity = useTransform(smoothProgress, [0.44, 0.62], [1, 0], clamp);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[180vh] bg-[#F2F2F2]"
    >
      <div className="sticky top-[200px] flex min-h-0 items-start justify-center overflow-hidden bg-[#F2F2F2] pt-0 pb-8 lg:min-h-[calc(100vh-200px)] lg:pb-12">
        {/* Full-bleed within max-w-brand: no horizontal padding so cards align with banner */}
        <Container className="relative w-full px-0 lg:min-h-0">
          {/* Top-aligned strip (avoids large empty bands vs vertically-centered mock). Cards + banner share one relative box. */}
          <div className="relative mx-auto w-full max-w-[1200px]">
            <div className="relative w-full">
              {/* Banner z-20 (above) so split + Banner1 image are visible; cards z-10 fade/scale in underneath. */}
              <motion.div
                style={{
                  scale: reduceMotion ? 1 : cardsScale,
                  opacity: reduceMotion ? 1 : cardsOpacity,
                }}
                className="relative z-10 grid min-h-0 min-w-0 grid-cols-1 grid-rows-2 items-stretch gap-2 overflow-hidden rounded-sm shadow-[0_2px_20px_rgba(0,0,0,0.06)] max-lg:scale-100! max-lg:opacity-100! lg:min-h-[400px] lg:grid-cols-2 lg:grid-rows-1 lg:gap-[40px]"
              >
                <BuyerProfileCard />
                <DeveloperProfileCard />
              </motion.div>

              {/* Split overlay: `gap-0` only here — full-bleed single image at x=0; cards use `lg:gap-[40px]` separately. */}
              <motion.div
                style={{ opacity: reduceMotion ? 0 : bannerLayerOpacity }}
                className="pointer-events-none absolute inset-0 z-20 hidden min-h-full min-w-0 grid-cols-2 gap-0 overflow-hidden rounded-sm lg:grid"
                aria-hidden
              >
                <motion.div
                  style={{ x: reduceMotion ? 0 : leftSplitX }}
                  className={cn(
                    "pointer-events-auto relative h-full min-h-0 min-w-0 overflow-hidden",
                    FIGMA_CARD_BG,
                  )}
                >
                  <div className="absolute inset-0 w-[200%] max-w-none">
                    <Image
                      src={DIVIDER_BANNER_SRC}
                      fill
                      className="object-cover"
                      alt=""
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </motion.div>

                <motion.div
                  style={{ x: reduceMotion ? 0 : rightSplitX }}
                  className={cn(
                    "pointer-events-auto relative h-full min-h-0 min-w-0 overflow-hidden",
                    FIGMA_CARD_BG,
                  )}
                >
                  <div className="absolute inset-0 -left-full w-[200%] max-w-none">
                    <Image
                      src={DIVIDER_BANNER_SRC}
                      fill
                      className="object-cover"
                      alt=""
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

        </Container>
      </div>
    </section>
  );
}