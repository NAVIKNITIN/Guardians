import { cn } from "@/utils/cn";
import Image from "next/image";

export function NewsroomHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(240px, 35vw, 500px)" }}
      aria-labelledby="newsroom-hero-heading"
    >
      {/* Full-bleed hero background */}
      <div
        // className="absolute inset-0 z-0 mt-0 lg:mt-[-150px]"
        aria-hidden
      >
        <Image
          src="/images/newsroom.svg"
          alt="Newsroom"
          fill
          className="object-cover object-center mt-[-1.6rem]"
          sizes="100vw"
          priority
        />
        {/* Dark overlay to ensure white text legibility */}
        <div className="absolute inset-0 " />
      </div>

      {/* Centered heading */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 lg:mt-[150px] lg:items-start">
        <h1
          id="newsroom-hero-heading"
          className={cn(
            "qs-reg nt-normal uppercase text-white text-center",
            /* Fluid type — scales down on small phones */
            "text-[clamp(2rem,calc(1.25rem+4vw),4.375rem)] leading-[1] tracking-[0.05em]",
          )}
        >
          Newsroom
        </h1>
      </div>
    </section>
  );
}
