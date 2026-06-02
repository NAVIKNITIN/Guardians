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
  audienceMarketingOutlineCtaIconClass,
  publicationViewMoreCtaClass,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";
import {
  articleImage,
  normalizeFilteredArticles,
} from "@/lib/mappers/publicArticles";
import { LISTING_PAGE_SIZE } from "@/lib/listingPagination";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { filterArticles } from "@/src/api/services/articleService";
import { useEffect, useMemo, useState } from "react";

export function MagazineGrid() {
  const [activeIssue, setActiveIssue] = useState<PublicationIssue | null>(null);
  const [issues, setIssues] = useState<PublicationIssue[]>([]);
  const [visibleCount, setVisibleCount] = useState(LISTING_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const from = `${currentYear}-01-01`;
  const to = `${currentYear}-12-31`;

  useEffect(() => {
    let mounted = true;

    async function loadMagazine() {
      try {
        setIsLoading(true);
        const result = (await filterArticles({
          type: "MAGAZINE",
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
            imageSrc: articleImage(item, index, "magazine"),
            imageAlt: item.title?.trim() || "Magazine cover",
            fallbackSrc: LOCAL_IMAGES.blogDetail,
            href: `/magazine/${String(item.id)}`,
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

    loadMagazine();
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
      aria-label="Magazine issues"
    >
      <Container>
        {isLoading ? (
          <PublicationListingSkeleton label="Loading magazine issues" />
        ) : issues.length === 0 ? (
          <PublicationListingEmptyCard
            title="No magazine issues found"
            description="There are no magazine entries for this period yet."
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
              <ScrollReveal
                direction="up"
                delay={0.15}
                className="mt-10 flex justify-center sm:mt-14 lg:mt-16 [&_button]:w-fit [&_button]:max-w-full"
              >
                <OutlineArrowButton
                  type="button"
                  onClick={() =>
                    setVisibleCount((n) =>
                      Math.min(n + LISTING_PAGE_SIZE, issues.length),
                    )
                  }
                  className={cn(
                    publicationViewMoreCtaClass,
                    "max-lg:!w-fit max-lg:!max-w-full",
                  )}
                  iconClassName={audienceMarketingOutlineCtaIconClass}
                  iconAlt=""
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
        issueTitle={activeIssue?.title ?? ""}
        fileUrl={activeIssue?.fileUrl}
      />
    </section>
  );
}
