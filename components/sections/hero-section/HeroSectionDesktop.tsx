import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";
import {
  HERO_IMAGE,
  HeroHeadingBlock,
  HeroIntroAndCta,
} from "./HeroSectionShared";
import {
  heroContainerTopDesktop,
  heroCtaRowDesktop,
  heroDesktopKnowMoreButton,
  heroInnerColumnDesktop,
  heroSectionShellDesktop,
  heroSubtitleTypography,
} from "./heroResponsiveClasses";

/** `lg+` — wide layout; typography scales via shared `heroTitleTypography` + `heroSubtitleTypography`. */
export function HeroSectionDesktop() {
  return (
    <section className={heroSectionShellDesktop} aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-fill object-center"
          sizes="100vw"
          priority
        />
      </div>

      <Container className={cn("relative z-10", heroContainerTopDesktop)}>
        <div className={heroInnerColumnDesktop}>
          <HeroHeadingBlock />
          <HeroIntroAndCta
            subtitleClassName={heroSubtitleTypography}
            ctaWrapperClassName={heroCtaRowDesktop}
            ctaClassName={heroDesktopKnowMoreButton}
          />
        </div>
      </Container>
    </section>
  );
}
