import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  audienceMarketingOutlineCtaIconClass,
  publicationViewMoreCtaClass,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type PublicationLoadMoreLinkProps = SharedProps & {
  href: string;
};

type PublicationLoadMoreButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * "View More" / "Load More" CTA for publication listing pages.
 * Pass `href` for a link; otherwise renders a `<button>`.
 */
export function PublicationLoadMoreButton(
  props: PublicationLoadMoreLinkProps | PublicationLoadMoreButtonProps,
) {
  const { children, className } = props;
  const classes = cn(
    publicationViewMoreCtaClass,
    "max-lg:!w-fit max-lg:!max-w-full",
    className,
  );
  const iconProps = {
    iconClassName: audienceMarketingOutlineCtaIconClass,
    iconAlt: "",
  };

  if ("href" in props && props.href) {
    return (
      <OutlineArrowButton href={props.href} className={classes} {...iconProps}>
        {children}
      </OutlineArrowButton>
    );
  }

  const { type = "button", ...buttonProps } = props as PublicationLoadMoreButtonProps;
  return (
    <OutlineArrowButton
      type={type}
      className={classes}
      {...iconProps}
      {...buttonProps}
    >
      {children}
    </OutlineArrowButton>
  );
}
