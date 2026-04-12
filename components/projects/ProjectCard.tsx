import { IconArrowUpRight } from "@/components/common/icons";
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

export function ProjectCard({
  imageSrc,
  imageAlt = "",
  title,
  subtitle,
  href = "#",
  badge,
}: ProjectCardProps) {
  const badgeClass =
    badge?.variant === "completed"
      ? "bg-neutral-900/90"
      : "bg-[#8B7268]/90";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-white",
        "shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-[box-shadow,transform] duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
      )}
      aria-label={`View ${title}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#BCBDC0] sm:aspect-[16/10]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw"
        />

        {badge ? (
          <div
            className={cn(
              "absolute left-3 top-3 z-10 rounded-sm px-3 py-1.5 sm:left-4 sm:top-4 sm:px-3.5 sm:py-2",
              badgeClass,
            )}
          >
            <span className="font-nexa text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
              {badge.label}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 bg-[#ecebeb] px-4 py-4 sm:px-5 sm:py-5">
        <div className="min-w-0 flex-1">
          <p className="font-nexa text-base font-bold leading-snug text-[#161616] sm:text-lg">
            {title}
          </p>
          <p className="mt-1 font-nexa text-sm font-normal leading-snug text-[#161616]/60 sm:text-[15px]">
            {subtitle}
          </p>
        </div>

        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-black text-white transition-colors group-hover:bg-neutral-900"
          aria-hidden
        >
          <IconArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
