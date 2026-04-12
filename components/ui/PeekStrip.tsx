import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type PeekStripProps = {
  /** Which edge of the content stays adjacent to the center (peek shows the opposite outer slice). */
  side: "left" | "right";
  /**
   * How much of the **content** width stays visible inside this strip (default `5`).
   * The inner track is scaled so this fraction of the full content width fits the strip.
   */
  peekPercent?: number;
  /**
   * When `true`, this element is `w-full` of its parent (e.g. a grid column that already sets the strip width).
   * When `false` (default), the strip’s own width is `peekPercent`% of the parent.
   */
  fillParent?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/**
 * Horizontal edge peek: only a narrow strip of `children` is visible (default 5% of the content width).
 * Place any full-width content inside; the rest is clipped. Parent should give a definite height when
 * using `h-full` children (e.g. `aspect-*`, fixed height, or grid/flex stretch).
 */
export function PeekStrip({
  side,
  peekPercent = 5,
  fillParent = false,
  children,
  className,
  style,
  ...rest
}: PeekStripProps) {
  const p = Math.min(100, Math.max(1, peekPercent));
  const innerWidthPercent = (100 / p) * 100;

  return (
    <div
      className={cn(
        "relative min-h-0 min-w-0 overflow-hidden",
        fillParent && "h-full w-full",
        className,
      )}
      style={fillParent ? style : { width: `${p}%`, ...style }}
      {...rest}
    >
      <div
        className={cn(
          "flex h-full min-h-0 w-full min-w-0 overflow-hidden",
          side === "left" ? "justify-end" : "justify-start",
        )}
      >
        <div
          className="relative h-full min-h-0 shrink-0"
          style={{ width: `${innerWidthPercent}%` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
