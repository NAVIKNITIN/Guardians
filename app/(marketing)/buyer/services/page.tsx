import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesHero } from "@/components/services/ServicesHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Buyer's Services | The Guardians" },
  description:
    "Comprehensive buyer advisory services — residential, retail, marketing consulting, land, and commercial services.",
};

export default function BuyerServicesPage() {
  return (
    <>
      <ServicesHero
        title="Buyer's Services"
        imageSrc="/images/Buyer/services/hero.svg"
        headingId="buyer-services-heading"
        ariaLabelledBy="buyer-services-heading"
        titleClassName="max-w-[min(100%,20ch)]"
      />
      <ServicesGrid ariaLabel="Buyer services" />
    </>
  );
}
