import { LOCAL_IMAGES } from "@/lib/local-images";
import Image from "next/image";

export function ContactHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(320px, 35vw, 500px)" }}
      aria-labelledby="contact-hero-heading"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={LOCAL_IMAGES.heroPrimary}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <Image
          src={LOCAL_IMAGES.heroSecondary}
          alt=""
          fill
          className="object-cover object-center mix-blend-darken"
          sizes="100vw"
          priority
        />
      </div>

      {/* Two-tone heading */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <h1
          id="contact-hero-heading"
          className="font-qasbyne font-normal uppercase text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]"
        >
          <span className="text-[#8F8183]">Contact </span>
          <span className="text-[#202225]">Us</span>
        </h1>
      </div>
    </section>
  );
}
