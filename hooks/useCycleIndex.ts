"use client";

import { useCallback, useState } from "react";

/**
 * Cyclical index for carousels / steppers (0 … length − 1).
 */
export function useCycleIndex(length: number, initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);

  const advance = useCallback(
    (delta: -1 | 1) => {
      setIndex((i) => (i + delta + length * 64) % length);
    },
    [length],
  );

  const next = useCallback(() => advance(1), [advance]);
  const prev = useCallback(() => advance(-1), [advance]);

  return {
    index,
    setIndex,
    advance,
    next,
    prev,
  };
}
