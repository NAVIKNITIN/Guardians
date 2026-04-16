import { Container } from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────

export type BlogDetailPost = {
  category: string;
  date: string;
  title: string;
  featuredImage: string;
  featuredImageAlt: string;
  body: string;
};

// ─── Recent Posts sidebar ────────────────────────────────────────────────────

const RECENT_POSTS = [
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
];

function RecentPostsSidebar() {
  return (
    <aside className="w-full lg:w-[345px] lg:flex-shrink-0">
      <div className="bg-[#F2F2F2] px-6 py-7">
        <h3 className="n-reg  text-xl font-light uppercase tracking-[0.1em] text-[#161616]">
          Recent posts
        </h3>
        <div className="mt-3 border-t border-black/10" />
        <ul className="mt-5 flex flex-col gap-[22px]">
          {RECENT_POSTS.map((title, i) => (
            <li key={i}>
              <Link
                href="#"
                className="n-reg  text-base font-bold leading-[1.5] text-[#161616] line-clamp-2 transition-opacity hover:opacity-70"
              >
                {title}
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

export function BlogDetail({ post }: { post: BlogDetailPost }) {
  return (
    <article className="bg-white py-20 lg:py-[20px]">
      <Container>
        {/* Back to blog */}
        {/* <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 n-reg  text-sm font-bold uppercase tracking-[0.1em] text-[#8F8183] transition-opacity hover:opacity-70"
        >
          <BackArrow />
          Back to Blogs
        </Link> */}

        {/* ── Meta row: category + date ─────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <span className="n-reg  text-xl font-normal text-[#161616]">
            {post.category}
          </span>
          <span className="n-reg  text-xl font-normal text-[#161616] text-right">
            {post.date}
          </span>
        </div>

        {/* ── Title ────────────────────────────────────────────────────── */}
        <h1 className="mt-4 qs-reg text-[clamp(1.75rem,4vw,3.125rem)] leading-[1] text-[#161616]">
          {post.title}
        </h1>

        {/* ── Featured image — 1195×371 aspect ratio ───────────────────── */}
        <div className="relative mt-8 w-full overflow-hidden bg-neutral-200">
          <div className="aspect-[1195/371]">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* ── Two-column: body + sidebar ────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-10 lg:flex-row ">
          {/* Article body */}
          <div className="min-w-0 flex-1">
            <div className="n-reg  text-xl font-normal leading-[1.5] text-[#161616] whitespace-pre-line">
              {post.body}
            </div>
          </div>

          {/* Sidebar */}
          <RecentPostsSidebar />
        </div>
      </Container>
    </article>
  );
}
