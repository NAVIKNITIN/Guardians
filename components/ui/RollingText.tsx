"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export type RollingTextProps = {
  value: string;
  className?: string;
  /** `1` = next (new rolls up from below); `-1` = prev (new rolls down from above). */
  direction?: 1 | -1;
  /** Full width block (e.g. paragraph). */
  block?: boolean;
};

/**
 * “Date change” / split-flap style: previous line exits vertically, next line enters.
 */
export function RollingText({
  value,
  className,
  direction = 1,
  block = false,
}: RollingTextProps) {
  const reduceMotion = useReducedMotion();

  const enter = reduceMotion
    ? { opacity: 0 }
    : {
        y: direction > 0 ? "75%" : "-75%",
        opacity: 0.2,
      };
  const exit = reduceMotion
    ? { opacity: 0 }
    : {
        y: direction > 0 ? "-75%" : "75%",
        opacity: 0.2,
      };
  const center = { y: "0%", opacity: 1 };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        block ? "w-full" : "inline-block min-h-[1.15em] min-w-[0.5ch] align-middle",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={value}
          initial={enter}
          animate={center}
          exit={exit}
          transition={{
            duration: reduceMotion ? 0.14 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(block && "w-full")}
        >
          {block ? (
            <p className="m-0">{value}</p>
          ) : (
            <span className="inline-block tabular-nums">{value}</span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
