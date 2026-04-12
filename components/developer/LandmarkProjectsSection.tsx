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
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

const slideTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

type Tab = "ongoing" | "completed";

const TAB_OPTIONS = [
  { value: "ongoing" as const, label: "Ongoing" },
  { value: "completed" as const, label: "Completed" },
];

/** ~1440×650 hero proportion */
const CAROUSEL_ASPECT = "aspect-[144/65]";

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
  const active = projects[index]!;

  return (
    <SectionSurface variant="default" aria-labelledby="landmark-heading">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <h2
          id="landmark-heading"
          className="max-w-xl font-qasbyne text-[clamp(1.75rem,3.2vw,2.75rem)] font-normal uppercase leading-[1.15] tracking-[0.06em] text-brand-text-primary"
        >
          Our landmark projects
        </h2>
        <UnderlineTabs
          value={tab}
          onChange={(v) => {
            setTab(v);
            setIndex(0);
          }}
          options={TAB_OPTIONS}
          className="shrink-0 sm:pb-0.5"
        />
      </div>

      <div className="relative mt-12 md:mt-14">
        <div className="flex items-stretch justify-center gap-3 md:gap-5 lg:gap-8">
          <MiniSlide
            project={projects[prev]!}
            onClick={() => setIndex(prev)}
            className="hidden md:block"
          />
          <div className="relative min-w-0 w-full max-w-[min(100%,56rem)] shrink">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${tab}-${active.id}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={slideTransition}
              >
                <ActiveProjectCard project={active} aspectClassName={CAROUSEL_ASPECT} />
              </motion.div>
            </AnimatePresence>
          </div>
          <MiniSlide
            project={projects[next]!}
            onClick={() => setIndex(next)}
            className="hidden md:block"
          />
        </div>
        <div className="mt-5 flex justify-center md:hidden">
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
  onClick,
  className,
}: {
  project: LandmarkProject;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show project ${project.projectName}`}
      className={cn(
        "relative min-h-0 w-[clamp(6.5rem,16vw,13rem)] shrink-0 overflow-hidden rounded-sm border border-black/[0.06] bg-neutral-200 md:self-stretch",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={project.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.imageSrc}
            alt=""
            fill
            className="object-cover object-center grayscale transition-opacity duration-300 hover:opacity-100 md:opacity-90"
            sizes="(max-width: 1280px) 200px, 240px"
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

function ActiveProjectCard({
  project,
  aspectClassName,
}: {
  project: LandmarkProject;
  aspectClassName: string;
}) {
  const imageSizes = "(max-width: 768px) 100vw, 896px";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-sm border border-black/[0.06] bg-neutral-200 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]",
        aspectClassName,
      )}
    >
      {/* Same photo full-frame blurred; ~100px left/right stay blurred because sharp layer is inset below */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={project.imageSrc}
          alt=""
          fill
          className="object-cover object-center blur-2xl scale-105"
          sizes={imageSizes}
          priority
        />
      </div>
      {/* Same photo sharp, clipped to center strip (100px margins on md+) */}
      <div
        className="absolute inset-0 z-[1] max-md:[clip-path:inset(0)] md:[clip-path:inset(0_100px_0_100px)]"
        aria-hidden
      >
        <Image
          src={project.imageSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes={imageSizes}
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-black/15 to-black/25"
        aria-hidden
      />
      <div className="absolute left-5 top-5 z-[3] text-[11px] font-bold uppercase tracking-[0.28em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:left-7 sm:top-7 sm:text-xs">
        {project.brand}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[3] px-4 pb-6 pt-20 text-center text-white sm:px-8 sm:pb-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/95 sm:text-[11px]">
          {project.projectLine}
        </p>
        <p className="mt-2 font-nexa text-2xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl lg:text-5xl">
          {project.projectName}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/90 sm:text-sm">
          {project.location}
        </p>
      </div>
    </div>
  );
}
