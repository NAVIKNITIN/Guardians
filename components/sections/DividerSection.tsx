"use client";

import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconCrane } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export const DIVIDER_BANNER_SRC = "/images/Home/Banner1.svg";

const BANNER_WIDTH = 1196;
const BANNER_HEIGHT = 350;
const BANNER_ASPECT_PADDING_PCT = (BANNER_HEIGHT / BANNER_WIDTH) * 100;
const BANNER_MAX_HEIGHT = 460;

const LEFT_CLOSED_CLIP = "polygon(0 0, 50% 0, 50% 100%, 0 100%)";
const RIGHT_CLOSED_CLIP = "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)";

const LEFT_TORN_CLIP = "polygon(0 0, 50% 0, 50% 72%, 37% 100%, 0 100%)";
const RIGHT_TORN_CLIP = "polygon(50% 0, 100% 0, 100% 100%, 63% 100%, 50% 72%)";

const SPLIT_DURATION = 0.24;
const SLIDE_DURATION = 0.4;
const FLIP_DURATION = 0.42;

const SLIDE_DELAY = 0.18;
const FLIP_DELAY = 0.62;
const PIECE_FADE_DELAY = 0.96;

const BANNER_FADE_DELAY = 0.96;
const BANNER_COLLAPSE_DELAY = 1.02;

const CARD_LEFT_DELAY = 1.2;
const CARD_RIGHT_DELAY = 1.32;

const dividerCardCtaClassName = cn(
  "inline-flex items-center justify-center gap-2 rounded-none border border-neutral-900 bg-white px-6 py-3",
  "font-nexa text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900",
  "transition-colors duration-300 hover:bg-neutral-900 hover:text-white",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
);

function CardImageColumn({
  portraitSrc,
  patternSrc,
  portraitAlt,
  objectPositionClass,
  className,
}: {
  portraitSrc: string;
  patternSrc: string;
  portraitAlt: string;
  objectPositionClass: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mt-8 h-48 w-full shrink-0 overflow-hidden sm:h-56 lg:mt-0 lg:flex lg:h-auto lg:min-h-0 lg:w-2/5 lg:flex-col lg:self-stretch lg:overflow-visible",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 z-0 max-lg:inset-y-0 lg:bottom-0 lg:-top-8">
        <Image
          src={patternSrc}
          alt=""
          fill
          className="object-cover object-center opacity-40 grayscale"
          sizes="(max-width: 1024px) 100vw, 40vw"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative min-h-[12rem] flex-1 sm:min-h-[14rem] lg:min-h-[280px]">
          <Image
            src={portraitSrc}
            alt={portraitAlt}
            fill
            className={cn(
              "object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]",
              objectPositionClass,
            )}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </div>
  );
}

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
        "group relative overflow-hidden rounded-sm border border-neutral-300/90 bg-[#e8e8e8] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row lg:items-stretch lg:px-8 lg:pt-8 lg:pb-0">
        <div className="flex flex-1 flex-col justify-between gap-8 lg:pb-8">
          <Image
            src="/images/Buyer/BuyerVector.svg"
            alt=""
            width={47}
            height={50}
            className="h-[50px] w-[47px] shrink-0 object-cover brightness-0"
            aria-hidden
          />

          <div>
            <p className="font-nexa text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              I am a
            </p>
            <h3 className="mt-1 qs-reg text-[clamp(2rem,4.5vw,3rem)] font-normal uppercase leading-none tracking-tight text-neutral-950">
              Buyer
            </h3>
          </div>

          <Link href="/buyer" className={cn(dividerCardCtaClassName, "w-fit")}>
            Know More
            <IconArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <CardImageColumn
          portraitSrc="/images/Buyer/image 41.svg"
          patternSrc="/images/Buyer/Group 4.svg"
          portraitAlt="Smiling professional representing property buyers"
          objectPositionClass="object-[center_22%] sm:object-right"
          className="lg:ml-4"
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
        "group relative overflow-hidden rounded-sm border border-neutral-300/90 bg-[#e8e8e8] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row-reverse lg:items-stretch lg:px-8 lg:pt-8 lg:pb-0">
        <div className="flex flex-1 flex-col justify-between gap-8 lg:items-end lg:pb-8 lg:text-right">
          <IconCrane className="h-[50px] w-[47px] shrink-0 text-neutral-800 lg:self-end" />

          <div>
            <p className="font-nexa text-xs font-medium uppercase tracking-[0.2em] text-neutral-600 lg:text-right">
              I am a
            </p>
            <h3 className="mt-1 qs-reg text-[clamp(2rem,4.5vw,3rem)] font-normal uppercase leading-none tracking-tight text-neutral-950 lg:text-right">
              Developer
            </h3>
          </div>

          <Link
            href="/developer"
            className={cn(dividerCardCtaClassName, "w-fit lg:self-end")}
          >
            Know More
            <IconArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <CardImageColumn
          portraitSrc="/images/Developer/image 42.svg"
          patternSrc="/images/Developer/Group 4.svg"
          portraitAlt="Smiling professional representing real estate developers"
          objectPositionClass="object-[center_22%] sm:object-left"
          className="lg:mr-4"
        />
      </div>
    </article>
  );
}

