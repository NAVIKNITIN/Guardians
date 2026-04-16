import { Container } from "@/components/common/Container";
import { localImageByIndex } from "@/lib/local-images";
import { BlogCard, type BlogPost } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import Image from "next/image";
import Link from "next/link";

const EXCERPT =
  "Lorem ipsum dolor sit amet consectetur. Augue molestie etiam lacus velit. Eget urna sagittis faucibus mauris id....";

const POSTS: BlogPost[] = [
  {
    id: "1",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(0),
    imageAlt: "GIS mapping in real estate",
    href: "#",
  },
  {
    id: "2",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(1),
    imageAlt: "Real estate market overview",
    href: "#",
  },
  {
    id: "3",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(2),
    imageAlt: "Real estate advisory insights",
    href: "#",
  },
  {
    id: "4",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(3),
    imageAlt: "Property market trends",
    href: "#",
  },
  {
    id: "5",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(4),
    imageAlt: "Real estate development",
    href: "#",
  },
  {
    id: "6",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc: localImageByIndex(5),
    imageAlt: "Commercial real estate insights",
    href: "#",
  },
];

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

function FilterDropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 n-reg xt-xl font-bold text-[#8F8183] transition-opacity hover:opacity-70"
      aria-haspopup="listbox"
    >
      {label}
      <ChevronDown />
    </button>
  );
}

function ViewMoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export function BlogGrid() {
  return (
    <section
      className="bg-white px-3 py-12 sm:px-4 sm:py-16 lg:py-10 lg:px-8 xl:px-10"
      aria-label="Blog posts"
    >
      <Container>
        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-[#8F8183]/30 pb-4 sm:gap-8 md:gap-10">
          <FilterDropdown label="Category" />
          <FilterDropdown label="Year" />
        </div>

        {/* Two-column layout: cards + sidebar */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-8 xl:gap-[33px]">
          {/* Blog cards — 3-column grid */}
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-[34px] xl:gap-y-12">
              {POSTS.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* VIEW MORE */}
            <div className="mt-12 flex justify-center px-1 sm:mt-14">
              <Link
                href="#"
                className="inline-flex w-full max-w-sm items-center justify-center gap-4 px-8 py-3.5 n-reg  text-base font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto sm:max-w-none sm:gap-5 sm:px-12 sm:py-[18px] sm:text-xl"
                style={{
                  background:
                    "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
                }}
              >
                View More
                <Image
                  src="/images/arrowwhite.svg"
                  alt="View More"
                  width={15}
                  height={15}
                  className="object-cover"
                />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <BlogSidebar />
        </div>
      </Container>
    </section>
  );
}
