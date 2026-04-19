import { MarketingServiceCard } from "@/components/cards/MarketingServiceCard";
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
      className="flex w-max snap-x snap-mandatory gap-4 pl-4 pr-0 sm:gap-5 sm:pl-5 lg:pl-0 lg:pr-4 sm:lg:pr-6"
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
    <section
      className="w-full py-8 sm:py-12 lg:py-25"
      aria-labelledby="audience-services-heading"
    >
      <div
        className={cn(
          "flex w-full flex-col gap-10 px-4 sm:px-6",
          "lg:flex-row lg:items-start lg:gap-10 lg:px-0 xl:gap-12 2xl:gap-16",
        )}
      >
        <div
          className={cn(
            "min-w-0 shrink-0 lg:box-border",
            /* Match `Container`: 90rem cap below 2xl, then `--max-width-brand-wide` (see globals.css). */
            "lg:ml-[max(1rem,calc((100vw-min(90rem,calc(100vw-3rem)))/2))]",
            "lg:w-[calc(min(90rem,calc(100vw-3rem))/12*4)]",
            "2xl:ml-[max(1rem,calc((100vw-min(112rem,calc(100vw-3rem)))/2))]",
            "2xl:w-[calc(min(112rem,calc(100vw-3rem))/12*4)]",
            "lg:pl-20 lg:pr-10 xl:pl-30 xl:pr-12 2xl:pl-16 2xl:pr-16",
          )}
        >
          <h2
            id="audience-services-heading"
            className={marketingClasses.headingDisplay}
          >
            {content.sectionTitle}
          </h2>
          <p className="mt-3 max-w-sm n-book fs-18 lh-22 text-[#000000] 2xl:max-w-md">
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
            "min-h-0 min-w-0 lg:flex-1",
            "ml-2 overflow-x-auto scroll-smooth md:ml-15",
            "-mr-4 sm:-mr-6 lg:mx-0",
            "[scrollbar-width:none]",
            "[-ms-overflow-style:none]",
            "[&::-webkit-scrollbar]:hidden",
          )}
        >
          {cardsStrip}
        </div>
      </div>
    </section>
  );
}
