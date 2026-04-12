"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Options = {
  duration?: number;
  delay?: number;
};

/**
 * Ease-out cubic. When `active` is false, returns 0. Honors prefers-reduced-motion
 * by jumping to `end` (no animation).
 */
export function useCountUp(
  end: number,
  active: boolean,
  { duration = 1700, delay = 0 }: Options = {},
) {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    let raf = 0;
    const startAt = performance.now() + delay;

    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t0 = startAt;
      const elapsed = now - t0;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration, delay, prefersReducedMotion]);

  if (!active) return 0;
  if (prefersReducedMotion) return end;
  return value;
}
