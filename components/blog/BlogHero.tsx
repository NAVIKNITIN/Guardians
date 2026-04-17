import { LOCAL_IMAGES } from "@/lib/local-images";
import Image from "next/image";

export function BlogHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(320px, 35vw, 500px)" }}
      aria-labelledby="blog-hero-heading"
    >
      {/* Layered background images */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={LOCAL_IMAGES.blog}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for white text legibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered heading */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <h1
          id="blog-hero-heading"
          className="qs-reg  uppercase text-white text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]"
        >
          Blogs
        </h1>
      </div>
    </section>
  );
}
