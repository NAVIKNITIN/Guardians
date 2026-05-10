import { Container } from "@/components/common/Container";

// 
import {
  AboutLeadershipSection,
  type LeadershipSlide,
} from "@/components/developer/DeveloperStatsSection";

import { AboutStatsGrid } from "@/components/about/AboutStatsGrid";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import Image from "next/image";
import type { Metadata } from "next";
import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";

export const metadata: Metadata = {
  title: { absolute: "About | The Guardians" },
  description:
    "Who we are, our brand promise, leadership, and partner brands.",
};

const brandCards = [
  { title: "ground holding", subtitle: "Real Estate Advisory", url: "/images/Group 65.svg" },
  { title: "The Guardians", subtitle: "International", url: "/images/Group 70.svg" },
  { title: "Cavalry", subtitle: "The Guardians", url: "/images/Group 66.svg" },
] as const;

const heroImage = "/images/mumbai-skyline-bw.png";
const brandPromiseOrnament = "/images/ornament.jpeg";

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
    imageSrc: "/images/about/Leader.png",
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
    imageSrc: "/images/about/Leader.png",
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
    imageSrc: "/images/about/Leader.png",
    imageAlt: "Leadership portrait 4",
    title: "We stay ahead of the curve with strategy",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Jayesh Rathod",
    role: "Co-Founder & Director",
    imagePositionClassName: "object-center",
  },
] satisfies readonly LeadershipSlide[];

function BrandCard({
  title,
  subtitle,
  url,
}: {
  title: string;
  subtitle: string;
  url: string;
}) {
  return (
    <article className="flex min-h-[182px] w-full min-w-0 max-w-full items-center justify-center border border-[#ece7e7] bg-white px-6 py-8 text-center">
      <div className="flex w-full max-w-[200px] flex-col items-center gap-2">
        <Image
          src={encodeURI(url)}
          alt={`${title}, ${subtitle}`}
          width={180}
          height={100}
          className="h-auto w-full max-h-24 object-contain object-center"
          sizes="(max-width: 768px) 50vw, 200px"
          unoptimized
        />
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <div className="min-w-0 bg-white text-[#2a2626] md:mb-25">
      <section
        id="about"
        className="border-b border-[#d8d2d2] bg-[linear-gradient(180deg,#fbfbfb_0%,#f7f5f5_50%,#efeded_100%)] "
      >
        <MarketingPageHero heroId="about" heightPx={650} mobileHeightPx={420} useViewportHeightFlag viewportHeightBreakpointPx={1024} shiftUnderHeader={true} shiftTillSearch={false} shiftExtraContentTopPx={44} negativePadding={16} />
      </section>

      <section className="mt-10 py-14 sm:py-16 lg:py-10">
        <Container className="min-w-0">
          <h2 className="text-center qs-reg text-[clamp(1.9rem,2.6vw,3rem)] uppercase tracking-[0.03em] text-[#2a2626]">
            Brand Promise
          </h2>

          <div className="mt-2 bg-white py-3 sm:py-4  lg:py-5">
            <div className="relative w-[95%] mx-auto">
              <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 lg:block">
                <Image
                  src={brandPromiseOrnament}
                  alt=""
                  width={84}
                  height={180}
                  className="h-auto w-[80px] object-cover scale-x-[-1]"
                />
              </div>
              <div className=" text-center mx-5 md:mx-30 lg:mx-40">
                <p className=" text-[#3c393a] lh-27 n-book fs-20">
                  <span className="font-semibold text-[#242021]">The Guardians</span> mark the coming
                  together of the best of minds from the Indian real estate industry, a set of professionals
                  who have played diverse roles across their careers. Their collective experience spans
                  <span className="font-semibold text-[#242021]"> over 12 decades </span>
                  and extends to a pan India portfolio of the best of both regional and national real estate
                  brands. The team has till date sold
                  <span className="font-semibold text-[#242021]">  over 17.3 Million of sq.ft. </span>
                  of projects in both residential and commercial real estate categories.
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

          <div className="mt-40 grid items-start justify-items-center gap-y-10 text-center lg:grid-cols-[2fr_3fr] lg:justify-items-stretch lg:gap-x-12 lg:gap-y-0 lg:text-left xl:gap-x-20">
            <div className="">
              <h3 className="mx-auto  lg:mx-0 n-bold fs-42 text-[clamp(1.72rem,2.1vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#161616] ">
                Revolutionising real
                <br />
                estate through
                <br />
                innovation
              </h3>
              <p className="mx-auto mt-8 max-w-[355px] text-[14px] leading-[1.28] text-[#161616] nexa-bold fs-16 lh-20 lg:mx-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <AboutStatsGrid />
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-25">
        <Container className="min-w-0 ">
          <h2 className="qs-reg fs-50 uppercase tracking-[0.05em] text-[#000000] mb-3 ">
            Meet The Leadership
          </h2>
          <AboutLeadershipSection slides={leadershipSlides} />
        </Container>
      </section>

      <section id="brands" className="bg-[#F2F2F2] py-12 sm:py-16 lg:py-10">
        <Container className="min-w-0">
          <div className="flex items-center justify-center gap-5">
            <p className="text-[0.95rem] n-bold fs-20 uppercase leading-none tracking-[0.1em] text-[#161616]">
              The Guardians Real Estate Advisory
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-[15px] md:grid-cols-3">
            {brandCards.map((brand) => (
              <BrandCard
                key={brand.title}
                title={brand.title}
                subtitle={brand.subtitle}
                url={brand.url}
              />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            {/* <GradientCtaButton href="/tgrea" variant="know-more" className="fs-18 n-bold uppercase lg:px-10">
              Know More
            </GradientCtaButton> */}
            <OutlineArrowButton
              href="/tgrea"
              className="mt-5 px-12 py-4 fs-18 uppercase ls-10 lh-24"
              iconClassName="w-[13px] h-[13px]"
            >
              Know More
            </OutlineArrowButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
