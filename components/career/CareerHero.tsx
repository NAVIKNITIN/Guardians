import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function CareerHero() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-200 sm:min-h-[350px] md:min-h-[650px]"
      aria-labelledby="career-hero-heading"
    >
      {/* Layered decorative building imagery */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/workwithus.svg"
          alt="Work With Us"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Gradient overlays matching Figma's layered images effect */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Centered text */}
      <Container className="relative z-10 mt-15 flex flex-col items-center justify-center px-2 py-16 text-center sm:py-20">
        <h1
          id="career-hero-heading"
          className={cn(
            "max-w-[18ch] break-words qs-reg fs-70  uppercase text-[#202225] sm:max-w-none",
            "text-[clamp(2rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em] sm:text-[clamp(2.5rem,6.5vw,4.375rem)]",
          )}
        >
          Work With Us
        </h1>
        <p className="mt-5 max-w-[700px] n-reg  text-black sm:text-lg">
          We are one of the fastest growing Real Estate consulting company in
          India.
        </p>
      </Container>
    </section>
  );
}
