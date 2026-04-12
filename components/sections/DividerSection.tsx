"use client";

import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconCrane } from "@/components/common/icons";
import { primaryCtaClassName } from "@/styles/buttonStyles";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Same asset as the original divide strip — tear animation uses this only (no duplicate banner). */
export const DIVIDER_BANNER_SRC = "/images/Home/Banner1.svg";
const BANNER_WIDTH = 1196;
const BANNER_HEIGHT = 350;

/** Polygon samples along the seam — higher = smoother torn curve. */
const TEAR_STEPS = 52;

/**
 * Independent irregular edge for the left sheet (right boundary). Not mirrored with `tearR`
 * so the tear reads like real fibrous paper, not a single folded line.
 */
function tearL(yPercent: number): number {
  const t = (yPercent / 100) * TEAR_STEPS;
  return (
    Math.sin(t * 0.67) * 1.85 +
    Math.sin(t * 1.91 + 0.4) * 1.12 +
    Math.sin(t * 3.52) * 0.62 +
    Math.sin(t * 5.18 + 1.1) * 0.38 +
    Math.sin(t * 8.05) * 0.26 +
    Math.sin(t * 12.9) * 0.16 +
    Math.sin(t * 17.3 + 0.7) * 0.11 +
    Math.sin(t * 23.1) * 0.07
  );
}

/** Independent edge for the right sheet (left boundary) — different weights/phases = asymmetric tear. */
function tearR(yPercent: number): number {
  const t = (yPercent / 100) * TEAR_STEPS;
  return (
    Math.sin(t * 0.71 + 1.15) * 1.78 +
    Math.sin(t * 1.84) * 1.08 +
    Math.sin(t * 3.61 + 0.9) * 0.58 +
    Math.sin(t * 5.77) * 0.41 +
    Math.sin(t * 7.9 + 2.2) * 0.24 +
    Math.sin(t * 14.4) * 0.14 +
    Math.sin(t * 19.8 + 0.3) * 0.09 +
    Math.sin(t * 26.2) * 0.06
  );
}

/** Micro “teeth” — sharp local notches along the ragged path. */
function tearMicro(yPercent: number): number {
  const t = (yPercent / 100) * TEAR_STEPS;
  return (
    Math.sin(t * 9.7 + 0.5) * 0.55 +
    Math.sin(t * 15.2) * 0.35 +
    Math.sin(t * 21.6 + 1.8) * 0.22
  );
}

/**
 * 1 at top & bottom, 0 at vertical middle — widens the white gap toward the ends (bow / hourglass gap),
 * like torn paper opening more at the corners of the slit.
 */
function gapBow(yPercent: number): number {
  return Math.abs(Math.cos((Math.PI * yPercent) / 100));
}

/**
 * Parent-space δ from centerline (half-banner units). Left/right use different noise + bow so edges
 * don’t mirror; bow separates the two sides more at y≈0 and y≈100 than at y≈50.
 */
function deltaLeftEdge(y: number): number {
  const bow = gapBow(y);
  return tearL(y) * 0.0115 + tearMicro(y) * 0.0042 - bow * 0.024;
}

function deltaRightEdge(y: number): number {
  const bow = gapBow(y);
  return tearR(y) * 0.0115 + tearMicro(y + 3.7) * 0.0042 + bow * 0.024;
}

/** Jagged right boundary of left panel as a number (local %). */
function seamRightEdgeLeftJaggedPct(y: number): number {
  const x = 100 + deltaLeftEdge(y) * 200;
  return Math.min(118, Math.max(82, x));
}

/** Jagged left boundary of right panel as a number (local %). */
function seamLeftEdgeRightJaggedPct(y: number): number {
  const x = 0 + deltaRightEdge(y) * 200;
  return Math.min(22, Math.max(-6, x));
}

function seamRightEdgeLeftPanel(y: number): string {
  return `${seamRightEdgeLeftJaggedPct(y).toFixed(3)}%`;
}

function seamLeftEdgeRightPanel(y: number): string {
  return `${seamLeftEdgeRightJaggedPct(y).toFixed(3)}%`;
}

/** Blend straight seam (t=0) → full jagged tear (t=1). */
function seamRightEdgeLeftBlend(y: number, t: number): string {
  const j = seamRightEdgeLeftJaggedPct(y);
  const x = 100 + (j - 100) * t;
  return `${x.toFixed(3)}%`;
}

function seamLeftEdgeRightBlend(y: number, t: number): string {
  const j = seamLeftEdgeRightJaggedPct(y);
  const x = 0 + (j - 0) * t;
  return `${x.toFixed(3)}%`;
}

