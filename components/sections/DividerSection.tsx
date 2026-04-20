"use client";

import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { clamp as clamp01, subscribeToScroll } from "@/utils/scroll";
export const DIVIDER_BANNER_SRC = "/images/Home/Banner1.svg";

/** Design + behavior notes: `docs/DividerSection.md` (avoid regressions). */

/** Figma "Selection colors": #BCBDC0, #000000, #8F8183, #202225; surface #F2F2F2; linear gradient @ 20%. */

/* Full class strings so Tailwind can compile arbitrary values. */
const FIGMA_CARD_BG = "bg-[#F2F2F2]";
const FIGMA_TAUPE_TEXT = "text-[#8F8183]";

/** Figma linear gradient @ 20% (#BCBDC0 → #8F8183); static classes for Tailwind. */
const FIGMA_GRAD_OVERLAY_BUYER =
  "bg-[linear-gradient(70deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";
const FIGMA_GRAD_OVERLAY_DEVELOPER =
  "bg-[linear-gradient(250deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";

/** Row height cap; cards stretch to fill each grid column (full width of container, not fixed 578px). */
const FIGMA_CARD_SIZE = "w-full min-w-0 lg:max-h-[350px]";

/**
 * Card layout (desktop): two columns per card, 50% / 50% (text vs portrait).
 * Row: Buyer | Developer fill the grid (full container width); 20px gap. Banner overlay gap-0.
 */

