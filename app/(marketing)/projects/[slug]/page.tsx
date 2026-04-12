"use client";

import { Container } from "@/components/common/Container";
import { DynamicMap } from "@/components/projects/DynamicMap";
import type { MapMarker } from "@/components/projects/DynamicMap";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// ---------------------------------------------------------------------------
// Static project data (would come from CMS / API in production)
// ---------------------------------------------------------------------------
const AMENITY_IMAGE_DIR = "/images/Projects/Amenities";

function amenityImage(filename: string) {
  return `${AMENITY_IMAGE_DIR}/${encodeURIComponent(filename)}`;
}

const project = {
  status: "Ongoing Project",
  title: "Lorem Ipsum\nTowers",
  rera: "P51700012556",
  developerLogo:
    "/images/Projects/Group 45.svg",
  stats: [
    { label: "Area", value: "37,850", unit: "sq. ft." },
    { label: "Type", value: "1, 2 & 3 BHK", unit: "" },
    { label: "Location", value: "Chembur (E)", unit: "" },
    { label: "Project completed in", value: "Dec. 2026", unit: "" },
  ],
  heroImage:
    "https://api.builder.io/api/v1/image/assets/TEMP/fd7ab7c5d0ac21eb41b997f1d448e8ae4af49caa?width=2880",
  description:
    "We are one of the fastest growing Real Estate consulting company in India. It's growth, today, has far outrun most of the other real estate advisory company across the country.",
  gallery: [
    // Row 1 — two equal panels
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/c1403cf20f428a6813ffa486b2cafaedd75d792c?width=1222",
      span: "half",
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/71adf6936122f442d8ae7705c5d033fb86869799?width=1184",
      span: "half",
    },
    // Row 2 — full-width
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/3aa6bb4a610293a75278929da1d673553efc5f38?width=2428",
      span: "full",
    },
    // Row 3 — three equal panels
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/037c1886ab160175dc95be469fa085bf03084fc9?width=812",
      span: "third",
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/d383566135a2993ed84e1b2fa8881cce62ce13e0?width=1221",
      span: "third",
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/TEMP/a9cc7cdec0d8d9f8459008067590d662c395be60?width=778",
      span: "third",
    },
  ],
  amenities: [
    { label: "Gymnasium", imageSrc: amenityImage("1.svg") },
    { label: "High Tech Security", imageSrc: amenityImage("2.svg") },
    { label: "Multipurpose Hall", imageSrc: amenityImage("3.svg") },
    { label: "Kids Play Area", imageSrc: amenityImage("4.svg") },
    { label: "Rooftop Lounge", imageSrc: amenityImage("Group 3176.svg") },
    { label: "Landscaped Garden", imageSrc: amenityImage("Group 3182.svg") },
    { label: "High Speed Elevators", imageSrc: amenityImage("Group 3183.svg") },
    { label: "Latest Fire Safety System", imageSrc: amenityImage("Group 3184.svg") },
    {
      label: "High Speed Elevators",
      imageSrc: amenityImage("Group 3183.svg"),
    },
    { label: "Valet", imageSrc: amenityImage("Group 3185.svg") },
  ],
  // Project coordinates — Gungahlin, ACT
  mapCenter: [-35.1833, 149.1324] as [number, number],
  mapZoom: 12,
  locationItems: [
    {
      name: "Marketplace Gungahlin",
      time: "3 Min.",
      type: "walk",
      lat: -35.1828,
      lng: 149.1342,
    },
    {
      name: "Yerrabi Pond District Park",
      time: "10 Min.",
      type: "walk",
      lat: -35.1895,
      lng: 149.1268,
    },
    {
      name: "Hibberson St. Light Rail Terminal",
      time: "5 Min.",
      type: "walk",
      lat: -35.182,
      lng: 149.1335,
    },
    {
      name: "Mulligans Flat Nature Reserve",
      time: "15 Min.",
      type: "drive",
      lat: -35.1567,
      lng: 149.112,
    },
    {
      name: "Canberra International & Domestic Airport",
      time: "20 Min.",
      type: "drive",
      lat: -35.307,
      lng: 149.1953,
    },
    {
      name: "Canberra City",
      time: "20 Min.",
      type: "drive",
      lat: -35.281,
      lng: 149.131,
    },
    {
      name: "South Coast",
      time: "2.5 Hrs",
      type: "drive",
      lat: -35.7067,
      lng: 150.1761,
    },
    {
      name: "Sydney City",
      time: "3 Hrs",
      type: "drive",
      lat: -33.8688,
      lng: 151.2093,
    },
    {
      name: "Melbourne City",
      time: "7 Hrs",
      type: "drive",
      lat: -37.8136,
      lng: 144.9631,
    },
  ],
  caseStudy: {
    posterSrc: "/images/Projects/case-study-client-chronicles.png",
    /** Set to a watch URL to turn the play control into a link */
    videoUrl: "",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor sit amet, consectetur adipiscing elit."
    ],
  },
  amenitiesBg:
    "https://api.builder.io/api/v1/image/assets/TEMP/55c8acf83922c22ccc9ecff7291da5462bb43041?width=2880",
  bookVisitBg:
    "https://api.builder.io/api/v1/image/assets/TEMP/28a877eed69767d65d87e75cd519237cc1f7ec89?width=2880",
};

