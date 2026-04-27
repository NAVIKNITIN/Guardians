import type { Metadata } from "next";
import { DividerSection } from "@/components/sections/DividerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { StickyScrollFillSection } from "@/components/sections/StickyScrollFillSection";
import { HomeStickyScrollCopy } from "@/components/marketing/HomeStickyScrollCopy";

export const metadata: Metadata = {
  title: { absolute: "The Guardians | Real Estate Advisory" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeStickyScrollCopy />
      <DividerSection />
    </>
  );
}
