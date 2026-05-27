import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { SplitSection } from "@/components/sections/SplitSection";
import Image from "next/image";
import { cn } from "@/utils/cn";

const brands = [
  { id: 1, reverse: false, href: "#", logoBG: "/images/holdingLogo.svg", logo: "/images/holdingImg.svg" ,description: "The Guardians Real Estate Advisory* & Kotak Realty Fund have come together to overcome the challenges of project bottlenecks, project delays, inefficient processes, lack of latest marketing tools and methods, and the absence of industry intelligence. We are India’s first institutionally owned 'Real Estate Development Management and Advisory Company'. Ground Holding is committed to augmenting the clients’ assets and investment value with pathbreaking business solutions by renowned industry doyens."},
  { id: 2, reverse: true, href: "#", logoBG: "/images/Group 70.svg", logo: "/images/tgrea3.svg" ,description: "With Guardians International, we are realising that dream by providing expert real estate advisory for developers and customers with a seamless, end-to-end experience from concept to occupancy. We are providing a 360-degree experience for NRI and HNWI with access to the best-in-class property investment opportunities across the breadth and length of India. We deliver an end-to-end service that guides them through every step of their international real estate investment journey."},
  { id: 3, reverse: false, href: "#", logoBG: "/images/Group 66.svg", logo: "/images/tgrea2.svg" ,description: "Your one-stop destination for seamless home-buying experience. With years of expertise and a deep understanding of the real estate market, we provide personalized guidance every step of the way. From luxurious properties to family-friendly homes, we ensure your vision becomes a reality. Trust us to make your dream home a lasting one."},
];

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
      <StaggerContainer className="space-y-2 sm:space-y-4 lg:space-y-[70px] mb-10 md:mb-15 lg:mb-20">
        {brands.map(({ id, reverse, href, logoBG, logo, description }) => (
          <SplitSection
            key={id}
            reverse={reverse}
            href={href}
            title={<BrandTitle src={logoBG} />}
            description={description}
            buttonText="Read more"
            image={{ src: logo, alt: "Construction site at sunset" }}
            className="px-4 py-2 sm:px-8 sm:py-4 lg:px-16 lg:py-0"
            contentClassName="flex items-center md:min-h-[520px] lg:min-h-[650px]"
            titleClassName=""
            descriptionClassName="max-w-[488px] text-[clamp(0.875rem,3vw,1rem)] leading-[1.5] sm:text-base"
            buttonClassName="mt-4 h-[50px] w-full max-w-xs text-[clamp(0.8125rem,3vw,1.25rem)] leading-[1.25rem] sm:mt-10 sm:w-auto sm:max-w-none sm:px-12 sm:py-5 sm:leading-[1.5625rem]"
            imageClassName="aspect-[488/434] min-h-[220px] rounded-none md:min-h-[520px] lg:aspect-auto lg:h-full lg:min-h-[650px]"
          />
        ))}
      </StaggerContainer>
    </section>
  );
}
