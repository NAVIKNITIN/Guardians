"use client";

import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp as clamp01, subscribeToScroll } from "@/utils/scroll";
import {
  BuyerProfileCard,
  DeveloperProfileCard,
  DIVIDER_BANNER_SRC,
  FIGMA_CARD_BG,
} from "./DividerSectionCards";

/**
 * Large screens (`lg+`) only — split banner + scroll scrub. Do not add mobile-specific logic here;
 * use `DividerSectionMobile` for viewports below `lg`.
 */
export function DividerSectionDesktop() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

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

  const springProgress = useSpring(sectionProgress, {
    stiffness: 520,
    damping: 52,
    mass: 0.12,
    restDelta: 0.0005,
  });
  const drive = reduceMotion ? sectionProgress : springProgress;

  const transformClamp = { clamp: true } as const;

  const leftSplitX = useTransform(drive, [0.08, 0.58], ["0%", "-100%"], transformClamp);
  const rightSplitX = useTransform(drive, [0.08, 0.58], ["0%", "100%"], transformClamp);
  const cardsScale = useTransform(drive, [0.08, 0.54], [0.92, 1], transformClamp);
  const cardsOpacity = useTransform(drive, [0.08, 0.54], [0, 1], transformClamp);

  const bannerLayerOpacity = useTransform(drive, [0.46, 0.76], [1, 0], transformClamp);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[320vh] xl:min-h-[330vh] 2xl:min-h-[340vh] bg-[#F2F2F2]"
    >
      <div
        className="sticky flex min-h-0 w-full items-center justify-center overflow-hidden bg-[#F2F2F2] pb-0"
        style={{
          top: "var(--site-header-height)",
          minHeight: "calc(100dvh - var(--site-header-height))",
        }}
      >
        <Container className="relative w-full px-0 lg:min-h-0">
          <div className="relative w-full">
            <div className="relative w-full">
              <motion.div
                style={{
                  scale: reduceMotion ? 1 : cardsScale,
                  opacity: reduceMotion ? 1 : cardsOpacity,
                }}
                className="relative z-10 grid min-h-0 min-w-0 grid-cols-1 grid-rows-2 items-stretch gap-[20px] overflow-hidden rounded-sm lg:max-h-[350px] lg:min-h-[350px] lg:grid-cols-2 lg:grid-rows-1 lg:gap-[20px]"
              >
                <BuyerProfileCard />
                <DeveloperProfileCard />
              </motion.div>

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
