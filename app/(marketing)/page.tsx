import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DividerSection } from "@/components/sections/DividerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { StickyScrollFillSection } from "@/components/sections/StickyScrollFillSection";

export const metadata: Metadata = {
  title: { absolute: "The Guardians | Real Estate Advisory" },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ website?: string }>;
}) {
  const { website } = await searchParams;

  // CHANGE: root route defaults to admin login; website home is still available
  // without creating a new file by using /?website=1.
  if (website !== "1") {
    redirect("/admin/login");
  }

  return (
    <>
      <HeroSection />
      <StickyScrollFillSection
        as="h2"
        stagger={0.11}
        fromColor="#c4c4c4"
        toColor="#111111"
        className={`space-y-0 n-bold leading-[1.22] tracking-[-0.01em]`}
        lines={[
          "We are one of the fastest growing Real Estate",
          "consulting company in India. It’s growth, today,",
          "has far outrun most of the other real estate",
          "advisory company across the country.",
        ]}
      />
      <DividerSection />
    </>
  );
}
