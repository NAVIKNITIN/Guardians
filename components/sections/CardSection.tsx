import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconCrane } from "@/components/common/icons";
import { primaryCtaClassName } from "@/styles/buttonStyles";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

function CardImageColumn({
  portraitSrc,
  patternSrc,
  portraitAlt,
  objectPositionClass,
  className,
}: {
  portraitSrc: string;
  patternSrc: string;
  portraitAlt: string;
  objectPositionClass: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mt-8 h-48 w-full shrink-0 overflow-hidden sm:h-56 lg:mt-0 lg:flex lg:h-auto lg:min-h-0 lg:w-2/5 lg:flex-col lg:self-stretch lg:overflow-visible",
        className,
      )}
    >
      {/* Background pattern: full card height on lg via vertical bleed; portrait block unchanged */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 z-0 max-lg:inset-y-0 lg:bottom-0 lg:-top-8",
        )}
      >
        <Image
          src={patternSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 40vw"
          aria-hidden
        />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative min-h-[12rem] flex-1 sm:min-h-[14rem] lg:min-h-[280px]">
          <Image
            src={portraitSrc}
            alt={portraitAlt}
            fill
            className={cn(
              "object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]",
              objectPositionClass,
            )}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </div>
  );
}

export function CardSection() {
  return (
    <section
      id="services"
      className=" py-10"
      aria-labelledby="cards-heading"
    >
      <Container>
        <h2 id="cards-heading" className="sr-only">
          Buyer and developer journeys
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article
            id="buyer"
            className="group relative overflow-hidden rounded-sm border border-brand-border bg-brand-background shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row lg:items-stretch lg:px-8 lg:pt-8 lg:pb-0">
              <div className="flex flex-1 flex-col justify-between gap-8 lg:pb-8">
                <Image
                  src="/images/Buyer/BuyerVector.svg"
                  alt=""
                  width={47}
                  height={50}
                  className="h-[50px] w-[47px] shrink-0"
                  aria-hidden
                />

                <div>
                  <h3 className="text-2xl font-normal tracking-tight text-brand-text-primary sm:text-3xl lg:text-4xl">
                    I AM A
                    <br />
                    <span className="font-qasbyne text-brand-accent">BUYER</span>
                  </h3>
                </div>
                <Link
                  href="/#buyer"
                  className={cn(
                    primaryCtaClassName,
                    "w-fit rounded-none border border-brand-text-primary bg-white text-brand-text-primary shadow-none hover:bg-brand-text-primary hover:text-white",
                  )}
                >
                  Know more
                  <IconArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <CardImageColumn
                portraitSrc="/images/Buyer/image 41.svg"
                patternSrc="/images/Buyer/Group 4.svg"
                portraitAlt="Smiling professional representing property buyers"
                objectPositionClass="object-[center_22%] sm:object-right"
                className="lg:ml-4"
              />
            </div>
          </article>

          <article
            id="developer"
            className="group relative overflow-hidden rounded-sm border border-brand-border bg-brand-background shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row-reverse lg:items-stretch lg:px-8 lg:pt-8 lg:pb-0">
              <div className="flex flex-1 flex-col justify-between gap-8 lg:items-end lg:pb-8 lg:text-right">
                <IconCrane className="h-[50px] w-[47px] shrink-0 text-brand-accent lg:self-end" />
                <div>
                  <h3 className="text-2xl font-normal tracking-tight text-brand-text-primary sm:text-3xl lg:text-4xl">
                    I AM A
                    <br />
                    <span className="font-qasbyne text-brand-accent">DEVELOPER</span>
                  </h3>
                </div>
                <Link
                  href="/developer"
                  className={cn(
                    primaryCtaClassName,
                    "w-fit rounded-none border border-brand-text-primary bg-white text-brand-text-primary shadow-none hover:bg-brand-text-primary hover:text-white lg:self-end",
                  )}
                >
                  Know more
                  <IconArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <CardImageColumn
                portraitSrc="/images/Developer/image 42.svg"
                patternSrc="/images/Developer/Group 4.svg"
                portraitAlt="Smiling professional representing real estate developers"
                objectPositionClass="object-[center_22%] sm:object-left"
                className="lg:mr-4"
              />
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
