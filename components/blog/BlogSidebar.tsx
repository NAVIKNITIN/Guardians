const RECENT_POSTS = [
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
];

const TAGS = [
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet consectetur.",
];

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="flex-shrink-0"
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
  items: string[];
}) {
  return (
    <div className="bg-[#F2F2F2] px-6 py-7">
      <h3 className="n-reg xt-xl font-light uppercase tracking-[0.1em] text-[#161616]">
        {title}
      </h3>
      <div className="mt-3 border-t border-black/10" />
      <ul className="mt-5 flex flex-col gap-[22px]">
        {items.map((item, i) => (
          <li key={i}>
            <a
              href="#"
              className="n-reg  text-base font-bold leading-[1.5] text-[#161616] transition-opacity hover:opacity-70 line-clamp-2"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogSidebar() {
  return (
    <aside className="flex flex-col gap-3 w-full lg:w-[345px] lg:flex-shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2.5 border border-black/20 bg-black/5 px-3.5 py-3 rounded-sm">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-transparent n-reg  text-base font-normal text-black/60 placeholder:text-black/60 focus:outline-none tracking-[-0.01em]"
          aria-label="Search blog posts"
        />
      </div>

      {/* Recent Posts */}
      <SidePanel title="Recent posts" items={RECENT_POSTS} />

      {/* Tags */}
      <SidePanel title="Tags" items={TAGS} />
    </aside>
  );
}
