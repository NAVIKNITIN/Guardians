import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Horizontal padding scale — keep in sync with `marketingClasses.pageGutter` / `pageGutterLeft`.
 *
 * | Intent | Tailwind | Approx. viewport |
 * |--------|----------|------------------|
 * | Mobile | default | &lt; 480px |
 * | Large mobile | xs | ≥ 480px |
 * | Small tablet | sm | ≥ 640px |
 * | Tablet | md | ≥ 768px |
 * | Tablet landscape | tablet | ≥ 900px |
 * | Laptop | lg | ≥ 1024px |
 * | Large laptop | xl | ≥ 1280px |
 * | Desktop | 2xl | ≥ 1536px |
 * | Large desktop | xxl | ≥ 1680px |
 * | Ultrawide | xxxl / 3xl | ≥ 1920px / 2160px |
 */
const paddingXBoth =
  "px-4 xs:px-5 sm:px-8 md:px-10 tablet:px-12 lg:px-16 xl:px-24 2xl:px-32 xxl:px-44 xxxl:px-52 3xl:px-56";

export type ContainerGutter = "both" | "left";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Horizontal gutter: `both` (default) = symmetric padding; `left` = align to the site
   * left edge only so content can extend flush to the right (e.g. carousels).
   */
  gutter?: ContainerGutter;
}

export function Container({
  className,
  children,
  gutter = "both",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-brand",
        paddingXBoth,
        "2xl:max-w-[min(var(--max-width-brand-wide,112rem),calc(100vw-5rem))]",
        "3xl:max-w-[min(var(--max-width-brand-wide,112rem),calc(100vw-14rem))]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
