"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/panel/AdminSidebar";
import { AdminTopbar } from "@/components/admin/panel/AdminTopbar";

export function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const title =
    pathname === "/admin/add-project"
      ? "Add Project"
      : pathname === "/admin/projects"
        ? "Projects"
        : "Projects";

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-[#44506a] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <AdminSidebar />

      <div className="min-w-0">
        <AdminTopbar title={title} />
        <main className="px-4 py-6 sm:px-8 lg:px-12 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
