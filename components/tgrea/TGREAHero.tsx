import Image from "next/image";
import { cn } from "@/utils/cn";

const HERO_BG =
  "/images/tgreaHero.svg";

export function TGREAHero() {
  return (
    <section
      className="relative w-full min-w-0 overflow-hidden bg-neutral-200 min-h-[min(32rem,80svh)] md:min-h-[700px]"
      aria-labelledby="tgrea-hero-heading"
    >
      {/* Background cityscape */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_BG}
          alt=""
          fill
          /* `object-fill` distorts the cityscape on phones — cover on mobile, fill on desktop */
          className="object-cover object-center md:object-fill"
          sizes="100vw"
          priority
        />
        {/* Subtle white overlay so dark text remains legible */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center px-4 py-12 text-center sm:mt-15 sm:py-20">
        <h1
          id="tgrea-hero-heading"
          className={cn(
            "max-w-[min(100%,20ch)] wrap-break-word qs-reg font-normal uppercase tracking-[0.05em] text-[#202225] sm:max-w-none",
            "text-[clamp(1.75rem,7vw,4.375rem)] leading-[1.05] sm:text-[clamp(2.5rem,6vw,4.375rem)] sm:leading-none",
          )}
        >
          The Guardians
        </h1>

        <p
          className={cn(
            "mt-3 n-bold uppercase tracking-[0.1em] text-[#202225] sm:mt-4",
            "text-[clamp(0.8125rem,3.4vw,1.25rem)]",
          )}
        >
          Real Estate Advisory
        </p>

        <p
          className={cn(
            "mt-4 max-w-2xl n-reg font-normal text-black sm:mt-6",
            "text-[clamp(0.875rem,3vw,1.125rem)] leading-[1.5] sm:leading-[1.4]",
          )}
        >
          We are one of the fastest growing Real Estate consulting company in
          India.
        </p>
      </div>
    </section>
  );
}
