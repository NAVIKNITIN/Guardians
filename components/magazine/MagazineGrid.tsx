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
import { PublicationLoadMoreButton } from "@/components/publications/PublicationLoadMoreButton";
import {
  articleImage,
  normalizeFilteredArticles,
} from "@/lib/mappers/publicArticles";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { filterArticles } from "@/src/api/services/articleService";
import { useEffect, useMemo, useState } from "react";

export function MagazineGrid() {
  const [activeIssue, setActiveIssue] = useState<string | null>(null);
  const [issues, setIssues] = useState<PublicationIssue[]>([]);
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
      } catch {
        if (mounted) setIssues([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadMagazine();
    return () => {
      mounted = false;
    };
  }, [currentYear, from, to]);

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
              {issues.map((issue, index) => (
                <ScrollReveal key={issue.id} direction="up" delay={index * 0.04} distance={30}>
                  <PublicationCard
                    issue={issue}
                    onOpenFile={setActiveIssue}
                  />
                </ScrollReveal>
              ))}
            </StaggerContainer>

            <ScrollReveal direction="up" delay={0.14} className="mt-12 flex justify-center px-1 sm:mt-16 lg:mt-20">
              <PublicationLoadMoreButton className="px-12 py-4 fs-16 ls-10 lh-24 n-bold">View More</PublicationLoadMoreButton>
            </ScrollReveal>
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
