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
      <p className="n-book text-sm leading-[1.5] text-[#161616] sm:text-base">
        {article.date}
      </p>

      {/* Title */}
      <h3 className="mt-2 line-clamp-3 n-reg text-base leading-[1.25] text-[#161616] sm:mt-3 sm:text-lg lg:text-xl">
        {article.title}
      </h3>

      {/* Image */}
      <div className="relative mt-3 w-full overflow-hidden bg-neutral-200 sm:mt-5">
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
      <p className="mt-3 line-clamp-4 n-book text-sm leading-[1.5] text-[#161616] sm:mt-4 sm:text-base">
        {article.excerpt}
      </p>

      {/* Read More button */}
      <Link
        href={article.href}
        className={cn(
          "mt-4 flex items-center justify-center gap-4 sm:mt-5 sm:gap-5",
          "border border-black/30 px-6 py-2.5 sm:px-8",
          "n-bold text-xs uppercase tracking-[0.1em] text-[#202225] sm:text-sm",
          "transition-colors hover:border-[#202225] hover:bg-[#202225] hover:text-white",
          "[&:hover_svg_path]:stroke-white",
        )}
      >
        Read More
        <Image
          src="/images/arrow.svg"
          alt="Read More"
          width={15}
          height={15}
          className="h-3 w-3 object-cover sm:h-[15px] sm:w-[15px]"
        />
      </Link>
    </article>
  );
}
