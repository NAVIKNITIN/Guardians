"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { DownloadModal } from "@/components/publications/DownloadModal";
import {
  PublicationCard,
  type PublicationIssue,
} from "@/components/publications/PublicationCard";
import { PublicationListingEmptyCard } from "@/components/publications/PublicationListingEmptyCard";
import { PublicationListingSkeleton } from "@/components/publications/PublicationListingSkeleton";
import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  articleImage,
  normalizeFilteredArticles,
} from "@/lib/mappers/publicArticles";
import { LISTING_PAGE_SIZE } from "@/lib/listingPagination";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { filterArticles } from "@/src/api/services/articleService";
import { useEffect, useMemo, useState } from "react";

export function GazetteGrid() {
  const [activeIssue, setActiveIssue] = useState<string | null>(null);
  const [issues, setIssues] = useState<PublicationIssue[]>([]);
  const [visibleCount, setVisibleCount] = useState(LISTING_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const from = `${currentYear}-01-01`;
  const to = `${currentYear}-12-31`;

  useEffect(() => {
    let mounted = true;

    async function loadGazette() {
      try {
        setIsLoading(true);
        const result = (await filterArticles({
          type: "GAZETTE",
          year: String(currentYear),
          from,
          to,
        })) as unknown;
        if (!mounted) return;
        const items = normalizeFilteredArticles(result as never);
        setIssues(
          items.map((item, index) => ({
            id: String(item.id),
            title: item.title?.trim() || "Untitled",
            imageSrc: articleImage(item, index, "gazette"),
            imageAlt: item.title?.trim() || "Gazette cover",
            fallbackSrc: LOCAL_IMAGES.blogDetail,
            href: `/gazette/${String(item.id)}`,
          })),
        );
        setVisibleCount(LISTING_PAGE_SIZE);
      } catch {
        if (mounted) {
          setIssues([]);
          setVisibleCount(LISTING_PAGE_SIZE);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadGazette();
    return () => {
      mounted = false;
    };
  }, [currentYear, from, to]);

  const displayedIssues = useMemo(
    () => issues.slice(0, visibleCount),
    [issues, visibleCount],
  );

  const hasMore = issues.length > displayedIssues.length;

  return (
    <section
      className="bg-white px-6 py-20 md:px-16"
      aria-label="Gazette issues"
    >
      <Container>
        {isLoading ? (
          <PublicationListingSkeleton label="Loading gazette issues" />
        ) : issues.length === 0 ? (
          <PublicationListingEmptyCard
            title="No gazette issues found"
            description="There are no gazette entries for this period yet."
          />
        ) : (
          <>
            <StaggerContainer
              className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-16"
              staggerChildren={0.16}
            >
              {displayedIssues.map((issue, index) => (
                <ScrollReveal key={issue.id} direction="up" delay={index * 0.04} distance={30}>
                  <PublicationCard
                    issue={issue}
                    onOpenFile={setActiveIssue}
                  />
                </ScrollReveal>
              ))}
            </StaggerContainer>

            {hasMore ? (
              <ScrollReveal direction="up" delay={0.15} className="mt-10 flex justify-center sm:mt-14 lg:mt-16">
                <OutlineArrowButton
                  type="button"
                  onClick={() =>
                    setVisibleCount((n) =>
                      Math.min(n + LISTING_PAGE_SIZE, issues.length),
                    )
                  }
                  className="h-[52px] w-[273px] max-w-sm sm:h-[55px] sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl"
                >
                  View More
                </OutlineArrowButton>
              </ScrollReveal>
            ) : null}
          </>
        )}
      </Container>

      {/* Download modal */}
      <DownloadModal
        isOpen={activeIssue !== null}
        onClose={() => setActiveIssue(null)}
        issueTitle={activeIssue ?? ""}
      />
    </section>
  );
}
