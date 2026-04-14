import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TGREA",
  description: "The Guardians Real Estate Advisory brand showcase.",
};

const heroImage = "/images/tgrea-hero.png";

const brands = [
  {
    id: "ground-1",
    title: "ground holding",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    imageSrc: "/images/tgrea-builder.png",
    imageLeft: false,
  },
  {
    id: "ground-2",
    title: "ground holding",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    imageSrc: "/images/tgrea-builder.png",
    imageLeft: true,
  },
  {
    id: "ground-3",
    title: "ground holding",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    imageSrc: "/images/tgrea-builder.png",
    imageLeft: false,
  },
] as const;

const readMoreClass = cn(
  "group inline-flex min-w-[120px] items-center justify-center gap-2 bg-[linear-gradient(90deg,#f7b1a3_0%,#ea9a8b_20%,#de8d7c_52%,#e9998b_82%,#fbb2a2_100%)] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] transition-transform hover:-translate-y-0.5",
);

const BRAND_IMAGE_SIZE = 260;

function GroundHoldingLogo() {
  return (
    <div className="w-fit leading-none text-[#ff315f]">
      <div className="flex items-stretch">
        <div className="flex flex-col" style={{ lineHeight: 0.9 }}>
          <div
            className="font-sans font-black lowercase"
            style={{ fontSize: "1.6rem", letterSpacing: "-0.03em" }}
          >
            ground
          </div>
          <div
            className="font-sans font-black lowercase"
            style={{
              fontSize: "1.6rem",
              letterSpacing: "-0.05em",
              marginTop: "-2px",
            }}
          >
            holding
          </div>
        </div>
        <div
          className="ml-1.5 flex flex-col justify-start"
          style={{ paddingTop: "2px" }}
        >
          <div className="flex items-start">
            <span
              className="font-sans font-black uppercase"
              style={{
                fontSize: "0.42rem",
                letterSpacing: "0.05em",
                lineHeight: 1.3,
              }}
            >
              REAL
            </span>
            <span
              className="font-sans font-black"
              style={{
                fontSize: "0.3rem",
                lineHeight: 1,
                marginTop: "1px",
                marginLeft: "1px",
              }}
            >
              &reg;
            </span>
          </div>
          <span
            className="font-sans font-black uppercase"
            style={{
              fontSize: "0.42rem",
              letterSpacing: "0.05em",
              lineHeight: 1.3,
            }}
          >
            ESTATE
          </span>
          <span
            className="font-sans font-black uppercase"
            style={{
              fontSize: "0.42rem",
              letterSpacing: "0.05em",
              lineHeight: 1.3,
            }}
          >
            JOY
          </span>
        </div>
      </div>
    </div>
  );
}

function BrandShowcase({
  title,
  body,
  imageSrc,
  imageLeft,
}: {
  title: string;
  body: string;
  imageSrc: string;
  imageLeft: boolean;
}) {
  return (
    <article
      className="flex items-stretch overflow-hidden"
      style={{ height: `${BRAND_IMAGE_SIZE}px` }}
    >
      {/* Text column: logo + body at top, button pinned to bottom */}
      <div
        className={cn(
          "flex flex-col justify-between py-5",
          imageLeft ? "order-2 pl-6 pr-0" : "order-1 pl-0 pr-6",
        )}
        style={{ width: "50%", flexShrink: 0, overflow: "hidden" }}
      >
        {/* Top section */}
        <div className="flex flex-col gap-3">
          <GroundHoldingLogo />
          <p
            className="font-sans text-[11px] leading-[1.7] text-[#5f5a5b]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {body}
          </p>
        </div>

        {/* Button pinned to bottom */}
        <Link href="/contact" className={cn(readMoreClass, "self-start")}>
          Read More
          <IconArrowUpRight className="h-3.5 w-3.5 stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Image column */}
      <div
        className={cn(
          "relative overflow-hidden",
          imageLeft ? "order-1" : "order-2",
        )}
        style={{
          width: `${BRAND_IMAGE_SIZE}px`,
          height: `${BRAND_IMAGE_SIZE}px`,
          minWidth: `${BRAND_IMAGE_SIZE}px`,
          maxWidth: `${BRAND_IMAGE_SIZE}px`,
          flex: `0 0 ${BRAND_IMAGE_SIZE}px`,
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center"
          sizes={`${BRAND_IMAGE_SIZE}px`}
        />
      </div>
    </article>
  );
}

export default function TGREAPage() {
  return (
    <div className="bg-[#fbfaf8] text-[#2a2626]">
      <section className="border-b border-[#ddd5d3] bg-white">
        <div className="relative w-full overflow-hidden">
          <Image
            src={heroImage}
            alt="TGREA city skyline"
            width={1078}
            height={388}
            className="h-[340px] w-full object-cover object-center sm:h-[420px] lg:h-[500px]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-x-0 top-[10%] px-4 text-center sm:top-[12%] lg:top-[11%]">
            <h1 className="font-qasbyne text-[clamp(2.75rem,7vw,7.2rem)] uppercase leading-[0.92] tracking-[0.02em] text-[#222123]">
              The Guardians
            </h1>
            <p className="mt-2 text-[clamp(0.95rem,1.5vw,2rem)] font-semibold uppercase tracking-[0.22em] text-[#272528]">
              Real Estate Advisory
            </p>
            <p className="mx-auto mt-7 max-w-[1180px] text-[clamp(1rem,1.35vw,1.85rem)] leading-tight text-[#232124]">
              We are one of the fastest growing Real Estate consulting company
              in India.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-4 sm:pt-14 sm:pb-6 lg:pt-16 lg:pb-8">
        <Container>
          <div className="mx-auto max-w-[900px]">
            <h2 className="text-center font-qasbyne text-[clamp(1.8rem,2.6vw,2.8rem)] uppercase tracking-[0.05em] text-[#2a2626]">
              Our Brands
            </h2>

            <div
              className="mt-8"
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {brands.map((brand) => (
                <BrandShowcase key={brand.id} {...brand} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
