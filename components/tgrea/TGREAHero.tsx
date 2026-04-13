import Image from "next/image";
import { cn } from "@/utils/cn";

const HERO_BG =
  "/images/tgreaHero.svg";

export function TGREAHero() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-200"
      style={{ minHeight: "513px" }}
      aria-labelledby="tgrea-hero-heading"
    >
      {/* Background cityscape */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Subtle white overlay so dark text remains legible */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[613px] flex-col items-center justify-center px-4 py-20 text-center">
        <h1
          id="tgrea-hero-heading"
          className={cn(
            "font-qasbyne font-normal uppercase tracking-[0.05em] text-[#202225]",
            "text-[clamp(2.5rem,6vw,4.375rem)] leading-[1]",
          )}
        >
          The Guardians
        </h1>

        <p
          className={cn(
            "mt-4 font-nexa font-bold uppercase tracking-[0.1em] text-[#202225]",
            "text-[clamp(0.875rem,1.5vw,1.25rem)]",
          )}
        >
          Real Estate Advisory
        </p>

        <p
          className={cn(
            "mt-6 max-w-2xl font-nexa font-normal text-black",
            "text-[clamp(0.875rem,1.5vw,1.125rem)] leading-[1.4]",
          )}
        >
          We are one of the fastest growing Real Estate consulting company in
          India.
        </p>
      </div>
    </section>
  );
}
