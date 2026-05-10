import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/common/Container";
import { heroEnquireCtaClassName } from "@/styles/buttonStyles";
import type { MarketingBannerContent } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { OutlineArrowButton } from "../common/OutlineArrowButton";

export function ExploreBanner({ content, isBuyer }: { content: MarketingBannerContent, isBuyer: boolean }) {
  const headingId =
    content.ariaHeadingId ?? "marketing-explore-banner-heading";

  return (
    <section
      className="w-full "
      aria-labelledby={headingId}
    >
      <Container className="flex min-w-0 justify-center">
        {/* Figma: banner frame 994 × 300 */}
        <ScrollReveal direction="up" distance={34} className="w-full max-w-[994px]">
          <div
            className={cn(
              "relative w-full max-w-[994px] overflow-hidden bg-[#d9d9d9]",
              "min-h-[280px] sm:min-h-[260px] lg:h-[300px] lg:min-h-[300px]",
            )}
          >
            <div
              className="absolute inset-0"
              role={content.imageAlt ? "img" : undefined}
              aria-label={content.imageAlt || undefined}
              aria-hidden={!content.imageAlt}
            >
              <Image
                src={content.imageSrc}
                alt=""
                fill
                className="object-cover object-right"
                sizes="(max-width: 1024px) 100vw, 994px"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-[#f5f4f4] via-[#f5f4f4]/94 to-transparent sm:inset-y-0 sm:left-0 sm:right-auto sm:w-[58%] sm:bg-linear-to-r sm:from-[#f5f4f4] sm:via-[#f5f4f4]/92 sm:to-transparent lg:w-[54%]"
                aria-hidden
              />
            </div>

            <div className="relative z-20 flex h-full w-full max-w-full flex-col justify-end gap-5 px-5 py-6 sm:max-w-[60%] sm:justify-center sm:gap-8 sm:px-8 sm:py-7 lg:px-10 lg:py-0 xl:px-12">
              <h2 id={headingId} className="n-book text-[clamp(1.7rem,6vw,3rem)] leading-[1.05] text-[#161616]">
                {content.headline}
              </h2>
              <div className="w-full sm:w-auto">
                <OutlineArrowButton
                  href={content.ctaHref}
                  className={cn(
                    " w-[250px] h-[55px] n-bold fs-16 md:fs-18 lg:fs-20 uppercase",
                  )}
                >
                  {content.ctaLabel}
                </OutlineArrowButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
