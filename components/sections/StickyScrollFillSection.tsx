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
      className="block overflow-visible pb-[0.08em]"
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
 * Tall scroll track + sticky viewport panel (pinned below the site header). Content is vertically
 * centered in the visible area. Progress is derived from window scroll through the track (not
 * Framer’s `useScroll` intersection), so 0→1 lines up with the end of the pin and every line can
 * reach full fill. Motion is limited to the gradient text spans below.
 */
export function StickyScrollFillSection({
  lines,
  /** Must be taller than `100dvh - header` or scroll range collapses and fill/sticky break. */
  trackClassName = "min-h-[200vh]",
  className,
  fromColor = "#c4c4c4",
  toColor = "#111111",
  stagger = 0.11,
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
      /** Pin slack: track must be taller than the sticky viewport or this is ≤0 and fill breaks. */
      const slack = el.offsetHeight - usableVh;
      const range =
        slack >= 1 ? slack : Math.max(usableVh * 0.45, 1);
      const p = clamp((scrollY - offsetTop) / range, 0, 1);
      sectionProgress.set(p);
    };

    return subscribeToScroll(update);
  }, [sectionProgress]);

  const Tag = as as ElementType;

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative bg-brand-background bg-dot-pattern",
        trackClassName,
      )}
    >
      {/* Sticky frame below header: full remaining viewport height so copy can sit vertically
          centered while the tall outer track only controls scroll length / pin duration. */}
      <div
        className="sticky z-10 flex w-full min-h-0 flex-col justify-center bg-brand-background bg-dot-pattern py-0"
        style={{
          top: "var(--site-header-height)",
          minHeight: "calc(100dvh - var(--site-header-height))",
        }}
      >
        <div
          className={cn(
            "w-full space-y-2 text-center",
            "fs-48 n-bold",
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
