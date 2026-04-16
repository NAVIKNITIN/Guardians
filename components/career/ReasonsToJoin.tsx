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
    imageSrc: localImageByIndex(0),
    imageAlt: "Advisory culture at The Guardians",
    flex: 260,
  },
  {
    id: "transactions",
    title: "Exposure to High-Value Transactions",
    imageSrc: localImageByIndex(1),
    imageAlt: "High-value transactions exposure",
    flex: 260,
  },
  {
    id: "growth",
    title: "Professional Growth Over Hierarchy",
    subtitle: "Progress is driven by skill, ownership, and performance.",
    imageSrc: localImageByIndex(2),
    imageAlt: "Professional growth environment",
    flex: 356,
    showArrow: true,
  },
  {
    id: "process",
    title: "Refined, Process-Driven Environment",
    imageSrc: localImageByIndex(3),
    imageAlt: "Refined process-driven environment",
    flex: 260,
  },
];

function ReasonCard({ card }: { card: ReasonCard }) {
  return (
    <div
      className="group relative min-h-[200px] overflow-hidden bg-white sm:min-h-0"
      style={{ flex: card.flex, minWidth: 0 }}
    >
      {/* Photo — cropped to card height */}
      <div className="absolute inset-0 z-0">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark gradient from bottom for label legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Label content — pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <h3 className="n-reg  text-xl font-bold leading-snug text-white">
          {card.title}
        </h3>
        {card.subtitle && (
          <p className="mt-1 n-reg  text-sm font-normal leading-normal text-white/90">
            {card.subtitle}
          </p>
        )}
        {card.showArrow && (
          <div className="mt-3">
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
        )}
      </div>
    </div>
  );
}

export function ReasonsToJoin() {
  return (
    <section
      className=" bg-white mb-16 sm:mb-20  py-4 px-2 lg:px-10 "
      aria-labelledby="reasons-heading"
    >
      <Container>
        {/* Centered Qasbyne title */}
        <h2
          id="reasons-heading"
          className={cn(
            "text-center  uppercase text-[#202225]",
            "text-[clamp(1.75rem,2.8vw,3.75rem)] leading-[1.4] tracking-[0.05em]",
            "mb-5 lg:mb-5",
          )}
        >
          Reasons to Join Guardians
        </h2>

        {/* 4-card photo row */}
        <div
          className={cn(
            "flex flex-col gap-3 sm:h-[clamp(260px,35vw,450px)] sm:flex-row sm:gap-4",
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
