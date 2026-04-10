"use client";

import {
  LANDMARK_COMPLETED,
  LANDMARK_ONGOING,
  type LandmarkProject,
} from "@/data/developer-page";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { UnderlineTabs } from "@/components/ui/UnderlineTabs";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useMemo, useState } from "react";

type Tab = "ongoing" | "completed";

const TAB_OPTIONS = [
  { value: "ongoing" as const, label: "Ongoing" },
  { value: "completed" as const, label: "Completed" },
];

export function LandmarkProjectsSection() {
  const [tab, setTab] = useState<Tab>("ongoing");
  const [index, setIndex] = useState(0);

  const projects: LandmarkProject[] = useMemo(
    () => (tab === "ongoing" ? LANDMARK_ONGOING : LANDMARK_COMPLETED),
    [tab],
  );

  const n = projects.length;
  const prev = (index - 1 + n) % n;
  const next = (index + 1) % n;

  return (
    <SectionSurface variant="default" aria-labelledby="landmark-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="landmark-heading" className={marketingClasses.headingDisplay}>
          Our landmark projects
        </h2>
        <UnderlineTabs
          value={tab}
          onChange={(v) => {
            setTab(v);
            setIndex(0);
          }}
          options={TAB_OPTIONS}
        />
      </div>

      <div className="relative mt-12">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <MiniSlide
            project={projects[prev]!}
            muted
            onClick={() => setIndex(prev)}
          />
          <div className="relative w-full max-w-3xl shrink">
            <ActiveProjectCard project={projects[index]!} />
          </div>
          <MiniSlide
            project={projects[next]!}
            muted
            onClick={() => setIndex(next)}
          />
        </div>
        <div className="mt-4 flex justify-center md:hidden">
          <CarouselControls
            showCounter={false}
            currentIndex={index}
            total={n}
            onPrev={() => setIndex((i) => (i - 1 + n) % n)}
            onNext={() => setIndex((i) => (i + 1) % n)}
            prevLabel="Previous project"
            nextLabel="Next project"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <MarketingEnquireLink href="/contact">Know more</MarketingEnquireLink>
      </div>
    </SectionSurface>
  );
}

function MiniSlide({
  project,
  muted,
  onClick,
}: {
  project: LandmarkProject;
  muted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative hidden aspect-[3/4] w-[18%] max-w-[140px] shrink-0 overflow-hidden rounded-sm border border-black/[0.08] md:block",
        muted && "opacity-90 grayscale",
      )}
    >
      <Image
        src={project.imageSrc}
        alt=""
        fill
        className="object-cover object-center"
        sizes="140px"
      />
    </button>
  );
}

function ActiveProjectCard({ project }: { project: LandmarkProject }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-black/[0.08] bg-neutral-300 shadow-lg">
      <Image
        src={project.imageSrc}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 768px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute left-4 top-4 rounded bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-900">
        {project.brand}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-4 pb-5 pt-16 text-center text-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
          {project.projectLine}
        </p>
        <p className="mt-1 font-sans text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
          {project.projectName}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm">
          {project.location}
        </p>
      </div>
    </div>
  );
}
