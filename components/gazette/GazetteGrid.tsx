"use client";

import { Container } from "@/components/common/Container";
import { GazetteCard, type GazetteIssue } from "./GazetteCard";
import Image from "next/image";
import { DownloadModal } from "../magazine/DownloadModal";
import { useState } from "react";

const ISSUES: GazetteIssue[] = [
  {
    id: "1",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "2",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "3",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "4",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "5",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "6",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
];

function ViewMoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export function GazetteGrid() {
  const [activeIssue, setActiveIssue] = useState<string | null>(null);
  return (
    <section
      className="bg-white px-3 py-12 sm:px-4 sm:py-16 lg:py-20 lg:px-8 xl:px-10"
      aria-label="Gazette issues"
    >
      <Container>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[52px] lg:gap-y-16">
          {ISSUES.map((issue) => (
            <GazetteCard key={issue.id} issue={issue} onOpenFile={setActiveIssue} />
          ))}
        </div>

        {/* VIEW MORE CTA */}
        <div className="mt-12 flex justify-center px-1 sm:mt-16 lg:mt-20">
          <button
            type="button"
            className="inline-flex w-full max-w-sm items-center justify-center gap-4 px-8 py-3.5 n-reg  text-base font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto sm:max-w-none sm:gap-5 sm:px-12 sm:py-[18px] sm:text-xl"
            style={{
              background:
                "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
            }}
          >
            View More
            <Image
              src="/images/arrowwhite.svg"
              alt="View More"
              width={15}
              height={15}
              className="object-cover"
            />
          </button>
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
