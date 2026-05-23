"use client";

import { ArrowIconLink } from "@/components/ui";
import type { DeveloperServiceCard } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const MOBILE_MAX_WIDTH_PX = 639;

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
  const [expanded, setExpanded] = useState(false);
  const [needsReadMore, setNeedsReadMore] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);

    const measure = () => {
      if (!mq.matches || expanded) {
        setNeedsReadMore(false);
        return;
      }
      setNeedsReadMore(el.scrollHeight > el.clientHeight + 2);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [card.description, expanded]);

  return (
    <li className="w-[90vw] max-w-[90vw] shrink-0 snap-start sm:w-72 sm:max-w-none lg:min-w-[356px]">
      <article className="relative flex h-full min-h-88 flex-col rounded-none bg-[#EEEEEE] transition-opacity hover:opacity-[0.97]">
        <div className="p-4 sm:p-5">
          <div className="bg-white">
            <div
              className={cn(
                "relative w-full overflow-hidden bg-neutral-200",
                "h-[168px] sm:h-auto sm:aspect-4/3 sm:min-h-[275px]",
              )}
            >
              <Image
                src={card.src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, 288px"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="px-4 text-center fs-24 lh-24 n-bold uppercase text-[#161616] sm:text-left sm:text-base">
            {card.title}
          </h3>

          <div
            className={cn(
              "mt-6 flex min-h-0 flex-1 flex-col",
              "sm:mt-8 sm:min-h-20 sm:flex-row sm:items-end sm:justify-between sm:gap-0",
            )}
          >
            <div className="min-w-0 flex-1 px-4 pb-16 pr-16 sm:px-0 sm:pb-0 sm:pr-0">
              <p
                ref={descriptionRef}
                className={cn(
                  "text-center n-book fs-16 lh-22 text-black sm:pb-4 sm:pl-4 sm:pr-0 sm:text-left",
                  !expanded && "line-clamp-2 sm:line-clamp-none",
                )}
              >
                {card.description}
              </p>
              {needsReadMore && !expanded ? (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="mt-2 w-full text-center n-bold fs-14 uppercase tracking-wide text-[#8F8183] underline decoration-[#8F8183]/50 underline-offset-2 hover:text-[#161616] sm:hidden"
                >
                  Read more
                </button>
              ) : null}
            </div>

            <ArrowIconLink
              href={href}
              aria-label={ariaLabel}
              className={cn(
                "absolute bottom-0 right-0 z-10 inline-flex rounded-none",
                "!h-14 !w-14 sm:relative sm:bottom-auto sm:right-auto sm:z-auto sm:shrink-0 sm:!h-15 sm:!w-20 lg:!h-[65px] lg:!w-[65px]",
              )}
            />
          </div>
        </div>
      </article>
    </li>
  );
}
