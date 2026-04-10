import { Container } from "@/components/common/Container";
import { marketingSection } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type Variant = "default" | "muted" | "compact" | "partners" | "stats";

const variantMap: Record<
  Variant,
  Parameters<typeof marketingSection>[0]
> = {
  default: "section",
  muted: "sectionMuted",
  compact: "sectionCompact",
  partners: "sectionPartners",
  stats: "sectionStats",
};

export type SectionSurfaceProps = {
  id?: string;
  variant?: Variant;
  /** Passed to the outer `<section>` */
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

/**
 * Standard bordered marketing `<section>` + `Container` — keeps vertical rhythm consistent.
 */
export function SectionSurface({
  variant = "default",
  id,
  className,
  containerClassName,
  children,
  ...aria
}: SectionSurfaceProps) {
  return (
    <section
      id={id}
      className={cn(marketingSection(variantMap[variant]), className)}
      {...aria}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
