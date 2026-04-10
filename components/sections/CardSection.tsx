import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconCart, IconCrane } from "@/components/common/icons";
import { primaryCtaClassName } from "@/styles/buttonStyles";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

const BUYER_IMG =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80";
const DEV_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80";

export function CardSection() {
  return (
    <section
      id="services"
      className="bg-brand-background-muted py-10"
      aria-labelledby="cards-heading"
    >
      <Container>
        <h2 id="cards-heading" className="sr-only">
          Buyer and developer journeys
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article className="group relative overflow-hidden rounded-sm border border-brand-border bg-brand-background shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
            <div className="pointer-events-none absolute inset-0 hex-pattern opacity-40" />
            <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row lg:items-stretch">
              <div className="flex flex-1 flex-col justify-between gap-8">
                <IconCart className="h-8 w-8 text-brand-text-primary" />
                <div>
                  <h3 className="text-2xl font-normal tracking-tight text-brand-text-primary sm:text-3xl lg:text-4xl">
                    I AM A
                    <br />
                    BUYER
                  </h3>
                </div>
                <Link
                  href="#buyer"
                  className={cn(
                    primaryCtaClassName,
                    "w-fit rounded-none border border-brand-text-primary bg-white text-brand-text-primary shadow-none hover:bg-brand-text-primary hover:text-white",
                  )}
                >
                  Know more
                  <IconArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative mt-8 h-48 w-full shrink-0 sm:h-56 lg:mt-0 lg:ml-4 lg:h-auto lg:w-2/5">
                <Image
                  src={BUYER_IMG}
                  alt="Professional buyer consulting"
                  fill
                  className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-sm border border-brand-border bg-brand-background shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
            <div className="pointer-events-none absolute inset-0 hex-pattern opacity-40" />
            <div className="relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:flex-row-reverse lg:items-stretch">
              <div className="flex flex-1 flex-col justify-between gap-8 lg:items-end lg:text-right">
                <IconCrane className="h-8 w-8 text-brand-text-primary lg:self-end" />
                <div>
                  <h3 className="text-2xl font-normal tracking-tight text-brand-text-primary sm:text-3xl lg:text-4xl">
                    I AM A
                    <br />
                    DEVELOPER
                  </h3>
                </div>
                <Link
                  href="#developer"
                  className={cn(
                    primaryCtaClassName,
                    "w-fit rounded-none border border-brand-text-primary bg-white text-brand-text-primary shadow-none hover:bg-brand-text-primary hover:text-white lg:self-end",
                  )}
                >
                  Know more
                  <IconArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative mt-8 h-48 w-full shrink-0 sm:h-56 lg:mt-0 lg:mr-4 lg:h-auto lg:w-2/5">
                <Image
                  src={DEV_IMG}
                  alt="Professional developer partnership"
                  fill
                  className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
