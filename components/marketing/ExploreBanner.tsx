import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { heroEnquireCtaClassName } from "@/styles/buttonStyles";
import type { MarketingBannerContent } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

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
        <div
          className={cn(
            "relative w-full max-w-[994px] overflow-hidden bg-[#d9d9d9]",
            "min-h-[220px] sm:min-h-[260px] lg:h-[300px] lg:min-h-[300px]",
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
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[64%] bg-linear-to-r from-[#f5f4f4] via-[#f5f4f4]/92 to-transparent sm:w-[58%] lg:w-[54%]"
              aria-hidden
            />
          </div>

          <div className="relative z-20 flex h-full w-full max-w-[60%] flex-col justify-center gap-6 px-6 py-6 sm:gap-8 sm:px-8 sm:py-7 lg:px-10 lg:py-0 xl:px-12">
            <h2 id={headingId} className="n-book text-[#161616] text-[clamp(2rem,4vw,3rem)] leading-none">
              {content.headline}
            </h2>
            <div>
              <Link href={content.ctaHref} className={cn(heroEnquireCtaClassName, "group cta-hover-trigger h-[55px] w-[243.5px]")}>
                {content.ctaLabel}
                <IconArrowUpRight className="cta-icon-hover h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
