"use client";

import { Container } from "@/components/common/Container";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp as clamp01, subscribeToScroll } from "@/utils/scroll";
import { BuyerProfileCard, DeveloperProfileCard, DIVIDER_BANNER_SRC } from "./DividerSectionCards";

/**
 * Below `lg` only — full-bleed banner crossfade + card ramp. No split-banner overlay.
 */
export function DividerSectionMobile() {
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

  const cardsScale = useTransform(drive, [0.04, 0.34], [0.98, 1], transformClamp);
  const cardsOpacity = useTransform(drive, [0.04, 0.34], [0, 1], transformClamp);
  const mobileBannerOpacity = useTransform(drive, [0, 0.38], [1, 0], transformClamp);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[240vh] sm:min-h-[280vh] md:min-h-[300vh] bg-[#F2F2F2]"
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
                className="relative z-10 grid min-h-0 min-w-0 grid-cols-1 grid-rows-2 items-stretch gap-[20px] overflow-hidden rounded-sm"
              >
                <BuyerProfileCard />
                <DeveloperProfileCard />
              </motion.div>

              <motion.div
                className="pointer-events-none absolute inset-0 z-25 overflow-hidden rounded-sm"
                style={{ opacity: reduceMotion ? 0 : mobileBannerOpacity }}
                aria-hidden
              >
                <Image
                  src={DIVIDER_BANNER_SRC}
                  fill
                  className="object-cover"
                  alt=""
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
