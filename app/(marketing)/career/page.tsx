import { CareerHero } from "@/components/career/CareerHero";
import { GrowWithUs } from "@/components/career/GrowWithUs";
import { LifeAtGuardians } from "@/components/career/LifeAtGuardians";
import { OfficeActivities } from "@/components/career/OfficeActivities";
import { ReasonsToJoin } from "@/components/career/ReasonsToJoin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Career | The Guardians" },
  description:
    "Work with us — join India's fastest-growing real estate advisory firm and build a meaningful career.",
};

export default function CareerPage() {
  return (
    <>
      <CareerHero />
      <LifeAtGuardians />
      <ReasonsToJoin />
      <OfficeActivities />
      <GrowWithUs />
    </>
  );
}