function BannerHalf({
  side,
  active,
  reduceMotion,
}: {
  side: "left" | "right";
  active: boolean;
  reduceMotion: boolean;
}) {
  const isLeft = side === "left";
  const shouldAnimate = active && !reduceMotion;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-sm"
      initial={false}
      animate={{
        clipPath: shouldAnimate
          ? isLeft
            ? LEFT_TORN_CLIP
            : RIGHT_TORN_CLIP
          : isLeft
            ? LEFT_CLOSED_CLIP
            : RIGHT_CLOSED_CLIP,
        x: shouldAnimate ? (isLeft ? -150 : 150) : 0,
      }}
      transition={{
        clipPath: {
          duration: reduceMotion ? 0.01 : shouldAnimate ? SPLIT_DURATION : 0.16,
          ease: [0.33, 1, 0.68, 1],
        },
        x: {
          duration: reduceMotion ? 0.01 : shouldAnimate ? SLIDE_DURATION : 0.2,
          delay: reduceMotion ? 0 : shouldAnimate ? SLIDE_DELAY : 0,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      style={{ willChange: "clip-path, transform" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          rotateY: shouldAnimate ? (isLeft ? -92 : 92) : 0,
          rotateZ: shouldAnimate ? (isLeft ? -2.5 : 2.5) : 0,
          opacity: shouldAnimate ? 0 : 1,
        }}
        transition={{
          rotateY: {
            duration: reduceMotion ? 0.01 : shouldAnimate ? FLIP_DURATION : 0.2,
            delay: reduceMotion ? 0 : shouldAnimate ? FLIP_DELAY : 0,
            ease: [0.22, 1, 0.36, 1],
          },
          rotateZ: {
            duration: reduceMotion ? 0.01 : shouldAnimate ? FLIP_DURATION : 0.2,
            delay: reduceMotion ? 0 : shouldAnimate ? FLIP_DELAY : 0,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: reduceMotion ? 0.01 : shouldAnimate ? 0.12 : 0.16,
            delay: reduceMotion ? 0 : shouldAnimate ? PIECE_FADE_DELAY : 0,
            ease: "easeOut",
          },
        }}
        style={{
          transformOrigin: isLeft ? "left center" : "right center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src={DIVIDER_BANNER_SRC}
          alt=""
          fill
          className="select-none object-cover object-center"
          sizes="(max-width: 1440px) 100vw, 90rem"
          unoptimized
          priority
        />

        <div
          className={cn(
            "absolute inset-y-0 w-12",
            isLeft
              ? "right-0 bg-gradient-to-r from-transparent to-black/20"
              : "left-0 bg-gradient-to-l from-transparent to-black/20",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function AnimatedCards({
  active,
  reduceMotion,
  className,
}: {
  active: boolean;
  reduceMotion: boolean;
  className?: string;
}) {
  const buyerHidden = reduceMotion
    ? { opacity: 1, rotateY: 0, x: 0 }
    : { opacity: 0, rotateY: -90, x: -24 };

  const developerHidden = reduceMotion
    ? { opacity: 1, rotateY: 0, x: 0 }
    : { opacity: 0, rotateY: 90, x: 24 };

  const visible = { opacity: 1, rotateY: 0, x: 0 };

  return (
    <div className={cn("grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-6", className)}>
      <div className="[perspective:1800px]">
        <motion.div
          initial={false}
          animate={active ? visible : buyerHidden}
          transition={{
            duration: reduceMotion ? 0.01 : active ? 0.56 : 0.18,
            delay: reduceMotion ? 0 : active ? CARD_LEFT_DELAY : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform, opacity",
          }}
        >
          <BuyerProfileCard articleId="buyer" />
        </motion.div>
      </div>

      <div className="[perspective:1800px]">
        <motion.div
          initial={false}
          animate={active ? visible : developerHidden}
          transition={{
            duration: reduceMotion ? 0.01 : active ? 0.56 : 0.18,
            delay: reduceMotion ? 0 : active ? CARD_RIGHT_DELAY : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform, opacity",
          }}
        >
          <DeveloperProfileCard articleId="developer" />
        </motion.div>
      </div>
    </div>
  );
}

export function DividerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, {
    amount: 0.35,
    margin: "-10% 0px -10% 0px",
  });

  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(reduceMotion);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={cn(
        "relative py-0",
        "bg-white",
        "[background-image:radial-gradient(#d4d4d4_0.65px,transparent_0.65px)] [background-size:14px_14px]",
      )}
      aria-labelledby="divider-cards-heading"
    >
      <h2 id="divider-cards-heading" className="sr-only">
        Buyer and developer journeys
      </h2>

      <Container className="py-10 sm:py-12 lg:py-14">
        <div className="relative w-full">
          <div
            className="overflow-hidden"
            style={{
              maxHeight: inView ? "0px" : `${BANNER_MAX_HEIGHT}px`,
              opacity: inView ? 0 : 1,
              transition: shouldReduceMotion
                ? "max-height 0.01s linear, opacity 0.01s linear"
                : inView
                  ? `max-height 0.42s cubic-bezier(0.22,1,0.36,1) ${BANNER_COLLAPSE_DELAY}s, opacity 0.14s linear ${BANNER_FADE_DELAY}s`
                  : "max-height 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.18s linear",
            }}
          >
            <div className="relative [perspective:2200px]">
              <div className="relative w-full overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 shadow-[0_1px_0_0_rgb(0_0_0_/0.06)]">
                <div
                  className="w-full"
                  style={{ paddingBottom: `${BANNER_ASPECT_PADDING_PCT}%` }}
                />

                <BannerHalf
                  side="left"
                  active={inView}
                  reduceMotion={shouldReduceMotion}
                />
                <BannerHalf
                  side="right"
                  active={inView}
                  reduceMotion={shouldReduceMotion}
                />
              </div>
            </div>
          </div>

          <AnimatedCards
            className="mt-6"
            active={inView}
            reduceMotion={shouldReduceMotion}
          />
        </div>
      </Container>
    </section>
  );
}