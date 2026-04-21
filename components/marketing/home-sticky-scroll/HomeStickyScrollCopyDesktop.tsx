"use client";

import { StickyScrollFillSection } from "@/components/sections/StickyScrollFillSection";
import { HOME_STICKY_LINES_DESKTOP } from "./homeStickyScrollLines";

/** `md` and up (≥768px) — four-line sticky copy; typography comes from `StickyScrollFillSection`. */
export function HomeStickyScrollCopyDesktop() {
  return (
    <StickyScrollFillSection
      as="h2"
      stagger={0.11}
      fromColor="#c4c4c4"
      toColor="#111111"
      className="space-y-0 n-bold"
      lines={[...HOME_STICKY_LINES_DESKTOP]}
    />
  );
}
