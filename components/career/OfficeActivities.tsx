import { Container } from "@/components/common/Container";
import { localImageByIndex } from "@/lib/local-images";
import { cn } from "@/utils/cn";
import Image from "next/image";

const ACTIVITIES = [
  {
    id: "league",
    label: "Guardians' Premier League",
    imageSrc: localImageByIndex(0),
    imageAlt: "Guardians' Premier League cricket match",
  },
  {
    id: "csr",
    label: "CSR Activities",
    imageSrc: localImageByIndex(1),
    imageAlt: "CSR Activities by The Guardians team",
  },
  {
    id: "game",
    label: "Game Room",
    imageSrc: localImageByIndex(2),
    imageAlt: "Guardians office game room",
  },
] as const;

export function OfficeActivities() {
  return (
    <section
      className="bg-white mb-12 py-4 px-4 sm:mb-20 sm:px-6 lg:px-10"
      aria-labelledby="activities-heading"
    >
      <Container>
        {/* Centered Qasbyne title */}
        <h2
          id="activities-heading"
          className={cn(
            "text-center uppercase text-[#202225] qs-reg ls-8",
            /* Fluid type — no fixed fs-50/lh-70 so the title scales on narrow phones */
            "text-[clamp(1.5rem,calc(0.9rem+3vw),3.75rem)] leading-[1.15]",
            "mb-8 sm:mb-10 lg:mb-12",
          )}
        >
          Office Activities
        </h2>

        {/* 3-column image grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10">
          {ACTIVITIES.map((activity) => (
            <div key={activity.id} className="flex flex-col gap-3 sm:gap-4">
              {/* Photo */}
              <div
                className="relative w-full overflow-hidden bg-[#BCBDC0]"
                style={{ height: "clamp(200px, 24vw, 350px)" }}
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
              <p className="n-bold text-base leading-snug tracking-[0.1em] text-[#202225] sm:text-lg">
                {activity.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
