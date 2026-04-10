"use client";

import { CSSProperties, useMemo, useRef } from "react";
import { cn } from "@/utils/cn";
import { clamp } from "@/utils/scroll";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollFillTextProps {
  text: string | string[];
  className?: string;
  start?: number;
  end?: number;
  fromColor?: string;
  toColor?: string;
  stagger?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}

export function ScrollFillText({
  text,
  className,
  start = 0.9,
  end = 0.1,
  fromColor = "#bfbfbf",
  toColor = "#111111",
  stagger = 0,
  as = "p",
}: ScrollFillTextProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const progress = useScrollProgress(ref, { start, end });

  const lines = useMemo(
    () => (Array.isArray(text) ? text : text.split("\n")),
    [text],
  );
  const Tag = as;

  return (
    <div ref={ref} className={cn("space-y-1.5", className)}>
      <Tag>
        {lines.map((line, index) => {
          const safeGap = Math.max(stagger, 0);
          const totalUnits = lines.length + safeGap * (lines.length - 1);
          const timeline = progress * totalUnits;
          const lineStart = index * (1 + safeGap);
          const lineProgress = clamp(timeline - lineStart, 0, 1);
          const style = {
            "--fill": lineProgress,
            "--from-color": fromColor,
            "--to-color": toColor,
            backgroundImage:
              "linear-gradient(90deg, var(--to-color) 0%, var(--to-color) calc(var(--fill) * 100%), var(--from-color) calc(var(--fill) * 100%), var(--from-color) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            willChange: "background-image",
            transition: "background-image 120ms linear",
          } as CSSProperties;

          return (
            <span key={`${line}-${index}`} className="block" style={style}>
              {line}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
