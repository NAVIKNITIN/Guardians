import { Container } from "@/components/common/Container";
import {
  AboutLeadershipSection,
  type LeadershipSlide,
} from "@/components/developer/DeveloperStatsSection";
import { AboutStatsGrid } from "@/components/about/AboutStatsGrid";
import {
  aboutBrandPromiseH2,
  aboutBrandPromiseIntroBox,
  aboutBrandPromiseParagraph,
  aboutBrandPromiseParagraphWrap,
  aboutBrandPromiseSection,
  aboutBrandsCtaWrap,
  aboutBrandsEyebrow,
  aboutBrandsGrid,
  aboutBrandsSection,
  aboutBrandCardShell,
  aboutHeroHeadingSlot,
  aboutHeroImageFrame,
  aboutHeroSection,
  aboutHeroSubtitle,
  aboutHeroTitle,
  aboutLeadershipH2,
  aboutLeadershipSection,
  aboutPageRoot,
  aboutRevolutionBody,
  aboutRevolutionGrid,
  aboutRevolutionHeading,
} from "@/components/about/aboutPageResponsiveClasses";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import Image from "next/image";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

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
    <article className={aboutBrandCardShell}>
      <div className="flex w-full max-w-[200px] flex-col items-center gap-2 sm:max-w-[220px] md:max-w-[200px]">
        <Image
          src={encodeURI(url)}
          alt={`${title}, ${subtitle}`}
          width={180}
          height={100}
          className="h-auto w-full max-h-20 object-contain object-center sm:max-h-24"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 200px"
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
        <MarketingPageHero
          heroId="about"
          heightPx={650}
          mobileHeightPx={470}
          useViewportHeightFlag
          viewportHeightBreakpointPx={1024}
          shiftUnderHeader={true}
          shiftTillSearch={false}
          shiftExtraContentTopPx={60}
        />
      </section>

      <section className={aboutBrandPromiseSection}>
        <Container className="min-w-0">
          <h2 className={aboutBrandPromiseH2}>Brand Promise</h2>

          <div className="mt-2 bg-white py-3 sm:py-4  lg:py-5">
            <div className="relative w-[95%] mx-auto">
              <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 lg:block">
                <Image
                  src={brandPromiseOrnament}
                  alt=""
                  width={84}
                  height={180}
                  className="h-auto w-[64px] object-cover scale-x-[-1] lg:w-[80px]"
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
                  <span className="font-semibold text-[#242021]"> over 17.3 Million of sq.ft. </span>
                  of projects in both residential and commercial real estate categories.
                </p>
              </div>
              <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 sm:right-3 lg:block xl:right-4">
                <Image
                  src={brandPromiseOrnament}
                  alt=""
                  width={84}
                  height={180}
                  className="h-auto w-[64px] object-cover lg:w-[80px]"
                />
              </div>
            </div>
          </div>

          <div className={aboutRevolutionGrid}>
            <div>
              <h3 className={aboutRevolutionHeading}>
                Revolutionising real
                <br />
                estate through
                <br />
                innovation
              </h3>
              <p className={aboutRevolutionBody}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua, dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <AboutStatsGrid />
          </div>
        </Container>
      </section>

      <section className={aboutLeadershipSection}>
        <Container className="min-w-0">
          <h2 className={aboutLeadershipH2}>Meet The Leadership</h2>
          <AboutLeadershipSection slides={leadershipSlides} />
        </Container>
      </section>

      <section id="brands" className={aboutBrandsSection}>
        <Container className="min-w-0">
          <div className="flex items-center justify-center px-2">
            <p className={aboutBrandsEyebrow}>The Guardians Real Estate Advisory</p>
          </div>

          <div className={aboutBrandsGrid}>
            {brandCards.map((brand) => (
              <BrandCard
                key={brand.title}
                title={brand.title}
                subtitle={brand.subtitle}
                url={brand.url}
              />
            ))}
          </div>

          <div className={aboutBrandsCtaWrap}>
            <GradientCtaButton
              href="/contact"
              variant="know-more"
              className={cn(
                "fs-18 n-bold uppercase",
                "px-6 py-3 text-sm sm:px-8 sm:text-base md:px-10 lg:px-10 xl:px-12 2xl:px-14",
              )}
            >
              Know More
            </GradientCtaButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
