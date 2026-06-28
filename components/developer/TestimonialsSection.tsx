"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
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
import { useLayoutEffect, useMemo, useRef } from "react";

const DESKTOP_VISIBLE = 3;

function visibleDesktopItems(
  items: TestimonialsSectionContent["items"],
  index: number,
) {
  const n = items.length;
  if (n === 0) {
    return [];
  }
  if (n <= DESKTOP_VISIBLE) {
    return items;
  }
  return Array.from({ length: DESKTOP_VISIBLE }, (_, offset) => {
    const i = (index + offset) % n;
    return items[i]!;
  });
}

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
  const carouselEnabled = n > DESKTOP_VISIBLE;
  const { index, advance } = useCycleIndex(n, 0);

  const desktopVisible = useMemo(
    () => visibleDesktopItems(items, index),
    [index, items],
  );

  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const syncHeights = () => {
      const cards = grid.querySelectorAll<HTMLElement>("[data-testimonial-card]");
      cards.forEach((card) => {
        card.style.minHeight = "";
      });

      if (window.getComputedStyle(grid).display === "none") {
        return;
      }

      let maxHeight = 0;
      cards.forEach((card) => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
      });

      if (maxHeight > 0) {
        cards.forEach((card) => {
          card.style.minHeight = `${maxHeight}px`;
        });
      }
    };

    syncHeights();

    const observer = new ResizeObserver(syncHeights);
    observer.observe(grid);
    grid.querySelectorAll("[data-testimonial-card]").forEach((card) => {
      observer.observe(card);
    });

    window.addEventListener("resize", syncHeights);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeights);
    };
  }, [index, desktopVisible]);

  const desktopGridCols =
    desktopVisible.length <= 1
      ? "md:grid-cols-1"
      : desktopVisible.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  const carouselControls = carouselEnabled ? (
    <CarouselControls
      currentIndex={index}
      total={n}
      onPrev={() => advance(-1)}
      onNext={() => advance(1)}
      prevLabel="Previous testimonial"
      nextLabel="Next testimonial"
    />
  ) : null;

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
          {carouselEnabled ? (
            <div className={audienceDesktopOnlyBlock(centerOnMobile)}>
              {carouselControls}
            </div>
          ) : null}
        </div>
      </ScrollReveal>

      <div
        ref={gridRef}
        className={cn(
          "mt-10 hidden items-stretch gap-4 xl:gap-5 2xl:gap-6",
          desktopGridCols,
          centerOnMobile ? "max-lg:hidden lg:grid" : "md:grid",
        )}
      >
        {desktopVisible.map((item, cardIndex) => (
          <ScrollReveal
            key={item.id}
            className="flex h-full w-full min-h-0"
            direction="up"
            delay={cardIndex * 0.08}
            distance={30}
          >
            <TestimonialCard item={item} className="h-full w-full" />
          </ScrollReveal>
        ))}
      </div>

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
          cn("mt-6 flex w-full justify-center", !carouselEnabled && "hidden"),
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
