import { Container } from "@/components/common/Container";
import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { cn } from "@/utils/cn";
import Image from "next/image";

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
  "h-[43px] gap-2 px-4 py-2.5",
  "text-[12px] leading-[18px] tracking-normal lg:h-[43px] lg:px-7 lg:py-6 lg:text-[18px] lg:leading-[22px]",
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
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-auto w-auto -translate-y-1/2 select-none opacity-35 lg:opacity-100"
      />

      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_BUYER)}
        aria-hidden
      />

      <div className="relative z-10 flex h-[220px] flex-1 flex-row items-stretch gap-2 px-4 pb-4 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:min-h-0 lg:h-full lg:gap-0 lg:px-0 lg:pb-0 lg:pt-5">
        <div className="flex min-w-0 w-[46%] flex-col items-start justify-center gap-4 self-stretch px-0 lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:justify-between lg:gap-6 lg:pl-8 lg:pr-4 lg:pb-[30px]">
          <Image
            src="/images/Buyer/Vector.svg"
            alt=""
            width={48}
            height={50}
            className={cn("h-[50px] w-[48px] shrink-0 object-contain", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />

          <div className="text-left">
            <p className="n-bold text-[11px] uppercase tracking-[0.1em] text-[#000000] lg:text-[24px]">
              I AM A
            </p>
            <h3
              className={cn(
                "mt-1 qs-reg text-[clamp(1.85rem,8vw,2.4rem)] uppercase leading-[1] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              PROPERTY SEEKER
            </h3>
          </div>

          <OutlineArrowButton
            href="/buyer"
            iconClassName="h-[13px] w-[13px]"
          >
            Explore Journey
          </OutlineArrowButton>
        </div>

        <CardImageColumn
          portraitSrc="/images/Buyer/image 41.svg"
          portraitAlt="Professional representing property buyers"
          objectPositionClass="object-right"
          className="w-[54%] px-0 sm:px-1 lg:w-1/2 lg:px-0"
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
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-auto w-auto -translate-y-1/2 select-none opacity-35 lg:opacity-100"
      />

      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_DEVELOPER)}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[320px] flex-1 flex-row items-stretch gap-2 px-4 pb-4 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:min-h-0 lg:h-full lg:flex-row-reverse lg:gap-0 lg:px-0 lg:pb-0 lg:pt-5">
        <div className="flex min-w-0 w-[46%] flex-col items-start justify-center gap-4 self-stretch px-0 text-left lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:items-end lg:justify-between lg:gap-6 lg:pl-4 lg:pr-8 lg:pb-[30px] lg:text-right">
          <Image
            src="/images/Developer/DeveloperFilterIcon.svg"
            alt=""
            width={48}
            height={50}
            className={cn("h-[50px] w-[48px] shrink-0 object-contain self-start lg:self-end", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />

          <div>
            <p className="n-bold text-[11px] uppercase tracking-[0.1em] text-[#000000] lg:text-[24px]">
              I AM A
            </p>
            <h3
              className={cn(
                "mt-1 qs-reg text-[clamp(1.85rem,8vw,2.4rem)] uppercase leading-[0.9] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              PROPERTY CREATOR
            </h3>
          </div>

          <OutlineArrowButton
            href="/developer"
            
            iconClassName="h-[13px] w-[13px] shrink-0"
          >
            Explore Journey
          </OutlineArrowButton>
        </div>

        <CardImageColumn
          portraitSrc="/images/Developer/image 42.svg"
          portraitAlt="Professional representing real estate developers"
          objectPositionClass="object-left"
          className="w-[54%] px-1 sm:px-2 lg:w-1/2 lg:px-0"
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
        "relative mt-[200px] min-h-[320px] w-1/2 shrink-0 overflow-hidden sm:min-h-[340px] lg:mt-0",
        "lg:flex-none lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:self-stretch",
        className,
      )}
    >
      <Image
        src={portraitSrc}
        alt={portraitAlt}
        fill
        className={cn(
          "h-full w-full object-contain object-bottom scale-[1.1] grayscale mix-blend-multiply sm:scale-[1.16] lg:scale-100 lg:object-cover",
          objectPositionClass,
        )}
        sizes="(max-width: 1024px) 100vw, 25vw"
      />
    </div>
  );
}

export { BuyerProfileCard, DeveloperProfileCard };
export { FIGMA_CARD_BG };
