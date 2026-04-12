import { Container } from "@/components/common/Container";
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
    imageSrc:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1352&q=80",
    imageAlt: "Advisory culture at The Guardians",
    flex: 260,
  },
  {
    id: "transactions",
    title: "Exposure to High-Value Transactions",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=998&q=80",
    imageAlt: "High-value transactions exposure",
    flex: 260,
  },
  {
    id: "growth",
    title: "Professional Growth Over Hierarchy",
    subtitle: "Progress is driven by skill, ownership, and performance.",
    imageSrc:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Professional growth environment",
    flex: 356,
    showArrow: true,
  },
  {
    id: "process",
    title: "Refined, Process-Driven Environment",
    imageSrc:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1524&q=80",
    imageAlt: "Refined process-driven environment",
    flex: 260,
  },
];

function ReasonCard({ card }: { card: ReasonCard }) {
  return (
    <div
      className="group relative overflow-hidden bg-white"
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
        <h3 className="font-nexa text-xl font-bold leading-snug text-white">
          {card.title}
        </h3>
        {card.subtitle && (
          <p className="mt-1 font-nexa text-sm font-normal leading-normal text-white/90">
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
      className="border-t border-black/[0.06] bg-brand-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="reasons-heading"
    >
      <Container>
        {/* Centered Qasbyne title */}
        <h2
          id="reasons-heading"
          className={cn(
            "text-center font-qasbyne font-normal uppercase text-[#202225]",
            "text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.4] tracking-[0.05em]",
            "mb-10 lg:mb-12",
          )}
        >
          Reasons to Join Guardians
        </h2>

        {/* 4-card photo row */}
        <div
          className={cn(
            "flex flex-col gap-3 sm:flex-row sm:gap-4",
          )}
          style={{ height: "clamp(280px, 35vw, 450px)" }}
        >
          {REASONS.map((card) => (
            <ReasonCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
