import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { localImageByIndex } from "@/lib/local-images";
import { cn } from "@/utils/cn";
import Image from "next/image";

const ACTIVITIES = [
  {
    id: "league",
    label: "Guardians' Premier League",
    imageSrc: "/images/career/1.svg",
    imageAlt: "Guardians' Premier League cricket match",
  },
  {
    id: "csr",
    label: "CSR Activities",
    imageSrc: "/images/career/2.svg",
    imageAlt: "CSR Activities by The Guardians team",
  },
  {
    id: "game",
    label: "Game Room",
    imageSrc: "/images/career/3.svg",
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
        <ScrollReveal direction="up" distance={28}>
          <h2
            id="activities-heading"
            className={cn(
            "text-center uppercase text-brand-text-primary qs-reg ls-8",
              "qs-reg fs-50 leading-[1.15] ls-8",
              "mb-4 md:mb-8 lg:mb-10",
            )}
          >
            Office Activities
          </h2>
        </ScrollReveal>

        {/* 3-column image grid */}
        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10" staggerChildren={0.14}>
          {ACTIVITIES.map((activity, index) => (
            <ScrollReveal key={activity.id} direction="up" delay={index * 0.05} distance={24}>
              <div className="flex flex-col gap-3 sm:gap-4">
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
                <p className="n-bold text-base  text-brand-text-primary sm:text-lg">
                  {activity.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
