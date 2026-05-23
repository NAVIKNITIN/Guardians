import { MarketingImgWithFallback } from "@/components/common/MarketingImgWithFallback";
import { ArrowIconLink } from "@/components/ui/ArrowIconLink";
import { LOCAL_IMAGES } from "@/lib/local-images";
import Link from "next/link";
import { cn } from "@/utils/cn";

export type BadgeVariant = "units-left" | "completed";

export interface ProjectCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  href?: string;
  badge?: {
    label?: string;
    count?: number;
    variant: BadgeVariant;
  };
  stage: string;
}

export function ProjectCard({
  imageSrc,
  imageAlt = "",
  title,
  subtitle,
  href = "#",
  badge,
  stage,
}: ProjectCardProps) {
  const badgeClass =
    badge?.variant === "completed" ? "bg-[#161616]" : "bg-[#8F8183]";
  const isCompletedProject = badge?.variant === "completed";
  const hasBadgeCount =
    typeof badge?.count === "number" && Number.isFinite(badge.count);
  const shouldShowCompletedBadge =
    Boolean(badge) &&
    isCompletedProject &&
    (stage === "Completed" || stage === "All");
  const shouldShowUnitsBadge =
    Boolean(badge) &&
    !isCompletedProject &&
    hasBadgeCount &&
    (stage === "Ongoing" || stage === "All");
  const shouldShowBadge = shouldShowCompletedBadge || shouldShowUnitsBadge;
  const badgeText = shouldShowCompletedBadge
    ? "Completed"
    : `${badge?.count} ${badge?.count === 1 ? "unit" : "units"} left`;

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden bg-white",
        "shadow-[0_4px_24px_rgba(0,0,0,0.08)]",
      )}
    >
      <Link
        href={href}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#BCBDC0] sm:aspect-[16/10]"
        aria-label={`View ${title}`}
      >
        <MarketingImgWithFallback
          src={imageSrc}
          fallbackSrc={LOCAL_IMAGES.projectImage}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
        {shouldShowBadge ? (
          <div
            className={cn(
              "absolute top-3 z-10 rounded-none px-4 py-1.5 sm:top-4 sm:px-4 sm:py-1.5",
              shouldShowCompletedBadge
                ? "left-3 sm:left-0"
                : "left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0",
              badgeClass,
            )}
          >
            <span className="n-bold text-[11px] uppercase leading-none tracking-[0.14em] text-white sm:text-[12px]">
              {badgeText}
            </span>
          </div>
        ) : null}
      </Link>

      <div
        className={cn(
          "flex flex-col items-center gap-3 bg-[#ecebeb] px-4 py-4 text-center",
          "sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-5 sm:text-left",
        )}
      >
        <Link href={href} className="min-w-0 w-full sm:flex-1 sm:w-auto">
          <p className="n-bold fs-24 leading-snug text-[#161616] text-center sm:text-left sm:text-lg">
            {title}
          </p>
          <p className="mt-1 n-reg fs-20 text-sm leading-snug text-[#161616]/60 text-center sm:text-left sm:text-[15px]">
            {subtitle}
          </p>
        </Link>

        <ArrowIconLink
          href={href}
          aria-label={`View ${title}`}
          className={cn(
            "inline-flex shrink-0 rounded-none",
            "!h-[55px] !w-[75px]",
          )}
        />
      </div>
    </article>
  );
}
