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
    flex: 260,
  },
  {
    id: "transactions",
    title: "Exposure to High-Value Transactions",
    subtitle: "We work with some of the largest and most complex real estate transactions in India.",
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
        "transition-[flex-grow] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark gradient — slightly deeper on hover to keep copy legible as it reveals */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/80 group-hover:via-black/35" />
      </div>

      {/* Label content — pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <h3 className="n-reg text-xl leading-snug text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
          {card.title}
        </h3>

        {/* Subtitle — kept for cards that have it; fades in smoothly on hover */}
        {card.subtitle && (
          <p
            className={cn(
              "mt-1 n-reg text-sm leading-normal text-white/90",
              "transition-all duration-500 ease-out",
              "max-h-0 -translate-y-1 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
            {card.subtitle}
          </p>
        )}

        {/* Arrow — always shown on featured card; fades in on hover for the rest */}
        <div
          className={cn(
            "mt-3 transition-all duration-500 ease-out",
            "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
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
              stroke="#ffffff"
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
        <h2
          id="reasons-heading"
          className={cn(
            "text-center uppercase text-[#202225] qs-reg ls-10",
            "qs-reg fs-50 leading-[1.15] ls-8",
            "mb-6 sm:mb-5",
          )}
        >
          Reasons to Join Guardians
        </h2>

        {/* 4-card photo row */}
        <div
          className={cn(
            "flex flex-col gap-3 sm:h-[clamp(260px,35vw,450px)] sm:flex-row sm:gap-4 mt-4 md:mt-8 lg:mt-10",
          )}
        >
          {REASONS.map((card) => (
            <ReasonCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
