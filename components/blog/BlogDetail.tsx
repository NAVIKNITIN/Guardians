"use client";

import { Container } from "@/components/common/Container";
import { normalizeFilteredArticles } from "@/lib/mappers/publicArticles";
import { filterArticles } from "@/src/api/services/articleService";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

export type BlogDetailPost = {
  category: string;
  date: string;
  title: string;
  featuredImage: string;
  featuredImageAlt: string;
  /** Array of paragraphs — each entry renders as its own `<p>`. */
  body: string[];
};

// ─── Recent Posts sidebar ────────────────────────────────────────────────────

type DetailContentType = "BLOG" | "NEWS" | "MAGAZINE" | "GAZETTE";

function detailRoutePrefix(type: DetailContentType) {
  if (type === "NEWS") return "/newsroom";
  if (type === "MAGAZINE") return "/magazine";
  if (type === "GAZETTE") return "/gazette";
  return "/blog";
}

function RecentPostsSidebar({ contentType }: { contentType: DetailContentType }) {
  const [recentPosts, setRecentPosts] = useState<
    Array<{ id: string; title: string }>
  >([]);

  useEffect(() => {
    let mounted = true;
    const currentYear = new Date().getFullYear();
    const from = `${currentYear}-01-01`;
    const to = `${currentYear}-12-31`;

    async function loadRecentPosts() {
      try {
        const primary = await filterArticles({
          type: contentType,
          year: String(currentYear),
          from,
          to,
        });

        let items = normalizeFilteredArticles(primary as never);
        if (items.length === 0) {
          const fallback = await filterArticles({ type: contentType });
          items = normalizeFilteredArticles(fallback as never);
        }

        const mapped = items
          .sort((a, b) => {
            const first = new Date(String(a.created_at ?? "")).getTime() || 0;
            const second = new Date(String(b.created_at ?? "")).getTime() || 0;
            return second - first;
          })
          .map((item) => ({
            id: String(item.id ?? "").trim(),
            title: String(item.title ?? "").trim(),
          }))
          .filter((item) => item.id && item.title)
          .slice(0, 5);

        if (!mounted) return;
        setRecentPosts(mapped);
      } catch {
        if (mounted) setRecentPosts([]);
      }
    }

    loadRecentPosts();
    return () => {
      mounted = false;
    };
  }, [contentType]);

  return (
    <aside className="w-full lg:w-[345px] lg:shrink-0">
      <div className="bg-[#F2F2F2] px-5 py-6 sm:px-6 sm:py-7">
        <h3 className="n-reg fs-20 lh-24 uppercase text-[#161616] sm:text-xl">
          Recent posts
        </h3>
        <div className="mt-3 border-t border-black/10" />
        <ul className="mt-4 flex flex-col gap-1 sm:mt-5">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`${detailRoutePrefix(contentType)}/${post.id}`}
                className="n-bold fs-16 lh-24 text-[#161616] transition-opacity hover:opacity-70"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// ─── Back arrow ──────────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function BlogDetail({
  post,
  contentType = "BLOG",
}: {
  post: BlogDetailPost;
  contentType?: DetailContentType;
}) {
  return (
    <article className="bg-white  py-12 sm:my-10 sm:py-16 md:my-25 md:py-20  lg:py-[20px]">
      <Container>
        {/* ── Meta row: category + date ─────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <span className="n-book text-sm leading-[1.4] text-[#161616] sm:text-base md:text-lg lg:text-[20px] lg:leading-[25px]">
            {post.category}
          </span>
          <span className="n-book text-sm leading-[1.4] text-right text-[#161616] sm:text-base md:text-lg lg:text-[20px] lg:leading-[25px]">
            {post.date}
          </span>
        </div>

        {/* ── Title ────────────────────────────────────────────────────── */}
        <h1
          className={cn(
            "mt-10 n-bold text-[#161616] ",
            /* Fluid type on mobile — pinned to 50px / 50px at lg+ to match the original fs-50 lh-50 */
            "fs-50 lh-50",
          )}
        >
          {post.title}
        </h1>

        {/* ── Featured image — taller aspect on mobile, original 1195/371 on lg+ ─── */}
        <div className="relative mt-6 w-full overflow-hidden bg-neutral-200 sm:mt-8">
          <div className="aspect-4/3 sm:aspect-video lg:aspect-1195/371">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              className=""
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* ── Two-column: body + sidebar ────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:gap-10 lg:flex-row">
          {/* Article body */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-0 n-book fs-16 lh-24 text-[#161616] sm:gap-0 sm:text-lg lg:text-[20px] ">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <RecentPostsSidebar contentType={contentType} />
        </div>
      </Container>
    </article>
  );
}
