import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesHero } from "@/components/services/ServicesHero";
import {
  BUYER_SERVICES_GRID_DEFAULT,
  BUYER_SERVICE_PANELS,
  BUYER_SERVICE_TILES,
} from "@/data/buyer-services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Buyer's Services | The Guardians" },
  description:
    "Residential, commercial, and Buyer Assist advisory — end-to-end support for your property journey.",
};

export default function BuyerServicesPage() {
  return (
    <>
      <ServicesHero audience="buyer" />
      <ServicesGrid
        ariaLabel="Buyer services"
        tiles={BUYER_SERVICE_TILES}
        panelsByTile={BUYER_SERVICE_PANELS}
        accordionTitle={BUYER_SERVICES_GRID_DEFAULT.accordionTitle}
        accordionItems={BUYER_SERVICES_GRID_DEFAULT.accordionItems}
        accordionImageSrc={BUYER_SERVICES_GRID_DEFAULT.accordionImageSrc}
        knowMoreHref={BUYER_SERVICES_GRID_DEFAULT.knowMoreHref}
        knowMoreLabel="Know More"
      />
    </>
  );
}
