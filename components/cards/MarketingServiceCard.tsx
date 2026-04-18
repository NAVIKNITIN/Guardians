import { IconArrowUpRight } from "@/components/common/icons";
import type { DeveloperServiceCard } from "@/data/audience-marketing";
import Image from "next/image";
import Link from "next/link";

type MarketingServiceCardProps = {
  card: DeveloperServiceCard;
  href: string;
  ariaLabel: string;
};

export function MarketingServiceCard({
  card,
  href,
  ariaLabel,
}: MarketingServiceCardProps) {
  return (
    <li className="w-[min(17.5rem,calc(100vw-2.5rem))] shrink-0 snap-start sm:w-72 lg:min-w-[386px]">
      <article className="flex h-full min-h-88 flex-col rounded-none bg-[#EEEEEE] transition-opacity hover:opacity-[0.97]">
        <div className="p-5">
          <div className="bg-white ">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-200 min-h-[275px] ">
              <Image
                src={card.src}
                alt=""
                fill
                className="object-cover "
                sizes="(max-width: 640px) min(280px, 100vw - 2.5rem), 288px"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="px-4 text-center fs-24 lh-30 n-bold uppercase tracking-[0.14em] text-brand-text-primary sm:text-left sm:text-base">
            {card.title}
          </h3>
          <div className=" flex min-h-20 flex-1 flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <p className="min-w-0 flex-1 px-4 pb-4 text-center n-book fs-18 lh-18 text-brand-text-primary sm:pl-4 sm:pr-0 sm:text-left">
              {card.description}
            </p>
            <Link
              href={href}
              className="inline-flex h-16 w-24 shrink-0 items-center justify-center bg-black text-white transition-colors hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:h-15 sm:w-20 lg:h-[65px] lg:w-[65px]"
              aria-label={ariaLabel}
            >
              <IconArrowUpRight className="h-6 w-6 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}
