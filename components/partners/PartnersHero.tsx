import Image from "next/image";
import { cn } from "@/utils/cn";

export function PartnersHero() {
  return (
    <section
      className="relative w-full min-w-0 overflow-x-clip md:min-h-[550px]"
      aria-labelledby="partners-hero-heading"
    >
      {/* Geometric paper-cut background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/partner-hero.svg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Gradient overlay — bottom fade to white */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
        aria-hidden
      />

      {/* Centered heading */}
      <div
        className={cn(
          "relative z-20 flex w-full min-w-0 items-center justify-center bg-black/25 px-4 py-14 sm:px-6",
          "min-h-[min(18rem,44svh)] sm:min-h-[310px] sm:py-0 lg:min-h-[550px]",
        )}
      >
        <h1
          id="partners-hero-heading"
          className={cn(
            "max-w-full uppercase text-[#202225]",
            /* Fluid type — no fixed fs-70/lh-24 so the title scales on narrow phones */
            "text-center text-balance",
            "qs-reg text-[clamp(1.5rem,calc(0.65rem+5vw),4.375rem)] leading-[1.08] tracking-[0.05em] sm:leading-[1.06]",
          )}
        >
          <span className="text-white">Partners</span>
          <span> &amp; Clients</span>
        </h1>
      </div>
    </section>
  );
}
