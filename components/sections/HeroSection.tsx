import { Container } from "@/components/common/Container";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { cn } from "@/utils/cn";
import Image from "next/image";

const HERO_IMAGE = "/images/Home/1.png";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[560px] overflow-hidden bg-neutral-200 pt-10 pb-0 sm:min-h-[600px] sm:pt-14 lg:min-h-[520px] lg:pt-20"
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
        <div className="mx-auto flex min-w-0 max-w-[760px] flex-col items-center px-1 text-center sm:px-0">
          <h1
            id="hero-heading"
            className={cn(
              "w-full max-w-[760px] font-qasbyne font-normal not-italic uppercase tracking-[0.05em] text-[#202225]",
              "text-[clamp(1.75rem,5vw,70px)] leading-[1]",
            )}
          >
            <span className="block whitespace-normal sm:whitespace-nowrap">
              LOREM IPSUM{" "}
              <span className="text-[#8F8183]">DOLOR</span>
            </span>
            <span className="block">SIT AMET</span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-8 max-w-[42rem] font-nexa font-normal leading-relaxed text-[#2D2225]/85",
              "text-sm sm:mt-10 sm:text-base lg:mt-12 lg:text-lg",
            )}
          >
            We are one of the fastest growing Real Estate consulting company in
            India.
          </p>
          <div className="mt-10 flex justify-center sm:mt-12">
            <GradientCtaButton
              href="#about"
              variant="know-more"
              className="w-full min-w-0 max-w-[280px] rounded-none border-0 text-xs tracking-[0.2em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48183] sm:min-w-[180px] sm:max-w-none"
            >
              KNOW MORE
            </GradientCtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
