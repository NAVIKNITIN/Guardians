import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function LifeAtGuardians() {
  return (
    <section
      className="border-t border-black/[0.06] bg-brand-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="life-heading"
    >
      {/* ── Top split: heading left / description right ── */}
      <Container>
        <div className="grid gap-10 lg:grid-cols-[365fr_710fr] lg:items-start lg:gap-16 xl:gap-20">
          {/* Left – Qasbyne heading */}
          <h2
            id="life-heading"
            className={cn(
              "font-qasbyne font-normal uppercase text-[#202225]",
              "text-[clamp(2.25rem,5.5vw,4.375rem)] leading-[1] tracking-[0.05em]",
            )}
          >
            Life at<br />Guardians
          </h2>

          {/* Right – body description */}
          <p className="font-nexa text-lg font-normal leading-[1.5] text-[#161616] sm:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Container>

      {/* ── Full-width-ish large image ── */}
      <div className="mx-auto mt-10 max-w-[1196px] px-4 sm:px-6 lg:mt-12 lg:px-8 xl:px-0">
        <div
          className="relative w-full overflow-hidden bg-[#BCBDC0]"
          style={{ height: "clamp(240px, 28vw, 400px)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2392&q=80"
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
