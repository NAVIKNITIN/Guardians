import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { cn } from "@/utils/cn";
import Image from "next/image";

const FIGMA_CARD_BG = "bg-[#F2F2F2]";
const FIGMA_TAUPE_TEXT = "text-[#8F8183]";

const FIGMA_GRAD_OVERLAY_BUYER =
  "bg-[linear-gradient(70deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";
const FIGMA_GRAD_OVERLAY_DEVELOPER =
  "bg-[linear-gradient(250deg,rgba(188,189,192,0.2),rgba(143,129,131,0.2))]";

const dividerCardCtaClassName = cn(
  "h-[43px] w-fit shrink-0 gap-2 px-4 py-2.5",
  "text-[12px] leading-[18px] tracking-normal w-full",
);

type CardImageColumnProps = {
  portraitSrc: string;
  portraitAlt: string;
  className?: string;
  align?: "left" | "right";
};

/**
 * Renders a portrait that is taller than the card (h-[120%]) and anchored
 * to the bottom — so the person's feet sit at the card base and the head
 * extends above, fully visible. The parent card has overflow-hidden which
 * clips anything above the card top.
 */
function CardImageColumn({
  portraitSrc,
  portraitAlt,
  className,
  align = "right",
}: CardImageColumnProps) {
  return (
    <div
      className={cn(
        "pointer-events-none relative h-full shrink-0 self-stretch",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={portraitSrc}
        alt={portraitAlt}
        width={200}
        height={320}
        className={cn("absolute bottom-0 h-[calc(100%-10px)] w-auto object-cover grayscale mix-blend-multiply", align === "right" ? "right-0 " : "left-0")}
      />
    </div>
  );
}

export function BuyerProfileCardMobile() {
  return (
    <article
      className={cn(
        "group relative flex h-[260px] w-full overflow-hidden",
        FIGMA_CARD_BG,
      )}
    >
      {/* Background decorative svg */}
      <Image
        src="/images/image_1.svg"
        alt=""
        width={200}
        height={200}
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-auto w-[55%] -translate-y-1/2 select-none opacity-30"
      />

      {/* Gradient overlay */}
      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_BUYER)}
        aria-hidden
      />

      {/* Content row */}
      <div className="relative z-10 flex h-full w-full flex-row items-stretch">
        {/* Left: text */}
        <div className="relative z-20 flex w-[60%] shrink-0 flex-col items-start justify-center gap-3 px-5 py-5">
          <Image
            src="/images/Buyer/Vector.svg"
            alt=""
            width={36}
            height={38}
            className={cn("mr-[200px] absolute top-0  mt-5 left-5 h-[38px] w-[36px] shrink-0 object-contain", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />
          <div className="relative z-10 mt-10 text-left">
            <p className="n-bold text-[10px] uppercase tracking-[0.1em] text-[#000000]">
              I AM A
            </p>
            <h3
              className={cn(
                "mt-0.5 qs-reg text-balance text-[clamp(1.05rem,5.2vw,1.65rem)] uppercase leading-[0.95] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              PROPERTY SEEKER
            </h3>
          </div>
          <OutlineArrowButton
            href="/buyer"
            className={dividerCardCtaClassName}
            iconClassName="h-[13px] w-[13px] shrink-0"
            iconAlt=""
          >
            Explore Journey
          </OutlineArrowButton>
        </div>

        {/* Right: portrait anchored bottom-right, taller than card */}
        <CardImageColumn
          portraitSrc="/images/Buyer/image 41.svg"
          portraitAlt="Professional representing property buyers"
          className="w-full -left-[210px]"
          align="right"
        />
      </div>
    </article>
  );
}

export function DeveloperProfileCardMobile() {
  return (
    <article
      className={cn(
        "group relative flex h-[260px] w-full overflow-hidden",
        FIGMA_CARD_BG,
      )}
    >
      {/* Background decorative svg */}
      <Image
        src="/images/image_2.svg"
        alt=""
        width={200}
        height={200}
        unoptimized
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-auto w-[55%] -translate-y-1/2 select-none opacity-30"
      />

      {/* Gradient overlay */}
      <div
        className={cn("pointer-events-none absolute inset-0 z-[1]", FIGMA_GRAD_OVERLAY_DEVELOPER)}
        aria-hidden
      />

      {/* Content row — portrait left, text right */}
      <div className="relative z-10 flex h-full w-full ">
        {/* Left: portrait anchored bottom-left, taller than card */}
        <CardImageColumn
          portraitSrc="/images/Developer/image 42.svg"
          portraitAlt="Professional representing real estate developers"
          className="w-[60%]"
          align="left"
        />

        {/* Right: text */}
        <div className="relative z-20 flex w-[auto] shrink-0 flex-col items-start justify-center gap-3 px-5 py-5 ml-[-80]">
          <Image
            src="/images/Developer/DeveloperFilterIcon.svg"
            alt=""
            width={36}
            height={38}
            className={cn("absolute top-0  mt-5 right-5  h-[38px] w-[36px] shrink-0 object-contain", FIGMA_TAUPE_TEXT)}
            aria-hidden
          />
          <div className="relative z-10 mt-10 text-left">
            <p className="n-bold text-[10px] uppercase tracking-[0.1em] text-[#000000]">
              I AM A
            </p>
            <h3
              className={cn(
                "mt-0.5 qs-reg text-balance text-[clamp(1.05rem,5.2vw,1.65rem)] uppercase leading-[0.9] ls-5",
                FIGMA_TAUPE_TEXT,
              )}
            >
              PROPERTY CREATOR
            </h3>
          </div>
          <OutlineArrowButton
            href="/developer"
            className={dividerCardCtaClassName}
            iconClassName="h-[13px] w-[13px] shrink-0"
            iconAlt=""
          >
            Explore Journey
          </OutlineArrowButton>
        </div>
      </div>
    </article>
  );
}