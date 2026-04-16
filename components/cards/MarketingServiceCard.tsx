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
    <li className="w-[min(17.5rem,calc(100vw-2.5rem))] shrink-0 snap-start sm:w-72 lg:min-w-[345px]">
      <article className="flex h-full min-h-88 flex-col rounded-none bg-[#EEEEEE] transition-opacity hover:opacity-[0.97]">
        <div className="p-4">
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
          <h3 className="text-left  px-4  text-[24px] fw-700 lh-24 n-bold uppercase tracking-[0.14em] text-brand-text-primary sm:text-base">
            {card.title}
          </h3>
          <div className="mt-4 flex min-h-20 flex-1 items-end justify-between">
            <p className="min-w-0  lh-22 pl-4 flex-1 text-left n-reg -book fs-15 lh-18  text-brand-text-primary pb-2">
              {card.description}
            </p>
            <Link
              href={href}
              className="inline-flex lg:min-h-[65] lg:min-w-[65] shrink-0 items-center justify-center bg-black text-white transition-colors hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label={ariaLabel}
            >
              <IconArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}
