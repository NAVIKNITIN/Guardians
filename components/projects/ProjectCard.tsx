import Image from "next/image";
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
    label: string;
    variant: BadgeVariant;
  };
}

/** Diagonal arrow icon matching the design system */
function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
      <line x1="0" y1="0" x2="15" y2="15" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export function ProjectCard({
  imageSrc,
  imageAlt = "",
  title,
  subtitle,
  href = "#",
  badge,
}: ProjectCardProps) {
  const badgeBg =
    badge?.variant === "completed" ? "bg-[#161616]" : "bg-[#8F8183]";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden bg-[rgba(188,189,192,0.10)] shadow-[0_0_22px_0_rgba(0,0,0,0.25)]",
        "transition-[box-shadow,transform] hover:shadow-[0_0_28px_0_rgba(0,0,0,0.2)]",
      )}
      aria-label={`View ${title}`}
    >
      {/* Image area */}
      <div className="relative h-[220px] w-full overflow-hidden bg-[#BCBDC0] sm:h-[270px] lg:h-[350px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 578px, (min-width: 768px) 50vw, 100vw"
        />

        {/* Status badge */}
        {badge && (
          <div
            className={`absolute left-0 top-[30px] inline-flex items-center px-5 py-2.5 ${badgeBg}`}
          >
            <span className="font-nexa text-xs font-bold uppercase tracking-[0.1em] text-white sm:text-sm">
              {badge.label}
            </span>
          </div>
        )}
      </div>

      {/* Info row */}
      <div className="relative flex items-end justify-between px-5 py-4 lg:py-5">
        <div className="flex flex-col gap-1">
          <span className="font-nexa text-lg font-bold leading-tight text-[#161616] sm:text-xl lg:text-2xl">
            {title}
          </span>
          <span className="font-nexa text-sm font-normal leading-snug text-[#161616]/70 sm:text-base lg:text-[20px]">
            {subtitle}
          </span>
        </div>

        {/* Arrow CTA */}
        <span className="flex h-[55px] w-[75px] shrink-0 items-center justify-center bg-[#161616] transition-opacity group-hover:opacity-80">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
