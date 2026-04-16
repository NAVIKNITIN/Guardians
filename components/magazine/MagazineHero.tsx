import { LOCAL_IMAGES } from "@/lib/local-images";
import Image from "next/image";

export function MagazineHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(320px, 35vw, 500px)" }}
      aria-labelledby="magazine-hero-heading"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={LOCAL_IMAGES.magazine}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <h1
          id="magazine-hero-heading"
          className="qs-reg font-normal uppercase text-[#202225] text-[clamp(2.5rem,7vw,4.355rem)] leading-[1] tracking-[0.05em] lg:pr-8"
        >
          Magazine
        </h1>
      </div>
    </section>
  );
}
