import type { Testimonial } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";
import Image from "next/image";

const avatar =
  "/images/Developer/profile.svg";

/** Brand badge frame — `public/images/Developer/Frame 76.svg` */
const BRAND_LABEL_FRAME_SRC =
  "/images/Developer/Frame%2076.svg";

export function TestimonialCard({
  item,
  className,
}: {
  item: Testimonial;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full min-h-0 flex-col p-6 shadow-sm will-change-transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(22,20,19,0.18)]",
        /* Dot grid over linear fill: #BCBDC0 → #8F8183 (left → right) */
        "bg-[radial-gradient(circle_at_center,#BCBDC0_1px,transparent_1px),linear-gradient(to_right,#edeced_0%,#BCBDC0_300%)] bg-size-[14px_14px,100%_100%] [background-repeat:repeat,no-repeat]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="relative h-[50px] w-[min(100%,150px)] shrink-0">
          <Image
            src={BRAND_LABEL_FRAME_SRC}
            alt=""
            width={150}
            height={50}
            className="h-[50px] w-full object-cover object-left"
            sizes="150px"
          />
        </div>
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full  bg-white">
          <Image
            src={avatar}
            alt=""
            fill
            className="object-cover clip-path-circle transition-transform duration-300 group-hover:scale-105"
            sizes="75px"
          />
        </div>
      </div>
      <span className="mt-8 block text-brand-text-primary sm:mt-12 lg:mt-15">
        <Image
          src={"/images/invertedComma.svg"}
          alt=""
          width={27}
          height={27}
          className="object-cover clip-path-circle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
        />

      </span>
      <p className="mt-5 n-bold text-base leading-relaxed text-brand-text-primary sm:fs-20 sm:lh-24">
        {item.quote}
      </p>
      <div className="mt-auto  pt-4">
        <p className="n-bold fs-16 text-brand-text-primary">{item.name}</p>
        <p className=" text-xs fs-16 n-book text-brand-text-primary">{item.role}</p>
        <p className="mt-0.5  text-xs n-book fs-14 text-brand-text-secondary">{item.location}</p>
      </div>
    </article>
  );
}
