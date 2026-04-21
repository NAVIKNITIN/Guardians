import { DividerSection } from "@/components/sections/DividerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeStickyScrollCopy } from "@/components/marketing/HomeStickyScrollCopy";
import type { Metadata } from "next";

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
