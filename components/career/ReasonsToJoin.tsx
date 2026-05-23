import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/common/Container";
import { localImageByIndex } from "@/lib/local-images";
import { cn } from "@/utils/cn";
import Image from "next/image";

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

export function ReasonCard({ card }: { card: ReasonCard }) {
  return (
    <div
      className={cn(
        "group relative min-h-[200px] min-w-0 shrink basis-0 overflow-hidden bg-white sm:min-h-0",
        /* Base flex-grow comes from --reason-grow; sm+ hover bumps it way up so */
        /* the hovered card expands while its siblings proportionally compress. */
        "grow-(--reason-grow) sm:hover:grow-900",
        "transition-[flex-grow] duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "will-change-[flex-grow]",
      )}
      style={{ ["--reason-grow" as string]: card.flex } as React.CSSProperties}
    >
      {/* Photo — cropped to card height */}
      <div className="absolute inset-0 z-0">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Light by default; transitions to dark on hover. */}
        <div className="absolute inset-0 bg-linear-to-t to-transparent transition-colors duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </div>

      {/* Label content — pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <h3 className="n-bold text-xl leading-snug text-brand-text-primary transition-transform duration-850 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
          {card.title}
        </h3>

        {/* Subtitle — kept for cards that have it; fades in smoothly on hover */}
        {card.subtitle && (
          <p
            className={cn(
              "mt-1 n-book text-sm leading-normal text-brand-text-primary",
              "transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "max-h-0 -translate-y-1 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
            {card.subtitle}
          </p>
        )}

        {/* Arrow — always shown on featured card; fades in on hover for the rest */}
        <div
          className={cn(
            "mt-3 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]",
            " translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <svg
            width="51"
            height="12"
            viewBox="0 0 51 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M0 6H49M49 6L44 1M49 6L44 11"
              stroke="#000000"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ReasonsToJoin() {
  return (
    <section
      className="bg-white mb-12  sm:mb-20  pt-4 md:pt-10 lg:pt-25"
      aria-labelledby="reasons-heading"
    >
      <Container>
        {/* Centered Qasbyne title */}
        <ScrollReveal direction="up" distance={30}>
          <h2
            id="reasons-heading"
            className={cn(
              "text-center uppercase text-brand-text-primary qs-reg ls-10",
              "qs-reg text-[clamp(1rem,calc(0.5rem+2.5vw),1.75rem)] md:text-[clamp(2rem,calc(1rem+5.5vw),2.75rem)] leading-[1.15] ls-8",
              "mb-6 sm:mb-5",
            )}
          >
            Reasons to Join Guardians
          </h2>
        </ScrollReveal>

        {/* 4-card photo row */}
        <ScrollReveal
          className={cn(
            "flex flex-col gap-3 sm:h-[clamp(260px,35vw,450px)] sm:flex-row sm:gap-4 mt-4 md:mt-8 lg:mt-10",
          )}
          direction="up"
          delay={0.08}
          distance={24}
        >
          {REASONS.map((card) => (
            <ReasonCard key={card.id} card={card} />
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
