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
    <div className="flex w-full min-w-0 flex-col items-center gap-5 py-6 text-center sm:gap-8 sm:py-8 lg:items-start lg:py-12 lg:text-left md:min-h-[650px]">
      <Image
        src={BRAND_LOGO}
        alt="Ground Holding – Real Estate"
        width={223}
        height={80}
        className="block h-auto w-[150px] object-cover sm:w-[180px] lg:w-[223px]"
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
    <div className="relative aspect-[488/434] w-full min-h-[220px] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[434px]">
      <Image
        src={BRAND_PHOTO}
        alt="Construction site at sunset"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  return (
    <div
      className={"grid grid-cols-1 gap-y-6 gap-x-0 sm:gap-y-8 lg:grid-cols-2 lg:gap-y-0"}
    >
      {reverse ? (
        <>
          {/* Photo on left */}
          <div className="order-1 lg:order-1">{photoContent}</div>
          {/* Text on right */}
          <div className="order-2 flex items-center px-4 sm:px-8 lg:order-2 lg:px-16">
            {textContent}
          </div>
        </>
      ) : (
        <>
          {/* Text on left */}
          <div className="order-2 flex items-center px-4 sm:px-8 lg:order-1 lg:px-16">
            {textContent}
          </div>
          {/* Photo on right */}
          <div className="order-1 lg:order-2">{photoContent}</div>
        </>
      )}
    </div>
  );
}

export function TGREABrands() {
  return (
    <section className="bg-white" aria-labelledby="our-brands-heading">
      {/* Section heading */}
      <div className="px-4 py-8 text-center sm:py-12 lg:py-16">
        <h2
          id="our-brands-heading"
          className={cn(
            "qs-reg nt-normal uppercase tracking-[0.05em] text-[#202225]",
            "text-[clamp(1.5rem,5vw,3.125rem)] leading-[1.05] sm:leading-none",
          )}
        >
          Our Brands
        </h2>
      </div>

      {/* Brand rows */}
      <div>
        {brands.map(({ id, reverse, href }) => (
          <div className="my-2 sm:my-4 lg:mb-[70px]" key={id}>
            <BrandRow key={id} reverse={reverse} href={href} />
          </div>
        ))}
      </div>
    </section>
  );
}
