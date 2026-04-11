import { CardSection } from "@/components/sections/CardSection";
import { DividerSection } from "@/components/sections/DividerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { StickyScrollFillSection } from "@/components/sections/StickyScrollFillSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "The Guardians | Real Estate Advisory" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StickyScrollFillSection
        as="h2"
        stagger={0.11}
        fromColor="#c4c4c4"
        toColor="#111111"
        className="space-y-0 font-nexa text-[clamp(1.55rem,3.5vw,2.55rem)] font-medium leading-[1.07] tracking-[-0.01em]"
        lines={[
          "We are one of the fastest growing Real Estate",
          "consulting company in India. It’s growth, today,",
          "has far outrun most of the other real estate",
          "advisory company across the country.",
        ]}
      />
      <DividerSection />
      <CardSection />
    </>
  );
}
