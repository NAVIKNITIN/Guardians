import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

const loadMoreClassName =
  "group cta-hover-trigger btn-grad btn-primary-gradient inline-flex w-full max-w-sm items-center justify-center gap-4 px-8 py-3.5 n-bold fs-20 lh-24 uppercase tracking-[0.1em] text-white sm:w-auto sm:max-w-none sm:gap-5 sm:px-12 sm:py-[18px] sm:text-base lg:text-lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type PublicationLoadMoreButtonProps =
  | (SharedProps & ButtonHTMLAttributes<HTMLButtonElement>)
  | (SharedProps &
      Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">);

function ArrowIcon() {
  return (
    <Image
      src="/images/arrowwhite.svg"
      alt=""
      width={15}
      height={15}
      className="cta-icon-hover object-cover"
      aria-hidden
    />
  );
}

/**
 * Gradient "View More" / "Load More" CTA used at the bottom of the
 * publications grids (gazette, magazine) and related listing pages.
 * Pass `href` to render a Next.js `Link` with the same styling.
 */
export function PublicationLoadMoreButton(
  props: PublicationLoadMoreButtonProps,
) {
  const { children, className } = props;
  const classes = cn(loadMoreClassName, className);

  if ("href" in props) {
    const { href, children: _c, className: _cn, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
        <ArrowIcon />
      </Link>
    );
  }

  const {
    children: _c,
    className: _cn,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
      <ArrowIcon />
    </button>
  );
}
