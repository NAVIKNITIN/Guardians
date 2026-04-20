"use client";

import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Public types ─────────────────────────────────────────────────────────────

export type ServiceTile = {
  label: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type ServiceAccordionItem = {
  title: string;
  description?: string;
};

// ─── Default content (shared by Buyer's and Developer's service pages) ───────

export const DEFAULT_SERVICE_TILES: ServiceTile[] = [
  {
    label: "Residential Services",
    imageSrc: "/images/Buyer/services/resident.svg",
    imageAlt: "Residential Services",
    href: "#",
  },
  {
    label: "Retail Services",
    imageSrc: "/images/Buyer/services/retail.svg",
    imageAlt: "Retail Services",
    href: "#",
  },
  {
    label: "Marketing Consulting Services",
    imageSrc: "/images/Buyer/services/market.svg",
    imageAlt: "Marketing Consulting Services",
    href: "#",
  },
  {
    label: "Land Services",
    imageSrc: "/images/Buyer/services/land.svg",
    imageAlt: "Land Services",
    href: "#",
  },
];

export const DEFAULT_ACCORDION_ITEMS: ServiceAccordionItem[] = [
  {
    title: "End-to-End Service",
    description:
      "Comprehensive support is provided, from property selection to the completion of all necessary documentation, ensuring a hassle-free experience.",
  },
  { title: "Local Expertise, Global Reach" },
  { title: "Tailored Solutions" },
  { title: "Seamless Transactions" },
  { title: "A Trusted Partner" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <svg
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M0.292899 1.8289C-0.0976329 1.41048 -0.0976329 0.732242 0.292899 0.313818C0.68343 -0.104606 1.31646 -0.104606 1.70699 0.313818L7.7071 6.74246C8.09763 7.16088 8.09763 7.83912 7.7071 8.25754L1.70699 14.6862C1.31646 15.1046 0.68343 15.1046 0.292899 14.6862C-0.0976329 14.2678 -0.0976329 13.5895 0.292899 13.1711L5.58597 7.5L0.292899 1.8289Z"
        fill="white"
      />
    </svg>
  );
}

// ─── Service tile (one of the 4 image cards in the left column) ──────────────

function ServiceTileView({ tile }: { tile: ServiceTile }) {
  return (
    <Link
      href={tile.href}
      className="group relative block h-[140px] min-h-[140px] flex-1 overflow-hidden bg-[#D5D3D4] lg:h-auto lg:min-h-0"
    >
      <Image
        src={tile.imageSrc}
        alt={tile.imageAlt}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 43vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(32,34,37,0.00) 0%, #202225 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 px-4 py-3 sm:gap-3 sm:px-8 sm:py-[17px] lg:gap-5 lg:px-12">
        <span className="min-w-0 n-bold uppercase text-white tracking-[0.08em] sm:tracking-[0.1em] text-sm leading-tight sm:text-base md:text-lg lg:text-[20px] lg:leading-[24px]">
          {tile.label}
        </span>
        <ChevronRight />
      </div>
    </Link>
  );
}

// ─── Commercial Services accordion panel (right column) ──────────────────────

type CommercialPanelProps = {
  title: string;
  items: ServiceAccordionItem[];
  imageSrc: string;
  knowMoreHref: string;
};

function CommercialPanel({
  title,
  items,
  imageSrc,
  knowMoreHref,
}: CommercialPanelProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden bg-[#D5D3D4] lg:min-h-[560px]">
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 57vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(32,34,37,0.20)",
          backdropFilter: "blur(11.4px)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <h2 className="mb-6 qs-reg uppercase tracking-[0.05em] text-white text-[clamp(1.75rem,5vw,3.125rem)] leading-[1.05] sm:mb-8">
          {title}
        </h2>

        <div className="flex flex-1 flex-col">
          {items.map((item, i) => (
            <div key={item.title}>
              {i > 0 && <div className="w-full border-t border-white/50" />}
              <button
                type="button"
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-3 text-left transition-opacity hover:opacity-80 sm:py-4"
              >
                <span className="n-reg text-base leading-snug text-white sm:text-lg lg:text-[20px]">
                  {item.title}
                </span>
                <span className="shrink-0 n-reg text-lg text-white sm:text-xl">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && item.description && (
                <p className="pb-3 n-book text-sm leading-[1.5] text-white sm:pb-4 sm:text-base lg:text-[16px] lg:leading-[24px]">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto flex justify-center pt-6 sm:pt-8">
          <OutlineArrowButton
            href={knowMoreHref}
            className="w-fit bg-white px-8 text-black hover:bg-black hover:text-white sm:px-12"
          >
            Know More
          </OutlineArrowButton>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

type ServicesGridProps = {
  /** `aria-label` for the outer section — e.g. "Buyer services". */
  ariaLabel: string;
  /** 4 image tiles rendered in the left column. Defaults to the shared list. */
  tiles?: ServiceTile[];
  /** Accordion title rendered on the Commercial panel. */
  accordionTitle?: string;
  /** Accordion rows. Defaults to the shared list. */
  accordionItems?: ServiceAccordionItem[];
  /** Background image for the Commercial panel. */
  accordionImageSrc?: string;
  /** `href` for the "Know More" button. */
  knowMoreHref?: string;
};

/**
 * Shared services grid used by both Buyer's and Developer's service pages.
 *
 * Layout:
 * - Mobile: flex column — 4 tiles stacked, then the Commercial panel below.
 * - `lg+`: 2-column CSS grid (43% / 1fr). Left column is itself a 4-row grid
 *   so the tiles always share the column's height equally, and the row's
 *   height is driven by the tallest item (the Commercial panel's content).
 */
export function ServicesGrid({
  ariaLabel,
  tiles = DEFAULT_SERVICE_TILES,
  accordionTitle = "Commercial Services",
  accordionItems = DEFAULT_ACCORDION_ITEMS,
  accordionImageSrc = "/images/Developer/services/commercial.svg",
  knowMoreHref = "#",
}: ServicesGridProps) {
  return (
    <section className="mb-2 bg-white my-10 md:my-16 lg:my-20 xl:my-25" aria-label={ariaLabel}>
      <div className="flex flex-col lg:grid lg:grid-cols-[43%_1fr] lg:gap-5">
        <div className="flex min-h-0 flex-col gap-[30px] bg-white py-[30px] lg:grid lg:grid-rows-4 lg:gap-6 lg:py-0">
          {tiles.map((tile) => (
            <ServiceTileView key={tile.label} tile={tile} />
          ))}
        </div>

        <CommercialPanel
          title={accordionTitle}
          items={accordionItems}
          imageSrc={accordionImageSrc}
          knowMoreHref={knowMoreHref}
        />
      </div>
    </section>
  );
}
