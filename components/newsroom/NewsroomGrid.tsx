import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { PublicationLoadMoreButton } from "@/components/publications/PublicationLoadMoreButton";
import { localImageByIndex } from "@/lib/local-images";
import { NewsCard, type NewsArticle } from "./NewsCard";

const EXCERPT =
  "Lorem ipsum dolor sit amet consectetur. Augue molestie etiam lacus velit. Eget urna sagittis faucibus mauris id lacinia sit amet volutpat.";

const ARTICLES: NewsArticle[] = [
  {
    id: "1",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(0),
    imageAlt: "GIS mapping in real estate",
    href: "#",
  },
  {
    id: "2",
    date: "10 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(1),
    imageAlt: "Real estate market insights",
    href: "#",
  },
  {
    id: "3",
    date: "08 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(2),
    imageAlt: "Luxury real estate project",
    href: "#",
  },
  {
    id: "4",
    date: "05 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(3),
    imageAlt: "High-rise residential development",
    href: "#",
  },
  {
    id: "5",
    date: "02 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(4),
    imageAlt: "Corporate advisory services",
    href: "#",
  },
  {
    id: "6",
    date: "29 Nov 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(5),
    imageAlt: "Real estate advisory professionals",
    href: "#",
  },
  {
    id: "7",
    date: "25 Nov 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(6),
    imageAlt: "Modern residential towers",
    href: "#",
  },
  {
    id: "8",
    date: "20 Nov 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(7),
    imageAlt: "Property development overview",
    href: "#",
  },
];

export function NewsroomGrid() {
  return (
    <section
      className="bg-white px-6 py-20 md:px-16"
      aria-label="News articles"
    >
      <Container>
        {/* 4-column articles grid — 2 rows */}
        <StaggerContainer
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-[65px] lg:gap-y-[54px]"
          staggerChildren={0.16}
        >
          {ARTICLES.map((article, index) => (
            <ScrollReveal key={article.id} direction="up" delay={index * 0.04} distance={30}>
              <NewsCard article={article} />
            </ScrollReveal>
          ))}
        </StaggerContainer>

        {/* VIEW MORE CTA */}
        <ScrollReveal direction="up" delay={0.15} className="mt-10 flex justify-center sm:mt-14 lg:mt-16">
          <PublicationLoadMoreButton type="button" className="h-[52px]">
            View More
          </PublicationLoadMoreButton>
        </ScrollReveal>
      </Container>
    </section>
  );
}
