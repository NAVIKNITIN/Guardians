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

function BrandTitle({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Ground Holding – Real Estate"
      width={223}
      height={80}
      className="mx-auto block h-auto w-[150px] object-contain object-center md:mx-0 md:object-left sm:w-[180px] lg:w-[223px]"
    />
  );
}

export function TGREABrands() {
  return (
    <section className="bg-white" aria-labelledby="our-brands-heading">
      {/* Section heading */}
      <Container className="min-w-0 px-4 py-8 text-center sm:py-12 lg:py-16">
        <h2
          id="our-brands-heading"
          className={cn(
            "qs-reg nt-normal uppercase tracking-[0.05em] text-brand-text-primary",
            "text-[clamp(1.5rem,5vw,3.125rem)] leading-[1.05] sm:leading-none",
          )}
        >
          Our Brands
        </h2>
      </Container>

      {/* Brand rows */}
      <StaggerContainer className="mb-10 md:mb-15 lg:mb-20">
        {brands.map(({ id, reverse, href, logoBG, logo }) => (
          <SplitSection
            key={id}
            reverse={reverse}
            href={href}
            title={<BrandTitle src={logoBG} />}
            description={DESCRIPTION}
            buttonText="Read more"
            image={{ src: logo, alt: "Construction site at sunset" }}
            className="px-4 py-10 sm:px-8 lg:px-16"
            contentClassName="max-md:flex max-md:flex-col max-md:items-center max-md:text-center md:flex md:items-center md:min-h-[520px] lg:min-h-[650px]"
            titleClassName="max-md:flex max-md:justify-center"
            descriptionClassName="max-w-[488px] text-[clamp(0.875rem,3vw,1rem)] leading-[1.5] max-md:mx-auto max-md:text-center sm:text-base md:mx-0 md:text-left"
            buttonClassName="mt-4 sm:mt-10"
            imageClassName="aspect-[488/434] min-h-[220px] rounded-none md:min-h-[520px] lg:aspect-auto lg:h-full lg:min-h-[650px]"
          />
        ))}
      </StaggerContainer>
    </section>
  );
}
