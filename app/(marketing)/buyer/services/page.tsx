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
      <ServicesHero audience="buyer" />
      <ServicesGrid ariaLabel="Buyer services" />
    </>
  );
}
