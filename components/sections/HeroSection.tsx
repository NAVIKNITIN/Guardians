"use client";

import { useEffect, useState } from "react";
import { HeroSectionDesktop } from "./hero-section/HeroSectionDesktop";
import { HeroSectionMobile } from "./hero-section/HeroSectionMobile";

export { HERO_IMAGE } from "./hero-section/HeroSectionShared";

/**
 * Renders separate hero trees for `lg+` vs below — desktop layout is not mixed with mobile rules.
 * Until viewport is known, desktop is shown (SSR + first paint match).
 */
export function HeroSection() {
  const [isLg, setIsLg] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (isLg !== false) {
    return <HeroSectionDesktop />;
  }

  return <HeroSectionMobile />;
}
