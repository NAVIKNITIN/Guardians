"use client";

import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import { DownloadModal } from "./DownloadModal";

type MagazineIssue = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
};

const ISSUES: MagazineIssue[] = [
  {
    id: "1",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "2",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "3",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "4",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "5",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
  {
    id: "6",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "/images/citylife.svg",
    imageAlt: "Magazine cover",
  },
];

function CornerArrowIconDark() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M0 0H10.6305V10.6303" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CornerArrowIconWhite() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function MagazineCard({
  issue,
  onOpenFile,
}: {
  issue: MagazineIssue;
  onOpenFile: (title: string) => void;
}) {
  return (
    <article className="flex flex-col items-center">
      {/* Portrait magazine cover */}
      <div className="relative w-full overflow-hidden bg-neutral-200">
        <div className="aspect-[345/451]">
          <Image
            src={issue.imageSrc}
            alt={issue.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-5 text-center n-reg  text-xl  leading-[1.2] text-[#161616] line-clamp-3">
        {issue.title}
      </h3>

      {/* Open File button */}
      <button
        type="button"
        onClick={() => onOpenFile(issue.title)}
        className={cn(
          "mt-5 flex items-center justify-center gap-5",
          "border border-black/30 px-12 py-[18px]",
          "n-reg  text-base  uppercase tracking-[0.1em] text-[#202225]",
          "transition-colors hover:border-[#202225] hover:bg-[#202225] hover:text-white",
        )}
      >
        Open File
        <Image
          src="/images/arrow.svg"
          alt="Open File"
          width={15}
          height={15}
          className="object-cover"
        />
      </button>
    </article>
  );
}

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
            <MagazineCard
              key={issue.id}
              issue={issue}
              onOpenFile={setActiveIssue}
            />
          ))}
        </div>

        {/* LOAD MORE CTA */}
        <div className="mt-12 flex justify-center px-1 sm:mt-16 lg:mt-20">
          <button
            type="button"
            className="inline-flex w-full max-w-sm items-center justify-center gap-4 px-8 py-3.5 n-reg  text-base  uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto sm:max-w-none sm:gap-5 sm:px-12 sm:py-[18px] sm:text-xl"
            style={{
              background:
                "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
            }}
          >
            Load More
            <Image
              src="/images/arrowwhite.svg"
              alt="Load More"
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
