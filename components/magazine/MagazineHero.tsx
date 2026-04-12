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
          src="https://api.builder.io/api/v1/image/assets/TEMP/02793c57941b1dcc29282bec2e73a449eb6cd5e2?width=3532"
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
          className="font-qasbyne font-normal uppercase text-[#202225] text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]"
        >
          Magazine
        </h1>
      </div>
    </section>
  );
}
