import { Container } from "@/components/common/Container";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function LifeAtGuardians() {
  return (
    <section
      className="bg-white py-16 sm:py-16 lg:py-25 px-2 lg:px-20 sm:px-10"
      aria-labelledby="life-heading"
    >
      {/* ── Top split: heading left / description right ── */}
      <Container>
        <div className="grid gap-10 lg:grid-cols-[365fr_710fr] lg:items-start lg:gap-16 xl:gap-20">
          {/* Left – Qasbyne heading */}
          <h2
            id="life-heading"
            className={cn(
              " uppercase text-[#202225]",
              "text-[clamp(2.25rem,3.8vw,4.375rem)] leading-[1] tracking-[0.05em] qs-reg fs-70 lh-70 ls-10",
            )}
          >
            Life at<br />Guardians
          </h2>

          {/* Right – body description */}
          <p className="n-reg  text-lg  leading-[1.5] text-[#161616] sm:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Container>

      {/* ── Full-width-ish large image ── */}
      <div className="mx-auto mt-10  lg:mt-12 px-2 lg:px-10">
        <div
          className="relative w-full overflow-hidden bg-[#BCBDC0]"
          style={{ height: "clamp(240px, 28vw, 400px)" }}
        >
          <Image
            src={LOCAL_IMAGES.workWithUs}
            alt="Life at The Guardians — team at work"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1196px"
          />
        </div>
      </div>
    </section>
  );
}
