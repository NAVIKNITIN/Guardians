import { cn } from "@/utils/cn";

type PublicationListingSkeletonProps = {
  /** Accessible label for screen readers */
  label?: string;
  className?: string;
};

/**
 * Loading placeholder for publication listing grids — matches empty-state footprint.
 */
export function PublicationListingSkeleton({
  label = "Loading content",
  className,
}: PublicationListingSkeletonProps) {
  return (
    <div
      className={cn(
        "min-h-[240px] w-full overflow-hidden rounded-[20px] bg-neutral-100 sm:min-h-[280px]",
        className,
      )}
      aria-busy="true"
      aria-label={label}
    >
      <div className="flex h-full min-h-[inherit] flex-col gap-4 p-6 sm:p-8">
        <div className="h-5 w-[38%] max-w-[200px] animate-pulse rounded-full bg-neutral-200/90" />
        <div className="h-5 w-[72%] max-w-[420px] animate-pulse rounded-full bg-neutral-200/80" />
        <div className="h-5 w-[52%] max-w-[300px] animate-pulse rounded-full bg-neutral-200/70" />
        <div className="mt-auto grid grid-cols-3 gap-3 pt-4 sm:gap-4">
          <div className="aspect-10/7 animate-pulse rounded-[12px] bg-neutral-200/85 sm:rounded-[16px]" />
          <div className="aspect-10/7 animate-pulse rounded-[12px] bg-neutral-200/75 sm:rounded-[16px]" />
          <div className="aspect-10/7 animate-pulse rounded-[12px] bg-neutral-200/65 sm:rounded-[16px]" />
        </div>
      </div>
    </div>
  );
}
