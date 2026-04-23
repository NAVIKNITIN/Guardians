"use client";

import type {
  LandmarkProject,
  LandmarkSectionContent,
} from "@/data/audience-marketing";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { UnderlineTabs } from "@/components/ui/UnderlineTabs";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "../common/Container";

type Tab = "ongoing" | "completed";

function tabOptions(content: LandmarkSectionContent) {
  return [
    { value: "ongoing" as const, label: content.tabOngoingLabel },
    { value: "completed" as const, label: content.tabCompletedLabel },
  ];
}

/** Reduced height variant (~100px shorter on desktop widths) */
const CAROUSEL_ASPECT = "aspect-[144/50]";

export function LandmarkProjectsSection({
  content,
  isBuyer: _isBuyer,
}: {
  content: LandmarkSectionContent;
  isBuyer: boolean;
}) {
  const [tab, setTab] = useState<Tab>("ongoing");
  const [activeIndex, setActiveIndex] = useState(0);

  const options = useMemo(() => tabOptions(content), [content]);

  const projects: LandmarkProject[] = useMemo(
    () => (tab === "ongoing" ? content.ongoing : content.completed),
    [tab, content],
  );
  return (
    <Container gutter="left" aria-labelledby="landmark-heading" className="my-0">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <h2
          id="landmark-heading"
          className="min-w-0 shrink qs-reg text-[clamp(1.5rem,4.5vw,3.125rem)] uppercase leading-[1.15] ls-5 text-brand-text-primary sm:shrink-0 sm:whitespace-nowrap"
        >
          {content.sectionTitle}
        </h2>
        <UnderlineTabs
          value={tab}
          equalTabWidth
          onChange={(v) => {
            setTab(v);
            setActiveIndex(0);
          }}
          options={options}
          className="shrink-0 sm:pb-0.5 text-[#8F8183]"
        />
      </div>

      <div
        className={cn(
          "relative mt-4 md:mt-6",
          /* Full-bleed: escape section gutter so the cards touch viewport edges. */
          "left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip",
        )}
      >
        <div className={cn("expanding-container px-2 md:px-0", CAROUSEL_ASPECT, "md:items-stretch")}>
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show project ${project.projectName}`}
              className={cn(
                "expanding-panel border border-black/6 bg-neutral-200 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]",
                i === activeIndex && "active",
              )}
            >
              <ProjectPanelVisual
                project={project}
                active={i === activeIndex}
                panelIndex={i}
                totalPanels={projects.length}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center ">
        <MarketingEnquireLink
          className="w-[250px] h-[52px]"
          href={content.ctaHref}
        >
          {content.ctaLabel}
        </MarketingEnquireLink>
      </div>
    </Container>
  );
}

function ProjectPanelVisual({
  project,
  active,
  panelIndex,
  totalPanels,
}: {
  project: LandmarkProject;
  active: boolean;
  panelIndex: number;
  totalPanels: number;
}) {
  const imageSizes = "(max-width: 768px) 100vw, 896px";
  const positionLabel = `${String(panelIndex + 1).padStart(2, "0")}/${String(totalPanels).padStart(2, "0")}`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-200">
      {/* Keep the existing active-card blur treatment. */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={project.imageSrc}
          alt=""
          fill
          className="object-cover object-center blur-4xl scale-1.1"
          sizes={imageSizes}
          priority={active}
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 z-1 transition-all duration-500",
          active
            ? "max-md:[clip-path:inset(0)] md:[clip-path:inset(0_200px_0_200px)]"
            : "[clip-path:inset(0)]",
        )}
        aria-hidden
      >
        <Image
          src={project.imageSrc}
          alt=""
          fill
          className={cn(
            "object-cover object-center transition-[filter,opacity] duration-500",
            active ? "grayscale-0 opacity-100" : "grayscale opacity-90",
          )}
          sizes={imageSizes}
          priority={active}
        />
      </div>

      <div className="absolute left-5 right-8 top-5 z-3 flex flex-row items-center gap-3 fs-18 sm:left-7 sm:right-10 sm:top-7 sm:gap-4">
        {/* <span
          aria-hidden
          className={cn(
            "n-bold text-white/85 transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          {positionLabel}
        </span> */}

        <span
          className={cn(
            "min-w-0 qs-bold uppercase leading-none tracking-[0.06em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          {project.brand}
        </span>
      </div>

      <div className="expanding-content px-4 pb-4 text-center text-white sm:px-5 sm:pb-5 md:pb-6">
        <p className="fs-18 fw-100 text-[#E2E2E2]">{project.projectLine}</p>
        <p className="mb-10 n-bold fs-48 lh-50 ls-6 text-white drop-shadow-sm">
          {project.projectName}
        </p>
        <p className="mx-auto mt-2 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-1 fs-16 n-bold sm:mt-2.5 sm:gap-x-3">
          <span className="min-w-0 text-pretty">{project.location.trim()}</span>
          <span className="shrink-0 px-1 text-[#E2E2E2]/85 sm:px-1.5 fs-16 n-bold" aria-hidden>
            |
          </span>
          <span className="min-w-0 text-pretty fs-16 n-bold">{project.bhkRange}</span>
        </p>
      </div>
    </div>
  );
}
