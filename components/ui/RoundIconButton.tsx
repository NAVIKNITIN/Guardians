import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type RoundIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  /** Visually hide label but keep for screen readers */
  label: string;
};

export function RoundIconButton({
  className,
  children,
  label,
  type = "button",
  ...props
}: RoundIconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-transparent text-brand-text-primary transition-colors hover:bg-black/[0.04]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
