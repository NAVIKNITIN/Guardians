"use client";

import { Container } from "@/components/common/Container";
import { DownloadModal } from "@/components/publications/DownloadModal";
import {
  PublicationCard,
  type PublicationIssue,
} from "@/components/publications/PublicationCard";
import { PublicationLoadMoreButton } from "@/components/publications/PublicationLoadMoreButton";
import { useState } from "react";

const ISSUES: PublicationIssue[] = [
  {
    id: "1",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "2",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "3",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "4",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "5",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "6",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
];

export function MagazineGrid() {
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  return (
    <section
      className="bg-white px-3 py-12 sm:px-4 sm:py-16 lg:py-20 lg:px-8 xl:px-10"
      aria-label="Magazine issues"
    >
      <Container>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[52px] lg:gap-y-16">
          {ISSUES.map((issue) => (
            <PublicationCard
              key={issue.id}
              issue={issue}
              onOpenFile={setActiveIssue}
            />
          ))}
        </div>

        {/* LOAD MORE CTA */}
        <div className="mt-12 flex justify-center px-1 sm:mt-16 lg:mt-20">
          <PublicationLoadMoreButton>Load More</PublicationLoadMoreButton>
        </div>
      </Container>

      {/* Download modal */}
      <DownloadModal
        isOpen={activeIssue !== null}
        onClose={() => setActiveIssue(null)}
        issueTitle={activeIssue ?? ""}
      />
    </section>
  );
}
