import { ScrollFillText } from "@/components/animations/ScrollFillText";
import { CardSection } from "@/components/sections/CardSection";
import { DividerSection } from "@/components/sections/DividerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "The Guardians | Real Estate Advisory" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="bg-brand-background py-14 sm:py-16 lg:py-20">
        <div className=" px-4 text-center sm:px-6 lg:px-8">
          <ScrollFillText
            as="h2"
            start={0.8}
            end={0.3}
            stagger={0.11}
            fromColor="#c4c4c4"
            toColor="#111111"
            className="  space-y-0 font-nexa text-[clamp(1.75rem,3.5vw,3.05rem)] font-medium leading-[1.07] tracking-[-0.01em]"
            text={[
              "We are one of the fastest growing Real Estate",
              "consulting company in India. It’s growth, today,",
              "has far outrun most of the other real estate",
              "advisory company across the country.",
            ]}
          />
        </div>
      </section>
      <DividerSection />
      {/* <CardSection /> */}
    </>
  );
}
