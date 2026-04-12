"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { clamp, subscribeToScroll } from "@/utils/scroll";

interface StickyScrollFillSectionProps {
  lines: string[];
  /** Tailwind min-height on the scroll track (controls how long the pin + fill lasts). */
  trackClassName?: string;
  className?: string;
  fromColor?: string;
  toColor?: string;
  stagger?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}

function FillLine({
  sectionProgress,
  index,
  lineCount,
  stagger,
  fromColor,
  toColor,
  children,
}: {
  sectionProgress: MotionValue<number>;
  index: number;
  lineCount: number;
  stagger: number;
  fromColor: string;
  toColor: string;
  children: ReactNode;
}) {
  const fill = useTransform(sectionProgress, (v) => {
    const s = Math.max(stagger, 0);
    const totalUnits = lineCount + s * (lineCount - 1);
    const timeline = v * totalUnits;
    const lineStart = index * (1 + s);
    return clamp(timeline - lineStart, 0, 1);
  });

  const backgroundImage = useTransform(
    fill,
    (f) =>
      `linear-gradient(90deg, ${toColor} 0%, ${toColor} ${f * 100}%, ${fromColor} ${f * 100}%, ${fromColor} 100%)`,
  );

  return (
    <motion.span
      className="block"
      style={{
        backgroundImage,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        willChange: "background-image",
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Tall scroll track + top-sticky viewport panel. Progress is derived from window scroll through
 * the track (not Framer’s `useScroll` intersection), so 0→1 lines up with the end of the pin and
 * every line can reach full fill. Motion is limited to the gradient text spans below.
 */
export function StickyScrollFillSection({
  lines,
  trackClassName = "min-h-[240vh]",
  className,
  fromColor = "#c4c4c4",
  toColor = "#111111",
  stagger = 0.2,
  as = "h2",
}: StickyScrollFillSectionProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY;
      const offsetTop = rect.top + scrollY;
      const vh = window.innerHeight;
      const headerPx = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--site-header-height",
        ),
      ) || 118;
      const usableVh = Math.max(1, vh - headerPx);
      const range = Math.max(1, el.offsetHeight - usableVh);
      const p = clamp((scrollY - offsetTop) / range, 0, 1);
      sectionProgress.set(p);
    };

    return subscribeToScroll(update);
  }, [sectionProgress]);

  const Tag = as as ElementType;

  return (
    <div
      ref={trackRef}
      className={cn("relative bg-brand-background", trackClassName)}
    >
      {/* Top-sticky viewport frame (not bottom-sticky on the tall track): the outer track is
          only for scroll length; the inner panel fills the viewport and keeps copy anchored
          low like before, without a multi-screen empty band between hero and text. */}
      <div
        className="sticky z-10 flex w-full flex-col justify-end bg-brand-background py-0"
        style={{
          top: "var(--site-header-height)",
          minHeight: "calc(50dvh - var(--site-header-height))",
        }}
      >
        <div
          className={cn(
            "w-full space-y-1.5 px-4 text-center sm:px-6 lg:px-8",
            className,
          )}
        >
          <Tag>
            {lines.map((line, index) => (
              <FillLine
                key={`${line}-${index}`}
                sectionProgress={sectionProgress}
                index={index}
                lineCount={lines.length}
                stagger={stagger}
                fromColor={fromColor}
                toColor={toColor}
              >
                {line}
              </FillLine>
            ))}
          </Tag>
        </div>
      </div>
    </div>
  );
}
