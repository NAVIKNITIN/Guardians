import { BuyerServicesGrid } from "@/components/buyer-services/BuyerServicesGrid";
import { BuyerServicesHero } from "@/components/buyer-services/BuyerServicesHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Buyer's Services | The Guardians" },
  description:
    "Comprehensive buyer advisory services — residential, retail, marketing consulting, land, and commercial services.",
};

export default function BuyerServicesPage() {
  return (
    <>
      <BuyerServicesHero />
      <BuyerServicesGrid />
    </>
  );
}
