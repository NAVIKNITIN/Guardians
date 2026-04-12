import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";

const ACTIVITIES = [
  {
    id: "league",
    label: "Guardians' Premier League",
    imageSrc:
      "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=928&q=80",
    imageAlt: "Guardians' Premier League cricket match",
  },
  {
    id: "csr",
    label: "CSR Activities",
    imageSrc:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=768&q=80",
    imageAlt: "CSR Activities by The Guardians team",
  },
  {
    id: "game",
    label: "Game Room",
    imageSrc:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1048&q=80",
    imageAlt: "Guardians office game room",
  },
] as const;

export function OfficeActivities() {
  return (
    <section
      className="border-t border-black/[0.06] bg-brand-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="activities-heading"
    >
      <Container>
        {/* Centered Qasbyne title */}
        <h2
          id="activities-heading"
          className={cn(
            "text-center font-qasbyne font-normal uppercase text-[#202225]",
            "text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.4] tracking-[0.05em]",
            "mb-10 lg:mb-12",
          )}
        >
          Office Activities
        </h2>

        {/* 3-column image grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-10">
          {ACTIVITIES.map((activity) => (
            <div key={activity.id} className="flex flex-col gap-4">
              {/* Photo */}
              <div
                className="relative w-full overflow-hidden bg-neutral-200"
                style={{ height: "clamp(220px, 24vw, 350px)" }}
              >
                <Image
                  src={activity.imageSrc}
                  alt={activity.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

              {/* Label */}
              <p className="font-nexa text-lg font-bold leading-snug text-[#161616]">
                {activity.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
