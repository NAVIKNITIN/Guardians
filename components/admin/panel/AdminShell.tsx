"use client";

import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/panel/AdminSidebar";
import { AdminTopbar } from "@/components/admin/panel/AdminTopbar";
import { AdminPageContainer } from "@/components/admin/panel/AdminPageContainer";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const pageConfig = pathname.startsWith("/admin/book-visits")
    ? {
      title: "Book Visits",
      searchPlaceholder: "Search visits...",
    }
    : pathname.startsWith("/admin/articles/") &&
        pathname.endsWith("/view")
      ? {
          title: "View Article",
          searchPlaceholder: "Search articles...",
        }
      : pathname.startsWith("/admin/articles/") &&
          pathname.endsWith("/edit")
        ? {
            title: "Edit Article",
            searchPlaceholder: "Search articles...",
          }
    : pathname.startsWith("/admin/add-article")
      ? {
          title: "Add New Article",
        searchPlaceholder: "Search articles...",
      }
      : pathname.startsWith("/admin/articles")
        ? {
          title: "Articles",
          searchPlaceholder: "Search articles...",
        }
        : pathname.startsWith("/admin/add-project")
          ? {
            title: "Add Project",
            searchPlaceholder: "Search projects...",
          }
          : {
            title: "Projects",
            searchPlaceholder: "Search projects...",
          };

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      className={cn(
        "min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f7fb_45%,#eef2f7_100%)] text-[#44506a] transition-[grid-template-columns] duration-300 ease-out lg:grid",
        isSidebarExpanded
          ? "lg:grid-cols-[320px_minmax(0,1fr)]"
          : "lg:grid-cols-[92px_minmax(0,1fr)]",
      )}
    >
      <AdminSidebar
        isExpanded={isSidebarExpanded}
        isMobileOpen={isMobileSidebarOpen}
        onToggleSidebar={() => {
          if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setIsMobileSidebarOpen((current) => !current);
            return;
          }
          setIsSidebarExpanded((current) => !current);
        }}
        isSidebarOpen={isSidebarExpanded || isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="min-w-0">
        <AdminTopbar
          title={pageConfig.title}
          searchPlaceholder={pageConfig.searchPlaceholder}
          onToggleSidebar={() => {
            if (typeof window !== "undefined" && window.innerWidth < 1024) {
              setIsMobileSidebarOpen((current) => !current);
              return;
            }
            setIsSidebarExpanded((current) => !current);
          }}
          isSidebarOpen={isSidebarExpanded || isMobileSidebarOpen}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            className="min-w-0"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <AdminPageContainer>{children}</AdminPageContainer>
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
