import Image from "next/image";
import { cn } from "@/utils/cn";

export function PartnersHero() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-300"
      style={{ minHeight: 362 }}
      aria-labelledby="partners-hero-heading"
    >
      {/* Geometric paper-cut background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/Home/paper-cut-hero.png"
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
          "relative z-20 flex items-center justify-center",
          "min-h-[260px] sm:min-h-[310px] lg:min-h-[362px]",
        )}
      >
        <h1
          id="partners-hero-heading"
          className={cn(
            "font-qasbyne font-normal uppercase text-[#202225]",
            "text-[clamp(2rem,6vw,4.375rem)] leading-[1.06] tracking-[0.05em]",
            "text-center",
          )}
        >
          Partners{" "}
          <span className="font-qasbyne italic">&amp;</span>{" "}
          Clients
        </h1>
      </div>
    </section>
  );
}
