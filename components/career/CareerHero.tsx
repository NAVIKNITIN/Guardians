import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function CareerHero() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-200 min-h-[380px] sm:min-h-[450px] md:min-h-[650px]"
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
      <Container className="relative z-10 mt-8 flex flex-col items-center justify-center px-4 py-12 text-center sm:mt-15 sm:px-6 sm:py-20">
        <h1
          id="career-hero-heading"
          className={cn(
            "max-w-[18ch] break-words qs-reg uppercase text-[#202225] sm:max-w-none",
            /* Fluid type — no fixed fs-70 so the title scales on narrow phones */
            "text-[clamp(1.75rem,calc(0.9rem+5vw),4.375rem)] leading-[1.08] tracking-[0.05em]",
          )}
        >
          Work With Us
        </h1>
        <p className="mt-4 max-w-[700px] n-reg text-sm text-black sm:mt-5 sm:text-lg">
          We are one of the fastest growing Real Estate consulting company in
          India.
        </p>
      </Container>
    </section>
  );
}
