import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export type BlogPost = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

function CornerArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M0 0H10.6305V10.6303" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col">
      {/* Date */}
      <p className="font-nexa text-base font-normal leading-[1.5] text-[#161616]">
        {post.date}
      </p>

      {/* Title */}
      <h3 className="mt-1.5 font-nexa text-xl font-bold leading-[1.2] text-[#161616] line-clamp-3">
        {post.title}
      </h3>

      {/* Image — 250×175 landscape */}
      <div className="relative mt-4 w-full overflow-hidden bg-neutral-200">
        <div className="aspect-[10/7]">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Excerpt */}
      <p className="mt-4 font-nexa text-base font-normal leading-[1.5] text-[#161616] line-clamp-4">
        {post.excerpt}
      </p>

      {/* Read More button */}
      <Link
        href={post.href}
        className={cn(
          "mt-5 flex items-center justify-center gap-5",
          "border border-black/30 px-12 py-2.5",
          "font-nexa text-base font-bold uppercase tracking-[0.1em] text-[#202225]",
          "transition-colors hover:border-[#202225] hover:bg-[#202225] hover:text-white",
        )}
      >
        Read More
        <CornerArrowIcon />
      </Link>
    </article>
  );
}
