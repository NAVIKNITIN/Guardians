import { Container } from "@/components/common/Container";
import { PublicationLoadMoreButton } from "@/components/publications/PublicationLoadMoreButton";
import { localImageByIndex } from "@/lib/local-images";
import { BlogCard, type BlogPost } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";

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
      className="flex items-center border-b border-[#8F8183] pb-2 gap-2 n-bold fs-20 lh-24  text-[#8F8183] transition-opacity hover:opacity-70"
      aria-haspopup="listbox"
    >
      {label}
      <ChevronDown />
    </button>
  );
}


export function BlogGrid() {
  return (
    <section
      className="bg-white py-12  sm:py-16 lg:py-20 "
      aria-label="Blog posts"
    >
      <Container>
        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap n-bold fs-20 ls-4 lh-24 items-center gap-4  pb-4 sm:gap-8 md:gap-10">
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
              <PublicationLoadMoreButton href="#">View More</PublicationLoadMoreButton>
            </div>
          </div>

          {/* Sidebar */}
          <BlogSidebar />
        </div>
      </Container>
    </section>
  );
}
