import { Container } from "@/components/common/Container";
import { localImageByIndex } from "@/lib/local-images";
import { NewsCard, type NewsArticle } from "./NewsCard";
import Image from "next/image";

const EXCERPT =
  "Lorem ipsum dolor sit amet consectetur. Augue molestie etiam lacus velit. Eget urna sagittis faucibus mauris id lacinia sit amet volutpat.";

const ARTICLES: NewsArticle[] = [
  {
    id: "1",
    date: "12 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(0),
    imageAlt: "GIS mapping in real estate",
    href: "#",
  },
  {
    id: "2",
    date: "10 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(1),
    imageAlt: "Real estate market insights",
    href: "#",
  },
  {
    id: "3",
    date: "08 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(2),
    imageAlt: "Luxury real estate project",
    href: "#",
  },
  {
    id: "4",
    date: "05 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(3),
    imageAlt: "High-rise residential development",
    href: "#",
  },
  {
    id: "5",
    date: "02 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(4),
    imageAlt: "Corporate advisory services",
    href: "#",
  },
  {
    id: "6",
    date: "29 Nov 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(5),
    imageAlt: "Real estate advisory professionals",
    href: "#",
  },
  {
    id: "7",
    date: "25 Nov 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(6),
    imageAlt: "Modern residential towers",
    href: "#",
  },
  {
    id: "8",
    date: "20 Nov 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(7),
    imageAlt: "Property development overview",
    href: "#",
  },
];

/** Corner-arrow icon for the "VIEW MORE" CTA — white version */
function ViewMoreIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 0H14.4958V14.4958"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

export function NewsroomGrid() {
  return (
    <section
      className="bg-white px-3 py-12 sm:px-4 sm:py-16 lg:py-20 lg:px-8 xl:px-10"
      aria-label="News articles"
    >
      <Container>
        {/* 4-column articles grid — 2 rows */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[65px] lg:gap-y-[54px]">
          {ARTICLES.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {/* VIEW MORE CTA */}
        <div className="mt-12 flex justify-center px-1 sm:mt-14 lg:mt-16">
          <button
            type="button"
            className="inline-flex w-full max-w-sm items-center justify-center gap-4 px-8 py-3.5 font-nexa text-base font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto sm:max-w-none sm:gap-5 sm:px-12 sm:py-[18px] sm:text-lg"
            style={{
              background:
                "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
            }}
          >
            View More
            <Image
              src="/images/arrowwhite.svg"
              alt="View More"
              width={15}
              height={15}
              className="object-cover"
            />
          </button>
        </div>
      </Container>
    </section>
  );
}
