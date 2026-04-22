import { cn } from "@/utils/cn";
import Image from "next/image";

type ServicesHeroProps = {
  /** Main heading text, e.g. `"Buyer's Services"`. */
  title: string;
  /** Optional subtitle; defaults to the shared marketing copy. */
  subtitle?: string;
  /** Background image path, rendered with `object-cover`. */
  imageSrc: string;
  /** DOM id applied to the heading; must match `ariaLabelledBy`. */
  headingId: string;
  /** `aria-labelledby` value on the section. */
  ariaLabelledBy: string;
  /** Optional extra classes for the `<h1>` (e.g. to tweak `max-w`). */
  titleClassName?: string;
};

const DEFAULT_SUBTITLE =
  "We are one of the fastest growing Real Estate consulting company in India.";

/**
 * Shared hero for Buyer's and Developer's service pages.
 * Full-bleed background image with a centered title + subtitle.
 */
export function ServicesHero({
  title,
  subtitle = DEFAULT_SUBTITLE,
  imageSrc,
  headingId,
  ariaLabelledBy,
  titleClassName,
}: ServicesHeroProps) {
  return (
    <section
      className="relative mb-4 overflow-hidden lg:mb-[80px] h-[650px]"
      aria-labelledby={ariaLabelledBy}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-start gap-1.5 px-4 pb-8 pt-12 text-center qs-reg sm:gap-2 sm:pb-10 sm:pt-16 md:pt-20 lg:mt-[100px] lg:min-h-0 lg:pb-0">
        <h1
          id={headingId}
          className={cn(
            "max-w-[min(100%,22ch)] break-words qs-reg fs-70 lh-50 uppercase leading-none tracking-[0.05em] text-[#202225]",
            titleClassName,
          )}
        >
          {title}
        </h1>
        <p className="n-reg fs-18 lh-24 text-black max-w-2xl mt-2 md:mt-4 lg:mt-4">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
