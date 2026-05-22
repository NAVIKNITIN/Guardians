"use client";

import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { CONTACT } from "@/data/audience-marketing-shared";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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

export type ServicePanel = {
  title: string;
  items: ServiceAccordionItem[];
  imageSrc: string;
  knowMoreHref: string;
};

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

function AnimatedWaveTitle({ title }: { title: string }) {
  const words = title.split(/\s+/).filter(Boolean);
  return (
    <motion.h2
      key={title}
      className="mb-6 w-full text-center qs-reg uppercase tracking-[0.05em] text-white text-[clamp(1.75rem,5vw,3.125rem)] leading-[1.05] sm:mb-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.06,
          },
        },
      }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, x: -16, filter: "blur(2px)" },
            visible: {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              transition: { duration: 0.72, ease: "easeOut" },
            },
          }}
        >
          {word}
          {idx < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.h2>
  );
}

function AnimatedWaveInlineText({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block"
          initial={{ opacity: 0, x: -10, filter: "blur(1.5px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.62,
            ease: "easeOut",
            delay: idx * 0.06,
          }}
        >
          {word}
          {idx < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

function ServiceTileView({
  tile,
  isActive,
  onClick,
}: {
  tile: ServiceTile;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative block h-[140px] min-h-[140px] flex-1 cursor-pointer overflow-hidden bg-[#D5D3D4] lg:h-auto lg:min-h-0"
      aria-pressed={isActive}
      initial={false}
      animate={isActive ? { scale: 1.01 } : { scale: 1 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={isActive ? { x: [-18, 12, 0] } : { x: 0 }}
        transition={
          isActive
            ? { duration: 1, ease: "easeOut" }
            : { duration: 0.35, ease: "linear" }
        }
      >
        <Image
          src={tile.imageSrc}
          alt={tile.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 43vw"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? "linear-gradient(180deg, rgba(32,34,37,0.00) 0%, rgba(32,34,37,0.88) 100%)"
            : "linear-gradient(180deg, rgba(32,34,37,0.00) 0%, #202225 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 px-4 py-3 sm:gap-3 sm:px-8 sm:py-[17px] lg:gap-5 lg:px-12">
        <span className="min-w-0 n-bold uppercase text-white tracking-[0.08em] sm:tracking-[0.1em] text-sm leading-tight sm:text-base md:text-lg lg:text-[20px] lg:leading-[24px]">
          {tile.label}
        </span>
        <ChevronRight />
      </div>
    </motion.button>
  );
}

type CommercialPanelProps = {
  title: string;
  items: ServiceAccordionItem[];
  imageSrc: string;
  knowMoreHref: string;
  knowMoreLabel?: string;
};

function CommercialPanel({
  title,
  items,
  imageSrc,
  knowMoreHref,
  knowMoreLabel = "Explore More",
}: CommercialPanelProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden bg-[#D5D3D4] sm:min-h-[480px] lg:min-h-[560px]">
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
        <AnimatedWaveTitle title={title} />

        <div className="flex flex-1 flex-col">
          {items.map((item, i) => (
            <div key={item.title}>
              {i > 0 && <div className="w-full border-t border-white/50" />}
              <button
                type="button"
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-left transition-opacity hover:opacity-80 sm:py-4"
              >
                <AnimatedWaveInlineText
                  text={item.title}
                  className="n-reg text-base leading-snug text-white sm:text-lg lg:text-[20px]"
                />
                <span className="shrink-0 n-reg text-lg text-white sm:text-xl">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {item.description ? (
                <motion.div
                  initial={false}
                  animate={
                    openIndex === i
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-3 n-book text-sm leading-[1.5] text-white sm:pb-4 sm:text-base lg:text-[16px] lg:leading-[24px]">
                    <AnimatedWaveInlineText
                      text={item.description}
                      className="inline"
                    />
                  </p>
                </motion.div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-auto flex justify-center pt-6 sm:pt-8">
          <OutlineArrowButton
            href={knowMoreHref}
            className="h-[53.99px] w-[253px] border border-white/30 cursor-pointer !shadow-none focus-visible:outline-none focus-visible:outline-offset-0 disabled:pointer-events-none disabled:opacity-50 sm:h-[55px] sm:w-auto sm:max-w-none sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl"
            iconClassName="w-[13px] h-[13px]"
          >
            {knowMoreLabel}
          </OutlineArrowButton>
        </div>
      </div>
    </div>
  );
}

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
  /** `href` for the panel CTA button. */
  knowMoreHref?: string;
  /** Panel CTA label (default: "Explore More"). */
  knowMoreLabel?: string;
  /** Optional per-tile panel content; if omitted, uses defaults based on tiles. */
  panelsByTile?: ServicePanel[];
};

const TILE_GRID_ROWS_CLASS: Record<number, string> = {
  3: "lg:grid-rows-3",
  4: "lg:grid-rows-4",
  5: "lg:grid-rows-5",
  6: "lg:grid-rows-6",
};

/** Shared services grid for buyer and developer service pages. */
export function ServicesGrid({
  ariaLabel,
  tiles = DEFAULT_SERVICE_TILES,
  accordionTitle = "Commercial Services",
  accordionItems = DEFAULT_ACCORDION_ITEMS,
  accordionImageSrc = "/images/Developer/services/commercial.svg",
  knowMoreHref = CONTACT,
  knowMoreLabel = "Explore More",
  panelsByTile,
}: ServicesGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const resolvedPanels: ServicePanel[] =
    panelsByTile && panelsByTile.length > 0
      ? panelsByTile
      : tiles.map((tile) => ({
        title: tile.label,
        items: [
          {
            title: `${tile.label} Overview`,
            description: `Comprehensive advisory support for ${tile.label.toLowerCase()}, tailored to your goals and transaction stage.`,
          },
          ...accordionItems.slice(1),
        ],
        imageSrc: tile.imageSrc || accordionImageSrc,
        knowMoreHref: tile.href && tile.href !== "#" ? tile.href : knowMoreHref,
      }));

  const activePanel =
    activeIndex === null
      ? {
        title: accordionTitle,
        items: accordionItems,
        imageSrc: accordionImageSrc,
        knowMoreHref,
      }
      : resolvedPanels[activeIndex] ?? {
        title: accordionTitle,
        items: accordionItems,
        imageSrc: accordionImageSrc,
        knowMoreHref,
      };

  const tileGridRowsClass =
    TILE_GRID_ROWS_CLASS[tiles.length] ?? "lg:grid-rows-4";

  return (
    <section className="mb-2 bg-white my-10 md:my-16 lg:my-20 xl:my-25" aria-label={ariaLabel}>
      <div className="flex flex-col lg:grid lg:grid-cols-[43%_1fr] lg:gap-5">
        <div
          className={cn(
            "flex min-h-0 flex-col gap-[30px] bg-white py-[30px] lg:grid lg:gap-6 lg:py-0",
            tileGridRowsClass,
          )}
        >
          {tiles.map((tile, idx) => (
            <ServiceTileView
              key={tile.label}
              tile={tile}
              isActive={idx === activeIndex}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>


        <CommercialPanel
          title={activePanel.title}
          items={activePanel.items}
          imageSrc={activePanel.imageSrc}
          knowMoreHref={activePanel.knowMoreHref}
          knowMoreLabel={knowMoreLabel}
        />
      </div>
    </section>
  );
}
