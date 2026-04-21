import { Container } from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

const BRAND_LOGO = "/images/holdingLogo.svg";

const BRAND_PHOTO = "/images/holdingImg.svg";

const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.";

const brands = [
  { id: 1, reverse: false, href: "#" },
  { id: 2, reverse: true, href: "#" },
  { id: 3, reverse: false, href: "#" },
];

/** Rose-gold gradient matching the Figma "Read More" buttons */
const readMoreClassName = cn(
  "inline-flex w-full max-w-xs items-center justify-center gap-3 px-6 py-3 sm:w-auto sm:max-w-none sm:justify-start sm:gap-4 sm:px-12 sm:py-5",
  "n-bold uppercase tracking-[0.1em] text-white",
  "text-[clamp(0.8125rem,3vw,1.25rem)] leading-[1.25rem] sm:leading-[1.5625rem]",
  "transition-opacity duration-200 hover:opacity-90 mt-4 sm:mt-30",
);

const readMoreStyle = {
  background:
    "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
} as const;

function ArrowUpRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
      <path d="M0.5 14.5L14.5 0.5" stroke="white" strokeWidth="2" />
    </svg>
  );
}

interface BrandRowProps {
  reverse: boolean;
  href: string;
}

function BrandRow({ reverse, href }: BrandRowProps) {
  const textContent = (
    <div className="flex w-full min-w-0 flex-col items-center py-6 text-center sm:py-8 lg:items-start lg:py-12 lg:text-left md:min-h-[650px]">
      <Image
        src={BRAND_LOGO}
        alt="Ground Holding – Real Estate"
        width={223}
        height={80}
        className="block h-auto w-[150px] object-contain object-left sm:w-[180px] lg:w-[223px]"
      />
      <p className="max-w-[488px] n-reg text-[clamp(0.875rem,3vw,1rem)] leading-[1.5] text-[#161616] sm:mt-10 sm:text-base md:mt-12">
        {DESCRIPTION}
      </p>
      <Link href={href} className={readMoreClassName} style={readMoreStyle}>
        Read more
        <ArrowUpRight />
      </Link>
    </div>
  );

  const photoContent = (
    <div className="relative min-h-[240px] w-full min-w-0 overflow-hidden sm:min-h-[320px] lg:aspect-auto lg:min-h-0 lg:h-full">
      <Image
        src={BRAND_PHOTO}
        alt="Construction site at sunset"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  /**
   * Mobile: stack with image first (`order-1` / `order-2`).
   * Desktop: explicit grid columns — `order` on grid items is unreliable for column swap in some cases.
   */
  const photoCellClass = reverse
    ? "order-1 lg:order-none lg:col-start-1 lg:row-start-1"
    : "order-1 lg:order-none lg:col-start-2 lg:row-start-1";
  const textCellClass = reverse
    ? "order-2 lg:order-none lg:col-start-2 lg:row-start-1"
    : "order-2 lg:order-none lg:col-start-1 lg:row-start-1";

  return (
    <div className="grid min-h-0 min-w-0 grid-cols-1 gap-x-0 gap-y-6 sm:gap-y-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
      <div className={cn("flex min-h-0 min-w-0 items-stretch", photoCellClass)}>
        {photoContent}
      </div>
      <div className={cn("flex min-h-0 min-w-0 items-center", textCellClass)}>
        {textContent}
      </div>
    </div>
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
            "qs-reg nt-normal uppercase tracking-[0.05em] text-[#202225]",
            "text-[clamp(1.5rem,5vw,3.125rem)] leading-[1.05] sm:leading-none sm:pt-5 lg:pt-10",
          )}
        >
          Our Brands
        </h2>
      </Container>

      {/* Brand rows */}
      <div className="mt-2 md:mt-6 mb-5 md:mb-30">
        {brands.map(({ id, reverse, href }) => (
          <div className="my-2 sm:my-4 lg:mb-[70px]" key={id}>
            <Container className="min-w-0">
              <BrandRow reverse={reverse} href={href} />
            </Container>
          </div>
        ))}
      </div>
    </section>
  );
}
