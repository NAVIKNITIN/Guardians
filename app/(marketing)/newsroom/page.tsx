import { NewsroomGrid } from "@/components/newsroom/NewsroomGrid";
import { NewsroomHero } from "@/components/newsroom/NewsroomHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Newsroom | The Guardians" },
  description:
    "Latest news, media coverage, and insights from The Guardians Real Estate Advisory.",
};

export default function NewsroomPage() {
  return (
    <>
      <NewsroomHero />
      <NewsroomGrid />
    </>
  );
}
