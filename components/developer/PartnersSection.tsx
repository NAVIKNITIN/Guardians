import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import type {
  PartnerLogo,
  PartnersSectionContent,
} from "@/data/audience-marketing";
import { Container } from "@/components/common/Container";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { marketingSection } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";

import "./partners-marquee.css";

export function PartnersSection({
  content,
  isBuyer,
}: {
  isBuyer: boolean;
  content: PartnersSectionContent;
}) {
  return (
    <section
      className={cn(
        "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-brand-background-subtle py-4 md:py-7 lg:py-12",
      )}
      aria-labelledby="partners-heading"
    >
      <Container>
        <ScrollReveal direction="up" distance={32}>
          <h2
            id="partners-heading"
            className="mx-auto max-w-4xl text-center n-bold fs-20 uppercase  tracking-[0.05em] text-brand-text-primary sm:text-xs fs-20"
          >
            {content.headlineLine1} <br /> {content.headlineLine2}
          </h2>
        </ScrollReveal>
      </Container>

      <ScrollReveal direction="up" delay={0.08} distance={24}>
        <div className="relative mt-10 overflow-x-clip">
          <div className="space-y-4">
            <LogoRow items={[...content.row1]} direction="lr" />
            <LogoRow items={[...content.row2]} direction="rl" />
          </div>
        </div>
      </ScrollReveal>

      <Container>
        <StaggerContainer className="mt-12 flex flex-col items-center justify-center gap-4 px-1 sm:mt-16 sm:flex-row sm:flex-wrap sm:gap-6" staggerChildren={0.14}>
          <ScrollReveal direction="up" distance={24}>
            <p className="max-w-md text-center text-sm sm:text-base n-bold fs-20 text-[#8F8183]">
              {content.closing}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08} distance={20}>
            <MarketingEnquireLink
              className="w-[207.01px] h-[55px]"
              href={content.ctaHref}
            >
              {content.ctaLabel}
            </MarketingEnquireLink>
          </ScrollReveal>
        </StaggerContainer>
      </Container>
    </section>
  );
}

/** Two identical halves (each half = repeated logo sets) so translate -50% loops without a visible seam. */
function buildMarqueeLoop(items: readonly PartnerLogo[]) {
  if (items.length === 0) return [];
  const repeatsPerHalf = items.length <= 4 ? 4 : 2;
  const half: PartnerLogo[] = [];
  for (let r = 0; r < repeatsPerHalf; r++) {
    half.push(...items);
  }
  return [...half, ...half];
}

function LogoRow({
  items,
  direction,
}: {
  items: readonly PartnerLogo[];
  direction: "lr" | "rl";
}) {
  const loop = buildMarqueeLoop(items);

  return (
    <div className="partners-marquee__viewport" aria-hidden role="presentation">
      <ul
        className={cn(
          "partners-marquee__track",
          direction === "lr"
            ? "partners-marquee__track--lr"
            : "partners-marquee__track--rl",
        )}
      >
        {loop.map((item, i) => (
          <li key={`${item.src}-${i}`} className="shrink-0">
            <LogoTile item={item} decorative />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Figma: outer card 223×95 (w×h); inner padding 20px horizontal, 10px vertical. */

function LogoTile({
  item,
  decorative,
}: {
  item: PartnerLogo;
  decorative?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm border border-black/6 bg-white shadow-sm",
        /* Outer frame 223×95; content area inset by Figma padding 20px (x) / 10px (y) */
        "aspect-245/95 w-[clamp(7.5rem,32vw,13.9375rem)] max-w-55.75",
      )}
    >
      <div className="absolute inset-[10px_20px]">
        <Image
          src={item.src}
          alt={decorative ? "" : item.alt}
          fill
          sizes="(max-width: 480px) 120px, (max-width: 768px) 160px, 223px"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}
