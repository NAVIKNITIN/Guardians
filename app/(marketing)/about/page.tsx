import { Container } from "@/components/common/Container";

// 
import {
  AboutLeadershipSection,
  type LeadershipSlide,
} from "@/components/developer/DeveloperStatsSection";

import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About | The Guardians" },
  description:
    "Who we are, our brand promise, leadership, and partner brands.",
};

type Stat = {
  value: string;
  label: string;
  nowrap?: boolean;
};

const stats: Stat[] = [
  { value: "37,850", label: "Cr. Worth of Inventory Sold" },
  { value: "2 Million+", label: "Sq. Ft. Area Developed", nowrap: true },
  { value: "29,669", label: "Units Sold" },
  { value: "307+", label: "Projects Delivered" },
];

const brandCards = [
  { title: "ground holding", subtitle: "Real Estate Advisory" },
  { title: "The Guardians", subtitle: "International" },
  { title: "Cavalry", subtitle: "The Guardians" },
] as const;

const heroImage = "/images/mumbai-skyline-bw.png";
const brandPromiseOrnament = "/images/brand-promise-ornament.png";

// CHANGE: 4 images aur same text yahin page.tsx me rakha gaya hai.
const leadershipSlides = [
  {
    id: "leader-1",
    imageSrc: "/images/about/Leader.png",
    imageAlt: "Leadership portrait 1",
    title: "We stay ahead of the curve with strategy",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Jayesh Rathod",
    role: "Co-Founder & Director",
    imagePositionClassName: "object-center",
  },
  {
    id: "leader-2",
    imageSrc: "/images/about/Leader2.png",
    imageAlt: "Leadership portrait 2",
    title: "We stay ahead of the curve with strategy",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Jayesh Rathod",
    role: "Co-Founder & Director",
    imagePositionClassName: "object-center",
  },
  {
    id: "leader-3",
    imageSrc: "/images/about/Leader3.png",
    imageAlt: "Leadership portrait 3",
    title: "We stay ahead of the curve with strategy",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Jayesh Rathod",
    role: "Co-Founder & Director",
    imagePositionClassName: "object-center",
  },
  {
    id: "leader-4",
    imageSrc: "/images/about/Leader4.png",
    imageAlt: "Leadership portrait 4",
    title: "We stay ahead of the curve with strategy",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Jayesh Rathod",
    role: "Co-Founder & Director",
    imagePositionClassName: "object-center",
  },
] satisfies readonly LeadershipSlide[];

const ctaClassName = cn(
  "inline-flex items-center justify-center gap-3 bg-[linear-gradient(90deg,#ffb09f_0%,#d68b7e_52%,#ffab98_100%)] px-8 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all",
  "hover:brightness-[0.98]",
);

function BrandCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  if (title === "ground holding") {
    return (
      <article className="flex min-h-[138px] items-center justify-center border border-[#ece7e7] bg-white px-6 py-8 text-center">
        <div className="leading-none text-[#938788]">
          <div className="flex items-start justify-center gap-1">
            <span className="text-[clamp(1.9rem,3vw,3.1rem)] font-bold lowercase tracking-[-0.05em]">
              ground
            </span>
            <div className="pt-1 text-left">
              <div className="text-[0.46rem] font-semibold uppercase tracking-[0.12em]">
                Real
              </div>
              <div className="text-[0.46rem] font-semibold uppercase tracking-[0.12em]">
                Estate
              </div>
              <div className="text-[0.46rem] font-semibold uppercase tracking-[0.12em]">
                Advisory
              </div>
            </div>
          </div>
          <div className="-mt-1 text-[clamp(1.9rem,3vw,3.1rem)] font-bold lowercase tracking-[-0.05em]">
            holding
          </div>
        </div>
      </article>
    );
  }

  if (title === "The Guardians") {
    return (
      <article className="flex min-h-[138px] items-center justify-center border border-[#ece7e7] bg-white px-6 py-8 text-center">
        <div className="text-[#938788]">
          <div className="text-[clamp(1.55rem,2.5vw,2.45rem)] font-medium uppercase tracking-[0.1em]">
            The Guardians
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#cfc4c5]" />
            <span className="text-[0.75rem] uppercase tracking-[0.42em] text-[#9f9495]">
              International
            </span>
            <span className="h-px w-12 bg-[#cfc4c5]" />
          </div>
        </div>
      </article>
    );
  }

  if (title === "Cavalry") {
    return (
      <article className="flex min-h-[138px] items-center justify-center border border-[#ece7e7] bg-white px-6 py-8 text-center">
        <div className="text-[#938788]">
          <div className="mb-2 text-[0.54rem] uppercase tracking-[0.42em] text-[#a39899]">
            The Guardians
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="relative h-9 w-8">
              <span className="absolute left-1 top-0 h-8 w-3 border-l-[5px] border-t-[5px] border-[#938788]" />
              <span className="absolute bottom-0 left-0 h-5 w-5 border-l-[5px] border-b-[5px] border-[#938788]" />
              <span className="absolute left-3 top-1 h-7 w-4 border-l-[5px] border-t-[5px] border-[#938788]" />
            </div>
            <span className="text-[clamp(1.75rem,2.8vw,2.9rem)] font-bold uppercase tracking-[0.02em]">
              Cavalry
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex min-h-[138px] items-center justify-center border border-[#ece7e7] bg-white px-6 py-8 text-center">
      <div>
        <h3 className="text-[clamp(1.3rem,2vw,2rem)] font-bold uppercase tracking-[0.04em] text-[#8f8183]">
          {title}
        </h3>
        <p className="mt-2 text-[0.64rem] uppercase tracking-[0.34em] text-[#a49a9b]">
          {subtitle}
        </p>
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white text-[#2a2626]">
      <section
        id="about"
        className="border-b border-[#d8d2d2] bg-[linear-gradient(180deg,#fbfbfb_0%,#f7f5f5_50%,#efeded_100%)]"
      >
        <div className="relative w-full overflow-hidden">
          <Image
            src={heroImage}
            alt="The Guardians city skyline"
            width={1600}
            height={900}
            className="h-[340px] w-full object-cover object-center sm:h-[420px] lg:h-[500px]"
            sizes="100vw"
            unoptimized
            priority
          />
          <div className="absolute inset-x-0 top-[6%] px-4 text-center sm:top-[7%] sm:px-6 lg:top-[7.5%]">
            <h1 className="break-words px-1 font-qasbyne text-[clamp(2rem,5.5vw,5.8rem)] uppercase leading-[0.94] tracking-[0.02em] sm:text-[clamp(2.7rem,6vw,5.8rem)]">
              <span className="text-[#9e8f90]">Who</span>
              <span className="ml-2 inline-block sm:ml-3 sm:inline">We Are?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[1180px] px-2 text-[15px] leading-[1.15] text-[#2f2b2c] sm:text-[17px] sm:leading-[1.1] md:text-[21px] lg:text-[24px]">
              We are one of the fastest growing Real Estate consulting company in India.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-[1120px]">
            <h2 className="text-center font-qasbyne text-[clamp(1.9rem,2.6vw,3rem)] uppercase tracking-[0.03em] text-[#2a2626]">
              Brand Promise
            </h2>

            <div className="mt-2 bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <div className="relative">
                <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 lg:block">
                  <Image
                    src={brandPromiseOrnament}
                    alt=""
                    width={84}
                    height={180}
                    className="h-auto w-[80px] object-cover scale-x-[-1]"
                  />
                </div>
                <div className="mx-auto max-w-[800px] text-center lg:px-[62px]">
                  <p className="text-[clamp(0.98rem,1vw,1.05rem)] leading-[1.38] text-[#3c393a]">
                    <span className="font-semibold text-[#242021]">The Guardians</span> mark the coming
                    together of the best of minds from the Indian real estate industry, a set of professionals
                    who have played diverse roles across their careers. Their collective experience spans over
                    <span className="font-semibold text-[#242021]"> 12 decades </span>
                    and extends to a pan India portfolio of the best of both regional and national real estate
                    brands. The team has till date sold over
                    <span className="font-semibold text-[#242021]"> 17.3 Million </span>
                    of sq.ft. of projects in both residential and commercial real estate categories.
                  </p>
                </div>
                <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 lg:block">
                  <Image
                    src={brandPromiseOrnament}
                    alt=""
                    width={84}
                    height={180}
                    className="h-auto w-[80px] object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 grid items-start gap-y-10 lg:grid-cols-[470px_1fr] lg:gap-x-18">
              <div className="max-w-[470px] lg:pl-10">
                <h3 className="max-w-[430px] text-[clamp(1.72rem,2.1vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1f1c1d]">
                  Revolutionising real
                  <br />
                  estate through
                  <br />
                  innovation
                </h3>
                <p className="mt-8 max-w-[355px] text-[14px] leading-[1.28] text-[#5f5a5b]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="grid w-full max-w-[430px] grid-cols-2 items-start gap-x-6 gap-y-10 sm:gap-x-12 sm:gap-y-12 lg:ml-auto">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "flex min-h-[88px] w-full min-w-0 max-w-[11.5rem] flex-col justify-start self-start sm:min-h-[94px] sm:w-[178px] sm:max-w-none",
                      index < 2 && "min-h-[80px] sm:min-h-[88px]",
                      stat.nowrap && "max-w-[10.5rem] sm:w-[170px]",
                    )}
                  >
                    <p
                      className={cn(
                        "text-[2.55rem] font-semibold leading-[0.92] tracking-[-0.04em] text-[#9a8c8f]",
                        stat.nowrap && "whitespace-nowrap text-[2.18rem] leading-[0.92]",
                      )}
                    >
                      {stat.value}
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 text-[11px] leading-tight text-[#706b6c]",
                        index < 2 && "mt-2",
                      )}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 
           */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container>
          <AboutLeadershipSection slides={leadershipSlides} />
        </Container>
      </section>

      <section id="brands" className="bg-[#f3f1f1] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-[1120px]">
            <div className="flex items-center justify-center gap-5">
              <p className="text-[0.95rem] font-bold uppercase tracking-[0.22em] text-[#2a2626]">
                The Guardians Real Estate Advisory
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {brandCards.map((brand) => (
                <BrandCard
                  key={brand.title}
                  title={brand.title}
                  subtitle={brand.subtitle}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/contact" className={ctaClassName}>
                Know More
                <IconArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
