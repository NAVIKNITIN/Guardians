import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export type GazetteIssue = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

function CornerArrowIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 0H10.6305V10.6303"
        stroke="#202225"
        strokeWidth="2"
      />
    </svg>
  );
}

export function GazetteCard({ issue, onOpenFile }: { issue: GazetteIssue, onOpenFile: (title: string) => void }) {
  return (
    <article className="flex flex-col items-center">
      {/* Portrait magazine cover */}
      <div className="relative w-full overflow-hidden bg-neutral-200">
        <div className="aspect-[345/451]">
          <Image
            src={issue.imageSrc}
            alt={issue.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-5 text-center font-nexa text-xl font-bold leading-[1.2] text-[#161616] line-clamp-3">
        {issue.title}
      </h3>

      {/* Open File button */}
      <button
        type="button"
        onClick={() => onOpenFile(issue.title)}
        className={cn(
          "mt-5 flex items-center justify-center gap-5",
          "border border-black/30 px-12 py-[18px]",
          "font-nexa text-base font-bold uppercase tracking-[0.1em] text-[#202225]",
          "transition-colors hover:border-[#202225] hover:bg-[#202225] hover:text-white",
          "[&:hover_svg_path]:stroke-white",
        )}
      >
        Open File
        <Image src="/images/arrow.svg" alt="Open File" width={15} height={15} />
      </button>
    </article>
  );
}
