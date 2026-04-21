"use client";

import { useEffect, useState } from "react";
import { DividerSectionDesktop } from "./divider-section/DividerSectionDesktop";
import { DividerSectionMobile } from "./divider-section/DividerSectionMobile";

export { DIVIDER_BANNER_SRC } from "./divider-section/DividerSectionCards";

/**
 * Renders **either** the desktop (`lg+`) or mobile scroll experience — separate components so
 * Framer ranges and DOM never mix. Until the viewport is known after mount, the desktop tree is
 * shown so SSR + first client paint match; narrow viewports switch to mobile in `useEffect`.
 */
export function DividerSection() {
  const [isLg, setIsLg] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (isLg !== false) {
    return <DividerSectionDesktop />;
  }

  return <DividerSectionMobile />;
}
