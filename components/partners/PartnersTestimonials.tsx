"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { memo, useLayoutEffect, useMemo, useRef } from "react";

const VISIBLE_COUNT = 4;

const partnerLogo = (group: number) =>
  `/images/partners/logos/Group ${group}.png`;

export type PartnersTestimonial = {
  id: string;
  brandLogoSrc: string;
  brandLogoAlt: string;
  quote: string;
  name: string;
  role: string;
  location: string;
};

const TESTIMONIALS: PartnersTestimonial[] = [
  {
    id: "1",
    brandLogoSrc: partnerLogo(29),
    brandLogoAlt: "Adani Realty",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Abhishek Naagar",
    role: "Project Manager, Adani Realty",
    location: "BKC, Mumbai",
  },
  {
    id: "2",
    brandLogoSrc: partnerLogo(33),
    brandLogoAlt: "Godrej Properties",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Priya Shah",
    role: "Head of Sales, Godrej Properties",
    location: "Lower Parel, Mumbai",
  },
  {
    id: "3",
    brandLogoSrc: partnerLogo(34),
    brandLogoAlt: "Marathon Group",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Rahul Verma",
    role: "Director — Projects, Marathon Group",
    location: "Byculla, Mumbai",
  },
  {
    id: "4",
    brandLogoSrc: partnerLogo(36),
    brandLogoAlt: "Sunteck Realty",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
    name: "Ananya Desai",
    role: "VP — Customer Experience, Sunteck",
    location: "Goregaon, Mumbai",
  },
  {
    id: "5",
    brandLogoSrc: partnerLogo(38),
    brandLogoAlt: "Piramal Realty",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    name: "Karan Mehta",
    role: "Associate Director, Piramal Realty",
    location: "Thane, Mumbai",
  },
  {
    id: "6",
    brandLogoSrc: partnerLogo(39),
    brandLogoAlt: "Ashford Group",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
    name: "Neha Kulkarni",
    role: "Sales Lead, Ashford Group",
    location: "Navi Mumbai",
  },
];

export const TestimonialCard = memo(function TestimonialCard({
  item,
}: {
  item: PartnersTestimonial;
}) {
  return (
    <article
      data-testimonial-card
      className={cn(
        "group flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden border border-black/10 will-change-transform",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(22,20,19,0.18)]",
        "bg-[radial-gradient(circle_at_center,#BCBDC0_1px,transparent_1px),linear-gradient(110deg,rgba(188,189,192,0.2)_0%,rgba(143,129,131,0.2)_100%)]",
        "bg-size-[14px_14px,100%_100%] [background-repeat:repeat,no-repeat]",
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col p-6 sm:p-8 lg:p-10">
        <div className="flex w-fit max-w-full min-w-[9.5rem] items-center justify-center rounded-full bg-white px-5 py-2 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
          <Image
            src={item.brandLogoSrc}
            alt={item.brandLogoAlt}
            width={200}
            height={48}
            className="h-9 w-auto max-w-[10rem] object-contain object-left sm:h-10"
          />
        </div>

        <span className="mt-6 block text-brand-text-primary sm:mt-8">
          <Image
            src="/images/invertedComma.svg"
            alt=""
            width={27}
            height={27}
            className="object-cover"
          />
        </span>

        <p className="mt-4 flex-1 n-bold text-[clamp(0.9375rem,2.5vw,1.125rem)] leading-relaxed text-brand-text-primary sm:mt-5 sm:leading-6">
          {item.quote}
        </p>
      </div>

      <div className="mt-auto shrink-0 border-t border-black/10 bg-black px-6 py-4 sm:px-8 sm:py-5 lg:px-10">
        <p className="n-bold text-sm text-white">{item.name}</p>
        <p className="mt-0.5 n-reg text-sm text-white">{item.role}</p>
        <p className="mt-0.5 n-reg text-xs text-white/80">{item.location}</p>
      </div>
    </article>
  );
});

function visibleForPage(
  items: PartnersTestimonial[],
  page: number,
): PartnersTestimonial[] {
  const n = items.length;
  return Array.from({ length: VISIBLE_COUNT }, (_, offset) => {
    const i = (page * VISIBLE_COUNT + offset) % n;
    return items[i]!;
  });
}

export function PartnersTestimonials() {
  const items = TESTIMONIALS;
  const n = items.length;
  const pageCount = Math.max(1, Math.ceil(n / VISIBLE_COUNT));
  const { index: page, advance } = useCycleIndex(pageCount, 0);

  const visible = useMemo(
    () => visibleForPage(items, page),
    [items, page],
  );

  const mobileIndex = (page * VISIBLE_COUNT) % n;
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const syncHeights = () => {
      if (!window.matchMedia("(min-width: 640px)").matches) {
        grid
          .querySelectorAll<HTMLElement>("[data-testimonial-card]")
          .forEach((card) => {
            card.style.minHeight = "";
          });
        return;
      }

      const cards = grid.querySelectorAll<HTMLElement>("[data-testimonial-card]");
      cards.forEach((card) => {
        card.style.minHeight = "";
      });

      let maxHeight = 0;
      cards.forEach((card) => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
      });

      if (maxHeight > 0) {
        cards.forEach((card) => {
          card.style.minHeight = `${maxHeight}px`;
        });
      }
    };

    syncHeights();

    const observer = new ResizeObserver(syncHeights);
    observer.observe(grid);
    grid.querySelectorAll("[data-testimonial-card]").forEach((card) => {
      observer.observe(card);
    });

    window.addEventListener("resize", syncHeights);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeights);
    };
  }, [page, visible]);

  return (
    <section
      className="bg-brand-background"
      aria-labelledby="pc-testimonials-heading"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-6 py-20 md:px-16">
        <ScrollReveal direction="up" duration={0.6} distance={40}>
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <h2
              id="pc-testimonials-heading"
              className={cn(marketingClasses.headingDisplayMd, "max-w-full")}
            >
              What Our Clients Say
            </h2>
            <CarouselControls
              className="w-auto"
              currentIndex={page}
              total={pageCount}
              onPrev={() => advance(-1)}
              onNext={() => advance(1)}
              prevLabel="Previous testimonials"
              nextLabel="Next testimonials"
            />
          </div>
        </ScrollReveal>

        {/* Desktop / tablet: 2×2 grid — equal-height cards (Figma) */}
        <div
          ref={gridRef}
          className="mt-8 hidden grid-cols-2 items-stretch gap-4 sm:mt-10 sm:grid sm:gap-5 lg:gap-6"
        >
          {visible.map((item, cardIndex) => (
            <ScrollReveal
              key={`${item.id}-page-${page}-${cardIndex}`}
              className="flex h-full w-full min-h-0"
              direction="up"
              delay={cardIndex * 0.06}
              distance={32}
            >
              <TestimonialCard item={item} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="mt-6 sm:hidden">
          <ScrollReveal direction="up" delay={0.1} distance={32}>
            <TestimonialCard item={items[mobileIndex]!} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
