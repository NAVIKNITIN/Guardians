import { Container } from "@/components/common/Container";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { cn } from "@/utils/cn";
import Image from "next/image";

const HERO_IMAGE = "/images/group_builder.svg";

export function DeveloperDetailsHero() {
  return (
    <section
      className="relative min-h-[min(85vh,760px)] overflow-hidden bg-neutral-300 pt-10 pb-28 sm:min-h-[min(100vh,1000px)] sm:pt-14 sm:pb-32 lg:pt-16 lg:pb-40"
      aria-labelledby="developer-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover object-center saturate-[0.82] contrast-[1.03]"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/[0.14] via-transparent to-black/[0.12]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-white/96 via-white/45 to-transparent sm:h-44 md:h-52"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <h1
            id="developer-hero-heading"
            className="font-qasbyne text-[clamp(2rem,6vw,4.5rem)] uppercase leading-[1.05] tracking-[0.04em]"
          >
            <span className="block">
              <span className="font-semibold text-[#0a0a0a]">Looking to</span>{" "}
              <span className="font-light text-[#7a6a5c]">sell?</span>
            </span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-8 max-w-[40rem] font-sans font-normal leading-relaxed text-[#1a1a1a]/92",
              "text-sm sm:mt-10 sm:text-base lg:mt-11 lg:text-[17px]",
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam — structured advisory for developers and
            institutional partners.
          </p>
          <div className="mt-10 flex justify-center sm:mt-12">
            <MarketingEnquireLink href="/contact">Enquire now</MarketingEnquireLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
