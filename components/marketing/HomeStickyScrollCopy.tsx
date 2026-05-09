"use client";

import { useEffect, useState } from "react";
import { HomeStickyScrollCopyDesktop } from "./home-sticky-scroll/HomeStickyScrollCopyDesktop";
import { HomeStickyScrollCopyMobile } from "./home-sticky-scroll/HomeStickyScrollCopyMobile";

export { HOME_STICKY_LINES_DESKTOP, HOME_STICKY_LINES_MOBILE } from "./home-sticky-scroll/homeStickyScrollLines";

/**
 * Renders 4-line vs 8-line sticky copy in separate trees. Breakpoint **`md` (768px)** matches the
 * former `max-width: 767px` mobile lines. Until viewport is known, the 4-line desktop tree is shown
 * (SSR + first paint), matching the old `useState(LINES_DESKTOP)` behavior.
 */
export function HomeStickyScrollCopy() {
  const [isMdUp, setIsMdUp] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsMdUp(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (isMdUp !== false) {
    return (
      <section id="home-about" className="scroll-mt-[var(--site-header-height)]">
        <HomeStickyScrollCopyDesktop />
      </section>
    );
  }

  return (
    <section id="home-about" className="scroll-mt-[var(--site-header-height)]">
      <HomeStickyScrollCopyMobile />
    </section>
  );
}
