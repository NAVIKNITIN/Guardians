"use client";

import { Container } from "@/components/common/Container";
import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { cn } from "@/utils/cn";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clamp as clamp01, subscribeToScroll } from "@/utils/scroll";
import { DividerSectionDesktop } from "./divider-section/DividerSectionDesktop";
import { DividerSectionMobile } from "./divider-section/DividerSectionMobile";
export const DIVIDER_BANNER_SRC = "/images/Home/Banner1.svg";

export { DIVIDER_BANNER_SRC } from "./divider-section/DividerSectionCards";

/**
 * Renders **either** the desktop (`lg+`) or mobile scroll experience — separate components so
 * Framer ranges and DOM never mix. Until the viewport is known after mount, the desktop tree is
 * shown so SSR + first client paint match; narrow viewports switch to mobile in `useEffect`.
 */

const dividerKnowMoreButtonClassName = cn(
  "h-[43px] w-fit shrink-0 gap-2.5 rounded-none border border-[#202225] px-5 py-[15px]",
  "normal-case text-[14px] leading-[22px] tracking-normal text-[#000000] n-bold lg:text-[18px]",
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
        "relative flex h-full min-h-0 flex-col overflow-hidden",
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

          <OutlineArrowButton
            href="/buyer"
            className={dividerKnowMoreButtonClassName}
            iconClassName="h-[13px] w-[13px]"
            iconAlt=""
          >
            Know More
          </OutlineArrowButton>
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
        "relative flex h-full min-h-0 flex-col overflow-hidden",
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

          <OutlineArrowButton
            href="/developer"
            className={cn(dividerKnowMoreButtonClassName, "self-end")}
            iconClassName="h-[13px] w-[13px]"
            iconAlt=""
          >
            Know More
          </OutlineArrowButton>
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
  const [isLg, setIsLg] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (isLg !== false) {
    return <DividerSectionDesktop />;
  }

  return <DividerSectionMobile />;
}
