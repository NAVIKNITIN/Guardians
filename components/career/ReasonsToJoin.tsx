"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/common/Container";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ReasonCard = {
  id: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  /** Relative width weight within the row — mirrors Figma card widths */
  flex: number;
  /** Whether to show the arrow link indicator */
  showArrow?: boolean;
};

const REASONS: ReasonCard[] = [
  {
    id: "culture",
    title: "Client-First Advisory Culture",
    imageSrc: "/images/partners/career/1.svg",
    imageAlt: "Advisory culture at The Guardians",
    subtitle: "Progress is driven by skill, ownership, and performance.",
    flex: 260,
  },
  {
    id: "transactions",
    title: "Exposure to High-Value Transactions",
    subtitle: "Progress is driven by skill, ownership, and performance.",
    imageSrc: "/images/partners/career/2.svg",
    imageAlt: "High-value transactions exposure",
    flex: 260,
  },
  {
    id: "growth",
    title: "Professional Growth Over Hierarchy",
    subtitle: "Progress is driven by skill, ownership, and performance.",
    imageSrc: "/images/partners/career/3.svg",
    imageAlt: "Professional growth environment",
    flex: 260,
    showArrow: true,
  },
  {
    id: "process",
    title: "Refined, Process-Driven Environment",
    subtitle: "Progress is driven by skill, ownership, and performance.",
    imageSrc: "/images/partners/career/4.svg",
    imageAlt: "Refined process-driven environment",
    flex: 260,
  },
];

function ReasonCardArrow() {
  return (
    <svg width="51" height="12" viewBox="0 0 51 12" fill="none" aria-hidden>
      <path
        d="M0 6H49M49 6L44 1M49 6L44 11"
        stroke="#000000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReasonCard({
  card,
  variant = "desktop",
}: {
  card: ReasonCard;
  variant?: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={cn(
        isMobile
          ? "relative h-[min(72vw,360px)] w-full overflow-hidden bg-white"
          : [
              "group relative min-h-[200px] min-w-0 shrink basis-0 overflow-hidden bg-white sm:min-h-0",
              "grow-(--reason-grow) sm:hover:grow-900",
              "transition-[flex-grow] duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "will-change-[flex-grow]",
            ],
      )}
      style={
        isMobile ? undefined : ({ ["--reason-grow" as string]: card.flex } as React.CSSProperties)
      }
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className={cn(
            "object-cover object-center",
            !isMobile &&
              "transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]",
          )}
          sizes={
            isMobile
              ? "100vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t to-transparent",
            !isMobile && "transition-colors duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]",
          )}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <h3
          className={cn(
            "n-bold text-xl leading-snug text-brand-text-primary",
            !isMobile &&
              "transition-transform duration-850 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5",
          )}
        >
          {card.title}
        </h3>

        {card.subtitle ? (
          <p
            className={cn(
              "mt-1 n-book text-sm leading-normal text-brand-text-primary",
              isMobile
                ? "mt-2 opacity-100"
                : [
                    "transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "max-h-0 -translate-y-1 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100",
                  ],
            )}
          >
            {card.subtitle}
          </p>
        ) : null}

        <div
          className={cn(
            "mt-3",
            isMobile || card.showArrow
              ? "opacity-100"
              : "translate-y-2 opacity-0 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <ReasonCardArrow />
        </div>
      </div>
    </div>
  );
}

function ReasonsToJoinMobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = REASONS[activeIndex]!;

  const goPrev = () => {
    setActiveIndex((i) => (i - 1 + REASONS.length) % REASONS.length);
  };

  const goNext = () => {
    setActiveIndex((i) => (i + 1) % REASONS.length);
  };

  return (
    <div className="mt-4 sm:hidden" aria-roledescription="carousel" aria-label="Reasons to join">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ReasonCard card={activeCard} variant="mobile" />
          </motion.div>
        </AnimatePresence>
      </div>

      <CarouselControls
        currentIndex={activeIndex}
        total={REASONS.length}
        onPrev={goPrev}
        onNext={goNext}
        prevLabel="Previous reason"
        nextLabel="Next reason"
        className="mt-6 w-full justify-center gap-4"
        buttonClassName="cursor-pointer border-0 bg-transparent hover:bg-black/[0.04]"
        counterClassName="n-reg text-sm text-[#161616]"
      />
    </div>
  );
}

export function ReasonsToJoin() {
  return (
    <section
      className="bg-white mb-12 sm:mb-20 pt-4 md:pt-10 lg:pt-25"
      aria-labelledby="reasons-heading"
    >
      <Container>
        <ScrollReveal direction="up" distance={30}>
          <h2
            id="reasons-heading"
            className={cn(
              "text-center uppercase text-brand-text-primary qs-reg ls-10 sm:text-center",
              "text-[clamp(2.156rem,4.8vw,2.5rem)] leading-[1.12] tracking-[0.04em]",
              "sm:text-[clamp(2.25rem,5.2vw,3.1rem)] sm:leading-[1.1] sm:tracking-[0.05em]",
              "lg:text-[clamp(2.75rem,3.5vw,4.375rem)] lg:leading-[1.05] lg:tracking-[0.05em]",
            )}
          >
            Reasons to Join Guardians
          </h2>
        </ScrollReveal>

        <ReasonsToJoinMobileCarousel />

        <ScrollReveal
          className={cn(
            "mt-4 hidden h-[clamp(260px,35vw,450px)] sm:mt-8 sm:flex sm:flex-row sm:gap-4 md:mt-8 lg:mt-10",
          )}
          direction="up"
          delay={0.08}
          distance={24}
        >
          {REASONS.map((card) => (
            <ReasonCard key={card.id} card={card} variant="desktop" />
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
