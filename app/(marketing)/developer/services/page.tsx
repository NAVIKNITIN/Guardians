import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesHero } from "@/components/services/ServicesHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Developer's Services | The Guardians" },
  description:
    "Comprehensive developer advisory services — residential, retail, marketing consulting, land, and commercial services.",
};

export default function DeveloperServicesPage() {
  return (
    <>
      <ServicesHero
        title="Developer's Services"
        imageSrc="/images/Developer/services/hero.svg"
        headingId="dev-services-heading"
        ariaLabelledBy="dev-services-heading"
      />
      <ServicesGrid ariaLabel="Developer services" />
    </>
  );
}
