"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
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
    imageAlt: "City Life magazine cover",
  },
  {
    id: "2",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
  },
  {
    id: "3",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
  },
  {
    id: "4",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
  },
  {
    id: "5",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
  },
  {
    id: "6",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc: "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
  },
];

export function GazetteGrid() {
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  return (
    <section
      className="bg-white px-6 py-20 md:px-16"
      aria-label="Gazette issues"
    >
      <Container>
        {/* 3-column grid */}
        <StaggerContainer
          className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-16"
          staggerChildren={0.16}
        >
          {ISSUES.map((issue, index) => (
            <ScrollReveal key={issue.id} direction="up" delay={index * 0.04} distance={30}>
              <PublicationCard
                issue={issue}
                onOpenFile={setActiveIssue}
              />
            </ScrollReveal>
          ))}
        </StaggerContainer>

        {/* VIEW MORE CTA */}
        <ScrollReveal direction="up" delay={0.14} className="mt-12 flex justify-center px-1 sm:mt-16 lg:mt-20">
          <PublicationLoadMoreButton className="px-12 py-4 fs-16 ls-10 lh-24 n-bold">View More</PublicationLoadMoreButton>
        </ScrollReveal>
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
