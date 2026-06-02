import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { MarketingImgWithFallback } from "@/components/common/MarketingImgWithFallback";
import { LOCAL_IMAGES } from "@/lib/local-images";
import {
  audienceMarketingOutlineCtaIconClass,
  publicationCardOutlineCtaClass,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";

export type PublicationIssue = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  fallbackSrc?: string;
  href?: string;
  fileUrl?: string;
};

type PublicationCardProps = {
  issue: PublicationIssue;
  onOpenFile: (issue: PublicationIssue) => void;
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

  return (
    <article className={cn("flex flex-col items-center", className)}>
      {/* Portrait magazine/gazette cover */}
      <div className="relative w-full overflow-hidden bg-neutral-200">
        <div className="aspect-[345/451]">
          <MarketingImgWithFallback
            src={issue.imageSrc}
            fallbackSrc={fallbackSrc}
            alt={issue.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-5 w-full text-center n-bold fs-20 lh-24 text-[#161616]">
        {issue.title}
      </h3>

      {/* Open File button */}
      <OutlineArrowButton
        onClick={() => onOpenFile(issue)}
        className={cn(publicationCardOutlineCtaClass, "mt-5")}
        iconClassName={audienceMarketingOutlineCtaIconClass}
      >
        {buttonLabel}
      </OutlineArrowButton>
    </article>
  );
}
