import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { OUR_SERVICES_CARDS } from "@/data/developer-page";

/** Horizontal service tiles — image block + caps label. */
export function DeveloperOurServicesBand() {
  return (
    <SectionSurface
      variant="default"
      className="py-14 sm:py-16 lg:py-20"
      aria-labelledby="developer-services-heading"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
        <div className="lg:col-span-4">
          <h2
            id="developer-services-heading"
            className={marketingClasses.headingDisplay}
          >
            Our services
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-text-secondary sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        <div className="lg:col-span-8 lg:min-w-0">
          {/* Pull to viewport edges on small screens so the row can scroll full-bleed; contained on lg+ */}
          <div
            className={cn(
              "-mx-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 sm:-mx-6 sm:px-0 lg:mx-0",
              "[-ms-overflow-style:none] [scrollbar-gutter:stable] [scrollbar-width:thin]",
              "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-track]:bg-transparent",
            )}
          >
            <ul
              role="list"
              className="flex w-max snap-x snap-mandatory gap-4 px-4 sm:gap-5 sm:px-6 lg:gap-6 lg:px-0"
            >
              {OUR_SERVICES_CARDS.map((card) => (
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
                      <h3 className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-text-primary sm:text-xs">
                        {card.title}
                      </h3>
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
