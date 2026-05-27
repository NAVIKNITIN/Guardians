import { Container } from "@/components/common/Container";
import { PARTNERS_GRID_LOGOS } from "@/data/partners-logo-grid";
import { cn } from "@/utils/cn";
import Image from "next/image";

import "./partners-logo-grid.css";

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

export function PartnersLogoGrid() {
  return (
    <section
      className="bg-white py-10 sm:py-14 lg:py-16"
      aria-label="Partner brands"
    >
      <Container>
        <div className="relative mx-auto w-full max-w-[min(75rem,100%)]">
          <ul className="relative z-0 grid grid-cols-2 md:grid-cols-4">
            {PARTNERS_GRID_LOGOS.map((logo) => (
              <li key={logo.id} className="bg-white">
                <div
                  className={cn(
                    "flex h-full min-h-[5.5rem] items-center justify-center",
                    "px-5 py-7 sm:min-h-[6.25rem] sm:px-8 sm:py-9",
                    "md:min-h-[7rem] md:px-10 md:py-10",
                    "lg:min-h-[7.75rem] lg:px-12 lg:py-11",
                  )}
                >
                  <div className="relative h-10 w-full max-w-[9.5rem] sm:h-11 sm:max-w-[10.5rem] md:h-12 md:max-w-[11.5rem] lg:h-[3.25rem] lg:max-w-[12.5rem]">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      sizes="(max-width: 768px) 40vw, 180px"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile: 2×8 — one vertical, seven horizontal */}
          <GridDividers columns={2} rows={8} className="md:hidden" />
          {/* Desktop: 4×4 — three vertical, three horizontal */}
          <GridDividers
            columns={4}
            rows={4}
            className="hidden md:block"
          />
        </div>
      </Container>
    </section>
  );
}
