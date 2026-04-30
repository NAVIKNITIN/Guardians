import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import Image from "next/image";

export type NewsArticle = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export function NewsCard({ article }: { article: NewsArticle }) {
  const isRemoteImage = /^https?:\/\//.test(article.imageSrc);

  return (
    <article className="flex h-full flex-col">
      {/* Date */}
      <p className="n-book text-sm leading-[1.5] text-[#161616] sm:text-base">
        {article.date}
      </p>

      {/* Title */}
      <h3 className="mt-2 line-clamp-3 n-bold fs-20 lh-24 text-[#161616] sm:mt-3 sm:text-lg lg:text-xl">
        {article.title}
      </h3>

      {/* Image */}
      <div className="relative mt-3 w-full overflow-hidden bg-neutral-200 sm:mt-5">
        <div className="aspect-[250/175]">
          <Image
            src={article.imageSrc}
            alt={article.imageAlt}
            fill
            unoptimized={isRemoteImage}
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
      <OutlineArrowButton
        href={article.href}
        iconAlt="Read More"
        className="mt-6 w-[250px] h-[55px] n-bold fs-16 md:fs-18 lg:fs-20 px-10 uppercase"
        iconClassName="h-3 w-3 sm:h-[15px] sm:w-[15px]"
      >
        Read More
      </OutlineArrowButton>
    </article>
  );
}
