"use client";

import { StickyScrollFillSection } from "@/components/sections/StickyScrollFillSection";
import { HOME_STICKY_LINES_MOBILE } from "./homeStickyScrollLines";

/** Below `md` (<768px) — eight-line sticky gradient copy for narrow viewports. */
export function HomeStickyScrollCopyMobile() {
  return (
    <StickyScrollFillSection
      as="h2"
      stagger={0.11}
      fromColor="#c4c4c4"
      toColor="#111111"
      className="space-y-0 n-bold"
      lines={[...HOME_STICKY_LINES_MOBILE]}
    />
  );
}
