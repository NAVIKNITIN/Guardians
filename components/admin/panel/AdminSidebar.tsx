"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconFolderStack } from "@/components/admin/panel/AdminIcons";
import { cn } from "@/utils/cn";

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

function IconHamburger({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden>
      <path strokeLinecap="round" d="M4 7.5h16M4 12h16M4 16.5h16" />
    </svg>
  );
}

function IconSidebarCollapse({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path strokeLinecap="round" d="M9 4.5v15M14.5 12h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.8 10.1-2.2 1.9 2.2 1.9" />
    </svg>
  );
}

function IconSidebarExpand({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path strokeLinecap="round" d="M15 4.5v15M3.5 12h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m7.2 10.1 2.2 1.9-2.2 1.9" />
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

export function AdminSidebar({
  isExpanded,
  isMobileOpen,
  onToggleSidebar,
  isSidebarOpen,
  onCloseMobile,
}: {
  isExpanded: boolean;
  isMobileOpen: boolean;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {isMobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-[#030712]/45 backdrop-blur-[1px] lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[280px] -translate-x-full flex-col border-r border-white/10 bg-[#0f1219] text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0",
          isMobileOpen && "translate-x-0",
          isExpanded ? "lg:w-[320px]" : "lg:w-[92px]",
        )}
      >
        <div
          className={cn(
            "flex border-b border-white/10 px-3 py-3 transition-all duration-300",
            isExpanded
              ? "items-center justify-between gap-2.5 lg:px-4 lg:py-4"
              : "justify-center lg:px-3 lg:py-3",
          )}
        >
          {isExpanded ? (
            <Link href="/admin/projects" className="inline-flex">
              <Image
                src="/images/Logo1.svg"
                alt="The Guardians"
                width={160}
                height={42}
                className="h-auto w-[132px] object-contain"
                priority={false}
              />
            </Link>
          ) : null}

          <button
            type="button"
            aria-label="Toggle sidebar"
            aria-expanded={isSidebarOpen}
            onClick={onToggleSidebar}
            className="group inline-flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[12px] border border-white/15 bg-white/6 text-[#cbd5e1] transition-all duration-300 hover:border-[#f09684] hover:bg-white/10 hover:text-[#f7a089]"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden">
              <IconSidebarCollapse
                className={cn(
                  "absolute h-5 w-5 transition-all duration-300",
                  isExpanded
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0",
                )}
              />
              <IconSidebarExpand
                className={cn(
                  "absolute h-5 w-5 transition-all duration-300",
                  isExpanded
                    ? "translate-x-4 opacity-0"
                    : "translate-x-0 opacity-100",
                )}
              />
            </span>
          </button>
        </div>

        <nav className="flex gap-2.5 overflow-x-auto px-3 py-4 lg:flex-1 lg:flex-col lg:gap-2.5 lg:px-3 lg:py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isProjectsItem = item.href === "/admin/projects";
            const isArticlesItem = item.href === "/admin/articles";
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (isProjectsItem && pathname.startsWith("/admin/add-project")) ||
              (isArticlesItem && pathname.startsWith("/admin/add-article"));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={[
                  "inline-flex items-center gap-3 rounded-[14px] px-4 py-3 text-[0.94rem] font-medium whitespace-nowrap transition-all duration-300 lg:min-h-[50px]",
                  !isExpanded ? "lg:justify-center lg:px-2" : "",
                  active
                    ? "btn-primary-gradient text-white shadow-[0_16px_28px_rgba(240,150,132,0.2)]"
                    : "text-[#aab2bf] hover:bg-white/6 hover:text-white",
                ].join(" ")}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className={cn(!isExpanded && "lg:hidden")}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
