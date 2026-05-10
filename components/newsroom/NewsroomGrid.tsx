"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { PublicationListingEmptyCard } from "@/components/publications/PublicationListingEmptyCard";
import { PublicationListingSkeleton } from "@/components/publications/PublicationListingSkeleton";
import {
  articleDateLabel,
  articleExcerpt,
  articleImage,
  normalizeFilteredArticles,
} from "@/lib/mappers/publicArticles";
import { NewsCard, type NewsArticle } from "./NewsCard";
import { filterArticles } from "@/src/api/services/articleService";
import { useEffect, useMemo, useState } from "react";
import { OutlineArrowButton } from "../common/OutlineArrowButton";

const EXCERPT =
  "Lorem ipsum dolor sit amet consectetur. Augue molestie etiam lacus velit. Eget urna sagittis faucibus mauris id lacinia sit amet volutpat.";

export function NewsroomGrid() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const from = `${currentYear}-01-01`;
  const to = `${currentYear}-12-31`;

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        setIsLoading(true);
        const result = (await filterArticles({
          type: "NEWS",
          year: String(currentYear),
          from,
          to,
        })) as unknown;

        if (!mounted) return;
        const items = normalizeFilteredArticles(result as never);
        const mapped: NewsArticle[] = items.map((item, index) => ({
          id: String(item.id),
          date: articleDateLabel(item.created_at),
          title: item.title?.trim() || "Untitled",
          excerpt: articleExcerpt(item.description) || EXCERPT,
          imageSrc: articleImage(item, index, "newsroom"),
          imageAlt: item.title?.trim() || "News image",
          href: `/newsroom/${String(item.id)}`,
        }));
        setArticles(mapped);
      } catch {
        if (mounted) setArticles([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadNews();
    return () => {
      mounted = false;
    };
  }, [currentYear, from, to]);

  return (
    <section
      className="bg-white px-6 py-20 md:px-16"
      aria-label="News articles"
    >
      <Container>
        {isLoading ? (
          <PublicationListingSkeleton label="Loading news articles" />
        ) : articles.length === 0 ? (
          <PublicationListingEmptyCard
            title="No news found"
            description="There are no newsroom articles for this period yet."
          />
        ) : (
          <>
            <StaggerContainer
              className="grid grid-cols-1 auto-rows-fr gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-[65px] lg:gap-y-[54px]"
              staggerChildren={0.16}
            >
              {articles.map((article, index) => (
                <ScrollReveal
                  key={article.id}
                  direction="up"
                  delay={index * 0.04}
                  distance={30}
                  className="h-full"
                >
                  <NewsCard article={article} />
                </ScrollReveal>
              ))}
            </StaggerContainer>

            <ScrollReveal direction="up" delay={0.15} className="mt-10 flex justify-center sm:mt-14 lg:mt-16">
              {/* <GradientCtaButton
                href="/newsroom"
                className="h-[52px] max-w-sm cursor-pointer sm:h-[55px]  sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl w-[273px]"
              >
                View More
              </GradientCtaButton> */}
              <OutlineArrowButton
                href="/newsroom"
                className="h-[52px] max-w-sm cursor-pointer sm:h-[55px]  sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl w-[273px]"
              >
                View More
              </OutlineArrowButton>
            </ScrollReveal>
          </>
        )}
      </Container>
    </section>
  );
}
