import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { SplitSection } from "@/components/sections/SplitSection";
import Image from "next/image";
import { cn } from "@/utils/cn";

const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.";

const brands = [
  { id: 1, reverse: false, href: "#", logoBG: "/images/holdingLogo.svg", logo: "/images/holdingImg.svg" },
  { id: 2, reverse: true, href: "#", logoBG: "/images/Group 70.svg", logo: "/images/tgrea3.svg" },
  { id: 3, reverse: false, href: "#", logoBG: "/images/Group 66.svg", logo: "/images/tgrea2.svg" },
];

const readMoreClassName = cn(
  "btn-grad inline-flex w-full max-w-xs items-center justify-center gap-3 px-6 py-3 sm:w-auto sm:max-w-none sm:justify-start sm:gap-4 sm:px-12 sm:py-5",
  "n-bold uppercase tracking-[0.1em] text-white",
  "text-[clamp(0.8125rem,3vw,1.25rem)] leading-[1.25rem] sm:leading-[1.5625rem]",
);

function BrandTitle({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Ground Holding – Real Estate"
      width={223}
      height={80}
      className="block h-auto w-[150px] object-contain object-left sm:w-[180px] lg:w-[223px]"
    />
  );
}

export function TGREABrands() {
  return (
    <section className="bg-white" aria-labelledby="our-brands-heading">
      {/* Section heading */}
      <Container className="min-w-0 py-8 text-center">
        <h2
          id="our-brands-heading"
          className={cn(
            "qs-reg nt-normal uppercase tracking-[0.05em] text-brand-text-primary",
            "text-[clamp(1.5rem,5vw,3.125rem)] leading-[1.05] sm:leading-none sm:pt-5 lg:pt-10",
          )}
        >
          Our Brands
        </h2>
      </Container>

      {/* Brand rows */}
      <StaggerContainer className="mt-2 mb-5 md:mt-6 md:mb-30">
        {brands.map(({ id, reverse, href, logoBG, logo }) => (
          <SplitSection
            key={id}
            reverse={reverse}
            href={href}
            title={<BrandTitle src={logoBG} />}
            description={DESCRIPTION}
            buttonText="Read more"
            image={{ src: logo, alt: "Construction site at sunset" }}
            className="py-20 px-6 md:px-16 lg:px-20"
            titleClassName="mb-2"
            descriptionClassName="max-w-[488px] text-[clamp(0.875rem,3vw,1rem)] leading-[1.5] sm:text-base"
            buttonClassName={cn(readMoreClassName, "group cta-hover-trigger mt-4 sm:mt-10")}
            imageClassName="rounded-none"
          />
        ))}
      </StaggerContainer>
    </section>
  );
}
