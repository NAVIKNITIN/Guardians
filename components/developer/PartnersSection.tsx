import {
  PARTNER_LOGOS_ROW1,
  PARTNER_LOGOS_ROW2,
  type PartnerLogo,
} from "@/data/developer-page";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { cn } from "@/utils/cn";
import Image from "next/image";

import "./partners-marquee.css";

export function PartnersSection() {
  return (
    <SectionSurface variant="partners" aria-labelledby="partners-heading">
      <h2
        id="partners-heading"
        className="mx-auto max-w-4xl text-center font-bold uppercase leading-relaxed tracking-[0.2em] text-brand-text-primary sm:text-xs"
      >
        Partnered with revolutionary <br /> startups & global organizations
      </h2>
      <div className="mt-10 space-y-4">
        <LogoRow items={[...PARTNER_LOGOS_ROW1]} direction="lr" />
        <LogoRow items={[...PARTNER_LOGOS_ROW2]} direction="rl" />
      </div>
      <p className="mt-10 text-center text-normal text-brand-text-secondary">
        …and many more to
      </p>
      <div className="mt-4 flex justify-center">
        <MarketingEnquireLink href="/contact">Know</MarketingEnquireLink>
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
        className="h-10 w-auto max-w-full object-contain object-center"
      />
    </div>
  );
}
