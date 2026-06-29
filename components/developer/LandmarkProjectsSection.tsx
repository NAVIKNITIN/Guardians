"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import type {
  LandmarkProject,
  LandmarkSectionContent,
} from "@/data/audience-marketing";
import {
  PROJECTS_COMPLETED,
  PROJECTS_ONGOING,
} from "@/data/audience-marketing-shared";
import { splitLandmarkProjectsFromApi } from "@/lib/mappers/landmarkProjectApi";
import {
  parseProjectListResponse,
} from "@/lib/mappers/projectListApi";
import { getAllProjects } from "@/src/api/services/projectService";
import { UnderlineTabs } from "@/components/ui/UnderlineTabs";
import { cn } from "@/utils/cn";
import {
  AudienceMarketingSectionCta,
  AudienceMarketingSectionCtaDesktop,
  AudienceMarketingSectionCtaMobile,
} from "@/components/marketing/AudienceMarketingSectionCta";
import { audienceMobileCopyCenter } from "@/styles/audienceMarketingCenter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "../common/Container";

type Tab = "ongoing" | "completed";

function tabOptions(content: LandmarkSectionContent) {
  return [
    { value: "ongoing" as const, label: content.tabOngoingLabel },
    { value: "completed" as const, label: content.tabCompletedLabel },
  ];
}

/** Desktop carousel always shows 4 panels (original Figma layout). */
const LANDMARK_VISIBLE_COUNT = 4;

/** Reduced height variant (~100px shorter on desktop widths) */
const CAROUSEL_ASPECT = "aspect-[144/50]";

function buildVisibleProjects(
  projects: LandmarkProject[],
  listOffset: number,
): LandmarkProject[] {
  const total = projects.length;
  if (total === 0) {
    return [];
  }
  if (total <= LANDMARK_VISIBLE_COUNT) {
    return projects;
  }
  return Array.from({ length: LANDMARK_VISIBLE_COUNT }, (_, i) => {
    return projects[(listOffset + i) % total]!;
  });
}

function initialActiveIndex(projectCount: number) {
  const panelCount = Math.min(LANDMARK_VISIBLE_COUNT, projectCount);
  return panelCount > 1 ? 1 : 0;
}

function landmarkProjectHref(projectId: string, tab: Tab) {
  return tab === "completed"
    ? `/projects/${projectId}?status=completed`
    : `/projects/${projectId}`;
}

