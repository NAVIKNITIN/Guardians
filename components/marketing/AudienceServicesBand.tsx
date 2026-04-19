import { MarketingServiceCard } from "@/components/cards/MarketingServiceCard";
import { Container } from "@/components/common/Container";
import { MarketingEnquireLink } from "@/components/ui";
import type { ServicesBandContent } from "@/data/audience-marketing";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";

export function AudienceServicesBand({
  content,
}: {
  content: ServicesBandContent;
}) {
  const cardsStrip = (
    <ul
      role="list"
      className="flex w-max snap-x snap-mandatory gap-4 pr-4 pl-0 sm:gap-5 sm:pr-6"
    >
      {content.cards.map((card) => (
        <MarketingServiceCard
          key={card.id}
          card={card}
          href={content.knowMoreHref}
          ariaLabel={content.knowMoreLabel}
        />
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="audience-services-heading" className="w-full">
      {/*
        `gutter="left"` = same horizontal scale as `Container` (`paddingXLeftOnly` / `pageGutterLeft`).
        `max-w-none mx-0` + 2xl/3xl overrides: full-bleed width so the carousel can reach the viewport right edge.
      */}
      <Container
        gutter="left"
        className={cn(
          "w-full max-w-none py-8 sm:py-12 lg:py-25",
          "2xl:max-w-none 3xl:max-w-none",
        )}
      >
        <div
          className={cn(
            "flex w-full min-w-0 flex-col gap-10",
            "lg:flex-row lg:items-start lg:gap-10 xl:gap-12 2xl:gap-16",
          )}
        >
          <div className="min-w-0 shrink-0 lg:w-4/12 lg:max-w-xl md:pl-15">
            <h2
              id="audience-services-heading"
              className={marketingClasses.headingDisplay}
            >
              {content.sectionTitle}
            </h2>
            <p className="mt-3 max-w-sm n-book fs-18 lh-22 text-[#000000] 2xl:max-w-sm">
              {content.description}
            </p>
            <MarketingEnquireLink
              href={content.knowMoreHref}
              className="mt-20 inline-flex h-[55px] w-[283.5px]"
            >
              {content.knowMoreLabel}
            </MarketingEnquireLink>
          </div>

          <div
            className={cn(
              /* Grow into all space to the right of the copy column (full-bleed to viewport edge via `gutter="left"`) */
              "min-h-0 min-w-0 w-full flex-1 basis-0",
              "overflow-x-auto scroll-smooth",
              "[scrollbar-width:none]",
              "[-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {cardsStrip}
          </div>
        </div>
      </Container>
    </section>
  );
}
