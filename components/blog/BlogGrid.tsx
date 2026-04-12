import { Container } from "@/components/common/Container";
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
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/29e6c5b50c49c27cefaf3e5ff201a70f36e2afee?width=500",
    imageAlt: "GIS mapping in real estate",
    href: "#",
  },
  {
    id: "2",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/76e2f01e6b8cf630ab2b349551aece5f8b9019e5?width=500",
    imageAlt: "Real estate market overview",
    href: "#",
  },
  {
    id: "3",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/8c283f7787a72b02ac205cfb74447f352c3a43b2?width=500",
    imageAlt: "Real estate advisory insights",
    href: "#",
  },
  {
    id: "4",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/a239323a3b8d8c1519175236f7877290c4fbccbe?width=500",
    imageAlt: "Property market trends",
    href: "#",
  },
  {
    id: "5",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/d9bb13a20f5f3c9c73a76d1b8828e640f2189342?width=500",
    imageAlt: "Real estate development",
    href: "#",
  },
  {
    id: "6",
    date: "12 Dec 2025",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    excerpt: EXCERPT,
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/d9bb13a20f5f3c9c73a76d1b8828e640f2189342?width=500",
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
      className="flex items-center gap-2 font-nexa text-xl font-bold text-[#8F8183] transition-opacity hover:opacity-70"
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
    <section className="bg-white py-14 sm:py-16 lg:py-10 px-2 lg:px-10" aria-label="Blog posts">
      <Container>
        {/* Filter bar */}
        <div className="mb-6 flex items-center gap-10 border-b border-[#8F8183]/30 pb-4">
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
            <div className="mt-14 flex justify-center">
              <Link
                href="#"
                className="inline-flex items-center gap-5 px-12 py-[18px] font-nexa text-xl font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
                }}
              >
                View More
                <Image src="/images/arrowwhite.svg" alt="View More" width={15} height={15} />
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
