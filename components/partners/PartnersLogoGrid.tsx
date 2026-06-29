"use client";

import { Container } from "@/components/common/Container";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { useViewportIsMobile } from "@/hooks/useViewportIsMobile";
import { PARTNERS_GRID_LOGOS } from "@/data/partners-logo-grid";
import type { PartnersGridLogo } from "@/data/partners-logo-grid";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import "./partners-logo-grid.css";

const MOBILE_GRID_BREAKPOINT_PX = 768;
const PAGE_TRANSITION = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

function GridDividers({
  columns,
  rows,
  className,
}: {
  columns: number;
  rows: number;
  className?: string;
}) {
  const verticalAt = Array.from(
    { length: columns - 1 },
    (_, i) => ((i + 1) / columns) * 100,
  );
  const horizontalAt = Array.from(
    { length: rows - 1 },
    (_, i) => ((i + 1) / rows) * 100,
  );

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      {verticalAt.map((left) => (
        <div
          key={`v-${left}`}
          className="partners-grid-divider-v absolute top-0 bottom-0 -translate-x-1/2"
          style={{ left: `${left}%` }}
        />
      ))}
      {horizontalAt.map((top) => (
        <div
          key={`h-${top}`}
          className="partners-grid-divider-h absolute right-0 left-0 -translate-y-1/2"
          style={{ top: `${top}%` }}
        />
      ))}
    </div>
  );
}

function PartnerLogoCell({ logo }: { logo: PartnersGridLogo | null }) {
  return (
    <li className="bg-white">
      <div
        className={cn(
          "flex h-full min-h-[5.5rem] items-center justify-center",
          "px-4 py-6 sm:min-h-[6.25rem] sm:px-6 sm:py-8",
          "md:min-h-[7rem] md:px-8 md:py-9",
          "lg:min-h-[7.75rem] lg:px-10 lg:py-10",
        )}
      >
        {logo ? (
          <div className="relative h-11 w-full max-w-[11rem] sm:h-12 sm:max-w-[12rem] md:h-[3.25rem] md:max-w-[13.5rem] lg:h-14 lg:max-w-[15rem]">
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              sizes="(max-width: 768px) 40vw, 200px"
              className="object-contain object-center"
            />
          </div>
        ) : null}
      </div>
    </li>
  );
}

function visibleLogosForPage(
  logos: readonly PartnersGridLogo[],
  page: number,
  cellCount: number,
): (PartnersGridLogo | null)[] {
  const start = page * cellCount;

  return Array.from({ length: cellCount }, (_, index) => {
    return logos[start + index] ?? null;
  });
}

export function PartnersLogoGrid() {
  const logos = PARTNERS_GRID_LOGOS;
  const isMobileGrid = useViewportIsMobile(true, MOBILE_GRID_BREAKPOINT_PX);
  const columns = isMobileGrid ? 2 : 4;
  const rows = isMobileGrid ? 8 : 4;
  const cellCount = columns * rows;
  const pageCount = Math.max(1, Math.ceil(logos.length / cellCount));
  const { index: page, advance, setIndex } = useCycleIndex(pageCount, 0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    setIndex((current) => (current >= pageCount ? 0 : current));
  }, [pageCount, setIndex]);

  const visibleLogos = useMemo(
    () => visibleLogosForPage(logos, page, cellCount),
    [logos, page, cellCount],
  );

  function goPrev() {
    setDirection(-1);
    advance(-1);
  }

  function goNext() {
    setDirection(1);
    advance(1);
  }

  return (
    <section
      className="bg-white py-10 sm:py-14 lg:py-16"
      aria-label="Partner brands"
      aria-roledescription="carousel"
    >
      <Container>
        <div className="relative mx-auto w-full max-w-[min(75rem,100%)] overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.ul
              key={page}
              custom={direction}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={PAGE_TRANSITION}
              className="relative z-0 grid grid-cols-2 md:grid-cols-4"
            >
              {visibleLogos.map((logo, index) => (
                <PartnerLogoCell
                  key={logo ? `${logo.id}-${page}` : `empty-${page}-${index}`}
                  logo={logo}
                />
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Mobile: 2×8 — one vertical, seven horizontal */}
          <GridDividers columns={2} rows={8} className="md:hidden" />
          {/* Desktop: 4×4 — three vertical, three horizontal */}
          <GridDividers
            columns={4}
            rows={4}
            className="hidden md:block"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <CarouselControls
            currentIndex={page}
            total={pageCount}
            onPrev={goPrev}
            onNext={goNext}
            prevLabel="Previous partner logos"
            nextLabel="Next partner logos"
            className="gap-4"
          />
        </div>
      </Container>
    </section>
  );
}
