import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import Image from "next/image";

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
  const isRemoteImage = /^https?:\/\//.test(post.imageSrc);

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
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            unoptimized={isRemoteImage}
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Excerpt */}
      <p className="mt-4 n-book fs-16 lh-24 text-[#161616] line-clamp-4">
        {post.excerpt}
      </p>

      {/* Read More button */}
      <OutlineArrowButton href={`/blog/${post.id}`} className="mt-5">
        Read More
      </OutlineArrowButton>
    </article>
  );
}
