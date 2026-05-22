import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const loadMoreClassName =
  "w-full max-w-sm sm:w-auto sm:max-w-none px-8 py-3.5 n-bold fs-20 lh-24 uppercase tracking-[0.1em] sm:gap-5 sm:px-12 sm:py-[18px] sm:text-base lg:text-lg";

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
  const classes = cn(loadMoreClassName, className);
  const iconProps = {
    iconClassName: "h-[15px] w-[15px]" as const,
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
