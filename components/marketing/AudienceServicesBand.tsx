import { MarketingServiceCard } from "@/components/cards/MarketingServiceCard";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { MarketingEnquireLink } from "@/components/ui";
import type { ServicesBandContent } from "@/data/audience-marketing";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";

export function AudienceServicesBand({
  content,
}: {
  content: ServicesBandContent;
}) {
  return (
    <SectionSurface
      variant="default"
      className="px-4 py-14 sm:px-6 sm:py-16 lg:px-20 lg:py-25 mt-10"
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
          <p className="mt-4 max-w-sm n-book fs-18 lh-22 text-brand-text-primary">
            {content.description}
          </p>
          <MarketingEnquireLink
            href={content.knowMoreHref}
            // variant="ourWork"
            className="mt-25 inline-flex lh-30 lg:px-12 px-7 fs-20 bg-[#161616] text-white"
          >
            {content.knowMoreLabel}
          </MarketingEnquireLink>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div
            className={cn(
              "-mx-4 overflow-x-auto overscroll-x-contain scroll-smooth sm:-mx-6 sm:px-0 lg:mx-0",
              /* Scroll works; bar hidden in Firefox / Safari / Chrome / Edge */
              "[scrollbar-width:none]",
              "[-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            <ul
              role="list"
              className="flex w-max snap-x snap-mandatory gap-4 px-4 sm:gap-5 sm:px-6 lg:gap-6 lg:px-0"
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
    </SectionSurface>
  );
}
