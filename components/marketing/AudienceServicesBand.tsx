import { MarketingServiceCard } from "@/components/cards/MarketingServiceCard";
import { Container } from "@/components/common/Container";
import { MarketingEnquireLink } from "@/components/ui";
import type { ServicesBandContent } from "@/data/audience-marketing";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";

export function AudienceServicesBand({
  content,
  isBuyer,
}: {
  content: ServicesBandContent;
  isBuyer: boolean;
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
    <section aria-labelledby="audience-services-heading" className="justify-center items-center flex">
      <Container
        gutter="left"
        className={cn(
          "w-full py-0",
        )}
      >
        <div
          className={cn(
            "flex w-full min-w-0 flex-col gap-10",
            "lg:flex-row lg:items-start lg:gap-10 xl:gap-12 2xl:gap-16",
          )}
        >
          <div className="min-w-0 shrink-0 lg:w-4/12 lg:max-w-xl ">
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
              /* Break out of container on the right so cards touch viewport edge. */
              "lg:mr-[calc(50%-50vw)]",
              marketingClasses.horizontalScroll,
            )}
          >
            {cardsStrip}
          </div>
        </div>
      </Container>
    </section>
  );
}
