import { Container } from "@/components/common/Container";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function LifeAtGuardians() {
  return (
    <section
      className="bg-white "
      aria-labelledby="life-heading"
    >
      {/* ── Top split: heading left / description right ── */}
      <Container className="pt-12 px-4 sm:pt-16 sm:px-10 lg:pt-25 lg:px-20 pb-4 md:pb-10">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[365fr_710fr] lg:items-start lg:gap-16 xl:gap-20">
          {/* Left – Qasbyne heading */}
          <h2
            id="life-heading"
            className={cn(
              "uppercase text-[#202225] qs-reg ls-10",
              /* Fluid type — no fixed fs-70/lh-70 so the title scales on narrow phones */
              "text-[clamp(2rem,calc(1rem+5.5vw),3.75rem)] leading-[1.05] tracking-[0.05em]",
            )}
          >
            Life at<br />Guardians
          </h2>

          {/* Right – body description */}
          <p className="n-book lh-24 text-base leading-[1.5] text-[#161616] sm:text-lg lg:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Container>

      {/* ── Full-width-ish large image ── */}
      <Container className="">
        <div
          className="relative w-full overflow-hidden bg-[#BCBDC0]"
          style={{ height: "clamp(200px, 32vw, 400px)" }}
        >
          <Image
            src={LOCAL_IMAGES.workWithUs}
            alt="Life at The Guardians — team at work"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1196px"
          />
        </div>
      </Container>
    </section>
  );
}
