"use client";

import { useEffect, useState } from "react";

/**
 * True when `window.innerWidth` is below `breakpointPx`.
 * SSR / first paint always `false` to avoid hydration mismatch.
 */
export function useViewportIsMobile(
  enabled: boolean,
  breakpointPx: number,
): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onResize = () => setIsMobile(window.innerWidth < breakpointPx);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [enabled, breakpointPx]);

  return isMobile;
}
