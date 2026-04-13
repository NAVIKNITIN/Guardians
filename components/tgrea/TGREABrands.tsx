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
  "inline-flex items-center gap-4 px-12 py-5",
  "font-nexa text-sm font-bold uppercase tracking-[0.1em] text-white",
  "transition-opacity duration-200 hover:opacity-90",
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
    <div className="flex flex-col items-start gap-8 py-8 lg:py-12">
      <Image
        src={BRAND_LOGO}
        alt="Ground Holding – Real Estate"
        width={223}
        height={80}
        className="block h-auto w-[180px] object-contain lg:w-[223px]"
      />
      <p className="max-w-[488px] font-nexa text-base font-normal leading-[1.5] text-[#161616]">
        {DESCRIPTION}
      </p>
      <Link href={href} className={readMoreClassName} style={readMoreStyle}>
        Read more
        <ArrowUpRight />
      </Link>
    </div>
  );

  const photoContent = (
    <div className="relative aspect-[488/434] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[434px]">
      <Image
        src={BRAND_PHOTO}
        alt="Construction site at sunset"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  const photoCellClass = "mb-10 w-full lg:mb-0";

  return (
    <div
      className={"grid grid-cols-1 gap-y-8 gap-x-0 lg:grid-cols-2 lg:gap-y-0"}
    >
      {reverse ? (
        <>
          {/* Photo on left */}
          <div className="order-1 lg:order-1">{photoContent}</div>
          {/* Text on right */}
          <div className="order-2 flex items-center px-8 lg:order-2 lg:px-16">
            {textContent}
          </div>
        </>
      ) : (
        <>
          {/* Text on left */}
          <div className="order-2 flex items-center px-8 lg:order-1 lg:px-16">
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
      <div className="py-12 text-center lg:py-16">
        <h2
          id="our-brands-heading"
          className={cn(
            "font-qasbyne font-normal uppercase tracking-[0.05em] text-[#202225]",
            "text-[clamp(2rem,4vw,3.125rem)] leading-[1]",
          )}
        >
          Our Brands
        </h2>
      </div>

      {/* Brand rows */}
      <div className="">
        {brands.map(({ id, reverse, href }) => (
          <div className=" my-4 lg:mb-[70px]">
            <BrandRow key={id} reverse={reverse} href={href} />
          </div>
        ))}
      </div>
    </section>
  );
}
