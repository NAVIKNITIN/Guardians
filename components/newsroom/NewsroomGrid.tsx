import { Container } from "@/components/common/Container";
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
    imageSrc:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=500&q=80",
    imageAlt: "GIS mapping in real estate",
    href: "#",
  },
  {
    id: "2",
    date: "10 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Real estate market insights",
    href: "#",
  },
  {
    id: "3",
    date: "08 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Luxury real estate project",
    href: "#",
  },
  {
    id: "4",
    date: "05 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80",
    imageAlt: "High-rise residential development",
    href: "#",
  },
  {
    id: "5",
    date: "02 Dec 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Corporate advisory services",
    href: "#",
  },
  {
    id: "6",
    date: "29 Nov 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Real estate advisory professionals",
    href: "#",
  },
  {
    id: "7",
    date: "25 Nov 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Modern residential towers",
    href: "#",
  },
  {
    id: "8",
    date: "20 Nov 2025",
    title: "Revolutionising Real Estate — The Power of GIS Mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://images.unsplash.com/photo-1426122402199-be02db90eb90?auto=format&fit=crop&w=500&q=80",
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
      className="bg-white py-16 sm:py-16 lg:py-20 px-2 lg:px-10"
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
        <div className="mt-14 flex justify-center lg:mt-16">
          <button
            type="button"
            className="inline-flex items-center gap-5 px-12 py-[18px] font-nexa text-lg font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
            }}
          >
            View More
            <Image src="/images/arrowwhite.svg" alt="View More" width={15} height={15} />
          </button>
        </div>
      </Container>
    </section>
  );
}
