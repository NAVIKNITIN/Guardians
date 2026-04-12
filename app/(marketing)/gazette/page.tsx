import { GazetteGrid } from "@/components/gazette/GazetteGrid";
import { GazetteHero } from "@/components/gazette/GazetteHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Gazette | The Guardians" },
  description:
    "The Guardians Gazette — curated real estate insights, market reports, and expert perspectives.",
};

export default function GazettePage() {
  return (
    <>
      <GazetteHero />
      <GazetteGrid />
    </>
  );
}
