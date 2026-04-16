"use client";

import type {
  LandmarkProject,
  LandmarkSectionContent,
} from "@/data/audience-marketing";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { PeekStrip } from "@/components/ui/PeekStrip";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { UnderlineTabs } from "@/components/ui/UnderlineTabs";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

/** Slower horizontal slide: forward = new image moves in from the right, old exits left. */
const activeCardSlide = {
  duration: 0.78,
  ease: [0.45, 0.05, 0.25, 1] as const,
};

const activeSlideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 1,
  }),
};

const AUTO_ADVANCE_MS = 3000;

type Tab = "ongoing" | "completed";

function tabOptions(content: LandmarkSectionContent) {
  return [
    { value: "ongoing" as const, label: content.tabOngoingLabel },
    { value: "completed" as const, label: content.tabCompletedLabel },
  ];
}

/** ~1440×650 hero proportion */
const CAROUSEL_ASPECT = "aspect-[144/65]";

export function LandmarkProjectsSection({
  content,
}: {
  content: LandmarkSectionContent;
}) {
  const [tab, setTab] = useState<Tab>("ongoing");
  const [index, setIndex] = useState(0);
  /** Bumped on manual navigation so the 3s autoplay timer restarts. */
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);
  /** `1` = next (enter from right), `-1` = prev (enter from left). */
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const options = useMemo(() => tabOptions(content), [content]);

  const projects: LandmarkProject[] = useMemo(
    () => (tab === "ongoing" ? content.ongoing : content.completed),
    [tab, content],
  );

  const n = projects.length;
  const prev = (index - 1 + n) % n;
  const next = (index + 1) % n;
  const ahead = (index + 2) % n;
  const active = projects[index]!;

  const restartAutoplay = useCallback(() => {
    setAutoplayEpoch((e) => + 1);
  }, []);

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setSlideDir(1);
      setIndex((i) => (i + 1) % n);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [n, tab, autoplayEpoch]);

  return (
    <SectionSurface variant="default" aria-labelledby="landmark-heading">
      <div className="flex flex-col gap-8 px-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-6 lg:px-20">
        <h2
          id="landmark-heading"
          className="min-w-0 shrink qs-reg text-[clamp(1.5rem,4.5vw,4.75rem)] fs-50 font-normal uppercase leading-[1.15] tracking-[0.06em] text-brand-text-primary sm:shrink-0 sm:whitespace-nowrap sm:text-[clamp(1.75rem,2.6vw,4.75rem)]"
        >
          {content.sectionTitle}
        </h2>
        <UnderlineTabs
          value={tab}
          onChange={(v) => {
            setTab(v);
            setIndex(0);
            setSlideDir(1);
            restartAutoplay();
          }}
          options={options}
          className="shrink-0 sm:pb-0.5 "
        />
      </div>

      <div
        className={cn(
          "relative mt-12 md:mt-14",
          /* Full-bleed: escape Container padding so the carousel touches viewport edges */
          "left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip",
        )}
      >
        {/*
          Desktop: 13% | 1fr | 13% | 8% — side peeks + `PeekStrip` tail on the far right (+3% vs 5%).
        */}
        <div className="grid w-full grid-cols-1 md:grid-cols-[minmax(0,12.5%)_minmax(0,1fr)_minmax(0,12.5%)_minmax(0,8%)] md:items-stretch md:gap-3 lg:gap-4">
          <PeekHalfSlide
            project={projects[prev]!}
            onClick={() => {
              setSlideDir(-1);
              setIndex(prev);
              restartAutoplay();
            }}
            side="left"
            className="hidden min-h-0 md:block"
          />
          <div
            className={cn(
              "relative isolate min-w-0 w-full overflow-hidden bg-neutral-200",
              CAROUSEL_ASPECT,
            )}
          >
            <AnimatePresence initial={false} mode="sync" custom={slideDir}>
              <motion.div
                key={`${tab}-${active.id}`}
                className="absolute inset-0"
                custom={slideDir}
                variants={activeSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={activeCardSlide}
              >
                <ActiveProjectCard
                  project={active}
                  aspectClassName="h-full min-h-0 w-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <PeekHalfSlide
            project={projects[next]!}
            onClick={() => {
              setSlideDir(1);
              setIndex(next);
              restartAutoplay();
            }}
            side="right"
            className="hidden min-h-0 md:block"
          />
          <PeekTailStrip
            project={projects[ahead]!}
            onClick={() => {
              setSlideDir(1);
              setIndex(ahead);
              restartAutoplay();
            }}
            className="hidden min-h-0 md:block"
          />
        </div>
        <div className="mt-5 flex justify-center md:hidden">
          <CarouselControls
            showCounter={false}
            currentIndex={index}
            total={n}
            onPrev={() => {
              setSlideDir(-1);
              setIndex((i) => (i - 1 + n) % n);
              restartAutoplay();
            }}
            onNext={() => {
              setSlideDir(1);
              setIndex((i) => (i + 1) % n);
              restartAutoplay();
            }}
            prevLabel="Previous project"
            nextLabel="Next project"
          />
        </div>
      </div>

      <div className="mt-14 flex justify-center ">
        <MarketingEnquireLink className="n-bold fs-20 px-12 py-4" href={content.ctaHref}>{content.ctaLabel}</MarketingEnquireLink>
      </div>
    </SectionSurface>
  );
}

/** Narrow 8% column using `PeekStrip` (next-next slide teaser). */
function PeekTailStrip({
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
        "relative flex h-full min-h-0 w-full min-w-0 overflow-hidden rounded-sm border border-black/[0.06] bg-neutral-200 p-0 shadow-sm",
        className,
      )}
    >
      <PeekStrip side="left" peekPercent={100} fillParent className="h-full min-h-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={project.id}
            className="relative h-full min-h-0 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.2, 1] }}
          >
            <Image
              src={project.imageSrc}
              alt=""
              fill
              className="object-cover object-center grayscale transition-opacity duration-300 hover:opacity-100 md:opacity-90"
              sizes="180px"
            />
          </motion.div>
        </AnimatePresence>
      </PeekStrip>
    </button>
  );
}

function PeekHalfSlide({
  project,
  onClick,
  side,
  className,
}: {
  project: LandmarkProject;
  onClick: () => void;
  side: "left" | "right";
  className?: string;
}) {
  const align = side === "left" ? "justify-end" : "justify-start";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show project ${project.projectName}`}
      className={cn(
        "relative flex h-full min-h-0 w-full min-w-0 overflow-hidden rounded-sm border border-black/[0.06] bg-neutral-200 shadow-sm",
        className,
      )}
    >
      <div className={cn("flex h-full min-h-0 w-full min-w-0 overflow-hidden", align)}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={project.id}
            className="relative h-full min-h-0 w-[200%] shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.2, 1] }}
          >
            <Image
              src={project.imageSrc}
              alt=""
              fill
              className="object-cover object-center grayscale transition-opacity duration-300 hover:opacity-100 md:opacity-90"
              sizes="(max-width: 1280px) 25vw, 320px"
            />
          </motion.div>
        </AnimatePresence>
      </div>
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
      {/* Same photo sharp, clipped to center strip (wider side blur margins on md+) */}
      <div
        className="absolute inset-0 z-[1] max-md:[clip-path:inset(0)] md:[clip-path:inset(0_200px_0_200px)]"
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
        <p className="mt-2 n-reg xt-2xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl lg:text-5xl">
          {project.projectName}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/90 sm:text-sm">
          {project.location}
        </p>
      </div>
    </div>
  );
}
