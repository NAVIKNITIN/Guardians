import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersLogoGrid } from "@/components/partners/PartnersLogoGrid";
import { FeaturedPartnerShowcase } from "@/components/partners/FeaturedPartnerShowcase";
import { PartnersStats } from "@/components/partners/PartnersStats";
import { PartnersTestimonials } from "@/components/partners/PartnersTestimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Partners & Clients | The Guardians" },
  description:
    "Our trusted partners and clients across the Indian real estate landscape.",
};

export default function PartnersClientsPage() {
  return (
    <>
      <PartnersHero />
      
      {/* <FeaturedPartnerShowcase /> */}
      <PartnersLogoGrid />
      <PartnersTestimonials />
      <PartnersStats />
    </>
  );
}
