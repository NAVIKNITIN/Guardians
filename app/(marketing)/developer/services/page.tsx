import { DeveloperServicesGrid } from "@/components/developer-services/DeveloperServicesGrid";
import { DeveloperServicesHero } from "@/components/developer-services/DeveloperServicesHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Developer's Services | The Guardians" },
  description:
    "Comprehensive developer advisory services — residential, retail, marketing consulting, land, and commercial services.",
};

export default function DeveloperServicesPage() {
  return (
    <>
      <DeveloperServicesHero />
      <DeveloperServicesGrid />
    </>
  );
}
