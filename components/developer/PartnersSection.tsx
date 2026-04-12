import {
  PARTNER_LOGOS_ROW1,
  PARTNER_LOGOS_ROW2,
  type PartnerLogo,
} from "@/data/developer-page";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";
import Image from "next/image";

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
        <LogoRow items={[...PARTNER_LOGOS_ROW1]} />
        <LogoRow items={[...PARTNER_LOGOS_ROW2]} />
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

function LogoRow({ items }: { items: readonly PartnerLogo[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <li key={item.src}>
          <div className="relative flex h-16 items-center justify-center rounded-sm border border-black/[0.06] bg-white px-3 shadow-sm">
            <Image
              src={item.src}
              alt={item.alt}
              width={160}
              height={48}
              className="h-10 w-auto max-w-full object-contain object-center"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
