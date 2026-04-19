import type {
  PartnerLogo,
  PartnersSectionContent,
} from "@/data/audience-marketing";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { cn } from "@/utils/cn";
import Image from "next/image";

import "./partners-marquee.css";

export function PartnersSection({
  content,
}: {
  content: PartnersSectionContent;
}) {
  return (
    <SectionSurface
      variant="partners"
      aria-labelledby="partners-heading"
      className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-10"
    >
      <h2
        id="partners-heading"
        className="mx-auto max-w-4xl text-center n-bold fs-20 uppercase  tracking-[0.05em] text-brand-text-primary sm:text-xs fs-20"
      >
        {content.headlineLine1} <br /> {content.headlineLine2}
      </h2>
      <div className="mt-10 space-y-4">
        <LogoRow items={[...content.row1]} direction="lr" />
        <LogoRow items={[...content.row2]} direction="rl" />
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 px-1 sm:mt-16 sm:flex-row sm:flex-wrap sm:gap-6">
        <p className="max-w-md text-center text-sm x-bold text-brand-text-secondary sm:text-base">
          {content.closing}
        </p>
        <MarketingEnquireLink
          className="fs-16 n-bold"
          href={content.ctaHref}
        >
          {content.ctaLabel}
        </MarketingEnquireLink>
      </div>
    </SectionSurface>
  );
}

function LogoRow({
  items,
  direction,
}: {
  items: readonly PartnerLogo[];
  direction: "lr" | "rl";
}) {
  const loop = [...items, ...items];

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

function LogoTile({
  item,
  decorative,
}: {
  item: PartnerLogo;
  decorative?: boolean;
}) {
  return (
    <div className="relative flex h-16 w-[9.5rem] items-center justify-center rounded-sm border border-black/[0.06] bg-white px-3 shadow-sm sm:w-40">
      <Image
        src={item.src}
        alt={decorative ? "" : item.alt}
        width={160}
        height={48}
        className="h-10 w-auto max-w-full object-cover object-center"
      />
    </div>
  );
}
