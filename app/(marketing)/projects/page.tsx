"use client";

import { Container } from "@/components/common/Container";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AppPageSkeleton } from "@/components/common/AppPageSkeleton";
import {
  mapApiProjectListItemToRow,
  parseProjectListResponse,
} from "@/lib/mappers/projectListApi";
import type { ProjectRowFilterShape } from "@/lib/mappers/projectListApi";
import { getAllProjects } from "@/src/api/services/projectService";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";

// ---------------------------------------------------------------------------
// Filter option sets (demo data — replace with CMS / API)
// ---------------------------------------------------------------------------
const BUDGET_OPTIONS = ["All", "Under 2 Cr", "2-5 Cr", "5+ Cr"] as const;
const BUILDER_OPTIONS = [
  "All",
  "Piramal Realty",
  "Godrej Properties",
  "Lodha Group",
  "Hiranandani",
] as const;
const CONFIGURATION_OPTIONS = ["All", "1 BHK", "2 BHK", "3 BHK"] as const;
const LOCATION_OPTIONS = ["All", "CHEMBUR", "MANKHURD", "MIRA ROAD"] as const;
const STAGE_OPTIONS = ["All", "Ongoing", "Completed"] as const;
const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "title-asc", label: "Title (A-Z)" },
  { key: "title-desc", label: "Title (Z-A)" },
  { key: "ongoing-first", label: "Ongoing First" },
  { key: "completed-first", label: "Completed First" },
] as const;
type SortKey = (typeof SORT_OPTIONS)[number]["key"];

/** Max project cards shown before “View More”. */
const INITIAL_VISIBLE_CARDS = 10;
const PROJECT_LIST_SKELETON_COUNT = 6;
const DEFAULT_PROJECTS_HERO_SHIFT_TOP = 70;

type ProjectRow = ProjectRowFilterShape;

function useBuilderFilterOptions(projects: ProjectRow[]) {
  return useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = ["All"];
    for (const b of BUILDER_OPTIONS) {
      if (b !== "All" && !seen.has(b)) {
        seen.add(b);
        out.push(b);
      }
    }
    for (const p of projects) {
      if (p.builder && p.builder !== "—" && !seen.has(p.builder)) {
        seen.add(p.builder);
        out.push(p.builder);
      }
    }
    return out;
  }, [projects]);
}

function projectIsCompleted(p: ProjectRow) {
  return p.badge?.variant === "completed";
}

