"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import {
  AudienceMarketingSectionCta,
  AudienceMarketingSectionCtaDesktop,
  AudienceMarketingSectionCtaMobile,
} from "@/components/marketing/AudienceMarketingSectionCta";
import type { TestimonialsSectionContent } from "@/data/audience-marketing";
import { TestimonialCard } from "@/components/developer/TestimonialCard";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import {
  audienceDesktopOnlyBlock,
  audienceMobileCopyCenter,
  audienceMobileOnlyBlock,
} from "@/styles/audienceMarketingCenter";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { useMemo } from "react";

const DESKTOP_VISIBLE = 3;

export function TestimonialsSection({
  content,
  isBuyer: _isBuyer,
  centerOnMobile = false,
}: {
  isBuyer: boolean;
  content: TestimonialsSectionContent;
  centerOnMobile?: boolean;
}) {
  const items = content.items;
  const n = items.length;
  const { index, advance } = useCycleIndex(n, 0);

  const desktopVisible = useMemo(
    () =>
      Array.from({ length: DESKTOP_VISIBLE }, (_, offset) => {
        const i = (index + offset) % n;
        return items[i]!;
      }),
    [index, n, items],
  );

  const carouselControls = (
    <CarouselControls
      currentIndex={index}
      total={n}
      onPrev={() => advance(-1)}
      onNext={() => advance(1)}
      prevLabel="Previous testimonial"
      nextLabel="Next testimonial"
    />
  );

  return (
    <SectionSurface
      variant="compact"
      aria-labelledby="testimonials-heading"
      className="py-0!"
    >
      <ScrollReveal direction="up" distance={34}>
        <div
          className={cn(
            "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between xl:gap-8 2xl:gap-10",
            centerOnMobile && "max-lg:items-center max-lg:text-center",
          )}
        >
          <h2
            id="testimonials-heading"
            className={audienceMobileCopyCenter(
              centerOnMobile,
              cn(marketingClasses.headingDisplayMd, "min-w-0 flex-1 pr-2 max-lg:pr-0"),
            )}
          >
            {content.sectionTitle}
          </h2>
          <div className={audienceDesktopOnlyBlock(centerOnMobile)}>
            {carouselControls}
          </div>
        </div>
      </ScrollReveal>

      <StaggerContainer
        className={cn(
          "mt-10 hidden grid-cols-3 items-stretch gap-4 xl:gap-5 2xl:gap-6",
          centerOnMobile ? "max-lg:hidden lg:grid" : "md:grid",
        )}
        staggerChildren={0.18}
      >
        {desktopVisible.map((item, cardIndex) => (
          <ScrollReveal key={`${item.id}-${index}`} direction="up" delay={cardIndex * 0.08} distance={30}>
            <TestimonialCard
              item={item}
              className="h-full min-h-[26rem] w-full"
            />
          </ScrollReveal>
        ))}
      </StaggerContainer>

      <div
        className={cn(
          "mt-10",
          centerOnMobile ? "max-lg:block lg:hidden" : "md:hidden",
          centerOnMobile && "flex justify-center",
        )}
      >
        <ScrollReveal direction="up" delay={0.08} distance={30}>
          <TestimonialCard item={items[index]!} />
        </ScrollReveal>
      </div>

      <ScrollReveal
        direction="up"
        delay={0.1}
        distance={24}
        className={audienceMobileOnlyBlock(
          centerOnMobile,
          "mt-6 flex w-full justify-center",
        )}
      >
        {carouselControls}
      </ScrollReveal>

      <ScrollReveal
        direction="up"
        delay={0.12}
        className={cn(
          "mt-10 w-full",
          centerOnMobile
            ? "hidden lg:flex lg:justify-center"
            : "flex justify-center",
        )}
      >
        {centerOnMobile ? (
          <AudienceMarketingSectionCtaDesktop
            href={content.viewMoreHref}
            centerOnMobile={centerOnMobile}
          >
            {content.viewMoreLabel}
          </AudienceMarketingSectionCtaDesktop>
        ) : (
          <AudienceMarketingSectionCta href={content.viewMoreHref}>
            {content.viewMoreLabel}
          </AudienceMarketingSectionCta>
        )}
      </ScrollReveal>

      <ScrollReveal
        direction="up"
        delay={0.14}
        distance={28}
        className={audienceMobileOnlyBlock(centerOnMobile)}
      >
        <AudienceMarketingSectionCtaMobile
          href={content.viewMoreHref}
          centerOnMobile={centerOnMobile}
          wrapClassName="mt-8"
        >
          {content.viewMoreLabel}
        </AudienceMarketingSectionCtaMobile>
      </ScrollReveal>
    </SectionSurface>
  );
}
