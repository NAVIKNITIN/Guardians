import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { heroEnquireCtaClassName } from "@/styles/buttonStyles";
import type { MarketingBannerContent } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import Link from "next/link";

/** CSS `url()` must not contain raw spaces — breaks loading (e.g. `/images/image 59.svg`). */
function cssBackgroundUrl(src: string) {
  return `url("${encodeURI(src)}")`;
}

export function ExploreBanner({ content, isBuyer }: { content: MarketingBannerContent, isBuyer: boolean }) {
  const headingId =
    content.ariaHeadingId ?? "marketing-explore-banner-heading";

  return (
    <section
      className="w-full my-0"
      aria-labelledby={headingId}
    >
      <Container className="flex min-w-0 justify-center">
        {/* Figma: banner frame 994 × 300 */}
        <div
          className={cn(
            "grid w-full max-w-[994px] overflow-hidden rounded-sm bg-[#f5f4f4]",
            "sm:gap-10 sm:p-0",
            /* `minmax(0,1fr)` keeps columns true 50/50; plain `1fr` lets min-content widen the text column and squeezes the image */
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:h-[300px] lg:gap-12 lg:pl-12 lg:pr-0 xl:gap-16 xl:pl-16 2xl:pl-20",
          )}
        >
          <div className="flex min-w-0 flex-col justify-center gap-6 sm:gap-8 sm:pt-2 lg:h-full lg:max-w-none lg:pr-4 lg:pt-0">
            <h2
              id={headingId}
              className={cn(
                "min-w-0 text-balance text-left n-reg text-[clamp(1.375rem,3.5vw,2.125rem)] leading-[1.25] tracking-[-0.02em] text-brand-text-primary",
                "sm:text-[clamp(1.5rem,3.2vw,2.25rem)]",
              )}
            >
              {content.headline}
            </h2>
            <div>
              <Link
                href={content.ctaHref}
                className={cn(heroEnquireCtaClassName, "w-[243.5px] h-[55px]")}
              >
                {content.ctaLabel}
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Figma image area ~497×300 within 994×300 banner — bg cover fills box */}
          <div
            className={cn(
              "relative h-[300px] w-full min-w-0 overflow-hidden rounded-sm",
              "bg-cover bg-right bg-no-repeat",
            )}
            style={{
              backgroundImage: cssBackgroundUrl(content.imageSrc),
            }}
            role={content.imageAlt ? "img" : undefined}
            aria-label={content.imageAlt || undefined}
            aria-hidden={!content.imageAlt}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[28%] max-w-[200px] bg-linear-to-r from-[#f5f4f4] via-[#f5f4f4]/80 to-transparent sm:w-[32%] lg:w-[30%]"
              aria-hidden
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
