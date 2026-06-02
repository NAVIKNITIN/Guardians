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
import { LISTING_PAGE_SIZE } from "@/lib/listingPagination";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { useMemo, useState } from "react";

export function GazetteGridHardCoded() {
  const [activeIssue, setActiveIssue] = useState<PublicationIssue | null>(null);
  const issues: PublicationIssue[] = useMemo(
    () => [
      {
        id: "1",
        title: "The Guardians Gazette",
        imageSrc: "/images/gazette/1.jpg",
        imageAlt: "The Guardians Gazette",
        fallbackSrc: LOCAL_IMAGES.blogDetail,
        href: "/gazette/1",
        fileUrl:
          "/api/publications/download?kind=gazette&file=" +
          encodeURIComponent("TheGuardiansGazette.pdf"),
      },
      {
        id: "2",
        title: "The Guardians Gazette — 2025",
        imageSrc: "/images/gazette/2.jpg",
        imageAlt: "The Guardians Gazette — 2025",
        fallbackSrc: LOCAL_IMAGES.blogDetail,
        href: "/gazette/2",
        fileUrl:
          "/api/publications/download?kind=gazette&file=" +
          encodeURIComponent("TheGuardiansGazette_2025.pdf"),
      },
      {
        id: "3",
        title: "TG Gazette Newsletter — August 2025",
        imageSrc: "/images/gazette/3.jpg",
        imageAlt: "TG Gazette Newsletter — August 2025",
        fallbackSrc: LOCAL_IMAGES.blogDetail,
        href: "/gazette/3",
        fileUrl:
          "/api/publications/download?kind=gazette&file=" +
          encodeURIComponent("TG Gazette Newsletter_ August2025.pdf"),
      },
    ],
    [],
  );

  const [visibleCount, setVisibleCount] = useState(LISTING_PAGE_SIZE);
  const isLoading = false;

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
                <ScrollReveal
                  key={issue.id}
                  direction="up"
                  delay={index * 0.04}
                  distance={30}
                >
                  <PublicationCard issue={issue} onOpenFile={setActiveIssue} />
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

      <DownloadModal
        isOpen={activeIssue !== null}
        onClose={() => setActiveIssue(null)}
        issueTitle={activeIssue?.title ?? ""}
        fileUrl={activeIssue?.fileUrl}
      />
    </section>
  );
}

