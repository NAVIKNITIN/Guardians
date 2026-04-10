"use client";

import { RefObject, useEffect, useState } from "react";
import { getVisibilityProgress, subscribeToScroll } from "@/utils/scroll";

interface UseScrollProgressOptions {
  start?: number;
  end?: number;
  precision?: number;
}

export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseScrollProgressOptions = {},
) {
  const { start = 0.9, end = 0.1, precision = 1000 } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const raw = getVisibilityProgress(rect, window.innerHeight, start, end);
      const rounded = Math.round(raw * precision) / precision;
      setProgress((prev) => (prev === rounded ? prev : rounded));
    };

    const unsubscribe = subscribeToScroll(update);
    return unsubscribe;
  }, [end, precision, ref, start]);

  return progress;
}
