"use client";

import { RoundIconButton } from "@/components/ui/RoundIconButton";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { localImageByIndex } from "@/lib/local-images";
import { cn } from "@/utils/cn";
import Image from "next/image";

/** Same assets as `CarouselControls` (prev/next chevrons). */
const CAROUSEL_PREV = "/images/leftwhitecaraousel.svg";
const CAROUSEL_NEXT = "/images/rightwhitecaraousel.svg";

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
    imageSrc: localImageByIndex(0),
    subLogos: [
      { src: "/images/partners/Group 40.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 30.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 44.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 32.svg",
    tabLogoAlt: "Adani Realty",
  },
  {
    id: "godrej",
    name: "Godrej Properties",
    imageSrc: localImageByIndex(1),
    subLogos: [
      { src: "/images/partners/Group 40.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 30.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 44.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 33.svg",
    tabLogoAlt: "Godrej Properties",
  },
  {
    id: "marathon",
    name: "Marathon Group",
    imageSrc: localImageByIndex(2),
    subLogos: [
      { src: "/images/partners/Group 40.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 30.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 44.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 34.svg",
    tabLogoAlt: "Marathon Group",
  },
  {
    id: "sunteck",
    name: "Sunteck Realty",
    imageSrc: localImageByIndex(3),
    subLogos: [
      { src: "/images/partners/Group 40.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 30.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 44.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 36.svg",
    tabLogoAlt: "Sunteck Realty",
  },
  {
    id: "piramal",
    name: "Piramal Realty",
    imageSrc: localImageByIndex(4),
    subLogos: [
      { src: "/images/partners/Group 40.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 30.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 44.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 38.svg",
    tabLogoAlt: "Piramal Realty",
  },
  {
    id: "ashford",
    name: "Ashford Group",
    imageSrc: localImageByIndex(5),
    subLogos: [
      { src: "/images/partners/Group 40.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 30.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 44.svg", alt: "Partner logo" },
    ],
    tabLogoSrc: "/images/Developer/partners/Group 39.svg",
    tabLogoAlt: "Ashford Group",
  },
  {
    id: "crescent",
    name: "Crescent Group",
    imageSrc: localImageByIndex(6),
    subLogos: [
      { src: "/images/partners/Group 40.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 30.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 33.svg", alt: "Partner logo" },
      { src: "/images/partners/Group 44.svg", alt: "Partner logo" },
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
      className="w-full min-w-0 overflow-x-clip py-10 sm:py-14 lg:py-26"
      aria-label="Featured partners showcase"
    >
      <div className="mx-auto w-full min-w-0 max-w-[min(1237px,100%)] px-4 sm:px-6 lg:px-8 xl:px-0">
        {/* ── Main Slide ── */}
        <div
          className="relative w-full  max-w-full overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.25)]  md:min-h-0"
          style={{ aspectRatio: "1237/462" }}
        >
          {/* Background image (blurred building) */}
          <div className="absolute inset-0 z-0">
            <Image
              key={current.id}
              src={current.imageSrc}
              alt=""
              fill
              className="object-cover"
              style={{ filter: "blur(2px)", transform: "scale(1.04)" }}
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
                "qs-reg nt-normal uppercase text-white",
                "text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.4] tracking-[0.05em]",
                "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]",
                "text-center",
              )}
            >
              {current.name}
            </h2>
          </div>

          {/* Sub-logos row — wrap + max-width so narrow viewports don’t overflow */}
          <div className="absolute inset-x-0  z-20 flex justify-center px-3 bottom-[38%] md:bottom-[40%] sm:px-6">

            <RoundIconButton
              label="Previous partner"
              onClick={() => advance(-1)}
              className={cn(
                "absolute left-2 top-1/2 z-30 -translate-y-1/2 cursor-pointer sm:left-6 lg:left-10",
                "h-8 w-8 text-white hover:bg-white/10 sm:h-11 sm:w-11 mt-2",
              )}
            >
              <Image
                src={CAROUSEL_PREV}
                alt=""
                width={40}
                height={40}
                className="object-cover"
              />
            </RoundIconButton>

            <div className="flex max-w-full min-w-0 flex-wrap items-center justify-center gap-3 sm:gap-8 md:gap-10 lg:gap-14">
              {current.subLogos.map((logo, i) => (
                <div
                  key={i}
                  className="relative flex h-9 w-[4.5rem] max-w-[28vw] shrink-0 items-center justify-center sm:h-12 sm:w-28 md:h-14 md:w-32"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain object-center "
                    sizes="(max-width: 640px) 25vw, 128px"
                  />
                </div>
              ))}
            </div>
          </div>
          <RoundIconButton
            label="Next partner"
            onClick={() => advance(1)}
            className={cn(
              "absolute right-2 top-1/2 z-30 -translate-y-1/2 cursor-pointer sm:right-6 lg:right-10",
              "h-8 w-8 text-white hover:bg-white/10 sm:h-11 sm:w-11 mt-5",
            )}
          >
            <Image
              src={CAROUSEL_NEXT}
              alt=""
              width={40}
              height={40}
              className="bg-transparent object-cover"
            />
          </RoundIconButton>

          {/* Navigation — same pattern as `CarouselControls` (RoundIconButton + carousel SVGs) */}

        </div>

        {/* ── Tab strip: scroll horizontally on small screens; equal columns on xl+ ── */}
        <div className="w-full min-w-0 max-w-full">
          <div
            className="flex h-[100] shadow-[0_0_20px_rgba(0,0,0,0.25)] w-full min-w-0 overflow-x-auto overscroll-x-contain scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] xl:overflow-visible"
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
                  "flex shrink-0 items-center justify-center cursor-pointer px-3 py-3 transition-colors sm:px-4 sm:py-4 md:py-5",
                  "min-w-[5.75rem] sm:min-w-[7.5rem]",
                  "xl:min-w-0 xl:flex-1 xl:basis-0 xl:shrink",
                  "border-r border-black/[0.08] last:border-r-0",
                  i === index
                    ? "bg-white shadow-inner z-30"
                    : "bg-[#DADADB] hover:bg-white/70",
                )}
              >
                <div className="relative h-8 w-full max-w-[5.5rem] sm:h-10 sm:max-w-[6.25rem]">
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
      </div>
    </section>
  );
}
