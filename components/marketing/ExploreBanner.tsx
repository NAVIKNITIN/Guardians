import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/common/Container";
import {
  AudienceMarketingSectionCtaDesktop,
  AudienceMarketingSectionCtaMobile,
} from "@/components/marketing/AudienceMarketingSectionCta";
import type { MarketingBannerContent } from "@/data/audience-marketing";
import {
  audienceDesktopOnlyBlock,
  audienceMobileCopyCenter,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function ExploreBanner({
  content,
  isBuyer,
  centerOnMobile = false,
}: {
  content: MarketingBannerContent;
  isBuyer: boolean;
  centerOnMobile?: boolean;
}) {
  const headingId =
    content.ariaHeadingId ?? "marketing-explore-banner-heading";
  const buyerMobileLayout = isBuyer && centerOnMobile;

  return (
    <section className="w-full" aria-labelledby={headingId}>
      <Container
        className={cn(
          "min-w-0 justify-center",
          buyerMobileLayout ? "max-lg:flex max-lg:flex-col max-lg:items-stretch" : "flex",
        )}
      >
        {/* Figma: banner frame 994 × 300 */}
        <ScrollReveal
          direction="up"
          distance={34}
          className={cn(
            "w-full max-w-[994px]",
            buyerMobileLayout && "max-lg:shrink-0",
          )}
        >
          <div
            className={cn(
              "relative w-full max-w-[994px] overflow-hidden bg-[#d9d9d9]",
              "min-h-[280px] sm:min-h-[260px] lg:h-[300px] lg:min-h-[300px]",
              buyerMobileLayout && "max-lg:min-h-[300px]",
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
                className={cn(
                  "object-cover object-right",
                  buyerMobileLayout && "max-lg:object-center",
                )}
                sizes="(max-width: 1024px) 100vw, 994px"
                aria-hidden
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 z-10",
                  buyerMobileLayout
                    ? "max-lg:bg-linear-to-t max-lg:from-[#f5f4f4] max-lg:via-[#f5f4f4]/96 max-lg:to-transparent"
                    : "bg-linear-to-t from-[#f5f4f4] via-[#f5f4f4]/94 to-transparent",
                  "sm:inset-y-0 sm:left-0 sm:right-auto sm:w-[58%] sm:bg-linear-to-r sm:from-[#f5f4f4] sm:via-[#f5f4f4]/92 sm:to-transparent lg:w-[54%]",
                )}
                aria-hidden
              />
            </div>

            <div
              className={cn(
                "relative z-20 flex h-full w-full flex-col gap-5 px-5 py-6 sm:max-w-[60%] sm:justify-center sm:gap-8 sm:px-8 sm:py-7 lg:px-10 lg:py-0 xl:px-12",
                buyerMobileLayout
                  ? "max-lg:min-h-[300px] max-lg:w-full max-lg:max-w-none max-lg:justify-end max-lg:gap-6 max-lg:px-5 max-lg:py-8 max-lg:items-center max-lg:text-center"
                  : "max-w-full justify-end",
                !buyerMobileLayout &&
                  centerOnMobile &&
                  "max-lg:items-center max-lg:text-center",
              )}
            >
              <h2
                id={headingId}
                className={audienceMobileCopyCenter(
                  centerOnMobile,
                  cn(
                    "n-book text-[clamp(1.375rem,6vw,2rem)] leading-[1.2] text-[#161616]",
                    buyerMobileLayout &&
                      "max-lg:w-full max-lg:max-w-none max-lg:text-balance",
                  ),
                )}
              >
                {content.headline}
              </h2>

              <div
                className={cn(
                  "w-fit max-w-full sm:w-auto",
                  buyerMobileLayout
                    ? audienceDesktopOnlyBlock(true)
                    : centerOnMobile && "max-lg:hidden lg:block",
                  centerOnMobile &&
                    !buyerMobileLayout &&
                    "max-lg:mx-auto",
                )}
              >
                <AudienceMarketingSectionCtaDesktop
                  href={content.ctaHref}
                  centerOnMobile={centerOnMobile}
                >
                  {content.ctaLabel}
                </AudienceMarketingSectionCtaDesktop>
              </div>

              {buyerMobileLayout ? (
                <AudienceMarketingSectionCtaMobile
                  href={content.ctaHref}
                  centerOnMobile
                  wrapClassName="mt-2"
                >
                  {content.ctaLabel}
                </AudienceMarketingSectionCtaMobile>
              ) : null}
            </div>
          </div>
        </ScrollReveal>

        {!buyerMobileLayout ? (
          <ScrollReveal direction="up" delay={0.1} distance={28}>
            <AudienceMarketingSectionCtaMobile
              href={content.ctaHref}
              centerOnMobile={centerOnMobile}
              wrapClassName="mt-4"
            >
              {content.ctaLabel}
            </AudienceMarketingSectionCtaMobile>
          </ScrollReveal>
        ) : null}
      </Container>
    </section>
  );
}
