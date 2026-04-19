import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-brand px-4 sm:px-6 lg:px-20 xl:px-30 xxl:px-40 xxxl:px-50",
        /* Extra-large viewports: use more horizontal space (was 90rem-only → heavy side margins). */
        "2xl:max-w-[min(var(--max-width-brand-wide,112rem),calc(100vw-3rem))] 2xl:px-16",
        "3xl:max-w-[min(var(--max-width-brand-wide,112rem),calc(100vw-3rem))] 3xl:px-20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
