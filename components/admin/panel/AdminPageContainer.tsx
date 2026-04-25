"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type AdminPageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function AdminPageContainer({
  children,
  className,
}: AdminPageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1360px] px-2.5 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
