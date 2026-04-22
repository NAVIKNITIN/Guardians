import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

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
      <div className="bg-[#F2F2F2] px-5 py-6 sm:px-6 sm:py-7">
        <h3 className="n-reg fs-20 lh-24 uppercase text-[#161616] sm:text-xl">
          Recent posts
        </h3>
        <div className="mt-3 border-t border-black/10" />
        <ul className="mt-4 flex flex-col gap-1 sm:mt-5">
          {RECENT_POSTS.map((title, i) => (
            <li key={i}>
              <Link
                href="#"
                className="n-bold fs-16 lh-24 text-[#161616] transition-opacity hover:opacity-70"
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
          <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[1195/371]">
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
          <RecentPostsSidebar />
        </div>
      </Container>
    </article>
  );
}
