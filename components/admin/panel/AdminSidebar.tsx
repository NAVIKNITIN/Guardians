"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconFolderStack } from "@/components/admin/panel/AdminIcons";

type IconProps = {
  className?: string;
};

function IconCalendarDays({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75v3M15.75 3.75v3M3.75 8.25h16.5" />
      <rect x="3.75" y="5.25" width="16.5" height="15" rx="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArticle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h6.879c.398 0 .779.158 1.061.439l2.121 2.121c.281.282.439.663.439 1.061V19.5a.75.75 0 0 1-.75.75H6.75A2.25 2.25 0 0 1 4.5 18V6A2.25 2.25 0 0 1 6.75 3.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h7.5M8.25 13.5h7.5M8.25 17.25h4.5" />
    </svg>
  );
}

const navItems = [
  {
    href: "/admin/projects",
    label: "Projects",
    icon: IconFolderStack,
  },
  {
    href: "/admin/book-visits",
    label: "Book Visits",
    icon: IconCalendarDays,
  },
  {
    href: "/admin/articles",
    label: "Articles",
    icon: IconArticle,
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#0f1219] text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[320px] lg:flex-col lg:border-r lg:border-white/10">
      <div className="border-b border-white/10 px-6 py-5 lg:px-8 lg:py-7">
        <Link href="/admin/projects" className="inline-flex">
          <Image
            src="/images/Logo1.svg"
            alt="The Guardians"
            width={220}
            height={60}
            className="h-auto w-[170px] object-contain object-left"
            priority={false}
          />
        </Link>
      </div>

      <nav className="flex gap-2.5 overflow-x-auto px-3 py-4 lg:flex-1 lg:flex-col lg:gap-2.5 lg:px-3 lg:py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isProjectsItem = item.href === "/admin/projects";
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`) ||
            (isProjectsItem && pathname.startsWith("/admin/add-project"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "inline-flex items-center gap-3 rounded-[14px] px-4 py-3 text-[0.94rem] font-medium whitespace-nowrap transition-all",
                active
                  ? "btn-primary-gradient text-white shadow-[0_16px_28px_rgba(240,150,132,0.2)]"
                  : "text-[#aab2bf] hover:bg-white/6 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-white/10 px-8 py-6 text-sm text-[#7f8794] lg:block">
        Real Estate Admin
      </div>
    </aside>
  );
}
