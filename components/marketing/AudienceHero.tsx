import { Container } from "@/components/common/Container";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import type { MarketingHeroContent } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import Image from "next/image";

function resolveHeadline(content: MarketingHeroContent) {
  const defaults = content.isBuyer
    ? { lead: "Looking To", accent: "Buy?" }
    : { lead: "Looking to", accent: "sell?" };
  return {
    lead: content.headingLead ?? defaults.lead,
    accent: content.headingAccent ?? defaults.accent,
  };
}

export function AudienceHero({ content }: { content: MarketingHeroContent }) {
  const { lead, accent } = resolveHeadline(content);

  return (
    <section
      className="lg:pt-[130] relative isolate w-full min-w-0 min-h-[min(120vh,960px)] overflow-hidden bg-neutral-300 pt-10 pb-28 sm:min-h-[min(120vh,1000px)] sm:pt-14 sm:pb-32 lg:pt-16 lg:pb-40"
      aria-labelledby={content.ariaHeadingId}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={content.backgroundImageSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/[0.14] via-transparent to-black/[0.12]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-white/96 via-white/45 to-transparent sm:h-44 md:h-52"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto flex min-w-0 max-w-[820px] flex-col items-center px-2 text-center sm:px-4">
          <h1
            id={content.ariaHeadingId}
            className="break-words  font-qasbyne fw-100 text-[clamp(1.75rem,6vw,4.5rem)] uppercase leading-[1.05] tracking-[0.04em] sm:text-[clamp(2rem,6vw,4.5rem)]"
          >
            <span className="block">
              <span className="">{lead}</span>{" "}
              <span className="text-[#7a6a5c]">{accent}</span>
            </span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-0 lg:max-w-[38rem] font-nexa  fs-18 lg:lh-23 leading-relaxed ",
              " sm:mt-10 sm:text-base lg:mt-11 ",
            )}
          >
            {content.body}
          </p>
          <div className="mt-10 flex justify-center sm:mt-12">
            <MarketingEnquireLink href={content.enquireHref}>
              {content.enquireLabel}
            </MarketingEnquireLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
