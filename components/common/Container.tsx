import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-brand px-4 sm:px-6 lg:px-8 xl:px-10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
