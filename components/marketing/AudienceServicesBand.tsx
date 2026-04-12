import { SectionSurface } from "@/components/ui/SectionSurface";
import { MarketingEnquireLink } from "@/components/ui";
import type { ServicesBandContent } from "@/data/audience-marketing";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function AudienceServicesBand({
  content,
}: {
  content: ServicesBandContent;
}) {
  return (
    <SectionSurface
      variant="default"
      className="py-14 sm:py-16 lg:py-20"
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
          <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-text-secondary sm:text-base">
            {content.description}
          </p>
          <MarketingEnquireLink
            href={content.readMoreHref}
            className="mt-8 inline-flex px-7"
          >
            {content.readMoreLabel}
          </MarketingEnquireLink>
        </div>

        <div className="lg:col-span-8 lg:min-w-0">
          <div
            className={cn(
              "-mx-4 overflow-x-auto overscroll-x-contain scroll-smooth sm:-mx-6 sm:px-0 lg:mx-0",
              "[scrollbar-width:none] [-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0",
            )}
          >
            <ul
              role="list"
              className="flex w-max snap-x snap-mandatory gap-4 px-4 sm:gap-5 sm:px-6 lg:gap-6 lg:px-0"
            >
              {content.cards.map((card) => (
                <li
                  key={card.id}
                  className="w-[min(17.5rem,calc(100vw-2.5rem))] shrink-0 snap-start sm:w-72"
                >
                  <article
                    className={cn(
                      "overflow-hidden rounded-sm border border-brand-border bg-brand-background-muted shadow-sm transition-shadow hover:shadow-md",
                    )}
                  >
                    <div className="relative aspect-[4/3] w-full bg-neutral-200">
                      <Image
                        src={card.src}
                        alt=""
                        fill
                        className="object-cover object-center saturate-[0.9]"
                        sizes="(max-width: 640px) min(280px, 100vw - 2.5rem), 288px"
                      />
                    </div>
                    <div className="border-t border-brand-border bg-white px-4 py-3">
                      <h3 className="truncate text-center text-[18px] font-semibold uppercase tracking-[0.18em] text-brand-text-primary">
                        {card.title}
                      </h3>
                    </div>
                    <div>
                      <p className="px-4 py-2 text-center text-sm leading-relaxed text-brand-text-secondary">
                        {card.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
