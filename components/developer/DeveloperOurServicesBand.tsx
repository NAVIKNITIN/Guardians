import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { SectionSurface } from "@/components/ui/SectionSurface";

/** Horizontal service tiles — image block + caps label. */
const SERVICE_CARDS = [
  {
    title: "Business solution",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Market intelligence",
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Partner network",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export function DeveloperOurServicesBand() {
  return (
    <SectionSurface
      variant="default"
      className="py-14 sm:py-16 lg:py-20"
      aria-labelledby="developer-services-heading"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-4">
          <h2
            id="developer-services-heading"
            className={marketingClasses.headingDisplay}
          >
            Our services
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-text-secondary sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CARDS.map((card) => (
              <li key={card.title}>
                <article
                  className={cn(
                    "overflow-hidden rounded-sm border border-brand-border bg-brand-background-muted shadow-sm transition-shadow hover:shadow-md",
                  )}
                >
                  <div className="relative aspect-[4/3] w-full bg-neutral-200">
                    <Image
                      src={card.src}
                      alt=""
                      fill
                      className="object-cover object-center saturate-[0.9]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="border-t border-brand-border bg-white px-4 py-3">
                    <h3 className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-text-primary sm:text-xs">
                      {card.title}
                    </h3>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionSurface>
  );
}
