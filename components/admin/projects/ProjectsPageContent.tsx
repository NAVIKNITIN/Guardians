import Link from "next/link";
import { IconFolderStack } from "@/components/admin/panel/AdminIcons";

export function ProjectsPageContent() {
  return (
    <section className="mx-auto max-w-[1420px]">
      <div className="rounded-[30px] border border-[#e7e4df] bg-white shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
        <div className="flex items-center gap-4 border-b border-[#efede9] px-6 py-7 sm:px-9">
          <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-[#fff3ed] text-[#f07c61]">
            <IconFolderStack className="h-7 w-7" />
          </div>

          <h2 className="font-qasbyne text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-[#081a43]">
            All Projects
          </h2>
        </div>

        <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 px-6 py-12 text-center">
          <p className="max-w-[780px] text-[1.28rem] leading-relaxed text-[#5d6678]">
            Your projects will appear here. Click "Add Project" to create your first listing.
          </p>

          <Link
            href="/admin/add-project"
            className="inline-flex h-[58px] items-center justify-center rounded-[18px] px-8 text-lg font-semibold text-white btn-primary-gradient shadow-[0_20px_32px_rgba(240,150,132,0.22)]"
          >
            Add Project
          </Link>
        </div>
      </div>
    </section>
  );
}
