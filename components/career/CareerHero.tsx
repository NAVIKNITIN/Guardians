import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function CareerHero() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-200"
      style={{ height: "clamp(380px, 45vw, 513px)" }}
      aria-labelledby="career-hero-heading"
    >
      {/* Layered decorative building imagery */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/workwithus.svg"
          alt="Work With Us"
          fill
          className="object-fill"
          sizes="100vw"
          priority
        />
        {/* Gradient overlays matching Figma's layered images effect */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Centered text */}
      <Container className="relative z-10 flex h-full flex-col items-center justify-center pb-4 pt-4 text-center">
        <h1
          id="career-hero-heading"
          className={cn(
            "font-qasbyne font-normal uppercase text-[#202225]",
            "text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]",
          )}
        >
          Work With Us
        </h1>
        <p className="mt-5 max-w-[646px] font-nexa text-base font-normal leading-snug text-black sm:text-lg">
          We are one of the fastest growing Real Estate consulting company in
          India.
        </p>
      </Container>
    </section>
  );
}
