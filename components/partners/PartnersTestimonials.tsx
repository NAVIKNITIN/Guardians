"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { memo, useMemo } from "react";

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
    brandLogoSrc: "/images/partners/image 50.svg",
    brandLogoAlt: "Adani Realty",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Abhishek Naagar",
    role: "Project Manager, Adani Realty",
    location: "BKC, Mumbai",
  },
  {
    id: "2",
    brandLogoSrc: "/images/partners/image 50.svg",
    brandLogoAlt: "Godrej Properties",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Priya Shah",
    role: "Head of Sales, Godrej Properties",
    location: "Lower Parel, Mumbai",
  },
  {
    id: "3",
    brandLogoSrc: "/images/partners/image 50.svg",
    brandLogoAlt: "Marathon Group",
    quote:
      "Lorem ipsum dolor sit amet consectetur. Aliquam vel consectetur feugiat nibh sed eget lacus sed. Turpis sit bibendum nisl egestas nunc lacinia sit gravida fringilla.",
    name: "Rahul Verma",
    role: "Director — Projects, Marathon Group",
    location: "Byculla, Mumbai",
  },
  {
    id: "4",
    brandLogoSrc: "/images/partners/image 50.svg",
    brandLogoAlt: "Sunteck Realty",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
    name: "Ananya Desai",
    role: "VP — Customer Experience, Sunteck",
    location: "Goregaon, Mumbai",
  },
  {
    id: "5",
    brandLogoSrc: "/images/partners/image 50.svg",
    brandLogoAlt: "Piramal Realty",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    name: "Karan Mehta",
    role: "Associate Director, Piramal Realty",
    location: "Thane, Mumbai",
  },
  {
    id: "6",
    brandLogoSrc: "/images/partners/image 50.svg",
    brandLogoAlt: "Ashford Group",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
    name: "Neha Kulkarni",
    role: "Sales Lead, Ashford Group",
    location: "Navi Mumbai",
  },
];

const DESKTOP_VISIBLE = 2;

export const TestimonialCard = memo(function TestimonialCard({
  item,
}: {
  item: PartnersTestimonial;
}) {
  return (
    <article
      className={cn(
        "flex w-full min-w-0 max-w-full flex-col overflow-hidden",
        /* Dot-grid + linear gradient matching the design */
        "bg-[radial-gradient(circle_at_center,#BCBDC0_1px,transparent_1px),linear-gradient(110deg,rgba(188,189,192,0.2)_0%,rgba(143,129,131,0.2)_100%)]",
        "bg-size-[14px_14px,100%_100%] [background-repeat:repeat,no-repeat]",
      )}
    >
      {/* Top content area */}
      <div className="flex flex-1 flex-col p-6 sm:p-10 lg:p-12">
        {/* Brand logo badge */}
        <div className="flex w-fit max-w-full min-w-[170px] items-center justify-center rounded-full bg-white py-2 shadow-sm">
          <Image
            src={item.brandLogoSrc}
            alt={item.brandLogoAlt}
            width={200}
            height={60}
            className="w-auto h-12 object-contain object-left sm:h-12 sm:max-h-11 "
          />
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

      {/* Dark footer bar — Figma: black bar, white type, left-aligned */}
      <div className="bg-black px-6 py-4 sm:px-10 sm:py-5 lg:px-12">
        <p className="n-bold text-sm text-white">{item.name}</p>
        <p className="mt-0.5 n-reg text-sm text-white">{item.role}</p>
        <p className="mt-0.5 n-reg text-xs text-white/80">{item.location}</p>
      </div>
    </article>
  );
});

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
      className=" bg-brand-background"
      aria-labelledby="pc-testimonials-heading"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-6 py-20 md:px-16">
        {/* Header row */}
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
              currentIndex={index}
              total={n}
              onPrev={() => advance(-1)}
              onNext={() => advance(1)}
              prevLabel="Previous testimonials"
              nextLabel="Next testimonials"
            />
          </div>
        </ScrollReveal>

        {/* Desktop: 2-column grid */}
        <StaggerContainer
          className="mt-8 hidden gap-4 md:grid md:grid-cols-2 lg:mt-10 lg:gap-6"
          staggerChildren={0.18}
        >
          {desktopVisible.map((item, cardIndex) => (
            <ScrollReveal key={`${item.id}-${index}`} direction="up" delay={cardIndex * 0.08} distance={32}>
              <TestimonialCard item={item} />
            </ScrollReveal>
          ))}
        </StaggerContainer>

        {/* Mobile: single card */}
        <div className="mt-6 md:hidden">
          <ScrollReveal direction="up" delay={0.1} distance={32}>
            <TestimonialCard item={items[index]!} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
