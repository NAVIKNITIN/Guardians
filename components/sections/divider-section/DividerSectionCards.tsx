import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export const DIVIDER_BANNER_SRC = "/images/Home/Banner1.svg";

/** Design + behavior notes: `docs/DividerSection.md` (avoid regressions). */

const FIGMA_CARD_BG = "bg-[#F2F2F2]";
const FIGMA_TAUPE_TEXT = "text-[#8F8183]";

const FIGMA_GRAD_OVERLAY_BUYER =
  "bg-[linear-gradient(70deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";
const FIGMA_GRAD_OVERLAY_DEVELOPER =
  "bg-[linear-gradient(250deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";

const FIGMA_CARD_SIZE = "w-full min-w-0 lg:max-h-[350px]";

const dividerCardCtaClassName = cn(
  "inline-flex items-center justify-center gap-2.5 rounded-none border border-[#202225] bg-transparent px-5 py-[15px]",
  "n-bold text-[14px] leading-[22px] tracking-normal text-[#000000] lg:text-[18px]",
  "transition-colors duration-300 hover:bg-black/5 h-[43px]",
);

function BuyerProfileCard({
  className,
  articleId,
}: {
  className?: string;
  articleId?: string;
}) {
  return (
    <article
      id={articleId}
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden",
        FIGMA_CARD_SIZE,
        FIGMA_CARD_BG,
        className,
      )}
    >
      <Image
        src="/images/image_1.svg"
        alt=""
        width={275}
        height={350}
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-auto w-auto -translate-y-1/2 select-none"
      />

      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_BUYER)}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[300px] flex-1 flex-col px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:min-h-0 lg:h-full lg:flex-row lg:items-stretch lg:gap-0 lg:px-0 lg:pb-0 lg:pt-5">
        <div className="flex w-full min-w-0 flex-1 flex-col items-start justify-between gap-6 self-stretch px-0 lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:pl-8 lg:pr-4 lg:pb-[30px]">
          <Image
            src="/images/Buyer/Vector.svg"
            alt=""
            width={48}
            height={50}
            className={cn("h-[50px] w-[48px] shrink-0 object-contain", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />

          <div className="text-left">
            <p className="n-bold text-sm uppercase tracking-[0.1em] text-[#000000] lg:text-[24px]">
              I am a
            </p>
            <h3
              className={cn(
                "mt-1 qs-reg text-[clamp(1.875rem,3vw,2.625rem)] uppercase leading-[0.9] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              Buyer
            </h3>
          </div>

          <Link href="/buyer" className={cn(dividerCardCtaClassName, "w-fit shrink-0")}>
            Know More
            <IconArrowUpRight className="h-[13px] w-[13px] shrink-0" />
          </Link>
        </div>

        <CardImageColumn
          portraitSrc="/images/Buyer/image 41.svg"
          portraitAlt="Professional representing property buyers"
          objectPositionClass="object-right"
        />
      </div>
    </article>
  );
}

function DeveloperProfileCard({
  className,
  articleId,
}: {
  className?: string;
  articleId?: string;
}) {
  return (
    <article
      id={articleId}
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden",
        FIGMA_CARD_SIZE,
        FIGMA_CARD_BG,
        className,
      )}
    >
      <Image
        src="/images/image_2.svg"
        alt=""
        width={275}
        height={350}
        unoptimized
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-auto w-auto -translate-y-1/2 select-none"
      />

      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_DEVELOPER)}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[300px] flex-1 flex-col px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:min-h-0 lg:h-full lg:flex-row-reverse lg:items-stretch lg:gap-0 lg:px-0 lg:pb-0 lg:pt-5">
        <div className="flex w-full min-w-0 flex-1 flex-col items-end justify-between gap-6 self-stretch px-0 text-right lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:pl-4 lg:pr-8 lg:pb-[30px]">
          <Image
            src="/images/Developer/DeveloperFilterIcon.svg"
            alt=""
            width={48}
            height={50}
            className={cn("h-[50px] w-[48px] shrink-0 object-contain self-end", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />

          <div>
            <p className="n-bold text-sm uppercase tracking-[0.1em] text-[#000000] lg:text-[24px]">
              I am a
            </p>
            <h3
              className={cn(
                "mt-1 qs-reg text-[clamp(1.875rem,3vw,2.625rem)] uppercase leading-[0.9] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              Developer
            </h3>
          </div>

          <Link href="/developer" className={cn(dividerCardCtaClassName, "w-fit shrink-0 self-end")}>
            Know More
            <IconArrowUpRight className="h-[13px] w-[13px] shrink-0" />
          </Link>
        </div>

        <CardImageColumn
          portraitSrc="/images/Developer/image 42.svg"
          portraitAlt="Professional representing real estate developers"
          objectPositionClass="object-left"
        />
      </div>
    </article>
  );
}

type CardImageColumnProps = {
  portraitSrc: string;
  portraitAlt: string;
  objectPositionClass: string;
  className?: string;
};

function CardImageColumn({
  portraitSrc,
  portraitAlt,
  objectPositionClass,
  className,
}: CardImageColumnProps) {
  return (
    <div
      className={cn(
        "relative w-full min-h-[220px] shrink-0 overflow-hidden",
        "lg:flex-none lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:self-stretch",
        className,
      )}
    >
      <Image
        src={portraitSrc}
        alt={portraitAlt}
        fill
        className={cn(
          "object-cover grayscale mix-blend-multiply",
          objectPositionClass,
        )}
        sizes="(max-width: 1024px) 100vw, 25vw"
      />
    </div>
  );
}

export { BuyerProfileCard, DeveloperProfileCard };
export { FIGMA_CARD_BG };
