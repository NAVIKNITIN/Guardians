"use client";

import { CarouselControls } from "@/components/ui/CarouselControls";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useMemo } from "react";

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
    brandLogoSrc: "/images/Developer/partners/Group 32.svg",
    brandLogoAlt: "Adani Realty",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Abhishek Naagar",
    role: "Project Manager, Adani Realty",
    location: "BKC, Mumbai",
  },
  {
    id: "2",
    brandLogoSrc: "/images/Developer/partners/Group 33.svg",
    brandLogoAlt: "Godrej Properties",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Priya Shah",
    role: "Head of Sales, Godrej Properties",
    location: "Lower Parel, Mumbai",
  },
  {
    id: "3",
    brandLogoSrc: "/images/Developer/partners/Group 34.svg",
    brandLogoAlt: "Marathon Group",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Rahul Verma",
    role: "Director — Projects, Marathon Group",
    location: "Byculla, Mumbai",
  },
  {
    id: "4",
    brandLogoSrc: "/images/Developer/partners/Group 36.svg",
    brandLogoAlt: "Sunteck Realty",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
    name: "Ananya Desai",
    role: "VP — Customer Experience, Sunteck",
    location: "Goregaon, Mumbai",
  },
  {
    id: "5",
    brandLogoSrc: "/images/Developer/partners/Group 38.svg",
    brandLogoAlt: "Piramal Realty",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    name: "Karan Mehta",
    role: "Associate Director, Piramal Realty",
    location: "Thane, Mumbai",
  },
  {
    id: "6",
    brandLogoSrc: "/images/Developer/partners/Group 39.svg",
    brandLogoAlt: "Ashford Group",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
    name: "Neha Kulkarni",
    role: "Sales Lead, Ashford Group",
    location: "Navi Mumbai",
  },
];

const DESKTOP_VISIBLE = 2;

function TestimonialCard({ item }: { item: PartnersTestimonial }) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden",
        /* Dot-grid + linear gradient matching the design */
        "bg-[radial-gradient(circle_at_center,#BCBDC0_1px,transparent_1px),linear-gradient(110deg,rgba(188,189,192,0.2)_0%,rgba(143,129,131,0.2)_100%)]",
        "[background-size:14px_14px,100%_100%] [background-repeat:repeat,no-repeat]",
      )}
    >
      {/* Top content area */}
      <div className="flex flex-1 flex-col p-8 sm:p-10 lg:p-12">
        {/* Brand logo badge */}
        <div className="inline-flex w-fit items-center justify-center rounded-full bg-white px-4 py-2 shadow-sm">
          <div className="relative h-9 w-20">
            <Image
              src={item.brandLogoSrc}
              alt={item.brandLogoAlt}
              fill
              className="object-contain object-center"
              sizes="80px"
            />
          </div>
        </div>

        {/* Quote mark */}
        <span className="mt-6 block font-nexa text-6xl leading-[0.7] text-[#161616]">
          &ldquo;
        </span>

        {/* Quote text */}
        <p className="mt-3 font-nexa text-base font-bold leading-[1.5] text-[#161616] sm:text-lg">
          {item.quote}
        </p>
      </div>

      {/* Dark footer bar */}
      <div className="bg-[#161616] px-8 py-5 sm:px-10 lg:px-12">
        <p className="font-nexa text-sm font-bold text-[#BCBDC0]">{item.name}</p>
        <p className="mt-0.5 font-nexa text-xs text-[#BCBDC0]">{item.role}</p>
        <p className="mt-0.5 font-nexa text-xs text-[#BCBDC0]/70">
          {item.location}
        </p>
      </div>
    </article>
  );
}

export function PartnersTestimonials() {
  const items = TESTIMONIALS;
  const n = items.length;
  const { index, advance } = useCycleIndex(n, 0);

  const desktopVisible = useMemo(
    () =>
      Array.from({ length: DESKTOP_VISIBLE }, (_, offset) => {
        const i = (index + offset) % n;
        return items[i]!;
      }),
    [index, n, items],
  );

  return (
    <section
      className="border-t border-black/[0.06] bg-brand-background py-16 sm:py-20"
      aria-labelledby="pc-testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="pc-testimonials-heading"
            className={marketingClasses.headingDisplayMd}
          >
            What Our Clients Say
          </h2>
          <CarouselControls
            currentIndex={index}
          total={n}
            onPrev={() => advance(-1)}
            onNext={() => advance(1)}
            prevLabel="Previous testimonials"
            nextLabel="Next testimonials"
          />
        </div>

        {/* Desktop: 2-column grid */}
        <div className="mt-8 hidden gap-4 md:grid md:grid-cols-2 lg:mt-10 lg:gap-6">
          {desktopVisible.map((item) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="mt-8 md:hidden">
          <TestimonialCard item={items[index]!} />
        </div>
      </div>
    </section>
  );
}
