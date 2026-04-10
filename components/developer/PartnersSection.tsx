import {
  PARTNER_LOGOS_ROW1,
  PARTNER_LOGOS_ROW2,
} from "@/data/developer-page";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import { SectionSurface } from "@/components/ui/SectionSurface";

export function PartnersSection() {
  return (
    <SectionSurface variant="partners" aria-labelledby="partners-heading">
      <h2
        id="partners-heading"
        className="mx-auto max-w-4xl text-center text-[11px] font-bold uppercase leading-relaxed tracking-[0.2em] text-brand-text-primary sm:text-xs"
      >
        Partnered with revolutionary startups & global organizations
      </h2>
      <div className="mt-10 space-y-4">
        <LogoRow items={[...PARTNER_LOGOS_ROW1]} />
        <LogoRow items={[...PARTNER_LOGOS_ROW2]} />
      </div>
      <p className="mt-10 text-center text-sm text-brand-text-secondary">
        …and many more to
      </p>
      <div className="mt-4 flex justify-center">
        <MarketingEnquireLink href="/contact">Know</MarketingEnquireLink>
      </div>
    </SectionSurface>
  );
}

function LogoRow({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((name) => (
        <li key={name}>
          <div className="flex h-16 items-center justify-center rounded-sm border border-black/[0.06] bg-white px-3 text-center shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-600">
              {name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
