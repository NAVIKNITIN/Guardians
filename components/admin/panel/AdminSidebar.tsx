"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconFolderStack, IconPlus } from "@/components/admin/panel/AdminIcons";

const navItems = [
  {
    href: "/admin/projects",
    label: "Projects",
    icon: IconFolderStack,
  },
  {
    href: "/admin/add-project",
    label: "Add Project",
    icon: IconPlus,
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#121212] text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[320px] lg:flex-col lg:border-r lg:border-white/10">
      <div className="border-b border-white/10 px-6 py-6 lg:px-8 lg:py-10">
        <Link href="/admin/projects" className="font-qasbyne text-[3rem] leading-none text-white">
          Estate<span className="text-[#f07c61]">.</span>
        </Link>
      </div>

      <nav className="flex gap-3 overflow-x-auto px-4 py-5 lg:flex-1 lg:flex-col lg:gap-4 lg:px-4 lg:py-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "inline-flex items-center gap-4 rounded-[20px] px-6 py-5 text-[1.15rem] font-medium whitespace-nowrap transition-all",
                active
                  ? "btn-primary-gradient text-white shadow-[0_18px_32px_rgba(240,150,132,0.22)]"
                  : "text-[#aab2bf] hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-6 w-6 shrink-0" />
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
