import { TGREABrands } from "@/components/tgrea/TGREABrands";
import { TGREAHero } from "@/components/tgrea/TGREAHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TGREA | The Guardians Real Estate Advisory",
  description: "The Guardians Real Estate Advisory – Our Brands.",
};

export default function TGREAPage() {
  return (
    <>
      <TGREAHero />
      <TGREABrands />
    </>
  );
}