export function LandmarkProjectsSection({
  content,
  isBuyer,
  centerOnMobile = false,
}: {
  content: LandmarkSectionContent;
  isBuyer: boolean;
  centerOnMobile?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("ongoing");
  /** Circular start index when more than 4 projects — window slides one project per step. */
  const [listOffset, setListOffset] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(1);
  const [activeIndex, setActiveIndex] = useState(1);
  const [hiddenWrapIndex, setHiddenWrapIndex] = useState<number | null>(null);
  const [apiProjects, setApiProjects] = useState<{
    ongoing: LandmarkProject[];
    completed: LandmarkProject[];
  } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef(false);
  const projectCountRef = useRef(0);
  const totalProjectCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await getAllProjects({
          per_page: 100,
          page: 1,
          with: "files",
        });
        if (cancelled) return;

        const { items } = parseProjectListResponse(raw);
        setApiProjects(splitLandmarkProjectsFromApi(items, isBuyer));
      } catch {
        if (!cancelled) {
          setApiProjects(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isBuyer]);

  const options = useMemo(() => tabOptions(content), [content]);

  const projects: LandmarkProject[] = useMemo(() => {
    if (apiProjects) {
      return tab === "ongoing" ? apiProjects.ongoing : apiProjects.completed;
    }
    return tab === "ongoing" ? content.ongoing : content.completed;
  }, [tab, apiProjects, content]);

  const slidesAllProjects = projects.length > LANDMARK_VISIBLE_COUNT;

  const visibleProjects = useMemo(
    () => buildVisibleProjects(projects, listOffset),
    [projects, listOffset],
  );

  totalProjectCountRef.current = projects.length;
  projectCountRef.current = visibleProjects.length;

  const focusPanel = (panelIndex: number) => {
    if (slidesAllProjects) {
      const total = projects.length;
      const projectAtPanel = visibleProjects[panelIndex];
      if (!projectAtPanel) return;
      const fullIndex = projects.findIndex((p) => p.id === projectAtPanel.id);
      if (fullIndex < 0) return;
      setPreviousActiveIndex(activeIndex);
      setActiveIndex(panelIndex);
      setListOffset(((fullIndex - panelIndex) % total + total) % total);
      return;
    }
    setPreviousActiveIndex(activeIndex);
    setActiveIndex(panelIndex);
  };

  const advanceCarousel = () => {
    const total = totalProjectCountRef.current;
    const count = projectCountRef.current;

    if (count <= 1) {
      return;
    }

    setActiveIndex((prev) => {
      const next = (prev + 1) % count;
      setPreviousActiveIndex(prev);

      const wrapCardIndex = (prev - 1 + count) % count;
      setHiddenWrapIndex(wrapCardIndex);
      window.setTimeout(() => {
        setHiddenWrapIndex(null);
      }, 650);

      if (total > LANDMARK_VISIBLE_COUNT) {
        setListOffset((offset) => {
          const currentFeatured = (offset + prev) % total;
          const newFeatured = (currentFeatured + 1) % total;
          return (newFeatured - next + total) % total;
        });
      }

      return next;
    });
  };

  useEffect(() => {
    setListOffset(0);
    const initial = initialActiveIndex(projects.length);
    setPreviousActiveIndex(initial);
    setActiveIndex(initial);
    setHiddenWrapIndex(null);
  }, [tab, projects]);

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoRotate = () => {
    stopAutoRotate();

    intervalRef.current = setInterval(() => {
      if (!isHovered.current) {
        advanceCarousel();
      }
    }, 4000);
  };

  useEffect(() => {
    if (visibleProjects.length <= 1) {
      stopAutoRotate();
      return;
    }

    startAutoRotate();
    return () => stopAutoRotate();
  }, [visibleProjects.length, projects.length]);

  const ctaHref = tab === "ongoing" ? PROJECTS_ONGOING : PROJECTS_COMPLETED;

  return (
    <Container
      gutter="left"
      aria-labelledby="landmark-heading"
      className="my-0"
    >
      <style>{`
				.landmark-moving-carousel { position: relative; width: 100%; height: 100%; overflow: hidden; }
				.landmark-moving-panel { position: absolute; top: 0; height: 100%; overflow: hidden; border: 1px solid rgb(255 255 255 / 0.75);  transition: left 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94), width 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }

				.landmark-moving-panel.is-jump-reset { transition: none; }
				.landmark-moving-panel.is-active {
  z-index: 5;
  filter: none;
  opacity: 1;
  transform: scale(1.02);
  
  transition-duration: 750ms;
}
				.landmark-moving-panel.is-collapsed {
  z-index: 3;
  filter: grayscale(1);
  opacity: 0.94;
  transform: scale(0.98);
  transition-duration: 550ms;
}
			`}</style>
      <StaggerContainer
        className={cn(
          "flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
          centerOnMobile && "max-lg:items-center max-lg:justify-center max-lg:text-center",
        )}
        staggerChildren={0.12}
      >
        <ScrollReveal direction="left" distance={34}>
          <h2
            id="landmark-heading"
            className={audienceMobileCopyCenter(
              centerOnMobile,
              "min-w-0 shrink qs-reg text-[clamp(1.5rem,4.5vw,3.125rem)] uppercase leading-[1.15] ls-5 text-brand-text-primary sm:shrink-0 sm:whitespace-nowrap max-lg:w-full",
            )}
          >
            {content.sectionTitle}
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.08} distance={28}>
          <UnderlineTabs
            value={tab}
            equalTabWidth
            onChange={setTab}
            options={options}
            className={cn(
              "w-full min-w-0 max-w-full sm:w-auto sm:shrink-0 sm:pb-0.5 text-[#8F8183]",
              centerOnMobile && "max-lg:mx-auto",
            )}
          />
        </ScrollReveal>
      </StaggerContainer>

      <div className="w-full">
        {projects.length === 0 ? (
          <p className="mt-6 text-center n-book text-sm text-[#8F8183] sm:text-base">
            No {tab === "ongoing" ? "ongoing" : "completed"} projects to show
            right now.
          </p>
        ) : (
          <>
        <div className="mt-5 flex gap-4 overflow-x-auto pb-2 md:hidden">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={landmarkProjectHref(project.id, tab)}
              className="relative aspect-[4/5] w-[min(18rem,82vw)] shrink-0 overflow-hidden border border-white/70 bg-neutral-200 text-left shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
              aria-label={`View project ${project.projectName}`}
            >
              <ProjectPanelVisual
                project={project}
                active
                panelIndex={0}
                totalPanels={projects.length}
              />
            </Link>
          ))}
        </div>

        <div
          className="hidden w-full md:block"
          onMouseEnter={() => {
            isHovered.current = true;
          }}
          onMouseLeave={() => {
            isHovered.current = false;
          }}
        >
          <div
            className={cn(
              "relative mt-4 md:mt-6",
              /* Full-bleed: escape section gutter so the cards touch viewport edges. */
              "left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip",
            )}
          >
            <div className={cn("landmark-moving-carousel px-0", CAROUSEL_ASPECT)}>
              {visibleProjects.map((project, i) => {
                const gap = 1.5;
                const active = i === activeIndex;
                const panelCount = visibleProjects.length;
                const activeWidth = 64;
                const collapsedWidth =
                  (100 - activeWidth - gap * (panelCount - 1)) /
                  Math.max(panelCount - 1, 1);

                const count = panelCount;
                const getVisualSlot = (
                  itemIndex: number,
                  currentActiveIndex: number,
                ) => {
                  const relativeSlot =
                    (itemIndex - currentActiveIndex + count) % count;
                  return relativeSlot === 0
                    ? 1
                    : relativeSlot === count - 1
                      ? 0
                      : relativeSlot + 1;
                };

                const visualSlot = getVisualSlot(i, activeIndex);
                const previousVisualSlot = getVisualSlot(i, previousActiveIndex);
                const width = active ? activeWidth : collapsedWidth;
                const left =
                  visualSlot === 0
                    ? 0
                    : visualSlot === 1
                      ? collapsedWidth + gap
                      : collapsedWidth +
                      activeWidth +
                      gap * 2 +
                      (visualSlot - 2) * (collapsedWidth + gap);

                const jumpReset =
                  (previousVisualSlot === 0 && visualSlot === count - 1) ||
                  (previousVisualSlot === count - 1 && visualSlot === 0);

                const panelClassName = cn(
                  "landmark-moving-panel cursor-pointer",
                  active ? "is-active" : "is-collapsed",
                  jumpReset && "is-jump-reset",
                );
                const panelStyle = {
                  left: `${left}%`,
                  width: `${width}%`,
                  opacity: hiddenWrapIndex === i ? 0 : undefined,
                };
                const panelVisual = (
                  <ProjectPanelVisual
                    project={project}
                    active={active}
                    panelIndex={i}
                    totalPanels={panelCount}
                  />
                );

                if (active) {
                  return (
                    <Link
                      key={`${tab}-landmark-panel-${i}`}
                      href={landmarkProjectHref(project.id, tab)}
                      aria-label={`View project ${project.projectName}`}
                      style={panelStyle}
                      className={panelClassName}
                    >
                      {panelVisual}
                    </Link>
                  );
                }

                return (
                  <button
                    key={`${tab}-landmark-panel-${i}`}
                    type="button"
                    onClick={() => focusPanel(i)}
                    aria-label={`Show project ${project.projectName}`}
                    style={panelStyle}
                    className={panelClassName}
                  >
                    {panelVisual}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
          </>
        )}

        {projects.length > 0 ? (
          <>
        <ScrollReveal
          direction="up"
          delay={0.1}
          className={cn(
            "mt-12 flex w-full",
            centerOnMobile ? "hidden justify-center lg:flex" : "justify-center",
          )}
        >
          {centerOnMobile ? (
            <AudienceMarketingSectionCtaDesktop
              href={ctaHref}
              centerOnMobile={centerOnMobile}
            >
              {content.ctaLabel}
            </AudienceMarketingSectionCtaDesktop>
          ) : (
            <AudienceMarketingSectionCta href={ctaHref}>
              {content.ctaLabel}
            </AudienceMarketingSectionCta>
          )}
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.12} distance={28}>
          <AudienceMarketingSectionCtaMobile
            href={ctaHref}
            centerOnMobile={centerOnMobile}
            wrapClassName="mt-12"
          >
            {content.ctaLabel}
          </AudienceMarketingSectionCtaMobile>
        </ScrollReveal>
          </>
        ) : null}
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
          unoptimized={project.imageSrc.startsWith("/gw-storage/")}
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
          unoptimized={project.imageSrc.startsWith("/gw-storage/")}
          className={cn(
            "object-cover object-center transition-[filter,opacity] duration-500",
            active ? "grayscale-0 opacity-100" : "grayscale opacity-90",
          )}
          sizes={imageSizes}
          priority={active}
        />
      </div>
      <div className="absolute inset-0 z-2 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

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

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-3 px-4 pb-4 text-center text-white transition-all duration-500 sm:px-5 sm:pb-5 md:pb-6",
          active
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <p className="fs-18 fw-100 text-[#E2E2E2]">{project.projectLine}</p>
        <p className="mb-6 n-bold text-[clamp(1.75rem,7vw,3rem)] leading-[1.08] tracking-[0.08em] text-white drop-shadow-sm sm:mb-10 sm:fs-48 sm:lh-50 sm:ls-6">
          {project.projectName}
        </p>
        <p className="mx-auto mt-2 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs n-bold sm:mt-2.5 sm:gap-x-3 sm:fs-16">
          <span className="min-w-0 text-pretty">{project.location.trim()}</span>
          <span
            className="shrink-0 px-1 text-[#E2E2E2]/85 sm:px-1.5 sm:fs-16 n-bold"
            aria-hidden
          >
            |
          </span>
          <span className="min-w-0 text-pretty n-bold sm:fs-16">
            {project.bhkRange}
          </span>
        </p>
      </div>
    </div>
  );
}
