"use client";

import { IconUserCircle } from "@/components/admin/panel/AdminIcons";
import { AdminPageContainer } from "@/components/admin/panel/AdminPageContainer";
import { IconSearch } from "@/components/common/icons";
import { logout } from "@/src/utils/auth";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function IconXMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

export function AdminTopbar({
  title,
  searchPlaceholder = "Search...",
  onToggleSidebar,
  isSidebarOpen,
}: {
  title: string;
  searchPlaceholder?: string;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpenSearch(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(false);
        setOpenSearch(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogout() {
    logout();
    setOpenMenu(false);
    router.push("/admin/login");
  }

  function handleSearchToggle() {
    if (!openSearch) {
      setOpenSearch(true);
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
      return;
    }
    if (!searchQuery.trim()) {
      setOpenSearch(false);
      return;
    }
    searchInputRef.current?.focus();
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[#e8edf4] bg-white/92 backdrop-blur-md">
      <AdminPageContainer className="py-2.5 sm:py-2.5 lg:py-2.5">
        <div className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-2.5 lg:grid-cols-[minmax(0,1fr)_auto]">
          <button
            type="button"
            aria-label="Toggle sidebar"
            aria-expanded={isSidebarOpen}
            onClick={onToggleSidebar}
            className="inline-flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[12px] border border-[#e2e8f0] bg-white text-[#475569] transition hover:border-[#f09684] hover:text-[#f07c61] lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              className="h-5 w-5"
              aria-hidden
            >
              <path strokeLinecap="round" d="M4 7.5h16M4 12h16M4 16.5h16" />
            </svg>
          </button>
          <div className="flex justify-start">
            <h1 className="qs-reg text-[clamp(2.1rem,3.4vw,3.1rem)] leading-none text-[#0d1e46]">
              {title}
            </h1>
          </div>

          <div className="flex items-center justify-self-end gap-2.5 lg:gap-2.5">
            <div
              ref={searchRef}
              className={cn(
                "overflow-hidden rounded-full border border-[#dde4ee] bg-[#fcfdff] shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition-[width,border-color,box-shadow] duration-300",
                openSearch ? "w-full lg:w-[340px]" : "w-[50px]",
                openSearch && "border-[#f09684] shadow-[0_0_0_4px_rgba(240,150,132,0.12)]",
              )}
            >
              <div className="flex h-[50px] items-center">
                <button
                  type="button"
                  aria-label="Open search"
                  onClick={handleSearchToggle}
                  className="inline-flex h-[50px] w-[50px] shrink-0 cursor-pointer items-center justify-center text-[#95a0b2] transition-colors hover:text-[#f07c61]"
                >
                  <IconSearch className="h-5 w-5" />
                </button>

                <label
                  className={cn(
                    "min-w-0 flex-1 transition-opacity duration-200",
                    openSearch ? "opacity-100" : "opacity-0",
                  )}
                >
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className={cn(
                      "h-full w-full border-0 bg-transparent pr-4 text-[0.96rem] text-[#334155] outline-none placeholder:text-[#99a3b3]",
                      openSearch ? "pointer-events-auto" : "pointer-events-none",
                    )}
                  />
                </label>

                {openSearch ? (
                  <button
                    type="button"
                    aria-label="Close search"
                    onClick={() => {
                      setOpenSearch(false);
                      setSearchQuery("");
                    }}
                    className="group mr-1 inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8b95a7] transition-all duration-200 hover:scale-105 hover:bg-[#f1f5f9] hover:text-[#f07c61]"
                  >
                    <IconXMark className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                  </button>
                ) : null}
              </div>
            </div>

            <div ref={menuRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openMenu}
                onClick={() => setOpenMenu((prev) => !prev)}
                className="btn-primary-gradient flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border border-[#f3b4a4] bg-[#ec6f66] text-white shadow-[0_12px_20px_rgba(240,150,132,0.28)] transition-transform hover:scale-105"
              >
                <IconUserCircle className="h-5 w-5" />
              </button>

              {openMenu ? (
                <div className="absolute right-0 z-30 mt-3 w-52 overflow-hidden rounded-[14px] border border-[#e6eaf2] bg-white shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                  <button
                    type="button"
                    className="block w-full cursor-pointer px-4 py-3 text-left text-[0.92rem] font-medium text-[#334155] transition hover:bg-[#f8fafc]"
                    onClick={() => {
                      setOpenMenu(false);
                      router.push("/admin/projects");
                    }}
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    className="block w-full cursor-pointer border-t border-[#eef2f7] px-4 py-3 text-left text-[0.92rem] font-medium text-[#334155] transition hover:bg-[#f8fafc]"
                    onClick={() => {
                      setOpenMenu(false);
                      router.push("/");
                    }}
                  >
                    Go to Website
                  </button>
                  <button
                    type="button"
                    className="block w-full cursor-pointer border-t border-[#eef2f7] px-4 py-3 text-left text-[0.92rem] font-semibold text-[#dc2626] transition hover:bg-[#fff5f5]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </AdminPageContainer>
    </header>
  );
}
