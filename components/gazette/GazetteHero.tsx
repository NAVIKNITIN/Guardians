import { LOCAL_IMAGES } from "@/lib/local-images";
import Image from "next/image";

export function GazetteHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(320px, 35vw, 500px)" }}
      aria-labelledby="gazette-hero-heading"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={LOCAL_IMAGES.citylife}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Centered heading */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <h1
          id="gazette-hero-heading"
          className="qs-reg  uppercase text-[#202225] text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]"
        >
          Gazette
        </h1>
      </div>
    </section>
  );
}
