import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { heroEnquireCtaClassName } from "@/styles/buttonStyles";
import type { MarketingBannerContent } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export function ExploreBanner({ content }: { content: MarketingBannerContent }) {
  const headingId =
    content.ariaHeadingId ?? "marketing-explore-banner-heading";

  return (
    <section
      className="border-y border-black/[0.06] py-10 sm:py-14 md:py-16 lg:py-20"
      aria-labelledby={headingId}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 rounded-sm bg-[#f5f4f4] p-5 sm:gap-10 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:pl-12 lg:pr-8 xl:gap-16 xl:pl-16 2xl:pl-20">
          <div className="flex min-w-0 max-w-xl flex-col gap-6 sm:gap-8 lg:max-w-none lg:pr-4">
            <h2
              id={headingId}
              className={cn(
                "text-left font-nexa text-[clamp(1.375rem,3.5vw,2.125rem)] font-normal leading-[1.25] tracking-[-0.02em] text-brand-text-primary",
                "sm:text-[clamp(1.5rem,3.2vw,2.25rem)]",
              )}
            >
              {content.headline}
            </h2>
            <div>
              <Link
                href={content.ctaHref}
                className={cn(heroEnquireCtaClassName, "group w-fit")}
              >
                {content.ctaLabel}
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[min(52vw,280px)] w-full overflow-hidden rounded-sm sm:min-h-[260px] lg:min-h-[min(28vw,340px)]">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt ?? ""}
              fill
              className="object-cover object-center lg:object-right"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[45%] max-w-[min(280px,55%)] bg-gradient-to-r from-[#f4f4f4] via-[#f4f4f4]/85 to-transparent lg:w-[38%]"
              aria-hidden
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
