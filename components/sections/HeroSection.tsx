import { Container } from "@/components/common/Container";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { cn } from "@/utils/cn";
import Image from "next/image";

const HERO_IMAGE = "/images/Home/1.png";

export function HeroSection() {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        /* Cap height on short phones; fixed floors from sm upward */
        "min-h-[min(35rem,92svh)] sm:min-h-[560px] lg:min-h-[600px]",
        "pt-8 pb-12 sm:pt-14 sm:pb-14 lg:pb-16",
      )}
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed background — cover avoids stretch on narrow / tall viewports */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover object-center lg:object-fill"
          sizes="100vw"
          priority
        />
      </div>

      <Container className="relative z-10 pt-4 sm:pt-8 lg:pt-12">
        <div className="mx-auto flex min-w-0 max-w-[760px] flex-col items-center px-2 text-center min-[400px]:px-3 sm:px-0">
          <h1
            id="hero-heading"
            className={cn(
              "w-full max-w-[760px] qs-reg fw-100 not-italic uppercase tracking-[0.05em] text-[#202225]",
              "text-[clamp(1.5rem,calc(0.65rem+4.5vw),70px)] leading-[1.05] sm:leading-none",
            )}
          >
            <span className="block whitespace-normal sm:whitespace-nowrap">
              LOREM IPSUM{" "}
              <span className="text-[#8F8183]">DOLOR</span>
            </span>
            <span className="mt-1 block sm:mt-0">SIT AMET</span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-6 max-w-[42rem] n-reg fw-300 leading-relaxed text-[#000000]",
              "text-sm sm:mt-10 sm:text-base lg:mt-10 lg:text-lg lg:ml-[20px]",
            )}
          >
            We are one of the fastest growing Real Estate consulting company in
            India.
          </p>
          <div className="mt-8 flex justify-center sm:mt-12 lg:mt-10">
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
