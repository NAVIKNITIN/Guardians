import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/images/Home/1.png";

/** Rose-gold gradient anchored to #B48183 */
const heroCtaClassName = cn(
  "inline-flex items-center justify-center gap-2 rounded-none border-0 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 ease-out",
  "min-w-[180px]",
  "bg-gradient-to-r from-[#d9aeb0] via-[#B48183] to-[#9a6568]",
  "hover:from-[#cfa3a5] hover:via-[#a97275] hover:to-[#8a585b]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48183]",
);

export function HeroSection() {
  return (
    <section
      className="relative min-h-[560px] overflow-hidden bg-neutral-200 pt-10 pb-24 sm:min-h-[600px] sm:pt-14 sm:pb-28 lg:min-h-[680px] lg:pt-20 lg:pb-38"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed background image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <h1
            id="hero-heading"
            className={cn(
              "w-full max-w-[760px] font-qasbyne font-normal uppercase text-[#2D2225]",
              "text-[clamp(1.75rem,5vw,4.375rem)] leading-[1.06] tracking-[0.035em]",
              "sm:text-[clamp(2.25rem,5.5vw,4.375rem)] sm:leading-[1.04]",
              "xl:text-[70px] xl:leading-[70px]",
            )}
          >
            <span className="block whitespace-nowrap">
              LOREM IPSUM{" "}
              <span className="text-[#8F8183]">DOLOR</span>
            </span>
            <span className="block text-[#2D2225]">SIT AMET</span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-8 max-w-[42rem] font-sans font-normal leading-relaxed text-[#2D2225]/85",
              "text-sm sm:mt-10 sm:text-base lg:mt-12 lg:text-lg",
            )}
          >
            We are one of the fastest growing Real Estate consulting company in
            India.
          </p>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link href="#about" className={cn(heroCtaClassName, "group")}>
              KNOW MORE
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
