import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";
import {
  HERO_IMAGE,
  HeroHeadingBlock,
  HeroIntroAndCta,
} from "./HeroSectionShared";
import {
  heroContainerTopMobile,
  heroCtaRowMobile,
  heroInnerColumnMobile,
  heroSectionShellMobile,
  heroSubtitleTypography,
} from "./heroResponsiveClasses";

/** Below `lg` — short-viewport caps and stacked title behavior. */
export function HeroSectionMobile() {
  return (
    <section className={heroSectionShellMobile} aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <Container className={cn("relative z-10", heroContainerTopMobile)}>
        <div className={heroInnerColumnMobile}>
          <HeroHeadingBlock />
          <HeroIntroAndCta
            subtitleClassName={heroSubtitleTypography}
            ctaWrapperClassName={heroCtaRowMobile}
            ctaClassName={cn(
              "btn-1 w-full min-w-0 max-w-[285px] max-h-[55px] rounded-none border-0 n-bold text-sm",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48183]",
              "sm:min-w-[180px] sm:max-w-none",
            )}
          />
        </div>
      </Container>
    </section>
  );
}