/** Left half clip; `tear` 0 = one seamless rectangle (straight center), 1 = full ragged cut. */
function buildTearLeftPolygon(tear: number): string {
  const t = Math.min(1, Math.max(0, tear));
  const pts: string[] = ["0% 0%", `${seamRightEdgeLeftBlend(0, t)} 0%`];
  for (let i = 1; i <= TEAR_STEPS; i++) {
    const y = (i / TEAR_STEPS) * 100;
    pts.push(`${seamRightEdgeLeftBlend(y, t)} ${y.toFixed(2)}%`);
  }
  pts.push("0% 100%", "0% 0%");
  return `polygon(${pts.join(", ")})`;
}

function buildTearRightPolygon(tear: number): string {
  const t = Math.min(1, Math.max(0, tear));
  const pts: string[] = ["100% 0%", "100% 100%"];
  for (let i = TEAR_STEPS; i >= 0; i--) {
    const y = (i / TEAR_STEPS) * 100;
    pts.push(`${seamLeftEdgeRightBlend(y, t)} ${y.toFixed(2)}%`);
  }
  pts.push("100% 0%");
  return `polygon(${pts.join(", ")})`;
}

/** Fraction of the pinned timeline spent showing a closed, seamless banner before tear + slide. */
const TEAR_HOLD = 0.22;
const TEAR_ANIM = 1 - TEAR_HOLD;

function pinnedScrollEnd(): string {
  if (typeof window === "undefined") return "+=2000";
  return `+=${window.innerHeight * 2}`;
}

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
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 z-0 max-lg:inset-y-0 lg:bottom-0 lg:-top-8",
        )}
      >
        <Image
          src={patternSrc}
          alt=""
          fill
          className="object-cover object-center"
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

function ProfileCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-2 lg:gap-8", className)}>
      <article
        id="buyer"
        className="group relative overflow-hidden rounded-sm border border-brand-border bg-brand-background shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row lg:items-stretch lg:px-8 lg:pt-8 lg:pb-0">
          <div className="flex flex-1 flex-col justify-between gap-8 lg:pb-8">
            <Image
              src="/images/Buyer/BuyerVector.svg"
              alt=""
              width={47}
              height={50}
              className="h-[50px] w-[47px] shrink-0"
              aria-hidden
            />

            <div>
              <h3 className="text-2xl font-normal tracking-tight text-brand-text-primary sm:text-3xl lg:text-4xl">
                I AM A
                <br />
                <span className="font-qasbyne text-brand-accent">BUYER</span>
              </h3>
            </div>
            <Link
              href="/buyer"
              className={cn(
                primaryCtaClassName,
                "w-fit rounded-none border border-brand-text-primary bg-white text-brand-text-primary shadow-none hover:bg-brand-text-primary hover:text-white",
              )}
            >
              Know more
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

      <article
        id="developer"
        className="group relative overflow-hidden rounded-sm border border-brand-border bg-brand-background shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row-reverse lg:items-stretch lg:px-8 lg:pt-8 lg:pb-0">
          <div className="flex flex-1 flex-col justify-between gap-8 lg:items-end lg:pb-8 lg:text-right">
            <IconCrane className="h-[50px] w-[47px] shrink-0 text-brand-accent lg:self-end" />
            <div>
              <h3 className="text-2xl font-normal tracking-tight text-brand-text-primary sm:text-3xl lg:text-4xl">
                I AM A
                <br />
                <span className="font-qasbyne text-brand-accent">DEVELOPER</span>
              </h3>
            </div>
            <Link
              href="/developer"
              className={cn(
                primaryCtaClassName,
                "w-fit rounded-none border border-brand-text-primary bg-white text-brand-text-primary shadow-none hover:bg-brand-text-primary hover:text-white lg:self-end",
              )}
            >
              Know more
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
    </div>
  );
}

