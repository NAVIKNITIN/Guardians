"use client";
// CHANGE: API helper import
import { createVisit } from "@/src/api/services/visitService";
import { uploadFile } from "@/src/api/services/fileService";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { DynamicMap } from "@/components/projects/DynamicMap";
import type { MapMarker } from "@/components/projects/DynamicMap";
import { LOCAL_IMAGES, localImageByIndex } from "@/lib/local-images";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type ChangeEvent } from "react";

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
  developerLogo: "/images/Projects/Group 45.svg",
  stats: [
    { label: "Area", value: "37,850", unit: "sq. ft." },
    { label: "Type", value: "1, 2 & 3 BHK", unit: "" },
    { label: "Location", value: "Chembur (E)", unit: "" },
    { label: "Project completed in", value: "Dec. 2026", unit: "" },
  ],
  heroImage: LOCAL_IMAGES.tgreaHero,
  description:
    "We are one of the fastest growing Real Estate consulting company in India. It's growth, today, has far outrun most of the other real estate advisory company across the country.",
  gallery: [
    { src: LOCAL_IMAGES.img9, span: "half" as const },
    { src: LOCAL_IMAGES.img10, span: "half" as const },
    { src: LOCAL_IMAGES.img11, span: "full" as const },
    { src: LOCAL_IMAGES.img12, span: "third" as const },
    { src: LOCAL_IMAGES.img13, span: "third" as const },
    { src: LOCAL_IMAGES.img14, span: "third" as const },
  ],
  amenities: [
    { label: "Gymnasium", imageSrc: amenityImage("1.svg") },
    { label: "High Tech Security", imageSrc: amenityImage("2.svg") },
    { label: "Multipurpose Hall", imageSrc: amenityImage("3.svg") },
    { label: "Kids Play Area", imageSrc: amenityImage("4.svg") },
    { label: "Rooftop Lounge", imageSrc: amenityImage("Group 3176.svg") },
    { label: "Landscaped Garden", imageSrc: amenityImage("Group 3182.svg") },
    { label: "High Speed Elevators", imageSrc: amenityImage("Group 3183.svg") },
    {
      label: "Latest Fire Safety System",
      imageSrc: amenityImage("Group 3184.svg"),
    },
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
    posterSrc: LOCAL_IMAGES.heroPrimary,
    /** Set to a watch URL to turn the play control into a link */
    videoUrl: "",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  amenitiesBg: LOCAL_IMAGES.holding,
  bookVisitBg: LOCAL_IMAGES.projectImage,
};

// ---------------------------------------------------------------------------
// Walk / Drive icon
// ---------------------------------------------------------------------------
function WalkIcon() {
  return (
    <svg
      width="13"
      height="18"
      viewBox="0 0 13 18"
      fill="none"
      className="shrink-0 text-[#8F8183]"
    >
      <circle cx="6.5" cy="2.5" r="2.5" fill="currentColor" />
      <path
        d="M6.5 6L4 14h2l1-4 1 4h2L8 6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path d="M4 9.5l-2 3M9 9.5l2 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function DriveIcon() {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      className="shrink-0 text-[#8F8183]"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
      <path
        d="M1 1L8.5 9L16 1"
        stroke="#202020"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
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
    <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="relative aspect-video w-full overflow-hidden bg-[#1a1a1a] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        <Image
          src={LOCAL_IMAGES.img17}
          alt=""
          fill
          className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      <div className="flex w-full min-w-0 flex-col items-center justify-start text-center lg:items-start lg:text-left">
        <h2 className="mt-3 md:mt-5 lg:mt-6 qs-reg text-[clamp(1.75rem,5vw,3.25rem)] lh-50 ls-5 uppercase text-brand-text-primary sm:text-[clamp(2rem,4vw,3.25rem)]">
          Case Study
        </h2>
        <div className="mt-8 flex w-full flex-col gap-4 sm:mt-10">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="n-book fs-20 lh-24 text-sm leading-relaxed text-[#161616]/90 sm:text-base"
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
    <div className="group flex flex-col items-center gap-2 text-center sm:gap-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/50 p-1.5 transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:bg-white/80 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:h-20 sm:w-20">
        <Image
          src={amenity.imageSrc}
          alt=""
          width={80}
          height={80}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      <span className="n-bold text-[10px] uppercase leading-tight tracking-[0.08em] text-brand-text-primary transition-colors duration-300 group-hover:text-[#8F8183] sm:text-xs">
        {amenity.label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const COMPLETED_HERO_BG = "/images/Projects/completed.svg";

// CHANGE: API response type
type BookVisitCreateResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string | null;
    email: string;
    phone_no: string;
    location: string | null;
    message: string | null;
    cv_file_url: string | null;
    created_at: string;
    updated_at: string;
  };
};
type FileUploadResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    file_url: string;
    file_name: string;
    file_type: string;
    sequence_no: number | null;
  };
};