function projectMatchesLocation(p: ProjectRow, filterLocation: string) {
  if (filterLocation === "All") return true;
  const needle = filterLocation.toLowerCase();
  const haystack = [p.subtitle, p.description, p.area, p.title]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

function filterProjects(
  list: ProjectRow[],
  opts: {
    budget: string;
    builder: string;
    configuration: string;
    stage: string;
    location: string;
    query: string;
  },
) {
  return list.filter((p) => {
    const searchTerm = opts.query.trim().toLowerCase();
    if (searchTerm) {
      const searchableText = [
        p.title,
        p.subtitle,
        p.builder,
        p.budget,
        p.configuration,
        p.rera,
        p.description,
        p.area,
        p.amenitiesSearch,
        p.caseStudyInfo,
        p.completionDate,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }
    if (opts.budget !== "All" && p.budget !== opts.budget) return false;
    if (opts.builder !== "All" && p.builder !== opts.builder) return false;
    if (opts.configuration !== "All") {
      const hasBuckets = p.configurationBuckets.length > 0;
      if (
        hasBuckets &&
        !p.configurationBuckets.includes(opts.configuration)
      ) {
        return false;
      }
    }
    if (opts.stage === "Ongoing" && projectIsCompleted(p)) return false;
    if (opts.stage === "Completed" && !projectIsCompleted(p)) return false;
    if (!projectMatchesLocation(p, opts.location)) return false;
    return true;
  });
}

function sortProjects(list: ProjectRow[], sortKey: SortKey) {
  if (sortKey === "default") {
    return list;
  }
  const sorted = [...list];
  switch (sortKey) {
    case "title-asc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "ongoing-first":
      sorted.sort((a, b) => Number(projectIsCompleted(a)) - Number(projectIsCompleted(b)));
      break;
    case "completed-first":
      sorted.sort((a, b) => Number(projectIsCompleted(b)) - Number(projectIsCompleted(a)));
      break;
    default:
      break;
  }
  return sorted;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Chevron down icon */
function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="17"
      height="9"
      viewBox="0 0 17 9"
      fill="none"
      className={className}
    >
      <path
        d="M14.0989 0.293936C14.5468 -0.0979785 15.2728 -0.0979785 15.7207 0.293936C16.1686 0.68585 16.1686 1.32112 15.7207 1.71303L8.83922 7.73439C8.39133 8.1263 7.66531 8.1263 7.21741 7.73439L0.335924 1.71303C-0.111975 1.32112 -0.111975 0.68585 0.335924 0.293936C0.783822 -0.0979785 1.50984 -0.0979785 1.95773 0.293936L8.02832 5.60574L14.0989 0.293936Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Chevron up icon */
function ChevronUp({ className = "" }: { className?: string }) {
  return (
    <svg
      width="17"
      height="9"
      viewBox="0 0 17 9"
      fill="none"
      className={className}
    >
      <path
        d="M14.0989 7.73438C14.5468 8.1263 15.2728 8.1263 15.7207 7.73438C16.1686 7.34247 16.1686 6.7072 15.7207 6.31529L8.83922 0.293935C8.39133 -0.0979786 7.66531 -0.0979786 7.21741 0.293935L0.335924 6.31529C-0.111975 6.7072 -0.111975 7.34247 0.335924 7.73438C0.783822 8.1263 1.50984 8.1263 1.95773 7.73438L8.02832 2.42258L14.0989 7.73438Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Search icon — sized for 30px-tall field (spec ~345×30). */
function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4993 2C9.14387 2.00012 7.80814 2.32436 6.60353 2.94569C5.39893 3.56702 4.36037 4.46742 3.57451 5.57175C2.78866 6.67609 2.27829 7.95235 2.08599 9.29404C1.89368 10.6357 2.02503 12.004 2.46906 13.2846C2.91308 14.5652 3.65692 15.7211 4.63851 16.6557C5.6201 17.5904 6.81098 18.2768 8.11179 18.6576C9.4126 19.0384 10.7856 19.1026 12.1163 18.8449C13.447 18.5872 14.6967 18.015 15.7613 17.176L19.4133 20.828C19.6019 21.0102 19.8545 21.111 20.1167 21.1087C20.3789 21.1064 20.6297 21.0012 20.8151 20.8158C21.0005 20.6304 21.1057 20.3796 21.108 20.1174C21.1102 19.8552 21.0094 19.6026 20.8273 19.414L17.1753 15.762C18.1633 14.5086 18.7784 13.0024 18.9504 11.4157C19.1223 9.82905 18.8441 8.22602 18.1475 6.79009C17.4509 5.35417 16.3642 4.14336 15.0116 3.29623C13.659 2.44911 12.0952 1.99989 10.4993 2ZM3.99928 10.5C3.99928 8.77609 4.6841 7.12279 5.90308 5.90381C7.12207 4.68482 8.77537 4 10.4993 4C12.2232 4 13.8765 4.68482 15.0955 5.90381C16.3145 7.12279 16.9993 8.77609 16.9993 10.5C16.9993 12.2239 16.3145 13.8772 15.0955 15.0962C13.8765 16.3152 12.2232 17 10.4993 17C8.77537 17 7.12207 16.3152 5.90308 15.0962C4.6841 13.8772 3.99928 12.2239 3.99928 10.5Z"
        fill="black"
        fillOpacity="0.3"
      />
    </svg>
  );
}

const filterSelectClass =
  "relative inline-flex h-12 min-h-[48px] w-full min-w-0 max-w-full cursor-pointer appearance-none items-center border border-[#0000000] bg-white pl-4 pr-9 n-bold text-[11px] uppercase tracking-[0.08em] text-[#161616] outline-none transition-colors hover:bg-black/[0.02] min-[400px]:text-xs sm:h-[51px] sm:min-w-[8.5rem] sm:max-w-none sm:pl-5 sm:pr-10 sm:text-sm sm:tracking-[0.1em] md:min-w-[9.5rem] md:text-base";

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={filterSelectClass}
      >
        {options.map((o) => (
          <option key={o} value={o} className="">
            {o === "All" ? label.toUpperCase() : o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-brand-footer sm:right-3" />
    </label>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <label className="relative inline-flex items-center gap-2 n-reg text-sm uppercase tracking-widest text-brand-footer sm:text-base">
      <span className="sr-only">Sort projects</span>
      <select
        aria-label="Sort projects"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label.toUpperCase()}
          </option>
        ))}
      </select>
      <span className="pointer-events-none">Sort By</span>
      <ChevronDown className="pointer-events-none text-brand-footer" />
    </label>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="relative flex flex-col overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#BCBDC0]/35 sm:aspect-16/10">
        <div className="h-full w-full animate-pulse bg-linear-to-r from-[#d6d7da] via-[#ececef] to-[#d6d7da]" />
      </div>
      <div className="flex flex-col gap-3 bg-[#ecebeb] px-4 py-4 sm:px-5 sm:py-5">
        <div className="h-6 w-3/4 animate-pulse rounded bg-[#cfd1d5]" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-[#d9dbde]" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function ProjectsPageContent() {
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(true);
  const [filterBudget, setFilterBudget] = useState<string>("All");
  const [filterBuilder, setFilterBuilder] = useState<string>("All");
  const [filterConfiguration, setFilterConfiguration] =
    useState<string>("All");
  const [filterStage, setFilterStage] = useState<string>("All");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("default");

  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [listTotal, setListTotal] = useState(0);

  const builderFilterOptions = useBuilderFilterOptions(projects);

  const [visibleCardCount, setVisibleCardCount] =
    useState(INITIAL_VISIBLE_CARDS);
  const [projectsHeroShiftTop, setProjectsHeroShiftTop] = useState(
    DEFAULT_PROJECTS_HERO_SHIFT_TOP,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const computeShift = () => {
      const vh = window.innerHeight;
      if (vh < 700) return 40;
      if (vh < 820) return 55;
      return DEFAULT_PROJECTS_HERO_SHIFT_TOP;
    };

    const apply = () => setProjectsHeroShiftTop(computeShift());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    const stage = searchParams.get("stage");
    if (stage === "ongoing") setFilterStage("Ongoing");
    else if (stage === "completed") setFilterStage("Completed");
    else setFilterStage("All");
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setListLoading(true);
      setListError(null);
      try {
        const raw = await getAllProjects({
          per_page: 100,
          page: 1,
          with: "files",
        });
        if (cancelled) return;
        const { items, total } = parseProjectListResponse(raw);
        setListTotal(total);
        setProjects(items.map(mapApiProjectListItemToRow));
      } catch (e) {
        if (!cancelled) {
          setListError(
            e instanceof Error ? e.message : "Failed to load projects.",
          );
          setProjects([]);
        }
      } finally {
        if (!cancelled) {
          setListLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (
      filterBuilder !== "All" &&
      !builderFilterOptions.includes(filterBuilder)
    ) {
      setFilterBuilder("All");
    }
  }, [builderFilterOptions, filterBuilder]);

  useEffect(() => {
    setVisibleCardCount(INITIAL_VISIBLE_CARDS);
  }, [
    filterBudget,
    filterBuilder,
    filterConfiguration,
    filterStage,
    filterLocation,
    searchQuery,
  ]);

  const visibleProjects = useMemo(() => {
    const filtered = filterProjects(projects, {
      budget: filterBudget,
      builder: filterBuilder,
      configuration: filterConfiguration,
      stage: filterStage,
      location: filterLocation,
      query: searchQuery,
    });
    return sortProjects(filtered, sortBy);
  },
    [
      projects,
      filterBudget,
      filterBuilder,
      filterConfiguration,
      filterStage,
      filterLocation,
      searchQuery,
      sortBy,
    ],
  );

  const displayedProjects = useMemo(
    () => visibleProjects.slice(0, visibleCardCount),
    [visibleProjects, visibleCardCount],
  );

  const hasMoreProjects = visibleProjects.length > displayedProjects.length;

  function clearAllFilters() {
    setFilterBudget("All");
    setFilterBuilder("All");
    setFilterConfiguration("All");
    setFilterStage("All");
    setFilterLocation("All");
    setSearchQuery("");
    setShowFilters(true);
  }

  return (
    <main>
      <MarketingPageHero
        heroId="projects"
        projectsStage={filterStage === "Completed" ? "Completed" : "Ongoing"}
        heightPx={650}
        mobileHeightPx={230}
        useViewportHeightFlag
        viewportHeightBreakpointPx={1024}
        shiftUnderHeader={false}
        shiftTillSearch={false}
        shiftExtraContentTopPx={projectsHeroShiftTop}
        negativePadding={10}
      />

      {/* ------------------------------------------------------------------ */}
      {/* FILTER BAR (hidden for Completed — stage is fixed from hero / query)  */}
      {/* ------------------------------------------------------------------ */}

      {filterStage !== "Completed" && (
        <section className=" shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
          <Container className="min-w-0 py-4 sm:py-5 lg:py-6">
            <ScrollReveal direction="up" distance={30}>
              <div className="pt-10 flex min-w-0 flex-col items-center gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:text-left lg:px-8 xl:px-12 2xl:px-16">
                <div className="flex min-w-0 flex-wrap items-center justify-center gap-3 sm:min-w-0 sm:justify-start sm:gap-5">
                  <button
                    type="button"
                    onClick={() => setShowFilters((prev) => !prev)}
                    aria-expanded={showFilters}
                    aria-controls="projects-filter-dropdowns"
                    className={`inline-flex cursor-pointer items-center gap-2 n-reg text-sm font-black uppercase tracking-widest sm:text-base ${showFilters
                      ? "text-brand-footer border-brand-footer n-bold"
                      : "text-brand-footer"
                      }`}
                  >
                    Filters
                    {showFilters ? (
                      <ChevronUp className="text-brand-footer" />
                    ) : (
                      <ChevronDown className="text-brand-footer" />
                    )}
                  </button>
                  <SortSelect value={sortBy} onChange={setSortBy} />
                </div>

                <div className="mx-auto flex h-[30px] w-full max-w-[345px] min-w-0 shrink-0 items-center gap-2 border border-black/20 bg-white px-3 sm:mx-0">
                  <SearchIcon />
                  <label htmlFor="projects-search" className="sr-only">
                    Search projects
                  </label>
                  <input
                    id="projects-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="min-h-0 min-w-0 flex-1 border-0 bg-transparent py-0 n-reg text-sm leading-none text-black/80 outline-none placeholder:text-black/40"
                  />
                </div>
              </div>
            </ScrollReveal>

            {showFilters && (
              <ScrollReveal direction="up" delay={0.08} distance={24} className="relative z-10">
                <div className="relative z-10">
                  <div className="my-3 h-px w-full max-w-[92%] bg-black mx-auto sm:my-4" />

                  <div
                    id="projects-filter-dropdowns"
                    className="grid min-w-0 grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 lg:gap-3 lg:px-8 xl:px-12 2xl:px-16"
                  >
                    <FilterSelect
                      label="Budget"
                      value={filterBudget}
                      onChange={setFilterBudget}
                      options={[...BUDGET_OPTIONS]}
                    />
                    <FilterSelect
                      label="Builder"
                      value={filterBuilder}
                      onChange={setFilterBuilder}
                      options={builderFilterOptions}
                    />
                    <FilterSelect
                      label="Location"
                      value={filterLocation}
                      onChange={setFilterLocation}
                      options={[...LOCATION_OPTIONS]}
                    />
                    <FilterSelect
                      label="Configuration"
                      value={filterConfiguration}
                      onChange={setFilterConfiguration}
                      options={[...CONFIGURATION_OPTIONS]}
                    />
                    <FilterSelect
                      label="Stage"
                      value={filterStage}
                      onChange={setFilterStage}
                      options={[...STAGE_OPTIONS]}
                    />

                    <button
                      type="button"
                      className="col-span-full w-full basis-full cursor-pointer py-2 text-center n-reg text-sm text-black underline sm:ml-auto sm:w-auto sm:basis-auto sm:py-0 sm:text-left sm:text-base"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </Container>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PROJECT GRID                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className={`bg-white pb-8 sm:pb-10 lg:px-8 lg:pb-10 xl:px-12 2xl:px-16 ${filterStage === "Completed" ? "mt-10" : ""}`}>
        <Container className="min-w-0">
          {listError ? (
            <p className="px-1 text-center n-reg text-sm text-[#d05c43] sm:px-0">
              {listError} We could not reach the projects API right now. Please try
              again shortly.
            </p>
          ) : null}

          {/* {!listLoading && !listError && listTotal > 0 ? (
            <p className="mb-5 text-center n-reg text-xs text-[#161616]/50">
              {listTotal} project{listTotal === 1 ? "" : "s"} total
              {visibleProjects.length !== projects.length
                ? ` · ${visibleProjects.length} match filters`
                : null}
            </p>
          ) : null} */}

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:gap-10" staggerChildren={0.14}>
            {listLoading
              ? Array.from({ length: PROJECT_LIST_SKELETON_COUNT }).map(
                (_, index) => (
                  <ScrollReveal
                    key={`project-skeleton-${index}`}
                    direction="up"
                    delay={index * 0.02}
                    distance={20}
                  >
                    <ProjectCardSkeleton />
                  </ScrollReveal>
                ),
              )
              : displayedProjects.map((project, index) => (
                <ScrollReveal key={project.id} direction="up" delay={index * 0.03} distance={28}>
                  <ProjectCard
                    imageSrc={project.imageSrc}
                    title={project.title}
                    subtitle={project.subtitle}
                    badge={project.badge}
                    href={
                      projectIsCompleted(project)
                        ? `/projects/${project.id}?status=completed`
                        : `/projects/${project.id}`
                    }
                    stage={filterStage}
                  />
                </ScrollReveal>
              ))}
          </StaggerContainer>

          {!listLoading && !listError && projects.length === 0 ? (
            <p className="mt-10 px-1 text-center n-reg text-sm text-[#161616]/70 sm:px-0">
              No projects to display yet.
            </p>
          ) : null}

          {!listLoading && !listError && projects.length > 0
            && visibleProjects.length === 0 ? (
            <p className="mt-10 px-1 text-center n-reg text-sm leading-relaxed text-[#161616]/70 sm:px-0">
              No projects match these filters. Try adjusting or{" "}
              <button
                type="button"
                className="underline"
                onClick={clearAllFilters}
              >
                clear all
              </button>
              .
            </p>
          ) : null}

          <ScrollReveal direction="up" delay={0.1} className="mt-10 flex justify-center px-2 sm:mt-12 lg:mt-16">
            {/* <GradientCtaButton
              type="button"
              disabled={
                listLoading ||
                Boolean(listError) ||
                !hasMoreProjects
              }
              className="h-[52px] cursor-pointer w-full max-w-sm disabled:pointer-events-none disabled:opacity-50 sm:h-[55px] sm:w-auto sm:max-w-none sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl"
              onClick={() =>
                setVisibleCardCount((n) =>
                  Math.min(n + INITIAL_VISIBLE_CARDS, visibleProjects.length),
                )
              }
            >
              View More
            </GradientCtaButton> */}
            <OutlineArrowButton
              type="button"
              disabled={
                listLoading ||
                Boolean(listError) ||
                !hasMoreProjects
              }
              onClick={() =>
                setVisibleCardCount((n) =>
                  Math.min(n + INITIAL_VISIBLE_CARDS, visibleProjects.length),
                )
              }
              className="h-[52px] cursor-pointer w-full max-w-sm  sm:h-[55px] sm:w-auto sm:max-w-none sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl"
              iconClassName="w-[13px] h-[13px]"
            >
              View More
            </OutlineArrowButton>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}

export default function ProjectsPage(props: object) {
  return (
    <Suspense
      fallback={<AppPageSkeleton />}
    >
      <ProjectsPageContent />
    </Suspense>
  );
}
