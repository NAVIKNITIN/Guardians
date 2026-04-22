import Image from "next/image";
import { cn } from "@/utils/cn";
import { Container } from "@/components/common/Container";

const HERO_BG =
  "/images/tgreaHero.svg";

export function TGREAHero() {
  return (
    <section
      className="relative w-full min-w-0 overflow-hidden bg-neutral-200 lg:h-[650px]"
      aria-labelledby="tgrea-hero-heading"
    >
      <div className="relative h-[650px] overflow-hidden">
        {/* Background cityscape */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt=""
            fill
            className="object-stretch object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Content - same vertical rhythm as About hero */}
        <div className="absolute inset-x-0 top-[6%] text-center sm:top-[7%] lg:top-[7.5%] lg:pt-25">
          <Container className="min-w-0">
            <h1
              id="tgrea-hero-heading"
              className={cn(
                "break-words px-1 qs-reg fs-70 uppercase leading-[0.94] tracking-[0.02em] text-[#202225]",
              )}
            >
              The Guardians
            </h1>

            <p
              className={cn(
                "mx-auto mt-1 n-bold uppercase tracking-[0.1em] text-[#202225]",
                "text-[clamp(0.8125rem,3.4vw,1.25rem)]",
              )}
            >
              Real Estate Advisory
            </p>

            <p
              className={cn(
                "mx-auto mt-4 max-w-[min(1180px,100%)] text-[#000000] fs-18 lh-22 n-book",
                "text-[15px] leading-[1.15]",
              )}
            >
              We are one of the fastest growing Real Estate consulting company in India.
            </p>
          </Container>
        </div>
      </div>
    </section>
  );
}
