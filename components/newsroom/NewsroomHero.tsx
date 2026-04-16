import { cn } from "@/utils/cn";
import Image from "next/image";

export function NewsroomHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(320px, 35vw, 500px)" }}
      aria-labelledby="newsroom-hero-heading"
    >
      {/* Full-bleed hero background */}
      <div className="absolute inset-0 z-0 mt-[-150px]" aria-hidden>
        <Image
          src="/images/newsroom.svg"
          alt="Newsroom"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark overlay to ensure white text legibility */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered heading */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <h1
          id="newsroom-hero-heading"
          className={cn(
            "qs-reg nt-normal uppercase text-white",
            "text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]",
          )}
        >
          Newsroom
        </h1>
      </div>
    </section>
  );
}
