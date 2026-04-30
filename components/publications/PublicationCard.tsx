import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { marketingImageUnoptimized } from "@/lib/marketing/marketingImageOptimization";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";

export type PublicationIssue = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  fallbackSrc?: string;
  href?: string;
};

type PublicationCardProps = {
  issue: PublicationIssue;
  onOpenFile: (title: string) => void;
  /** Button label — defaults to "Open File" */
  buttonLabel?: string;
  className?: string;
};

export function PublicationCard({
  issue,
  onOpenFile,
  buttonLabel = "Download",
  className,
}: PublicationCardProps) {
  const fallbackSrc = issue.fallbackSrc ?? LOCAL_IMAGES.blogDetail;
  const [displaySrc, setDisplaySrc] = useState(issue.imageSrc);

  useEffect(() => {
    setDisplaySrc(issue.imageSrc);
  }, [issue.imageSrc]);

  return (
    <article className={cn("flex flex-col items-center", className)}>
      {/* Portrait magazine/gazette cover */}
      <div className="relative w-full overflow-hidden bg-neutral-200">
        <div className="aspect-[345/451]">
          <Image
            src={displaySrc}
            alt={issue.imageAlt}
            fill
            unoptimized={marketingImageUnoptimized(displaySrc)}
            onError={() => {
              if (displaySrc !== fallbackSrc) {
                setDisplaySrc(fallbackSrc);
              }
            }}
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-5 w-full text-center n-bold fs-20 lh-24 text-[#161616]">
        {issue.title}
      </h3>

      {/* Open File button */}
      <OutlineArrowButton
        onClick={() => onOpenFile(issue.title)}
        className="mt-5 px-12 py-4 fs-16 ls-10 lh-24"
        iconClassName="w-[13px] h-[13px]"
      >
        {buttonLabel}
      </OutlineArrowButton>
    </article>
  );
}
