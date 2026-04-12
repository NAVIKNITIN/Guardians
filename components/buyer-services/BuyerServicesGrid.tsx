"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ServiceTile = {
  label: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type AccordionItem = {
  title: string;
  description?: string;
};

// ─── Data — buyer-specific images ────────────────────────────────────────────

const SERVICE_TILES: ServiceTile[] = [
  {
    label: "Residential Services",
    imageSrc:
      "/images/Buyer/services/resident.svg",
    imageAlt: "Residential Services",
    href: "#",
  },
  {
    // Buyer's Retail tile uses a different image than Developer's
    label: "Retail Services",
    imageSrc:
      "/images/Buyer/services/retail.svg",
    imageAlt: "Retail Services",
    href: "#",
  },
  {
    label: "Marketing Consulting Services",
    imageSrc:
      "/images/Buyer/services/market.svg",
    imageAlt: "Marketing Consulting Services",
    href: "#",
  },
  {
    label: "Land Services",
    imageSrc:
      "/images/Buyer/services/land.svg",
    imageAlt: "Land Services",
    href: "#",
  },
];

const ACCORDION_ITEMS: AccordionItem[] = [
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

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" aria-hidden className="shrink-0">
      <path
        d="M0.292899 1.8289C-0.0976329 1.41048 -0.0976329 0.732242 0.292899 0.313818C0.68343 -0.104606 1.31646 -0.104606 1.70699 0.313818L7.7071 6.74246C8.09763 7.16088 8.09763 7.83912 7.7071 8.25754L1.70699 14.6862C1.31646 15.1046 0.68343 15.1046 0.292899 14.6862C-0.0976329 14.2678 -0.0976329 13.5895 0.292899 13.1711L5.58597 7.5L0.292899 1.8289Z"
        fill="white"
      />
    </svg>
  );
}

// ─── Service tile ─────────────────────────────────────────────────────────────

function ServiceTile({ tile }: { tile: ServiceTile }) {
  return (
    <Link
      href={tile.href}
      className="group relative block h-[140px] min-h-[140px] flex-1 overflow-hidden bg-[#D5D3D4] lg:h-auto"
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
          background: "linear-gradient(180deg, rgba(32,34,37,0.00) 0%, #202225 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-5 px-12 py-[17px]">
        <span className="font-nexa text-2xl font-bold uppercase tracking-[0.1em] text-white">
          {tile.label}
        </span>
        <ChevronRight />
      </div>
    </Link>
  );
}

// ─── Commercial Services panel (buyer-specific BG image) ─────────────────────

function CommercialPanel() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden bg-[#D5D3D4] lg:min-h-[560px]">
      {/* Buyer-specific panel background */}
      <Image
        src="/images/Developer/services/commercial.svg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 57vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(32,34,37,0.20)", backdropFilter: "blur(11.4px)" }}
      />

      <div className="relative z-10 flex h-full flex-col px-8 py-12 lg:px-10">
        <h2 className="mb-8 font-qasbyne text-[clamp(2rem,4vw,3.125rem)] font-normal uppercase tracking-[0.05em] text-white">
          Commercial Services
        </h2>

        <div className="flex flex-1 flex-col">
          {ACCORDION_ITEMS.map((item, i) => (
            <div key={item.title}>
              {i > 0 && <div className="w-full border-t border-white/50" />}
              <button
                type="button"
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left transition-opacity hover:opacity-80"
              >
                <span className="font-nexa text-xl font-bold leading-snug text-white">
                  {item.title}
                </span>
                <span className="shrink-0 font-nexa text-xl font-bold text-white">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && item.description && (
                <p className="pb-4 font-nexa text-base font-normal leading-[1.5] text-white">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <Link
            href="#"
            className="inline-flex items-center gap-5 font-nexa text-2xl font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80"
          >
            Know More
            <ChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BuyerServicesGrid() {
  return (
    <section className="bg-white mb-2 lg:mb-[80px]" aria-label="Buyer services">
      <div className="flex h-full flex-col lg:flex-row lg:items-stretch">
        {/* Left: stacked service tiles — flex-1 tiles fill height to match CommercialPanel */}
        <div className="mr-2 flex min-h-0 flex-col gap-[30px] bg-white py-[30px] lg:mb-0 lg:mr-5 lg:h-full lg:w-[43%] lg:flex-shrink-0 lg:gap-6 lg:py-0">
          {SERVICE_TILES.map((tile) => (
            <ServiceTile key={tile.label} tile={tile} />
          ))}
        </div>

        {/* Right: Commercial Services panel */}
        <div className="flex min-h-0 flex-1 flex-col lg:min-h-0">
          <CommercialPanel />
        </div>
      </div>
    </section>
  );
}
