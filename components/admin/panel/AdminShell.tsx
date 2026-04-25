"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/panel/AdminSidebar";
import { AdminTopbar } from "@/components/admin/panel/AdminTopbar";
import { AdminPageContainer } from "@/components/admin/panel/AdminPageContainer";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const pageConfig = pathname.startsWith("/admin/book-visits")
    ? {
        title: "Book Visits",
        searchPlaceholder: "Search visits...",
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f7fb_45%,#eef2f7_100%)] text-[#44506a] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <AdminSidebar />

      <div className="min-w-0">
        <AdminTopbar
          title={pageConfig.title}
          searchPlaceholder={pageConfig.searchPlaceholder}
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
