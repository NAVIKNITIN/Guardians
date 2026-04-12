import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export type NewsArticle = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

/** Corner-arrow icon matching the Figma "read more" button icon (11×11 L-bracket) */
function CornerArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M0 0H10.6305V10.6303"
        stroke="#202225"
        strokeWidth="2"
      />
    </svg>
  );
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="flex flex-col">
      {/* Date */}
      <p className="font-nexa text-sm font-normal leading-snug text-[#161616] sm:text-base">
        {article.date}
      </p>

      {/* Title */}
      <h3 className="mt-2 line-clamp-3 font-nexa text-lg font-bold leading-[1.2] text-[#161616] sm:mt-3 sm:text-xl">
        {article.title}
      </h3>

      {/* Image */}
      <div className="relative mt-4 w-full overflow-hidden bg-neutral-200 sm:mt-5">
        <div className="aspect-[250/175]">
          <Image
            src={article.imageSrc}
            alt={article.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Excerpt */}
      <p className="mt-4 line-clamp-4 font-nexa text-sm font-normal leading-[1.5] text-[#161616] sm:text-base">
        {article.excerpt}
      </p>

      {/* Read More button */}
      <Link
        href={article.href}
        className={cn(
          "mt-5 flex items-center justify-center gap-5",
          "border border-black/30 px-8 py-2.5",
          "font-nexa text-sm font-bold uppercase tracking-[0.1em] text-[#202225]",
          "transition-colors hover:border-[#202225] hover:bg-[#202225] hover:text-white",
          "[&:hover_svg_path]:stroke-white",
        )}
      >
        Read More
        <Image src="/images/arrowblack.svg" alt="Read More" width={15} height={15} />
      </Link>
    </article>
  );
}
