"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Ensure route transitions start from top so in-view reveals behave consistently.
 * This is especially important when navigating from deep scroll positions.
 */
export function ScrollToTopOnPathChange() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
