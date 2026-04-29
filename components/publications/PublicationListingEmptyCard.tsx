import { cn } from "@/utils/cn";

type PublicationListingEmptyCardProps = {
  /** Short heading, e.g. "No blogs yet" */
  title: string;
  /** Supporting line under the title */
  description?: string;
  className?: string;
};

/**
 * Empty state for marketing listing grids — same footprint & palette as
 * {@link PublicationListingSkeleton}, with ghost lines + clear messaging (no crash UI).
 */
export function PublicationListingEmptyCard({
  title,
  description = "Check back soon for new content.",
  className,
}: PublicationListingEmptyCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[240px] w-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-neutral-200/70 bg-neutral-100 sm:min-h-[280px]",
        className,
      )}
    >
      {/* Ghost rows — softer pulse than loading skeleton; sits above message so nothing overlaps */}
      <div
        className="flex shrink-0 flex-col gap-3 px-6 pb-2 pt-6 opacity-[0.55] sm:px-8 sm:pt-8"
        aria-hidden
      >
        <div className="h-5 w-[38%] max-w-[200px] animate-pulse rounded-full bg-neutral-300/80 duration-[2.8s]" />
        <div className="h-5 w-[72%] max-w-[420px] animate-pulse rounded-full bg-neutral-300/65 duration-[2.8s]" />
        <div className="h-5 w-[52%] max-w-[300px] animate-pulse rounded-full bg-neutral-300/55 duration-[2.8s]" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-4 text-center sm:px-10 sm:pb-14">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-300/60 bg-white/80 shadow-sm backdrop-blur-[2px]">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8F8183"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 8v5M12 17h.01" />
            <circle cx="12" cy="12" r="9.5" />
          </svg>
        </div>
        <h3 className="qs-reg text-[clamp(1.15rem,3.8vw,1.55rem)] font-semibold uppercase tracking-[0.06em] text-[#161616]">
          {title}
        </h3>
        <p className="mt-3 max-w-md n-book fs-16 lh-24 text-[#5f5a5b]">{description}</p>
      </div>
    </div>
  );
}