function ProjectDetailPageContent() {
  const searchParams = useSearchParams();
  const isFromCompleted = searchParams.get("status") === "completed";
  const heroStatusLine = isFromCompleted ? "Completed Project" : project.status;
  const buildingHeroSrc = "/images/Projects/ongoing/Frame 188.svg";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    cv: "",
    message: "",
  });
  const [cvFileId, setCvFileId] = useState<number | null>(null);
  const [cvFileName, setCvFileName] = useState("");
  const [isUploadingCv, setIsUploadingCv] = useState(false);

  // CHANGE: submit state only, no UI redesign
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleCvUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const maxFileSizeInBytes = 5 * 1024 * 1024;
    const allowedTypes = ["application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      setCvFileId(null);
      setCvFileName("");
      event.target.value = "";
      alert("Only PDF files are allowed.");
      return;
    }

    if (file.size > maxFileSizeInBytes) {
      setCvFileId(null);
      setCvFileName("");
      event.target.value = "";
      alert("PDF size must be less than 5 MB.");
      return;
    }

    try {
      setIsUploadingCv(true);
      setCvFileName("Uploading...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_type", "CV");

      const result = (await uploadFile(formData)) as FileUploadResponse;

      if (!result.success) {
        throw new Error(result.message || "File upload failed.");
      }

      setCvFileId(result.data.id);
      setCvFileName(result.data.file_name || file.name);
    } catch (error) {
      setCvFileId(null);
      setCvFileName("");
      event.target.value = "";
      alert(error instanceof Error ? error.message : "File upload failed.");
    } finally {
      setIsUploadingCv(false);
    }
  }

  // CHANGE: submit public form -> backend book-visits
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.firstName.trim()) {
      alert("First name is required.");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim() || null,
        email: form.email.trim(),
        phone_no: form.phone.trim(),
        location: form.location || null,
        upload_cv_file_id: cvFileId,
        message: form.message.trim() || null,
      };

      const result = (await createVisit(payload)) as BookVisitCreateResponse;

      if (!result.success) {
        throw new Error(result.message || "Failed to submit book visit.");
      }

      alert("Book visit submitted successfully.");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        cv: "",
        message: "",
      });
      setCvFileId(null);
      setCvFileName("");
      setIsUploadingCv(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* HERO — project header                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white pt-8 pb-2 sm:pt-10 md:pt-20 lg:pt-[80px]">
        <Container className="min-w-0 pb-0">
          <ScrollReveal direction="up" distance={30}>
            <div className="relative flex min-h-0 flex-col items-centertext-center lg:min-h-[min(12rem,1fr)] lg:flex-row lg:items-start lg:justify-between  gap-4  lg:gap-4 lg:text-left">
            {/* Left — title block */}
            <div className="min-w-0 w-full max-w-full pr-0 text-center lg:max-w-[min(100%,42rem)] lg:pr-8 lg:text-left">
              {/* Status dot + label */}
              <div className="mb-1 flex items-center justify-center gap-2 lg:justify-start">
                <span className="mb-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8F8183]" />
                <span className="n-reg text-sm text-[#8F8183] sm:text-lg">
                  {heroStatusLine}
                </span>
              </div>
              {/* Project title */}
              <h1
                className="wrap-break-word qs-reg text-[clamp(1.75rem,7vw,4.375rem)] uppercase leading-none tracking-[0.05em] text-brand-text-primary sm:text-[clamp(2.25rem,5vw,4.375rem)]"
                style={{ whiteSpace: "pre-line" }}
              >
                {project.title}
              </h1>
              {/* RERA */}
              <p className="mt-3 n-bold text-[0.6875rem] uppercase tracking-widest text-[#161616] underline underline-offset-4 sm:text-sm">
                Rera No.: {project.rera}
              </p>
            </div>

            {/* Right — developer logo (below title on small screens; bottom-right on large) */}
            <div className="flex w-full shrink-0 justify-center pt-3 sm:pt-2 lg:absolute lg:bottom-0 lg:right-0 lg:w-auto lg:justify-end lg:pt-0">
              <Image
                src={project.developerLogo}
                alt="Godrej Properties"
                width={160}
                height={46}
                className="h-auto w-[min(100%,160px)] max-w-[200px] object-contain object-center sm:w-[160px] lg:w-[218px] lg:object-right"
              />
            </div>
            </div>
          </ScrollReveal>

          {/* Stats bar — 1 col on mobile, 2×2 from sm, 1×4 from lg */}
          <div className="mt-6 sm:mt-8 border-t border-black">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10" staggerChildren={0.12}>
              {project.stats.map((stat, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.04} distance={20}>
                  <div
                    className={cn(
                      "flex min-h-0 min-w-0 flex-col justify-center gap-1.5 border-b border-black py-4 text-center last:border-b-0 sm:gap-2 sm:border-b-0  sm:text-left ",
                    )}
                  >
                    <span className="n-bold text-[0.5225rem] uppercase leading-snug tracking-[0.08em] text-black sm:text-xs lg:text-sm">
                      {stat.label}
                    </span>
                    <span className="text-[#8F8183] border-b border-black pb-2 sm:pb-2.5 n-reg">
                      <span className=" inline wrap-break-word text-[clamp(1rem,4.5vw,1.125rem)] leading-[1.2] tracking-tight sm:text-2xl sm:leading-none md:text-3xl lg:text-[2.625rem]">
                        {stat.value}
                      </span>
                      {stat.unit ? (
                        <span className="ml-0.5 inline text-xs leading-none sm:text-base md:text-xl lg:text-2xl">
                          {stat.unit}
                        </span>
                      ) : null}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* BUILDING HERO IMAGE                                              */}
      {/* ---------------------------------------------------------------- */}
      {/* Full-bleed — edge to edge (no Container) */}
      <section className="relative h-[min(42svh,22rem)] min-h-[200px] w-full min-w-0 overflow-hidden pt-4 sm:h-[380px] lg:mt-20 lg:h-[550px]">
        <Image
          src={buildingHeroSrc}
          alt="Lorem Ipsum Towers"
          fill
          className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
          priority
          unoptimized={isFromCompleted}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* DESCRIPTION                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-10 sm:py-12 lg:py-16 mt-1 md:mt-5 lg:mt-10 ">
        <Container className="min-w-0">
          <ScrollReveal direction="up" distance={28}>
            <p className="n-bold text-center text-[clamp(1.0625rem,3.8vw,1.25rem)] leading-snug text-black sm:text-left sm:text-2xl lg:text-[2.25rem] lg:leading-[1.17]">
              {project.description}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PHOTO GALLERY                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white pb-10 sm:pb-12 lg:pb-16 sm:mt-1 md:mt-10">
        <Container className="min-w-0">
          <StaggerContainer className="flex flex-col gap-6" staggerChildren={0.12}>
            {/* Row 1: two halves */}
            <ScrollReveal direction="up" distance={22}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.gallery
                .filter((g) => g.span === "half")
                .map((img, i) => (
                  <div
                    key={i}
                    className="relative h-[220px] overflow-hidden bg-[#BCBDC0] sm:h-[280px] lg:h-[400px]"
                  >
                    <Image src={img.src} alt="" fill className="object-cover transition-transform duration-700 ease-out hover:scale-105" />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Row 2: full-width */}
            <ScrollReveal direction="up" delay={0.06} distance={22}>
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
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>
              ))}
            </ScrollReveal>

            {/* Row 3: three thirds */}
            <ScrollReveal direction="up" delay={0.12} distance={22}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {project.gallery
                .filter((g) => g.span === "third")
                .map((img, i) => (
                  <div
                    key={i}
                    className="relative h-[220px] overflow-hidden bg-[#BCBDC0] sm:h-[280px] lg:h-[400px]"
                  >
                    <Image src={img.src} alt="" fill className="object-cover transition-transform duration-700 ease-out hover:scale-105" />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </StaggerContainer>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PROJECT AMENITIES — full-width band; content uses same Container   */}
      {/*    gutters as the rest of the page                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative w-full min-w-0 overflow-hidden bg-[#BCBDC0] py-5 sm:py-10 lg:py-10 md:mt-10">
        {/* Light overlay — full width, behind content */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-white/85" />

        <Container className="relative z-10 min-w-0">
          <ScrollReveal direction="up" distance={24}>
            <h2 className=" text-center qs-reg text-[clamp(1.75rem,4vw,3.225rem)] uppercase tracking-[0.05em] text-brand-text-primary ">
              Project Amenities
            </h2>
          </ScrollReveal>

          {/* Rows 1 & 2 — 4 columns on desktop */}
          <StaggerContainer className="grid w-full grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-5 lg:gap-x-12 lg:gap-y-10 mt-4 md:mt-10" staggerChildren={0.1}>
            {project.amenities.slice(0, 8).map((amenity, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.025} distance={18}>
                <AmenityItem amenity={amenity} />
              </ScrollReveal>
            ))}
          </StaggerContainer>

          {/* Row 3 — 2 items, left-aligned */}
          <StaggerContainer className="mt-8 grid w-full grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 lg:gap-x-12 lg:gap-y-12" staggerChildren={0.1}>
            {project.amenities.slice(8).map((amenity, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.04} distance={18}>
                <AmenityItem amenity={amenity} />
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* LOCATION                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-12 sm:py-14 lg:py-25">
        <Container className="min-w-0">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left — list */}
            <ScrollReveal direction="left" distance={28} className="min-w-0 w-full flex-1 pb-2 md:pb-7">
              <h2 className="mb-6 text-center qs-reg text-[clamp(1.75rem,5vw,4.375rem)] uppercase tracking-[0.05em] text-brand-text-primary sm:mb-8 sm:text-left ">
                Location
              </h2>

              <div className="flex flex-col ">
                {project.locationItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ">
                      <span className="min-w-0 flex-1 wrap-break-word text-center n-book fs-16 lh-24 text-[#161616] sm:text-left sm:text-base">
                        {item.name}
                      </span>
                      <div className="flex shrink-0 items-center justify-center gap-2 sm:justify-end">
                        <Image src={item.type === "walk" ? "/images/location.svg" : "/images/drive.svg"} alt="" width={13} height={18} className="object-cover" />
                        <span className="min-w-14 text-center n-bold text-[#161616] sm:min-w-15 sm:text-right sm:text-base">
                          {item.time}
                        </span>
                      </div>
                    </div>
                    {i < project.locationItems.length - 1 && (
                      <div className="w-full border-t border-[#000000]" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Right — dynamic map */}
            <ScrollReveal direction="right" delay={0.08} distance={28} className="relative h-[min(52vh,24rem)] w-full min-h-[220px] shrink-0 overflow-hidden sm:h-[360px] sm:min-h-[280px] lg:h-auto lg:min-h-[550px] lg:w-[49%]">
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
                  ...project.locationItems.map(
                    (item) =>
                      ({
                        lat: item.lat,
                        lng: item.lng,
                        label: `${item.name} — ${item.time}`,
                        isMain: false,
                      }) as MapMarker,
                  ),
                ]}
                className="h-full w-full"
              />
            </ScrollReveal>
          </div>
        </Container>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* CASE STUDY (completed projects only)                             */}
      {/* ---------------------------------------------------------------- */}
      {isFromCompleted ? (
        <section className="bg-white mb-10 md:mb-20 lg:mb-30">
          <Container className="min-w-0">
            <ScrollReveal direction="up" distance={26}>
              <CaseStudySection
                posterSrc={project.caseStudy.posterSrc}
                videoUrl={project.caseStudy.videoUrl}
                paragraphs={project.caseStudy.paragraphs}
              />
            </ScrollReveal>
          </Container>
        </section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* BOOK A VISIT (ongoing projects only — hidden for completed)      */}
      {/* ---------------------------------------------------------------- */}
      {!isFromCompleted ? (
        <section className="relative mb-10 min-h-0 w-full min-w-0 overflow-hidden py-0 lg:mb-30">
          {/* Background */}
          <Image
            src={project.bookVisitBg}
            alt=""
            fill
            className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-text-primary/50" />

          <Container className="relative z-10 min-w-0 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
              {/* Left — info */}
              <ScrollReveal direction="left" distance={26} className="flex min-w-0 flex-1 flex-col items-center justify-between text-center lg:items-start lg:text-left">
                <div className="w-full">
                  <h2 className="qs-reg text-[clamp(1.75rem,6vw,4.375rem)] uppercase leading-none tracking-[0.05em] text-white sm:text-[clamp(2.5rem,5vw,4.375rem)]">
                    Book A Visit
                  </h2>
                  <p className="mx-auto mt-10  n-reg text-sm leading-relaxed text-white sm:text-base lg:mx-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div className="mt-10 flex flex-col gap-6 border-t border-white pt-8 sm:flex-row sm:gap-12 md:gap-30 lg:gap-50 sm:text-left w-full items-center justify-start ">
                  <div className="w-full sm:w-auto">
                    <p className="n-bold fs-16 lh-24 uppercase tracking-widest text-white">
                      Location
                    </p>
                    <p className="mx-auto mt-2 max-w-[16rem] n-book text-sm leading-relaxed text-white sm:mx-0">
                      C-602 &amp; 603, ONE BKC, G Block, Bandra Kurla Complex,
                      Bandra (E), Mumbai - 400051
                    </p>
                  </div>
                  <div className="w-full sm:w-auto">
                    <p className="n-bold fs-16 lh-24 uppercase tracking-widest text-white">
                      Contact
                    </p>
                    <p className="mt-2 n-book text-sm leading-relaxed text-white">
                      022-68770076
                      <br />
                      022-6877005
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right — form card (`.book-visit-form` scopes mobile CSS so fields stay left-aligned) */}
              <ScrollReveal direction="right" delay={0.08} distance={26}>
                <form
                  onSubmit={handleSubmit}
                  className="book-visit-form w-full min-w-0 max-w-full bg-white px-5 py-7 text-left sm:px-8 sm:py-8 lg:w-[490px] lg:shrink-0 lg:px-10"
                >
                <div className="flex w-full flex-col items-stretch gap-0 text-left">
                  {/* Row 1: First / Last name */}
                  <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 sm:gap-8 n-bold lh-24 fs-14">
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
                  <div className="grid grid-cols-1 gap-6 border-t border-[#8F8183]/30  n-bold lh-24 fs-14 py-6 sm:grid-cols-2 sm:gap-8">
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
                  <div className="grid grid-cols-1 gap-6 border-t n-bold lh-24 fs-14 border-[#8F8183]/30 py-6 sm:grid-cols-2 sm:gap-8">
                    <SelectField
                      label="Location"
                      name="location"
                      placeholder="Select Opening"
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
                      wrapperClassName="border-[#000000]"
                    />
                  </div>

                  {/* Message */}
                  <div className="border-t border-[#8F8183]/30 pt-6 text-left n-bold lh-24 fs-14">
                    <label className="block text-left n-reg text-sm text-brand-text-primary">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Type Message...."
                      value={form.message}
                      onChange={handleChange}
                      rows={2}
                      className="mt-2 w-full resize-none border-b border-[#8F8183] bg-transparent text-left n-reg text-sm text-[#202020] placeholder-[#202020]/40 outline-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="mt-8 flex justify-center">
                    <button
                      suppressHydrationWarning
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-grad inline-flex h-[52px] w-full items-center justify-center gap-4 px-8 n-reg  text-sm  uppercase tracking-widest text-white sm:h-[55px] sm:w-auto sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                      <ArrowUpRight />
                    </button>
                  </div>
                </div>
                </form>
              </ScrollReveal>
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
            <p className="n-reg  text-sm text-[#8F8183]">Loading…</p>
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
    <div className="flex flex-col gap-1 text-left">
      <label className="text-left n-bold fs-14 lh-24 text-brand-text-primary">
        {label}
      </label>
      <input
        suppressHydrationWarning
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-b border-[#8F8183] bg-transparent pb-1 text-left n-reg text-sm text-[#202020] placeholder-[#202020]/40 outline-none"
      />
    </div >
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  wrapperClassName?: string;
}

function SelectField({
  label,
  name,
  placeholder,
  value,
  onChange,
  options,
  wrapperClassName,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <label className="text-left n-reg text-sm text-brand-text-primary">
        {label}
      </label>
      <div
        className={cn(
          "relative border-b border-[#8F8183] pb-1",
          wrapperClassName,
        )}
      >
        <select
          suppressHydrationWarning
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-transparent text-left n-reg text-sm text-[#202020]/40 outline-none"
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
