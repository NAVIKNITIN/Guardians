import { Container } from "@/components/common/Container";
import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
} from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About | The Guardians" },
  description:
    "Who we are, our brand promise, leadership, and partner brands.",
};

const stats = [
  { value: "37,850", label: "Cr. Worth of Inventory Sold" },
  { value: "2 Million+", label: "Sq. Ft. Area Developed" },
  { value: "29,669", label: "Units Sold" },
  { value: "307+", label: "Projects Delivered" },
] as const;

const brandCards = [
  { title: "ground holding", subtitle: "Real Estate Advisory" },
  { title: "The Guardians", subtitle: "International" },
  { title: "Cavalry", subtitle: "The Guardians" },
] as const;

const heroImage = "/images/mumbai-skyline-bw.png";
const leadershipImage =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80";
const subsectionTitleClass =
  "font-qasbyne text-[clamp(1.7rem,3vw,2.8rem)] uppercase tracking-[0.08em] text-[#2a2626]";

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
            <span className="font-nexa text-[clamp(1.9rem,3vw,3.1rem)] font-bold lowercase tracking-[-0.05em]">
              ground
            </span>
            <div className="pt-1 text-left">
              <div className="font-nexa text-[0.46rem] font-semibold uppercase tracking-[0.12em]">
                Real
              </div>
              <div className="font-nexa text-[0.46rem] font-semibold uppercase tracking-[0.12em]">
                Estate
              </div>
              <div className="font-nexa text-[0.46rem] font-semibold uppercase tracking-[0.12em]">
                Advisory
              </div>
            </div>
          </div>
          <div className="-mt-1 font-nexa text-[clamp(1.9rem,3vw,3.1rem)] font-bold lowercase tracking-[-0.05em]">
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
          <div className="font-nexa text-[clamp(1.55rem,2.5vw,2.45rem)] font-medium uppercase tracking-[0.1em]">
            The Guardians
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#cfc4c5]" />
            <span className="font-nexa text-[0.75rem] uppercase tracking-[0.42em] text-[#9f9495]">
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
          <div className="mb-2 font-nexa text-[0.54rem] uppercase tracking-[0.42em] text-[#a39899]">
            The Guardians
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="relative h-9 w-8">
              <span className="absolute left-1 top-0 h-8 w-3 border-l-[5px] border-t-[5px] border-[#938788]" />
              <span className="absolute bottom-0 left-0 h-5 w-5 border-l-[5px] border-b-[5px] border-[#938788]" />
              <span className="absolute left-3 top-1 h-7 w-4 border-l-[5px] border-t-[5px] border-[#938788]" />
            </div>
            <span className="font-nexa text-[clamp(1.75rem,2.8vw,2.9rem)] font-bold uppercase tracking-[0.02em]">
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
        <h3 className="font-nexa text-[clamp(1.3rem,2vw,2rem)] font-bold uppercase tracking-[0.04em] text-[#8f8183]">
          {title}
        </h3>
        <p className="mt-2 font-nexa text-[0.64rem] uppercase tracking-[0.34em] text-[#a49a9b]">
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
        <Container className="px-0 sm:px-0 lg:px-0">
          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
              <Image
                src={heroImage}
                alt="The Guardians city skyline"
                width={1152}
                height={768}
                className="h-[340px] w-full object-cover object-center sm:h-[420px] lg:h-[500px]"
                sizes="100vw"
                unoptimized
                priority
              />
              <div className="absolute inset-x-0 top-[8%] px-4 text-center sm:top-[9%] sm:px-6 lg:top-[10%]">
                <h1 className="font-qasbyne text-[clamp(3.4rem,7.2vw,7.2rem)] uppercase tracking-[0.02em] leading-[0.92]">
                  <span className="text-[#9e8f90]">Who</span>
                  <span className="ml-3 text-[#201d1e]">We Are?</span>
                </h1>
                <p className="mx-auto mt-5 max-w-[1100px] font-nexa text-[18px] leading-none text-[#2f2b2c] sm:text-[22px] lg:text-[26px]">
                  We are one of the fastest growing Real Estate consulting company in India.
                </p>
              </div>
            </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-[1120px]">
            <h2 className="text-center font-qasbyne text-[clamp(2.2rem,3.8vw,4rem)] uppercase tracking-[0.04em] text-[#2a2626]">
              Brand Promise
            </h2>

            <div className="mt-6 bg-white px-4 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-8">
              <div className="grid items-center gap-6">
                <div className="mx-auto max-w-[760px] text-center">
                  <p className="font-nexa text-[clamp(1.02rem,1.3vw,1.22rem)] leading-[1.55] text-[#3c393a]">
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
              </div>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
              <div className="max-w-[420px]">
                <h3 className="font-nexa text-[clamp(2rem,3.2vw,3.7rem)] font-semibold leading-[1.05] text-[#1d1a1b]">
                  Revolutionising real estate through innovation
                </h3>
                <p className="mt-6 font-nexa text-sm leading-7 text-[#5b5858] sm:text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-nexa text-[clamp(2rem,3vw,3.3rem)] font-medium leading-none ">
                      {stat.value}
                    </p>
                    <p className="mt-3 font-nexa text-xs uppercase tracking-[0.18em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-[1120px]">
            <h2 className="font-qasbyne text-[clamp(2rem,3.4vw,3.55rem)] uppercase tracking-[0.05em] text-[#2a2626]">
              Meet The Leadership
            </h2>

            <div className="mt-8 border border-[#ece7e7] bg-[#f3f1f1] p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-10">
                <div className="relative min-h-[340px] overflow-hidden bg-[#d9d4d1] sm:min-h-[420px] lg:min-h-[520px]">
                  <img
                    src={leadershipImage}
                    alt="Leadership portrait"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5">
                    <span className="h-1.5 w-6 rounded-full bg-white" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
                  </div>
                </div>

                <div className="flex flex-col justify-between py-2 lg:py-4">
                  <div>
                    <div className="font-nexa text-[5.5rem] leading-none text-[#c8c5c6] sm:text-[6.5rem]">
                      &ldquo;
                    </div>
                    <h3 className="-mt-8 max-w-[520px] font-nexa text-[clamp(2rem,3vw,3.2rem)] font-semibold leading-[1.08] text-[#1f1d1d]">
                      We stay ahead of the curve with strategy
                    </h3>
                    <p className="mt-7 max-w-[560px] font-nexa text-sm leading-8 text-[#5d5859] sm:text-[15px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-nexa text-[clamp(2rem,2.6vw,2.7rem)] font-semibold text-[#2a2626]">
                        Jayesh Rathod
                      </p>
                      <p className="mt-2 font-nexa text-sm uppercase tracking-[0.22em] text-[#867f80]">
                        Co-Founder & Director
                      </p>
                    </div>
                    <div className="font-nexa text-[5.5rem] leading-none text-[#c8c5c6] sm:text-[6.5rem]">
                      &rdquo;
                    </div>
                  </div>

                  <div className="mt-7 flex items-center gap-4 text-[#a8a3a4]">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-current/50 bg-white/40"
                      aria-label="Previous"
                    >
                      <IconChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-current/50 bg-white/40"
                      aria-label="Next"
                    >
                      <IconChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="brands" className="bg-[#f3f1f1] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-[1120px]">
            <div className="flex items-center justify-center gap-5">
              <p className="font-nexa text-[0.95rem] font-bold uppercase tracking-[0.22em] text-[#2a2626]">
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
