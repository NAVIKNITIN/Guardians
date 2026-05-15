"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  articleDateLabel,
  articleExcerpt,
  articleImage,
  normalizeFilteredArticles,
} from "@/lib/mappers/publicArticles";
import { PublicationListingEmptyCard } from "@/components/publications/PublicationListingEmptyCard";
import { PublicationListingSkeleton } from "@/components/publications/PublicationListingSkeleton";
import { BlogCard, type BlogPost } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import { LISTING_PAGE_SIZE } from "@/lib/listingPagination";
import { filterArticles } from "@/src/api/services/articleService";
import { useEffect, useMemo, useState } from "react";

const EXCERPT =
  "Lorem ipsum dolor sit amet consectetur. Augue molestie etiam lacus velit. Eget urna sagittis faucibus mauris id....";

function ChevronDown() {
  return (
    <svg width="15" height="8" viewBox="0 0 15 8" fill="none" aria-hidden>
      <path
        d="M0 0L7.5 7.5L15 0"
        stroke="#8F8183"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterDropdown({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  ariaLabel: string;
}) {
  return (
    <div className="relative min-w-[170px]">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        className="h-10 w-full appearance-none border-b border-[#8F8183] bg-transparent pb-2 pr-7 n-bold fs-20 lh-24 text-[#8F8183] outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
        <ChevronDown />
      </span>
    </div>
  );
}


export function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [visibleCount, setVisibleCount] = useState(LISTING_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [categoryOptions, setCategoryOptions] = useState<string[]>(["All Categories"]);

  const yearOptions = useMemo(() => {
    const year = new Date().getFullYear();
    return [
      "All Years",
      String(year),
      String(year - 1),
      String(year - 2),
      String(year - 3),
    ];
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadBlogs() {
      try {
        setIsLoading(true);
        const filterParams: Parameters<typeof filterArticles>[0] = {
          type: "BLOG",
        };
        if (selectedYear !== "All Years") {
          filterParams.year = selectedYear;
          filterParams.from = `${selectedYear}-01-01`;
          filterParams.to = `${selectedYear}-12-31`;
        }

        const result = (await filterArticles(filterParams)) as unknown;

        if (!mounted) return;
        const items = normalizeFilteredArticles(result as never);
        const allCategories = Array.from(
          new Set(
            items.flatMap((item) =>
              Array.isArray((item as { categories?: string[] }).categories)
                ? (item as { categories?: string[] }).categories ?? []
                : [],
            ),
          ),
        )
          .map((category) => String(category).trim())
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));

        setCategoryOptions(["All Categories", ...allCategories]);

        const categoryFilteredItems =
          selectedCategory === "All Categories"
            ? items
            : items.filter((item) => {
                const categories = Array.isArray(
                  (item as { categories?: string[] }).categories,
                )
                  ? ((item as { categories?: string[] }).categories ?? [])
                  : [];
                return categories.some(
                  (category) =>
                    String(category).trim().toLowerCase() ===
                    selectedCategory.trim().toLowerCase(),
                );
              });

        const mapped: BlogPost[] = categoryFilteredItems.map((item, index) => ({
          id: String(item.id),
          date: articleDateLabel(item.created_at),
          title: item.title?.trim() || "Untitled",
          excerpt: articleExcerpt(item.description) || EXCERPT,
          imageSrc: articleImage(item, index, "blog"),
          imageAlt: item.title?.trim() || "Blog image",
          href: `/blog/${String(item.id)}`,
        }));
        setPosts(mapped);
        setVisibleCount(LISTING_PAGE_SIZE);
      } catch {
        if (mounted) {
          setPosts([]);
          setVisibleCount(LISTING_PAGE_SIZE);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadBlogs();
    return () => {
      mounted = false;
    };
  }, [selectedYear, selectedCategory]);

  useEffect(() => {
    if (selectedCategory !== "All Categories" && !categoryOptions.includes(selectedCategory)) {
      setSelectedCategory("All Categories");
    }
  }, [categoryOptions, selectedCategory]);

  const displayedPosts = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount],
  );

  const hasMore = posts.length > displayedPosts.length;

  return (
    <section
      className="bg-white py-20 px-6 md:px-16"
      aria-label="Blog posts"
    >
      <Container>
        {/* Filter bar */}
        <ScrollReveal direction="up" distance={28}>
          <div className="mb-6 flex flex-wrap n-bold fs-20 ls-4 lh-24 items-center gap-4 pb-4 sm:gap-8 md:gap-10">
            <FilterDropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
              ariaLabel="Filter blog posts by category"
            />
            <FilterDropdown
              value={selectedYear}
              onChange={setSelectedYear}
              options={yearOptions}
              ariaLabel="Filter blog posts by year"
            />
          </div>
        </ScrollReveal>

        {/* Two-column layout: cards + sidebar */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-8 xl:gap-[33px]">
          {/* Blog cards — 3-column grid */}
          <div className="min-w-0 flex-1">
            {isLoading ? (
              <PublicationListingSkeleton label="Loading blog posts" />
            ) : posts.length === 0 ? (
              <PublicationListingEmptyCard
                title="No blogs found"
                description="There are no blog posts for this period yet."
              />
            ) : (
              <>
                <StaggerContainer
                  className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-[34px] xl:gap-y-12"
                  staggerChildren={0.16}
                >
                  {displayedPosts.map((post, index) => (
                    <ScrollReveal key={post.id} direction="up" delay={index * 0.04} distance={30}>
                      <BlogCard post={post} />
                    </ScrollReveal>
                  ))}
                </StaggerContainer>

                {hasMore ? (
                  <ScrollReveal direction="up" delay={0.15} className="mt-10 flex justify-center sm:mt-14 lg:mt-16">
                    <OutlineArrowButton
                      type="button"
                      onClick={() =>
                        setVisibleCount((n) =>
                          Math.min(n + LISTING_PAGE_SIZE, posts.length),
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
          </div>

          {/* Sidebar */}
          <ScrollReveal direction="right" delay={0.08} distance={34}>
            <BlogSidebar />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
