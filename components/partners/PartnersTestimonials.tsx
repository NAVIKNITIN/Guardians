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

export const TestimonialCard = ({ item }: { item: PartnersTestimonial }) => {
  return (
    <article
      className={cn(
        "flex w-full min-w-0 max-w-full flex-col overflow-hidden",
        /* Dot-grid + linear gradient matching the design */
        "bg-[radial-gradient(circle_at_center,#BCBDC0_1px,transparent_1px),linear-gradient(110deg,rgba(188,189,192,0.2)_0%,rgba(143,129,131,0.2)_100%)]",
        "[background-size:14px_14px,100%_100%] [background-repeat:repeat,no-repeat]",
      )}
    >
      {/* Top content area */}
      <div className="flex flex-1 flex-col p-6 sm:p-10 lg:p-12">
        {/* Brand logo badge */}
        <div className="inline-flex w-fit items-center justify-center rounded-full bg-white px-4 py-2 shadow-sm">
          <div className="relative h-8 w-18 sm:h-9 sm:w-20">
            <Image
              src={item.brandLogoSrc}
              alt={item.brandLogoAlt}
              fill
              className="object-cover object-center"
              sizes="80px"
            />
          </div>
        </div>

        <span className="mt-8 block text-brand-text-primary sm:mt-15">
          <Image
            src={"/images/invertedComma.svg"}
            alt=""
            width={27}
            height={27}
            className="clip-path-circle object-cover"
          />
        </span>

        <p className="mt-4 n-bold text-[clamp(0.9375rem,3vw,1.125rem)] leading-relaxed text-brand-text-primary sm:mt-5 sm:text-[1.125rem] sm:leading-6">
          {item.quote}
        </p>
      </div>

      {/* Dark footer bar */}
      <div className="bg-[#161616] px-6 py-4 sm:px-10 sm:py-5 lg:px-12">
        <p className="n-reg text-sm text-[#BCBDC0]">{item.name}</p>
        <p className="mt-0.5 n-reg text-xs text-[#BCBDC0]">{item.role}</p>
        <p className="mt-0.5 n-reg text-xs text-[#BCBDC0]/70">{item.location}</p>
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
      className="border-t border-black/[0.06] bg-brand-background py-12 sm:py-20"
      aria-labelledby="pc-testimonials-heading"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <h2
            id="pc-testimonials-heading"
            className={cn(marketingClasses.headingDisplayMd, "max-w-full")}
          >
            What Our Clients Say
          </h2>
          <CarouselControls
            className="w-auto"
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
        <div className="mt-6 md:hidden">
          <TestimonialCard item={items[index]!} />
        </div>
      </div>
    </section>
  );
}
