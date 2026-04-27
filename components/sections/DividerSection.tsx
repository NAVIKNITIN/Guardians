"use client";

import { useEffect, useState } from "react";
import { DividerSectionDesktop } from "./divider-section/DividerSectionDesktop";
import { DividerSectionMobile } from "./divider-section/DividerSectionMobile";

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
