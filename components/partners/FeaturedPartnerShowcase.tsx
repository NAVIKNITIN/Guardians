"use client";

import { useCycleIndex } from "@/hooks/useCycleIndex";
import { cn } from "@/utils/cn";
import Image from "next/image";

export type PartnerShowcaseItem = {
  id: string;
  /** Displayed as the main heading on the slide */
  name: string;
  /** Building / hero photo for the slide background */
  imageSrc: string;
  /** Logos shown in the centre row of the slide */
  subLogos: { src: string; alt: string }[];
  /** Small thumbnail logo for the tab strip */
  tabLogoSrc: string;
  tabLogoAlt: string;
};

const PARTNERS: PartnerShowcaseItem[] = [
  {
    id: "adani",
    name: "Adani Realty",
    imageSrc:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    subLogos: [
      { src: "/images/Developer/partners/Group 32.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 34.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 36.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 32.svg",
    tabLogoAlt: "Adani Realty",
  },
  {
    id: "godrej",
    name: "Godrej Properties",
    imageSrc:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    subLogos: [
      { src: "/images/Developer/partners/Group 38.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 39.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 42.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 44.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 33.svg",
    tabLogoAlt: "Godrej Properties",
  },
  {
    id: "marathon",
    name: "Marathon Group",
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    subLogos: [
      { src: "/images/Developer/partners/Group 47.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 48.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 49.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 50.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 34.svg",
    tabLogoAlt: "Marathon Group",
  },
  {
    id: "sunteck",
    name: "Sunteck Realty",
    imageSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    subLogos: [
      { src: "/images/Developer/partners/Group 32.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 36.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 38.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 42.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 36.svg",
    tabLogoAlt: "Sunteck Realty",
  },
  {
    id: "piramal",
    name: "Piramal Realty",
    imageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    subLogos: [
      { src: "/images/Developer/partners/Group 44.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 47.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 48.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 50.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 38.svg",
    tabLogoAlt: "Piramal Realty",
  },
  {
    id: "ashford",
    name: "Ashford Group",
    imageSrc:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=1600&q=80",
    subLogos: [
      { src: "/images/Developer/partners/Group 39.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 49.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 34.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 39.svg",
    tabLogoAlt: "Ashford Group",
  },
  {
    id: "crescent",
    name: "Crescent Group",
    imageSrc:
      "https://images.unsplash.com/photo-1426122402199-be02db90eb90?auto=format&fit=crop&w=1600&q=80",
    subLogos: [
      { src: "/images/Developer/partners/Group 42.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 44.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 32.svg", alt: "Partner logo" },
      { src: "/images/Developer/partners/Group 38.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 42.svg",
    tabLogoAlt: "Crescent Group",
  },
];

export function FeaturedPartnerShowcase() {
  const { index, advance, setIndex } = useCycleIndex(PARTNERS.length, 0);
  const current = PARTNERS[index]!;

  return (
    <section
      className="py-10 sm:py-14 lg:py-16"
      aria-label="Featured partners showcase"
    >
      <div className="mx-auto max-w-[1237px] px-4 sm:px-6 lg:px-8 xl:px-0">
        {/* ── Main Slide ── */}
        <div
          className="relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.25)]"
          style={{ aspectRatio: "1237/562" }}
        >
          {/* Background image (blurred building) */}
          <div className="absolute inset-0 z-0">
            <Image
              key={current.id}
              src={current.imageSrc}
              alt=""
              fill
              className="object-cover object-center"
              style={{ filter: "blur(6px)", transform: "scale(1.04)" }}
              sizes="(max-width: 1280px) 100vw, 1237px"
            />
          </div>

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(32,34,37,0) 0%, #202225 100%)",
            }}
            aria-hidden
          />

          {/* Partner name */}
          <div className="absolute inset-x-0 top-[14%] z-20 flex justify-center px-4">
            <h2
              className={cn(
                "font-qasbyne font-normal uppercase text-white",
                "text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.4] tracking-[0.05em]",
                "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]",
                "text-center",
              )}
            >
              {current.name}
            </h2>
          </div>

          {/* Sub-logos row */}
          <div className="absolute inset-x-0 bottom-[18%] z-20 flex justify-center px-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
              {current.subLogos.map((logo, i) => (
                <div
                  key={i}
                  className="relative flex h-10 w-24 items-center justify-center sm:h-14 sm:w-32"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain object-center brightness-0 invert"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous partner"
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:border-white hover:bg-white/10 sm:h-11 sm:w-11"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 30 30"
              fill="none"
              aria-hidden
            >
              <path
                opacity="0.6"
                d="M15 21L9 15M9 15L15 9M9 15H21M0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15Z"
                stroke="white"
                strokeWidth="1.72"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next partner"
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:border-white hover:bg-white/10 sm:h-11 sm:w-11"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 30 30"
              fill="none"
              aria-hidden
            >
              <path
                opacity="0.6"
                d="M15 21L21 15M21 15L15 9M21 15H9M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z"
                stroke="white"
                strokeWidth="1.72"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Tab strip ── */}
        <div
          className="flex overflow-x-auto"
          role="tablist"
          aria-label="Select partner"
        >
          {PARTNERS.map((partner, i) => (
            <button
              key={partner.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "flex min-w-[140px] flex-1 items-center justify-center px-3 py-4 transition-colors sm:min-w-[160px] sm:py-5",
                "border-r border-black/[0.08] last:border-r-0",
                i === index
                  ? "bg-white shadow-inner"
                  : "bg-[#DADADB] hover:bg-white/70",
              )}
            >
              <div className="relative h-10 w-full max-w-[100px]">
                <Image
                  src={partner.tabLogoSrc}
                  alt={partner.tabLogoAlt}
                  fill
                  className="object-contain object-center"
                  sizes="100px"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
