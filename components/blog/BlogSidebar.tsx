"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { normalizeFilteredArticles } from "@/lib/mappers/publicArticles";
import { filterArticles } from "@/src/api/services/articleService";

type SidePanelItem = {
  label: string;
  href: string;
};

const RECENT_POSTS: SidePanelItem[] = [
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
];

const TAGS: SidePanelItem[] = [
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
  { label: "Lorem ipsum dolor sit amet consectetur.", href: "#" },
];

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 3a7.5 7.5 0 1 0 4.64 13.36l3.75 3.75a1 1 0 0 0 1.42-1.42l-3.75-3.75A7.5 7.5 0 0 0 10.5 3Zm-5.5 7.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
        fill="black"
        fillOpacity="0.3"
      />
    </svg>
  );
}

function SidePanel({
  title,
  items,
}: {
  title: string;
  items: SidePanelItem[];
}) {
  return (
    <div className="bg-[#F2F2F2] px-6 py-7">
      <h3 className="n-reg xt-xl font-light uppercase tracking-widest text-[#161616]">
        {title}
      </h3>
      <div className="mt-3   border-t border-black/10" />
      <ul className="mt-5 flex flex-col gap-[22px]">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`}>
            <Link
              href={item.href}
              className="n-bold  text-base leading-normal text-[#161616] transition-opacity hover:opacity-70 line-clamp-2"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogSidebar() {
  const [recentPosts, setRecentPosts] = useState<SidePanelItem[]>(RECENT_POSTS);

  useEffect(() => {
    let mounted = true;
    const currentYear = new Date().getFullYear();
    const from = `${currentYear}-01-01`;
    const to = `${currentYear}-12-31`;

    async function loadRecentPosts() {
      try {
        // Keep source aligned with BlogGrid, where this API mapping already works.
        const primary = await filterArticles({
          type: "BLOG",
          year: String(currentYear),
          from,
          to,
        });
        let list = normalizeFilteredArticles(primary as never);

        // If current year has no rows, fallback to all BLOG records.
        if (list.length === 0) {
          const fallback = await filterArticles({ type: "BLOG" });
          list = normalizeFilteredArticles(fallback as never);
        }

        const items = list
          .sort((a, b) => {
            const first = new Date(String(a.created_at ?? "")).getTime() || 0;
            const second = new Date(String(b.created_at ?? "")).getTime() || 0;
            return second - first;
          })
          .map((item) => ({
            label: String(item?.title ?? "").trim(),
            href: `/blog/${String(item?.id ?? "").trim()}`,
          }))
          .filter((item) => Boolean(item.label) && item.href !== "/blog/")
          .slice(0, 5);

        if (!mounted || items.length === 0) return;
        setRecentPosts(items);
      } catch {
        // Keep fallback static posts if request fails.
      }
    }

    loadRecentPosts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <aside className="flex w-full flex-col gap-3 lg:w-[345px] lg:shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2.5 border border-black/20 bg-black/5 px-3.5 py-3 rounded-sm">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-transparent n-reg  text-base  text-black/60 placeholder:text-black/60 focus:outline-none tracking-[-0.01em]"
          aria-label="Search blog posts"
        />
      </div>

      {/* Recent Posts */}
      <SidePanel title="Recent posts" items={recentPosts} />

      {/* Tags */}
      <SidePanel title="Tags" items={TAGS} />
    </aside>
  );
}
