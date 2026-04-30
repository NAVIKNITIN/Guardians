"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { MarketingServiceCard } from "@/components/cards/MarketingServiceCard";
import { Container } from "@/components/common/Container";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MarketingEnquireLink } from "@/components/ui";
import type { ServicesBandContent } from "@/data/audience-marketing";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export function AudienceServicesBand({
  content,
  isBuyer,
}: {
  content: ServicesBandContent;
  isBuyer: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const total = content.cards.length;

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      if (!track || !first) {
        setStepPx(0);
        return;
      }
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      setStepPx(first.offsetWidth + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [total]);

  useEffect(() => {
    if (currentIndex >= total) {
      setCurrentIndex(Math.max(0, total - 1));
    }
  }, [currentIndex, total]);

  const goPrev = () => setCurrentIndex((idx) => Math.max(0, idx - 1));
  const goNext = () =>
    setCurrentIndex((idx) => Math.min(Math.max(0, total - 1), idx + 1));

  const cardsStrip = (
    <div className="w-full overflow-hidden">
      <ul
        ref={trackRef}
        role="list"
        className="flex gap-4 pl-0 sm:gap-5"
        style={{
          transform: `translate3d(-${currentIndex * stepPx}px, 0, 0)`,
          transition: "transform 820ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      >
        {content.cards.map((card) => (
          <MarketingServiceCard
            key={card.id}
            card={card}
            href={content.knowMoreHref}
            ariaLabel={content.knowMoreLabel}
          />
        ))}
      </ul>
    </div>
  );

  return (
    <section aria-labelledby="audience-services-heading" className="justify-center items-center flex">
      <Container
        gutter="left"
        className={cn(
          "w-full py-0",
        )}
      >
        <div
          className={cn(
            "flex w-full min-w-0 flex-col gap-10",
            "lg:flex-row lg:items-start lg:gap-10 xl:gap-12 2xl:gap-16",
          )}
        >
          <StaggerContainer className="min-w-0 shrink-0 lg:w-4/12 lg:max-w-xl " staggerChildren={0.18}>
            <ScrollReveal direction="up" distance={36}>
              <h2
                id="audience-services-heading"
                className={marketingClasses.headingDisplay}
              >
                {content.sectionTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08} distance={32}>
              <p className="mt-3 max-w-sm n-book fs-18 lh-22 text-[#000000] 2xl:max-w-sm">
                {content.description}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.16} distance={28}>
              <MarketingEnquireLink
                href={content.knowMoreHref}
                className="mt-10 inline-flex  sm:mt-14  lg:mt-20 w-[250px] h-[55px] n-bold fs-16 md:fs-18 lg:fs-20"
              >
                {content.knowMoreLabel}
              </MarketingEnquireLink>
            </ScrollReveal>
          </StaggerContainer>

          <ScrollReveal
            className={cn(
              /* Break out of container on the right so cards touch viewport edge. */
              "lg:mr-[calc(50%-50vw)] relative",
            )}
            direction="right"
            delay={0.18}
            distance={44}
          >
            {cardsStrip}
          </ScrollReveal>
        </div>
        <div className="mt-4 flex w-full justify-center md:ml-[-100px]">
          <CarouselControls
            currentIndex={currentIndex}
            total={total}
            onPrev={goPrev}
            onNext={goNext}
            prevLabel="Previous service"
            nextLabel="Next service"
            showCounter={false}
            buttonClassName="cursor-pointer border-0 bg-transparent hover:bg-black/[0.04] "
            counterClassName=""
            className="w-full justify-center gap-10"
          />
        </div>
      </Container>
    </section>
  );
}
