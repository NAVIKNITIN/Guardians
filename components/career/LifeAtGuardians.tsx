import { ScrollReveal } from "@/components/animations/ScrollReveal";
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
          <ScrollReveal direction="left" distance={30}>
            <h2
              id="life-heading"
              className={cn(
                "text-center uppercase text-brand-text-primary qs-reg ls-10 sm:text-left",
                "text-[clamp(2.156rem,4.8vw,2.5rem)] leading-[1.12] tracking-[0.04em]",
                "sm:text-[clamp(2.25rem,5.2vw,3.1rem)] sm:leading-[1.1] sm:tracking-[0.05em]",
                "lg:text-[clamp(2.75rem,3.5vw,4.375rem)] lg:leading-[1.05] lg:tracking-[0.05em]",
              )}
            >
              Life at Guardians
            </h2>
          </ScrollReveal>

          {/* Right – body description */}
          <ScrollReveal direction="right" delay={0.08} distance={30}>
            <p className="n-book lh-24 text-base leading-normal text-[#161616] sm:text-lg lg:text-xl">
            The Guardians is not only dedicated to work but also provide a healthy work-life balance which is evident through the various fun activities conducted by us. It helps our employees bond better, refreshes them & gives them the zeal to come back to work more enthusiastically.
            </p>
          </ScrollReveal>
        </div>
      </Container>

      {/* ── Full-width-ish large image ── */}
      <Container className="">
        <ScrollReveal direction="up" delay={0.1} distance={28}>
          <div
            className="relative w-full overflow-hidden bg-[#BCBDC0]"
            style={{ height: "clamp(200px, 32vw, 400px)" }}
          >
            <Image
              src={LOCAL_IMAGES.workWithUs}
              alt="Life at The Guardians — team at work"
              fill
              className=""
              sizes="(max-width: 1280px) 100vw, 1196px"
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
