import { AwardsSection } from "@/components/developer/AwardsSection";
import { DeveloperDetailsHero } from "@/components/developer/DeveloperDetailsHero";
import { DeveloperOurServicesBand } from "@/components/developer/DeveloperOurServicesBand";
import { DeveloperStatsSection } from "@/components/developer/DeveloperStatsSection";
import { LandmarkProjectsSection } from "@/components/developer/LandmarkProjectsSection";
import { OurWorkSection } from "@/components/developer/OurWorkSection";
import { PartnersSection } from "@/components/developer/PartnersSection";
import { TestimonialsSection } from "@/components/developer/TestimonialsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Developer | The Guardians" },
  description:
    "Developer-focused advisory — strategy, market intelligence, and partnerships.",
};

export default function DeveloperDetailsPage() {
  return (
    <>
      <DeveloperDetailsHero />
      <DeveloperOurServicesBand />
      <OurWorkSection />
      <LandmarkProjectsSection />
      <DeveloperStatsSection />
      <PartnersSection />
      <TestimonialsSection />
      <AwardsSection />
    </>
  );
}
