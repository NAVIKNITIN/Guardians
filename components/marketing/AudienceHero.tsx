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
      className="relative isolate w-full min-w-0 min-h-[min(120vh,960px)] overflow-hidden bg-neutral-300 pt-10 pb-28 sm:min-h-[min(120vh,1000px)] sm:pt-14 sm:pb-32 lg:pt-30 lg:pb-40"
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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-white/100 via-white/45 to-transparent sm:h-44 md:h-52"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto flex min-w-0 max-w-[820px] flex-col items-center px-2 text-center sm:px-4">
          <h1
            id={content.ariaHeadingId}
            className="break-words qs-reg text-[clamp(2rem,6vw,4.375rem)] uppercase leading-[1.05] ls-5"
          >
            <span className="block">
              <span>{lead}</span>{" "}
              <span className="text-[#7a6a5c]">{accent}</span>
            </span>
          </h1>
          <p
            className="mx-auto mt-6 text-center lg:max-w-[38rem] n-reg fs-18 lh-23 lg:mt-8"
          >
            {content.body}
          </p>
          <div className="mt-10 flex justify-center sm:mt-12">
            <MarketingEnquireLink href={content.enquireHref} className="h-15 lg:px-10 px-5 fs-20 n-bold ls-10 bg-[#161616]">
              {content.enquireLabel}
            </MarketingEnquireLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
