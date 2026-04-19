import { MarketingServiceCard } from "@/components/cards/MarketingServiceCard";
import { MarketingEnquireLink } from "@/components/ui";
import type { ServicesBandContent } from "@/data/audience-marketing";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import { Container } from "../common/Container";

export function AudienceServicesBand({
  content,
}: {
  content: ServicesBandContent;
}) {
  return (
    <Container
      className="py-8 sm:py-12 lg:py-25"
      aria-labelledby="audience-services-heading"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
        <div className="lg:col-span-4">
          <h2
            id="audience-services-heading"
            className={marketingClasses.headingDisplay}
          >
            {content.sectionTitle}
          </h2>
          <p className="mt-3 max-w-sm n-book fs-18 lh-22 text-[#000000]">
            {content.description}
          </p>
          <MarketingEnquireLink
            href={content.knowMoreHref}
            className="mt-20 inline-flex h-[55px] w-[283.5px]"
          >
            {content.knowMoreLabel}
          </MarketingEnquireLink>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div
            className={cn(
              "ml-2 overflow-x-auto scroll-smooth md:ml-15",
              /* Pull strip to viewport right edge — mirrors `Container` px */
              "-mr-4 sm:-mr-6 lg:-mr-20 xl:-mr-30",
              /* Scroll works; bar hidden in Firefox / Safari / Chrome / Edge */
              "[scrollbar-width:none]",
              "[-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            <ul
              role="list"
              className="flex w-max snap-x snap-mandatory gap-4 pl-4 pr-0 sm:gap-5 sm:pl-5"
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
          </div>
        </div>
      </div>
    </Container>
  );
}