/* Figma: transparent fill, black border, charcoal label; "Know More" sentence case. */
const dividerCardCtaClassName = cn(
  "inline-flex items-center justify-center gap-2.5 rounded-none border border-[#202225] bg-transparent px-5 py-[15px]",
  "n-bold text-[14px] leading-[22px] tracking-normal text-[#000000] lg:text-[18px]",
  "transition-colors duration-300 hover:bg-black/5 h-[43px]",
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
        FIGMA_CARD_SIZE,
        FIGMA_CARD_BG,
        className,
      )}
    >
      {/*
       * Guardian pattern — Figma: left:-284px top:-81px, height:637px in 578×350 card.
       * Buyer is mirrored (right side). h-[182%] = 637px at 350px card height; w-auto keeps
       * the SVG’s natural aspect ratio so it never stretches.
       */}

      <Image
        src="/images/image_1.svg"
        alt=""
        width={275}
        height={350}
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-auto w-auto -translate-y-1/2 select-none"
      />

      {/* Gradient overlay */}
      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_BUYER)}
        aria-hidden
      />

      {/* Content — text LEFT (50%), image RIGHT (50%) */}
      <div className="relative z-10 flex min-h-[300px] flex-1 flex-col px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:min-h-0 lg:h-full lg:flex-row lg:items-stretch lg:gap-0 lg:px-0 lg:pb-0 lg:pt-5">
        {/* Text column — 50% on desktop */}
        <div className="flex w-full min-w-0 flex-1 flex-col items-start justify-between gap-6 self-stretch px-0 lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:pl-8 lg:pr-4 lg:pb-[30px]">
          <Image
            src="/images/Buyer/Vector.svg"
            alt=""
            width={48}
            height={50}
            className={cn("h-[50px] w-[48px] shrink-0 object-contain", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />

          <div className="text-left">
            <p className="n-bold text-sm uppercase tracking-[0.1em] text-[#000000] lg:text-[24px]">
              I am a
            </p>
            <h3
              className={cn(
                "mt-1 qs-reg text-[clamp(1.875rem,3vw,2.625rem)] uppercase leading-[0.9] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              Buyer
            </h3>
          </div>

          <Link href="/buyer" className={cn(dividerCardCtaClassName, "w-fit shrink-0")}>
            Know More
            <IconArrowUpRight className="h-[13px] w-[13px] shrink-0" />
          </Link>
        </div>

        {/* Image column — 50% on desktop, right side */}
        <CardImageColumn
          portraitSrc="/images/Buyer/image 41.svg"
          portraitAlt="Professional representing property buyers"
          objectPositionClass="object-right"
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
        FIGMA_CARD_SIZE,
        FIGMA_CARD_BG,
        className,
      )}
    >
      {/*
       * Guardian pattern — Figma: left:-284px top:-81px, height:637px in 578×350 card.
       * h-[182%] = 637px at 350px card height; w-auto keeps the SVG’s natural aspect
       * ratio so it never stretches. Card’s overflow-hidden clips the excess.
       */}
      <Image
        src="/images/image_2.svg"
        alt=""
        width={275}
        height={350}
        unoptimized
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-auto w-auto -translate-y-1/2 select-none"
      />

      {/* Gradient overlay */}
      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_DEVELOPER)}
        aria-hidden
      />

      {/* Content — image LEFT (50%), text RIGHT (50%) via flex-row-reverse */}
      <div className="relative z-10 flex min-h-[300px] flex-1 flex-col px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:min-h-0 lg:h-full lg:flex-row-reverse lg:items-stretch lg:gap-0 lg:px-0 lg:pb-0 lg:pt-5">
        {/* Text column — 50% on desktop, right side */}
        <div className="flex w-full min-w-0 flex-1 flex-col items-end justify-between gap-6 self-stretch px-0 text-right lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:pl-4 lg:pr-8 lg:pb-[30px]">
          <Image
            src="/images/Developer/DeveloperFilterIcon.svg"
            alt=""
            width={48}
            height={50}
            className={cn("h-[50px] w-[48px] shrink-0 object-contain self-end", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />

          <div>
            <p className="n-bold text-sm uppercase tracking-[0.1em] text-[#000000] lg:text-[24px]">
              I am a
            </p>
            <h3
              className={cn(
                "mt-1 qs-reg text-[clamp(1.875rem,3vw,2.625rem)] uppercase leading-[0.9] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              Developer
            </h3>
          </div>

          <Link href="/developer" className={cn(dividerCardCtaClassName, "w-fit shrink-0 self-end")}>
            Know More
            <IconArrowUpRight className="h-[13px] w-[13px] shrink-0" />
          </Link>
        </div>

        {/* Image column — 50% on desktop, left side */}
        <CardImageColumn
          portraitSrc="/images/Developer/image 42.svg"
          portraitAlt="Professional representing real estate developers"
          objectPositionClass="object-left"
        />
      </div>
    </article>
  );
}

type CardImageColumnProps = {
  portraitSrc: string;
  portraitAlt: string;
  objectPositionClass: string;
  className?: string;
};

/**
 * Image column — 50% of card width on desktop.
 * On mobile it stacks below the text and takes full width.
 */
function CardImageColumn({
  portraitSrc,
  portraitAlt,
  objectPositionClass,
  className,
}: CardImageColumnProps) {
  return (
    <div
      className={cn(
        "relative w-full min-h-[220px] shrink-0 overflow-hidden",
        "lg:flex-none lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:self-stretch",
        className,
      )}
    >
      <Image
        src={portraitSrc}
        alt={portraitAlt}
        fill
        className={cn(
          "object-cover grayscale mix-blend-multiply",
          objectPositionClass,
        )}
        sizes="(max-width: 1024px) 100vw, 25vw"
      />
    </div>
  );
}

// --- Main Section ---

export function DividerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Progress 0→1 while scrolling through this section’s track — same model as StickyScrollFillSection.
   * Framer’s `useScroll` + `["start end","end start"]` does not line up with the CSS sticky pin window;
   * tying progress to `(scrollY - offsetTop) / (sectionHeight - usableViewport)` keeps split/cards/banner
   * in sync with the period the block is stuck under the header.
   */
  const sectionProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY;
      const offsetTop = rect.top + scrollY;
      const vh = window.innerHeight;
      const headerPx =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--site-header-height"),
        ) || 118;
      const usableVh = Math.max(1, vh - headerPx);
      const range = Math.max(1, el.offsetHeight - usableVh);
      const p = clamp01((scrollY - offsetTop) / range, 0, 1);
      sectionProgress.set(p);
    };

    return subscribeToScroll(update);
  }, [sectionProgress]);

  /**
   * Stiff spring: eases tiny jitter / steppy frames without the old loose spring lag.
   * Reduced motion: follow scroll exactly (no spring).
   */
  const springProgress = useSpring(sectionProgress, {
    stiffness: 520,
    damping: 52,
    mass: 0.12,
    restDelta: 0.0005,
  });
  const drive = reduceMotion ? sectionProgress : springProgress;

  const transformClamp = { clamp: true } as const;

  /** Split / cards / banner — slightly wider windows + tall track = smoother, longer scrub. */
  const leftSplitX = useTransform(drive, [0.08, 0.58], ["0%", "-100%"], transformClamp);
  const rightSplitX = useTransform(drive, [0.08, 0.58], ["0%", "100%"], transformClamp);
  const cardsScale = useTransform(drive, [0.08, 0.54], [0.92, 1], transformClamp);
  const cardsOpacity = useTransform(drive, [0.08, 0.54], [0, 1], transformClamp);

  /** After split + cards ramp, fade the banner layer out so cards are fully unobstructed. */
  const bannerLayerOpacity = useTransform(drive, [0.46, 0.76], [1, 0], transformClamp);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[320vh] bg-[#F2F2F2]"
    >
      <div
        className="sticky flex min-h-0 w-full items-center justify-center overflow-hidden bg-[#F2F2F2] pb-0"
        style={{
          top: "var(--site-header-height)",
          minHeight: "calc(100dvh - var(--site-header-height))",
        }}
      >
        {/* Full-bleed within max-w-brand: no horizontal padding so cards align with banner */}
        <Container className="relative w-full px-0 lg:min-h-0">
          {/* Cards + split banner share one relative box; sticky frame centers this block in the viewport below the nav */}
          <div className="relative w-full">
            <div className="relative w-full">
              {/* Cards at z-10; banner split overlay at z-20 above */}
              <motion.div
                style={{
                  scale: reduceMotion ? 1 : cardsScale,
                  opacity: reduceMotion ? 1 : cardsOpacity,
                }}
                className="relative z-10 grid min-h-0 min-w-0 grid-cols-1 grid-rows-2 items-stretch gap-[20px] overflow-hidden rounded-sm max-lg:scale-100! max-lg:opacity-100! lg:max-h-[350px] lg:min-h-[350px] lg:grid-cols-2 lg:grid-rows-1 lg:gap-[20px]"
              >
                <BuyerProfileCard />
                <DeveloperProfileCard />
              </motion.div>

              {/* Split overlay — gap-0: seamless single image; halves translate apart on scroll */}
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
