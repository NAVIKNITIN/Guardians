import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesHero } from "@/components/services/ServicesHero";
import {
  DEVELOPER_SERVICES_GRID_DEFAULT,
  DEVELOPER_SERVICE_PANELS,
  DEVELOPER_SERVICE_TILES,
} from "@/data/developer-services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Developer's Services | The Guardians" },
  description:
    "Residential, commercial, retail, land, financial, and marketing consulting advisory for developers — from strategy to sales execution.",
};

export default function DeveloperServicesPage() {
  return (
    <>
      <ServicesHero audience="developer" />
      <ServicesGrid
        ariaLabel="Developer services"
        tiles={DEVELOPER_SERVICE_TILES}
        panelsByTile={DEVELOPER_SERVICE_PANELS}
        accordionTitle={DEVELOPER_SERVICES_GRID_DEFAULT.accordionTitle}
        accordionItems={DEVELOPER_SERVICES_GRID_DEFAULT.accordionItems}
        accordionImageSrc={DEVELOPER_SERVICES_GRID_DEFAULT.accordionImageSrc}
        knowMoreHref={DEVELOPER_SERVICES_GRID_DEFAULT.knowMoreHref}
        knowMoreLabel="Know More"
      />
    </>
  );
}
