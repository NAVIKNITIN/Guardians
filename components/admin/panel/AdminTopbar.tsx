import { IconSearch } from "@/components/common/icons";
import { IconUserCircle } from "@/components/admin/panel/AdminIcons";

export function AdminTopbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e6e1db] bg-white/95 backdrop-blur">
      <div className="flex flex-col gap-5 px-4 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-9">
        <h1 className="qs-reg text-[clamp(2.7rem,4vw,4.15rem)] leading-none text-[#081a43]">
          {title}
        </h1>

        <div className="flex items-center gap-4 lg:gap-5">
          <label className="relative flex-1 lg:w-[390px]">
            <IconSearch className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#95a0b2]" />
            <input
              type="search"
              placeholder="Search..."
              className="h-[62px] w-full rounded-[20px] border border-[#dfe3eb] bg-white pl-14 pr-5 text-[1.15rem] text-[#44506a] outline-none transition placeholder:text-[#99a3b3] focus:border-[#f09684]"
            />
          </label>

          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f09684] text-white shadow-[0_18px_30px_rgba(240,150,132,0.24)]">
            <IconUserCircle className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
