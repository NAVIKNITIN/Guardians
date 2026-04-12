import type { Testimonial } from "@/data/developer-page";
import { cn } from "@/utils/cn";
import Image from "next/image";

const avatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80";

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
        "flex flex-col border border-black/[0.06] p-6 shadow-sm",
        "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:14px_14px]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-800">
          {item.brandLabel}
        </div>
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white">
          <Image src={avatar} alt="" fill className="object-cover" sizes="48px" />
        </div>
      </div>
      <p className="mt-6 font-nexa text-5xl leading-none text-brand-text-primary/25">
        &ldquo;
      </p>
      <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">
        {item.quote}
      </p>
      <div className="mt-6 border-t border-black/10 pt-4">
        <p className="font-semibold text-brand-text-primary">{item.name}</p>
        <p className="mt-1 text-xs text-brand-text-secondary">{item.role}</p>
        <p className="mt-0.5 text-xs text-brand-text-muted">{item.location}</p>
      </div>
    </article>
  );
}
