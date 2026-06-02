import { MagazineGrid } from "@/components/magazine/MagazineGrid";
import { MagazineHero } from "@/components/magazine/MagazineHero";
import type { Metadata } from "next";
import { MagazineGridHardCoded } from "@/components/magazine/MagazineGridHardCoded";

export const metadata: Metadata = {
  title: { absolute: "Magazine | The Guardians" },
  description:
    "The Guardians Magazine — in-depth real estate research, expert analysis, and market intelligence.",
};

export default function MagazinePage() {
  return (
    <>
      <MagazineHero />
      {/* <MagazineGrid /> */}
      <MagazineGridHardCoded />
    </>
  );
}
