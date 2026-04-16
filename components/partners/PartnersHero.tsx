import Image from "next/image";
import { cn } from "@/utils/cn";

export function PartnersHero() {
  return (
    <section
      className="relative w-full min-w-0 overflow-x-clip bg-neutral-300"
      style={{ minHeight: 362 }}
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
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 100%)",
        }}
        aria-hidden
      />

      {/* Centered heading */}
      <div
        className={cn(
          "relative z-20 flex w-full min-w-0 items-center justify-center px-4 sm:px-6",
          "min-h-[260px] sm:min-h-[310px] lg:min-h-[362px] bg-black/25",
        )}
      >
        <h1
          id="partners-hero-heading"
          className={cn(
            "max-w-full uppercase text-[#202225]",
            /* Lower floor than 2rem so long title fits narrow phones without horizontal scroll */
            "text-[clamp(1.125rem,5.5vw+0.35rem,4.375rem)] leading-[1.06] tracking-[0.05em]",
            "text-center text-balance",
          )}
        >
          <span className="text-white">Partners</span>
          <span className="qs-reg"> &amp; Clients</span>
        </h1>
      </div>
    </section>
  );
}