// ---------------------------------------------------------------------------
// Walk / Drive icon
// ---------------------------------------------------------------------------
function WalkIcon() {
  return (
    <svg width="13" height="18" viewBox="0 0 13 18" fill="none" className="shrink-0 text-[#8F8183]">
      <circle cx="6.5" cy="2.5" r="2.5" fill="currentColor" />
      <path d="M6.5 6L4 14h2l1-4 1 4h2L8 6" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M4 9.5l-2 3M9 9.5l2 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function DriveIcon() {
  return (
    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" className="shrink-0 text-[#8F8183]" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.55 7.875H5.1M0 4.375L1.7 5.25L2.78 1.915C3.003 1.226 3.114.882 3.321.627 3.504.403 3.738.229 4.003.121 4.303 0 4.655 0 5.36 0h6.279c.705 0 1.057 0 1.357.121.265.107.499.281.681.506.207.254.319.599.542 1.288L15.3 5.25 17 4.375M11.9 7.875H14.45M4.08 5.25h8.84c1.428 0 2.142 0 2.688.286.48.252.87.653 1.114 1.147C17 7.245 17 7.98 17 9.45v2.363c0 .406 0 .609-.033.778-.134.694-.661 1.237-1.335 1.375-.164.034-.361.034-.756.034h-.426c-.939 0-1.7-.784-1.7-1.75 0-.242-.19-.437-.425-.437H4.675c-.235 0-.425.195-.425.438 0 .965-.761 1.749-1.7 1.749H2.125c-.395 0-.593 0-.757-.034C.694 13.828.167 13.286.033 12.591 0 12.422 0 12.219 0 11.813V9.45C0 7.98 0 7.245.278 6.683c.244-.494.634-.895 1.114-1.147C1.938 5.25 2.652 5.25 4.08 5.25z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Arrow icon
// ---------------------------------------------------------------------------
function ArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
      <line x1="0" y1="14" x2="14" y2="0" stroke="white" strokeWidth="2" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Chevron down for select
// ---------------------------------------------------------------------------
function ChevronDown() {
  return (
    <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
      <path d="M1 1L8.5 9L16 1" stroke="#202020" strokeWidth="1.5" strokeOpacity="0.4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Case Study (Client Chronicles video + copy)
// ---------------------------------------------------------------------------
function CaseStudyPlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.5 7.5v9l8-4.5-8-4.5z"
        fill="currentColor"
        className="translate-x-[2px]"
      />
    </svg>
  );
}

function CaseStudySection({
  posterSrc,
  videoUrl,
  paragraphs,
}: {
  posterSrc: string;
  videoUrl: string;
  paragraphs: string[];
}) {
  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="relative aspect-video w-full overflow-hidden bg-[#1a1a1a] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        <Image
          src={posterSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/35" />

        <div className="absolute left-4 top-4 z-[1] flex max-w-[min(100%,280px)] flex-wrap items-start gap-2 text-[0.5rem] font-bold uppercase leading-tight tracking-[0.12em] text-white sm:left-5 sm:top-5 sm:text-[0.55rem] md:max-w-none md:text-[0.625rem]">
          <span className="max-w-[9rem] sm:max-w-none">
            The Guardians
            <br />
            Real Estate Advisory
          </span>
          <span className="mt-0.5 px-0.5 text-base font-light opacity-90 sm:text-lg">
            ×
          </span>
          <span className="max-w-[8rem] sm:max-w-none">
            Dosti
            <br />
            Friends for Life
          </span>
        </div>

        {videoUrl ? (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-1/2 z-[1] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#202225] shadow-lg ring-4 ring-white/30 transition hover:scale-105 hover:bg-white/95"
            aria-label="Play Client Chronicles video"
          >
            <CaseStudyPlayIcon />
          </a>
        ) : (
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 z-[1] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#202225] shadow-lg ring-4 ring-white/30"
            aria-hidden
          >
            <CaseStudyPlayIcon />
          </span>
        )}

        <div className="absolute bottom-0 left-0 z-[1] p-4 sm:p-6">
          <p className="font-nexa text-xl font-bold uppercase leading-[1.1] tracking-[0.06em] text-white sm:text-2xl md:text-3xl lg:text-4xl">
            <span className="block sm:inline">Client </span>
            <span className="mt-1 inline-block bg-black/45 px-2 py-1 sm:mt-0 sm:px-3">
              Chronicles
            </span>
          </p>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col items-start justify-start text-left">
        <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-normal uppercase leading-[1.05] tracking-[0.06em] text-[#202225]">
          Case Study
        </h2>
        <div className="mt-6 flex w-full flex-col gap-4">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-nexa text-sm leading-relaxed text-[#161616]/90 sm:text-base"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Amenity item
// ---------------------------------------------------------------------------
function AmenityItem({
  amenity,
}: {
  amenity: { label: string; imageSrc: string };
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-20 w-20 shrink-0">
        <Image
          src={amenity.imageSrc}
          alt=""
          width={80}
          height={80}
          className="h-20 w-20 object-contain"
        />
      </div>
      <span className="font-nexa text-[11px] font-bold uppercase tracking-[0.08em] text-[#202225] sm:text-xs">
        {amenity.label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const COMPLETED_HERO_BG = "/images/Projects/completed.svg";

function ProjectDetailPageContent() {
  const searchParams = useSearchParams();
  const isFromCompleted = searchParams.get("status") === "completed";
  const heroStatusLine = isFromCompleted ? "Completed Project" : project.status;
  const buildingHeroSrc = isFromCompleted ? COMPLETED_HERO_BG : project.heroImage;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    cv: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* HERO — project header                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white pt-10 md:pt-20 lg:pt-[60px] px-10 lg:px-20">
        <Container className="pb-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            {/* Left — title block */}
            <div>
              {/* Status dot + label */}
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8F8183]" />
                <span className="font-nexa text-base text-[#8F8183] sm:text-lg">
                  {heroStatusLine}
                </span>
              </div>
              {/* Project title */}
              <h1
                className="font-qasbyne text-[clamp(2.5rem,5vw,4.375rem)] uppercase leading-[1] tracking-[0.05em] text-[#202225]"
                style={{ whiteSpace: "pre-line" }}
              >
                {project.title}
              </h1>
              {/* RERA */}
              <p className="mt-3 font-nexa text-xs font-bold uppercase tracking-[0.1em] text-[#161616] underline sm:text-sm">
                Rera No.: {project.rera}
              </p>
            </div>

            {/* Right — developer logo */}
            <div className="shrink-0 absolute right-40 bottom-40">
              <Image
                src={project.developerLogo}
                alt="Godrej Properties"
                width={160}
                height={46}
                className="h-auto w-[160px] object-contain lg:w-[218px]"
              />
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-6 border-t border-black ">
            <div className="grid grid-cols-2 border-b border-black lg:grid-cols-4">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col justify-center py-5 pr-4 ${i < project.stats.length - 1
                    ? "border-r border-black"
                    : ""
                    } ${i > 0 ? "pl-4 lg:pl-6" : ""}`}
                >
                  <span className=" text-xs font-bold uppercase tracking-[0.1em] text-black/80 sm:text-sm ">
                    {stat.label}
                  </span>
                  <span className="mt-1  text-[#8F8183]">
                    <span className="text-2xl sm:text-3xl lg:text-[2.625rem] leading-none">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="text-base sm:text-xl lg:text-2xl ml-0.5">
                        {stat.unit}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>



      {/* ---------------------------------------------------------------- */}
      {/* BUILDING HERO IMAGE                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative h-[280px] overflow-hidden sm:h-[380px] lg:h-[550px] pt-4 lg:mt-20">
        <Image
          src={buildingHeroSrc}
          alt="Lorem Ipsum Towers"
          fill
          className="object-cover object-center"
          priority
          unoptimized={isFromCompleted}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* DESCRIPTION                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-12 lg:py-16 px-10 lg:px-20">
        <Container>
          <p className="!font-nexa text-xl font-bold leading-snug text-black sm:text-2xl lg:text-[2.25rem] lg:leading-[1.17]">
            {project.description}
          </p>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PHOTO GALLERY                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white pb-12 lg:pb-16 px-10 lg:px-20">
        <Container>
          <div className="flex flex-col gap-4">
            {/* Row 1: two halves */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.gallery
                .filter((g) => g.span === "half")
                .map((img, i) => (
                  <div
                    key={i}
                    className="relative h-[220px] overflow-hidden bg-[#BCBDC0] sm:h-[280px] lg:h-[400px]"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* Row 2: full-width */}
            {project.gallery
              .filter((g) => g.span === "full")
              .map((img, i) => (
                <div
                  key={i}
                  className="relative h-[200px] overflow-hidden bg-[#BCBDC0] sm:h-[280px] lg:h-[400px]"
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ))}

            {/* Row 3: three thirds */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {project.gallery
                .filter((g) => g.span === "third")
                .map((img, i) => (
                  <div
                    key={i}
                    className="relative h-[220px] overflow-hidden bg-[#BCBDC0] sm:h-[280px] lg:h-[400px]"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PROJECT AMENITIES                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-14 lg:py-20  bg-[#BCBDC0]">

        {/* Light overlay so text stays readable */}
        <div className="absolute inset-0 bg-white/85" />

        <Container className="relative z-10">
          <h2 className="mb-10 text-center font-qasbyne text-[clamp(1.75rem,4vw,2.625rem)] uppercase tracking-[0.05em] text-[#202225] lg:mb-14">
            Project Amenities
          </h2>

          {/* Rows 1 & 2 — 4 columns on desktop */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-12 lg:gap-y-12  mx-10 lg:mx-20">
            {project.amenities.slice(0, 8).map((amenity, i) => (
              <AmenityItem key={i} amenity={amenity} />
            ))}
          </div>

          {/* Row 3 — 2 items, left-aligned */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-12 lg:gap-y-12  mx-10 lg:mx-20 mt-8">
            {project.amenities.slice(8).map((amenity, i) => (
              <AmenityItem key={i} amenity={amenity} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* LOCATION                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-14 lg:py-20 px-10 lg:px-20">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left — list */}
            <div className="min-w-0 flex-1">
              <h2 className="mb-8 font-qasbyne text-[clamp(2rem,4.5vw,4.375rem)] uppercase tracking-[0.05em] text-[#202225]">
                Location
              </h2>

              <div className="flex flex-col">
                {project.locationItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <span className="font-nexa text-sm text-[#161616] sm:text-base">
                        {item.name}
                      </span>
                      <div className="flex shrink-0 items-center gap-3">
                        {item.type === "walk" ? <WalkIcon /> : <DriveIcon />}
                        <span className="w-14 text-right font-nexa text-sm font-bold text-[#161616] sm:text-base">
                          {item.time}
                        </span>
                      </div>
                    </div>
                    {i < project.locationItems.length - 1 && (
                      <div className="h-px w-full bg-black/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — dynamic map */}
            <div className="relative h-[340px] w-full shrink-0 overflow-hidden lg:h-auto lg:min-h-[550px] lg:w-[49%]">
              <DynamicMap
                center={project.mapCenter}
                zoom={project.mapZoom}
                markers={[
                  // Main project marker
                  {
                    lat: project.mapCenter[0],
                    lng: project.mapCenter[1],
                    label: "Gungahlin",
                    isMain: true,
                  } as MapMarker,
                  // Nearby location markers
                  ...project.locationItems.map((item) => ({
                    lat: item.lat,
                    lng: item.lng,
                    label: `${item.name} — ${item.time}`,
                    isMain: false,
                  } as MapMarker)),
                ]}
                className="h-full w-full"
              />
            </div>
          </div>
        </Container>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* CASE STUDY (completed projects only)                             */}
      {/* ---------------------------------------------------------------- */}
      {isFromCompleted ? (
        <section className="bg-white py-12 lg:py-16 px-10 lg:px-20">
          <Container>
            <CaseStudySection
              posterSrc={project.caseStudy.posterSrc}
              videoUrl={project.caseStudy.videoUrl}
              paragraphs={project.caseStudy.paragraphs}
            />
          </Container>
        </section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* BOOK A VISIT (ongoing projects only — hidden for completed)      */}
      {/* ---------------------------------------------------------------- */}
      {!isFromCompleted ? (
        <section className="relative overflow-hidden py-0 px-10 lg:px-20 mb-10 lg:mb-20">
          {/* Background */}
          <Image
            src={project.bookVisitBg}
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#202225]/50" />

          <Container className="relative z-10 py-16 lg:py-20">
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
              {/* Left — info */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="font-qasbyne text-[clamp(2.5rem,5vw,4.375rem)] uppercase leading-none tracking-[0.05em] text-white">
                    Book A Visit
                  </h2>
                  <p className="mt-5 max-w-[30rem] font-nexa text-sm leading-relaxed text-white sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div className="mt-10 flex flex-col gap-6 border-t border-white/40 pt-8 sm:flex-row sm:gap-12">
                  <div>
                    <p className="font-nexa text-xs font-bold uppercase tracking-[0.1em] text-white">
                      Location
                    </p>
                    <p className="mt-2 max-w-[16rem] font-nexa text-sm leading-relaxed text-white">
                      C-602 &amp; 603, ONE BKC, G Block, Bandra Kurla Complex,
                      Bandra (E), Mumbai - 400051
                    </p>
                  </div>
                  <div>
                    <p className="font-nexa text-xs font-bold uppercase tracking-[0.1em] text-white">
                      Contact
                    </p>
                    <p className="mt-2 font-nexa text-sm leading-relaxed text-white">
                      022-68770076
                      <br />
                      022-6877005
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — form card */}
              <div className="w-full bg-white px-8 py-8 lg:w-[488px] lg:shrink-0 lg:px-10 lg:py-8">
                <div className="flex flex-col gap-0">
                  {/* Row 1: First / Last name */}
                  <div className="grid grid-cols-2 gap-8 pb-6">
                    <FormField
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    <FormField
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Row 2: Email / Phone */}
                  <div className="grid grid-cols-2 gap-8 border-t border-[#8F8183]/30 py-6">
                    <FormField
                      label="Email Address"
                      name="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                    />
                  </div>

                  {/* Row 3: Location / Upload CV */}
                  <div className="grid grid-cols-2 gap-8 border-t border-[#8F8183]/30 py-6">
                    <SelectField
                      label="Location"
                      name="location"
                      placeholder="Select City"
                      value={form.location}
                      onChange={handleChange}
                      options={["Mumbai", "Pune", "Delhi", "Bangalore"]}
                    />
                    <SelectField
                      label="Upload CV"
                      name="cv"
                      placeholder="Choose File"
                      value={form.cv}
                      onChange={handleChange}
                      options={[]}
                    />
                  </div>

                  {/* Message */}
                  <div className="border-t border-[#8F8183]/30 pt-6">
                    <label className="block font-nexa text-sm font-bold text-[#202225]">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Type Message...."
                      value={form.message}
                      onChange={handleChange}
                      rows={2}
                      className="mt-2 w-full resize-none border-b border-[#8F8183] bg-transparent font-nexa text-sm text-[#202020] placeholder-[#202020]/40 outline-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="mt-8">
                    <button
                      type="button"
                      className="inline-flex h-[55px] items-center gap-5 px-12 font-nexa text-base font-bold uppercase tracking-[0.1em] text-white lg:text-xl"
                      style={{
                        background:
                          "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
                      }}
                    >
                      Submit
                      <ArrowUpRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </Container>
        </section>
      ) : null}
    </main>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[50vh] bg-white pt-[137px]">
          <Container>
            <p className="font-nexa text-sm text-[#8F8183]">Loading…</p>
          </Container>
        </main>
      }
    >
      <ProjectDetailPageContent />
    </Suspense>
  );
}

// ---------------------------------------------------------------------------
// Sub-components for form fields
// ---------------------------------------------------------------------------
interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-nexa text-sm font-bold text-[#202225]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-b border-[#8F8183] bg-transparent pb-1 font-nexa text-sm text-[#202020] placeholder-[#202020]/40 outline-none"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

function SelectField({
  label,
  name,
  placeholder,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-nexa text-sm font-bold text-[#202225]">
        {label}
      </label>
      <div className="relative border-b border-[#8F8183] pb-1">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-transparent font-nexa text-sm text-[#202020]/40 outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-[#202020]">
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}
