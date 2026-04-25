"use client";
import type { AwardSlide } from "@/data/audience-marketing";
import { CardStack } from "@/components/ui/card-stack";
export default function CardStackDemo() {
  return (
    <div className="h-160 flex items-center justify-center w-full">
      <CardStack items={CARDS} activeIndex={0} direction={1} />
    </div>
  );
}

const CARDS: AwardSlide[] = [
  {
    id: "0",
    company: "Manu Arora",
    achievement: "Senior Software Engineer",
    year: "2024",
    imageSrc: "/images/Developer/award.svg",
  },
  {
    id: "1",
    company: "Elon Musk",
    achievement: "Senior Shitposter",
    year: "2023",
    imageSrc: "/images/Developer/award.svg",
  },
  {
    id: "2",
    company: "Tyler Durden",
    achievement: "Manager Project Mayhem",
    year: "2022",
    imageSrc: "/images/Developer/award.svg",
  },
];
