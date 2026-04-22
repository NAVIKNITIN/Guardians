import { cn } from "@/utils/cn";
import Image from "next/image";

type PublicationHeroProps = {
  /** Heading text */
  title: string;
  /** Unique id for the heading element (for aria-labelledby) */
  headingId: string;
  /** Aria-label for the section — optional */
  ariaLabel?: string;
  /** Background image source */
  imageSrc: string;
  /** Background image alt text — empty by default (decorative) */
  imageAlt?: string;
  /** Whether to prioritise the background image (above-the-fold) */
  priority?: boolean;
  /** Extra classes for the heading — e.g. text-white for dark backgrounds */
  headingClassName?: string;
};

export function PublicationHero({
  title,
  headingId,
  ariaLabel,
  imageSrc,
  imageAlt = "",
  priority = true,
  headingClassName,
}: PublicationHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(320px, 35vw, 500px)" }}
      aria-labelledby={headingId}
      aria-label={ariaLabel}
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={priority}
        />
      </div>

      {/* Centered heading */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center pt-[3%]">
        <h1
          id={headingId}
          className={cn(
            "qs-reg fs-70 ls-10 uppercase text-[#202225]",
            "text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]",
            headingClassName,
          )}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
