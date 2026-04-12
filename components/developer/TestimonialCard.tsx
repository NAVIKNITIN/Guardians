import type { Testimonial } from "@/data/developer-page";
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
        "mx-[20px] flex flex-col border border-black/[0.06] p-6 shadow-sm",
        /* Dot grid over linear fill: #BCBDC0 → #8F8183 (left → right) */
        "bg-[radial-gradient(circle_at_center,#BCBDC0_1px,transparent_1px),linear-gradient(to_right,#edeced_0%,#8F8183_200%)] [background-size:14px_14px,100%_100%] [background-repeat:repeat,no-repeat]",
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
            className="h-[50px] w-full object-contain object-left"
            sizes="150px"
          />
          {/* <span className="pointer-events-none absolute inset-0 flex items-center justify-end pr-3 pl-[3.25rem] text-[9px] font-semibold uppercase leading-tight tracking-wide text-neutral-800 sm:text-[10px]">
            {item.brandLabel}
          </span> */}
        </div>
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white">
          <Image src={avatar} alt="" fill className="object-cover clip-path-circle" sizes="75px" />
        </div>
      </div>
      <span className="mt-6 block font-nexa text-7xl leading-[0.68] text-brand-text-primary">
        &ldquo;
      </span>
      <p className="-mt-3 text-sm font-bold leading-relaxed text-brand-text-primary">
        {item.quote}
      </p>
      <div className="mt-6 border-t border-black/10 pt-4">
        <p className="font-semibold text-brand-text-primary">{item.name}</p>
        <p className="mt-1 text-xs text-shadow-sm text-brand-text-primary">{item.role}</p>
        <p className="mt-0.5 text-xs text-shadow-sm text-brand-text-secondary">{item.location}</p>
      </div>
    </article>
  );
}
