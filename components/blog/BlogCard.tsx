import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { MarketingImgWithFallback } from "@/components/common/MarketingImgWithFallback";
import {
  audienceMarketingOutlineCtaIconClass,
  publicationCardOutlineCtaClassLgStart,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";
import { LOCAL_IMAGES } from "@/lib/local-images";
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

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col">
      {/* Date */}
      <p className="n-reg  text-base  leading-[1.5] text-[#161616]">
        {post.date}
      </p>

      {/* Title */}
      <h3 className="mt-1.5 n-bold fs-20 ls-5 lh-24  text-[#161616] line-clamp-2">
        {post.title}
      </h3>

      {/* Image — 250×175 landscape */}
      <div className="relative mt-4 w-full overflow-hidden bg-neutral-200">
        <div className="aspect-[10/7]">
          <MarketingImgWithFallback
            src={post.imageSrc}
            fallbackSrc={LOCAL_IMAGES.blogDetail}
            alt={post.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Excerpt */}
      <p className="mt-4 n-book fs-16 lh-24 text-[#161616] line-clamp-4">
        {post.excerpt}
      </p>

      {/* Read More button */}
      <OutlineArrowButton
        href={`/blog/${post.id}`}
        className={cn(publicationCardOutlineCtaClassLgStart, "mt-5")}
        iconClassName={audienceMarketingOutlineCtaIconClass}
      >
        Read More
      </OutlineArrowButton>
    </article>
  );
}
