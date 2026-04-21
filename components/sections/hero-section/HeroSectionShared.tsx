import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { cn } from "@/utils/cn";
import { heroTitleTypography } from "./heroResponsiveClasses";

export const HERO_IMAGE = "/images/Home/1.png";

export function HeroHeadingBlock({ className }: { className?: string }) {
  return (
    <h1
      id="hero-heading"
      className={cn(heroTitleTypography, className)}
    >
      <span className="block whitespace-normal sm:whitespace-nowrap">
        LOREM IPSUM <span className="text-[#8F8183]">DOLOR</span>
      </span>
      <span className="mt-1 block sm:mt-0">SIT AMET</span>
    </h1>
  );
}

export function HeroIntroAndCta({
  subtitleClassName,
  ctaWrapperClassName,
  ctaClassName,
}: {
  subtitleClassName: string;
  ctaWrapperClassName: string;
  ctaClassName: string;
}) {
  return (
    <>
      <p className={subtitleClassName}>
        We are one of the fastest growing Real Estate consulting company in India.
      </p>
      <div className={ctaWrapperClassName}>
        <GradientCtaButton
          href="#about"
          variant="know-more"
          className={ctaClassName}
        >
          KNOW MORE
        </GradientCtaButton>
      </div>
    </>
  );
}
