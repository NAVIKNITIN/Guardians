import { IconArrowUpRight } from "@/components/common/icons";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { MarketingEnquireLink } from "@/components/ui";
import type { ServicesBandContent } from "@/data/audience-marketing";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

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
                      "flex h-full min-h-88 flex-col rounded-none bg-[#EEEEEE] transition-opacity hover:opacity-[0.97]",
                    )}
                  >
                    <div className="p-3">
                      <div className="bg-white ">
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-200">
                          <Image
                            src={card.src}
                            alt=""
                            fill
                            className="object-cover object-center saturate-[0.92]"
                            sizes="(max-width: 640px) min(280px, 100vw - 2.5rem), 288px"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col px-4 pb-4 pt-1">
                      <h3 className="text-left text-[15px] font-bold uppercase leading-snug tracking-[0.14em] text-brand-text-primary sm:text-base">
                        {card.title}
                      </h3>
                      <div className="mt-4 flex min-h-0 flex-1 items-end justify-between gap-3">
                        <p className="min-w-0 flex-1 text-left text-sm font-normal leading-relaxed text-brand-text-primary">
                          {card.description}
                        </p>
                        <Link
                          href={content.readMoreHref}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-black text-white transition-colors hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          aria-label={content.readMoreLabel}
                        >
                          <IconArrowUpRight className="h-5 w-5" />
                        </Link>
                      </div>
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
