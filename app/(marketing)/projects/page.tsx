"use client";

import { Container } from "@/components/common/Container";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { LOCAL_IMAGES } from "@/lib/local-images";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

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
const STAGE_OPTIONS = ["Ongoing", "Completed"] as const;

/** Max project cards shown before “View More”. */
const INITIAL_VISIBLE_CARDS = 10;

type ProjectRow = {
  id: number;
  imageSrc: string;
  title: string;
  subtitle: string;
  badge?: { label: string; variant: "units-left" | "completed" };
  budget: (typeof BUDGET_OPTIONS)[number];
  builder: (typeof BUILDER_OPTIONS)[number];
  configuration: (typeof CONFIGURATION_OPTIONS)[number];
};

const projects: ProjectRow[] = [
  {
    id: 1,
    imageSrc: LOCAL_IMAGES.img1,
    title: "Lorem Ipsum Tower A",
    subtitle: "Piramal Realty, Chembur (E)",
    badge: { label: "1 Unit Left", variant: "units-left" },
    budget: "2-5 Cr",
    builder: "Piramal Realty",
    configuration: "2 BHK",
  },
  {
    id: 2,
    imageSrc: LOCAL_IMAGES.img2,
    title: "Lorem Ipsum Tower A",
    subtitle: "Piramal Realty, Chembur (E)",
    badge: { label: "Completed", variant: "completed" },
    budget: "5+ Cr",
    builder: "Piramal Realty",
    configuration: "3 BHK",
  },
  {
    id: 3,
    imageSrc: LOCAL_IMAGES.img3,
    title: "Lorem Ipsum Tower A",
    subtitle: "Godrej Properties, Chembur (E)",
    badge: { label: "Completed", variant: "completed" },
    budget: "2-5 Cr",
    builder: "Godrej Properties",
    configuration: "2 BHK",
  },
  {
    id: 4,
    imageSrc: LOCAL_IMAGES.img4,
    title: "Lorem Ipsum Tower A",
    subtitle: "Piramal Realty, Chembur (E)",
    badge: { label: "3 Units Left", variant: "units-left" },
    budget: "Under 2 Cr",
    builder: "Piramal Realty",
    configuration: "1 BHK",
  },
  {
    id: 5,
    imageSrc: LOCAL_IMAGES.img5,
    title: "Lorem Ipsum Tower A",
    subtitle: "Lodha Group, Chembur (E)",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "2 BHK",
  },
  {
    id: 6,
    imageSrc: LOCAL_IMAGES.img6,
    title: "Lorem Ipsum Tower A",
    subtitle: "Godrej Properties, Chembur (E)",
    badge: { label: "Completed", variant: "completed" },
    budget: "5+ Cr",
    builder: "Godrej Properties",
    configuration: "3 BHK",
  },
  {
    id: 7,
    imageSrc: LOCAL_IMAGES.img7,
    title: "Lorem Ipsum Tower A",
    subtitle: "Hiranandani, Chembur (E)",
    badge: undefined,
    budget: "Under 2 Cr",
    builder: "Hiranandani",
    configuration: "1 BHK",
  },
  {
    id: 8,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 9,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 17,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 10,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 11,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 12,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 13,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 14,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 15,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  {
    id: 16,
    imageSrc: LOCAL_IMAGES.img8,
    title: "Lorem Ipsum Tower B",
    subtitle: "Lodha Group, Noida",
    badge: undefined,
    budget: "2-5 Cr",
    builder: "Lodha Group",
    configuration: "3 BHK",
  },
  // Completed-only demo rows (parity with ongoing list volume)
  ...(
    [
      { id: 18, img: LOCAL_IMAGES.img1, builder: "Piramal Realty" as const, subtitle: "Piramal Realty, Chembur (E)", budget: "2-5 Cr" as const, configuration: "2 BHK" as const },
      { id: 19, img: LOCAL_IMAGES.img2, builder: "Piramal Realty" as const, subtitle: "Piramal Realty, Chembur (E)", budget: "5+ Cr" as const, configuration: "3 BHK" as const },
      { id: 20, img: LOCAL_IMAGES.img3, builder: "Godrej Properties" as const, subtitle: "Godrej Properties, Chembur (E)", budget: "2-5 Cr" as const, configuration: "2 BHK" as const },
      { id: 21, img: LOCAL_IMAGES.img4, builder: "Piramal Realty" as const, subtitle: "Piramal Realty, Chembur (E)", budget: "Under 2 Cr" as const, configuration: "1 BHK" as const },
      { id: 22, img: LOCAL_IMAGES.img5, builder: "Lodha Group" as const, subtitle: "Lodha Group, Chembur (E)", budget: "2-5 Cr" as const, configuration: "2 BHK" as const },
      { id: 23, img: LOCAL_IMAGES.img6, builder: "Godrej Properties" as const, subtitle: "Godrej Properties, Chembur (E)", budget: "5+ Cr" as const, configuration: "3 BHK" as const },
      { id: 24, img: LOCAL_IMAGES.img7, builder: "Hiranandani" as const, subtitle: "Hiranandani, Chembur (E)", budget: "Under 2 Cr" as const, configuration: "1 BHK" as const },
      { id: 25, img: LOCAL_IMAGES.img8, builder: "Lodha Group" as const, subtitle: "Lodha Group, Chembur (E)", budget: "2-5 Cr" as const, configuration: "3 BHK" as const },
      { id: 26, img: LOCAL_IMAGES.img1, builder: "Piramal Realty" as const, subtitle: "Piramal Realty, Chembur (E)", budget: "5+ Cr" as const, configuration: "3 BHK" as const },
      { id: 27, img: LOCAL_IMAGES.img2, builder: "Godrej Properties" as const, subtitle: "Godrej Properties, Chembur (E)", budget: "2-5 Cr" as const, configuration: "2 BHK" as const },
      { id: 28, img: LOCAL_IMAGES.img3, builder: "Hiranandani" as const, subtitle: "Hiranandani, Chembur (E)", budget: "Under 2 Cr" as const, configuration: "1 BHK" as const },
    ] as const
  ).map((row) => ({
    id: row.id,
    imageSrc: row.img,
    title: "Lorem Ipsum Tower C",
    subtitle: row.subtitle,
    badge: { label: "Completed", variant: "completed" as const },
    budget: row.budget,
    builder: row.builder,
    configuration: row.configuration,
  })),
];

function projectIsCompleted(p: ProjectRow) {
  return p.badge?.variant === "completed";
}

function subtitleMatchesLocation(subtitle: string, location: string | null) {
  if (!location) return true;
  const key = location.replace(/\s*\(E\)\s*$/i, "").trim().toLowerCase();
  return subtitle.toLowerCase().includes(key);
}

function filterProjects(
  list: ProjectRow[],
  opts: {
    budget: string;
    builder: string;
    configuration: string;
    stage: string;
    location: string | null;
    query: string;
  },
) {
  return list.filter((p) => {
    const searchTerm = opts.query.trim().toLowerCase();
    if (searchTerm) {
      const searchableText = `${p.title} ${p.subtitle} ${p.builder} ${p.budget} ${p.configuration}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }
    if (opts.budget !== "All" && p.budget !== opts.budget) return false;
    if (opts.builder !== "All" && p.builder !== opts.builder) return false;
    if (opts.configuration !== "All" && p.configuration !== opts.configuration)
      return false;
    if (opts.stage === "Ongoing" && projectIsCompleted(p)) return false;
    if (opts.stage === "Completed" && !projectIsCompleted(p)) return false;
    if (!subtitleMatchesLocation(p.subtitle, opts.location)) return false;
    return true;
  });
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
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-[#202225] sm:right-3" />
    </label>
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
  const [filterStage, setFilterStage] = useState<string>("Ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  const [activeLocation, setActiveLocation] = useState<string | null>(
    "Chembur (E)",
  );

  const [visibleCardCount, setVisibleCardCount] =
    useState(INITIAL_VISIBLE_CARDS);

  useEffect(() => {
    const stage = searchParams.get("stage");
    if (stage === "ongoing") setFilterStage("Ongoing");
    else if (stage === "completed") setFilterStage("Completed");
  }, [searchParams]);

  useEffect(() => {
    setVisibleCardCount(INITIAL_VISIBLE_CARDS);
  }, [
    filterBudget,
    filterBuilder,
    filterConfiguration,
    filterStage,
    activeLocation,
    searchQuery,
  ]);

  const visibleProjects = useMemo(
    () =>
      filterProjects(projects, {
        budget: filterBudget,
        builder: filterBuilder,
        configuration: filterConfiguration,
        stage: filterStage,
        location: activeLocation,
        query: searchQuery,
      }),
    [
      filterBudget,
      filterBuilder,
      filterConfiguration,
      filterStage,
      activeLocation,
      searchQuery,
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
    setFilterStage("Ongoing");
    setActiveLocation(null);
    setSearchQuery("");
    setShowFilters(true);
  }

  const heroBackgroundSrc =
    filterStage === "Completed"
      ? "/images/Projects/completed.svg"
      : "/images/Projects/ongoing/bg-hero.svg";

  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/* HERO — combined projects landing                                    */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="relative isolate md:flex min-h-[min(20rem,50svh)] h-[min(62svh,36rem)] flex-col overflow-hidden sm:min-h-[380px] sm:h-[620px] lg:h-[800px] lg:min-h-0 lg:pt-[90px]"
      >
        <Image
          src={heroBackgroundSrc}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="relative z-[1] flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-2 px-4 pb-8 pt-8 text-center sm:justify-start sm:gap-2 sm:px-8 sm:py-14 sm:pb-14 md:px-10">
          <h1
            className=" whitespace-nowrap text-[clamp(1.1rem,calc(0.65rem+3.8vw),3.75rem)] uppercase leading-[1.12] tracking-[0.06em] text-[#0a0a0a] sm:tracking-[0.07em] lg:text-[clamp(2.75rem,5vw,4rem)] qs-reg fs-70"
          >
            {filterStage} Projects
          </h1>
          <p className="mt-1 max-w-3xl px-1 n-book fs-18 lh-22 text-black leading-relaxed text-[#000000] sm:mt-0 sm:text-lg lg:text-base">
            We are one of the fastest growing Real Estate consulting company in
            India.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FILTER BAR                                                          */}
      {/* ------------------------------------------------------------------ */}

      {filterStage === "Ongoing" && (<section className="border-b border-black/10 shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <Container className="min-w-0 py-4 sm:py-5 lg:py-6">
          <div className="flex min-w-0 flex-col items-center gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:text-left lg:px-8 xl:px-12 2xl:px-16">
            <div className="flex min-w-0 flex-wrap items-center justify-center gap-3 sm:min-w-0 sm:justify-start sm:gap-5">
              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                aria-expanded={showFilters}
                aria-controls="projects-filter-dropdowns"
                className={`inline-flex cursor-pointer items-center gap-2 n-reg text-sm font-black uppercase tracking-[0.1em] sm:text-base ${showFilters
                  ? "text-[#8F8183]  border-[#8F8183] n-bold"
                  : "text-[#8F8183]/70"
                  }`}
              >
                Filters
                {showFilters ? (
                  <ChevronUp className="text-[#8F8183]" />
                ) : (
                  <ChevronDown className="text-[#8F8183]" />
                )}
              </button>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 n-reg  text-sm  uppercase tracking-[0.1em] text-[#8F8183] sm:text-base"
              >
                Sort By
                <ChevronDown className="text-[#8F8183]" />
              </button>
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


          {showFilters && (
            <>
              <div className="my-3 h-px w-full max-w-[90%] bg-black/20 mx-auto sm:my-4" />

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
                  options={[...BUILDER_OPTIONS]}
                />

                {activeLocation && (
                  <div className="inline-flex h-12 min-h-[48px] w-full max-w-full flex-wrap items-center justify-center gap-2 border border-[#161616] bg-[#BCBDC0] px-3 py-1 n-reg text-[11px] uppercase tracking-[0.08em] text-[#161616] min-[400px]:px-4 min-[400px]:text-xs sm:h-[51px] sm:min-h-0 sm:w-auto sm:max-w-none sm:justify-between sm:px-5 sm:py-0 sm:text-sm sm:tracking-[0.1em] md:text-base">
                    <span className="min-w-0 wrap-break-word n-bold">{activeLocation}</span>
                    <span className="mx-1 hidden h-[52px] w-px shrink-0 bg-[#161616] sm:inline-block" />
                    <button
                      type="button"
                      onClick={() => setActiveLocation(null)}
                      className="cursor-pointer text-xl  leading-none n-bold"
                      aria-label="Remove filter"
                    >
                      X
                    </button>
                  </div>
                )}

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
            </>
          )}
        </Container>
      </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PROJECT GRID                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-8 sm:py-10 lg:px-8 lg:py-20 xl:px-12 2xl:px-16">
        <Container className="min-w-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:gap-10">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
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
            ))}
          </div>

          {visibleProjects.length === 0 ? (
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

          <div className="mt-10 flex justify-center px-2 sm:mt-12 lg:mt-16">
            <GradientCtaButton
              type="button"
              disabled={
                visibleProjects.length === 0 ||
                !hasMoreProjects
              }
              className="h-[52px] w-full max-w-sm disabled:pointer-events-none disabled:opacity-50 sm:h-[55px] sm:w-auto sm:max-w-none sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl"
              onClick={() =>
                setVisibleCardCount((n) =>
                  Math.min(n + INITIAL_VISIBLE_CARDS, visibleProjects.length),
                )
              }
            >
              View More
            </GradientCtaButton>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[50vh] min-w-0 bg-white lg:pt-[100px]">
          <div className="flex min-h-[min(17.5rem,42svh)] h-[min(52svh,28rem)] items-center justify-center bg-[#BCBDC0]/30 sm:h-[400px] sm:min-h-[380px] lg:h-[550px]">
            <span className="n-reg  text-sm text-[#202225]/60">Loading…</span>
          </div>
        </main>
      }
    >
      <ProjectsPageContent />
    </Suspense>
  );
}