export function DividerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const paperLeftRef = useRef<HTMLDivElement>(null);
  const paperRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const cards = cardsRef.current;
    const paperLeft = paperLeftRef.current;
    const paperRight = paperRightRef.current;
    if (!section || !pin || !cards || !paperLeft || !paperRight) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setup = (): (() => void) | undefined => {
      if (!mq.matches) {
        gsap.set([paperLeft, paperRight, cards], { clearProps: "all" });
        return undefined;
      }

      if (reduceMotion.matches) {
        gsap.set(paperLeft, {
          clipPath: buildTearLeftPolygon(1),
          xPercent: -100,
        });
        gsap.set(paperRight, {
          clipPath: buildTearRightPolygon(1),
          xPercent: 100,
        });
        gsap.set(cards, { scale: 1, opacity: 1 });
        return undefined;
      }

      const tearState = { t: 0 };

      gsap.set(paperLeft, {
        clipPath: buildTearLeftPolygon(0),
        xPercent: 0,
      });
      gsap.set(paperRight, {
        clipPath: buildTearRightPolygon(0),
        xPercent: 0,
      });
      gsap.set(cards, { scale: 0.9, opacity: 0 });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: pinnedScrollEnd,
            pin: pin,
            scrub: 2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          tearState,
          {
            t: 1,
            ease: "none",
            duration: TEAR_ANIM,
            onUpdate: () => {
              const v = tearState.t;
              paperLeft.style.clipPath = buildTearLeftPolygon(v);
              paperRight.style.clipPath = buildTearRightPolygon(v);
            },
          },
          TEAR_HOLD,
        );

        tl.to(
          paperLeft,
          { xPercent: -100, ease: "none", duration: TEAR_ANIM },
          TEAR_HOLD,
        );
        tl.to(
          paperRight,
          { xPercent: 100, ease: "none", duration: TEAR_ANIM },
          TEAR_HOLD,
        );
        tl.to(
          cards,
          { scale: 1, opacity: 1, ease: "none", duration: TEAR_ANIM },
          TEAR_HOLD,
        );
      }, section);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;

    const run = () => {
      cleanup?.();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
      cleanup = setup();
    };

    run();
    mq.addEventListener("change", run);
    reduceMotion.addEventListener("change", run);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      mq.removeEventListener("change", run);
      reduceMotion.removeEventListener("change", run);
      window.removeEventListener("resize", onResize);
      cleanup?.();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-brand-background py-0 lg:h-[300vh]"
      aria-labelledby="divider-cards-heading"
    >
      <h2 id="divider-cards-heading" className="sr-only">
        Buyer and developer journeys
      </h2>

      {/* Mobile / tablet: static divide banner + cards (original layout, no duplicate asset) */}
      <div className="lg:hidden">
        <Container>
          <div className="relative w-full overflow-hidden rounded-sm">
            <Image
              src={DIVIDER_BANNER_SRC}
              alt=""
              width={BANNER_WIDTH}
              height={BANNER_HEIGHT}
              className="h-auto w-full"
              sizes="(max-width: 1440px) 100vw, 90rem"
              unoptimized
            />
          </div>
          <ProfileCards className="mt-0" />
        </Container>
      </div>

      {/* Desktop: one Banner1 graphic split by a vertical tear; halves slide L/R */}
      <div
        ref={pinRef}
        className="relative hidden lg:block lg:h-screen lg:min-h-0 lg:overflow-hidden"
      >
        <div
          ref={cardsRef}
          className="relative z-[1] flex origin-center justify-center px-4 pt-6 sm:px-6 sm:pt-10 lg:absolute lg:inset-0 lg:z-[1] lg:scale-90 lg:items-center lg:justify-center lg:px-0 lg:pt-0 lg:opacity-0 lg:will-change-[transform,opacity]"
        >
          <Container className="w-full">
            <ProfileCards />
          </Container>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[10] flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="relative w-full max-w-brand">
            <div
              className="relative w-full overflow-hidden rounded-sm"
              style={{ aspectRatio: `${BANNER_WIDTH} / ${BANNER_HEIGHT}` }}
            >
              <div
                ref={paperLeftRef}
                className="absolute top-0 bottom-0 left-0 w-1/2 will-change-transform [filter:drop-shadow(-4px_6px_14px_rgb(0_0_0_/0.12))]"
                style={{ clipPath: buildTearLeftPolygon(0) }}
              >
                {/* 200% width so one image spans both halves; object-left shows the left continuous half */}
                <div className="absolute inset-y-0 left-0 h-full w-[200%]">
                  <Image
                    src={DIVIDER_BANNER_SRC}
                    alt=""
                    fill
                    className="object-cover object-left"
                    sizes="(max-width: 1440px) 100vw, 90rem"
                    unoptimized
                    priority
                    aria-hidden
                  />
                </div>
              </div>
              <div
                ref={paperRightRef}
                className="absolute top-0 right-0 bottom-0 w-1/2 will-change-transform [filter:drop-shadow(4px_6px_14px_rgb(0_0_0_/0.12))]"
                style={{ clipPath: buildTearRightPolygon(0) }}
              >
                <div className="absolute inset-y-0 right-0 h-full w-[200%]">
                  <Image
                    src={DIVIDER_BANNER_SRC}
                    alt=""
                    fill
                    className="object-cover object-right"
                    sizes="(max-width: 1440px) 100vw, 90rem"
                    unoptimized
                    loading="lazy"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}