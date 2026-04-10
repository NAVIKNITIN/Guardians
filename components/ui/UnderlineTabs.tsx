"use client";

import { cn } from "@/utils/cn";

export type UnderlineTabOption<T extends string> = {
  value: T;
  label: string;
};

export type UnderlineTabsProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly UnderlineTabOption<T>[];
  className?: string;
};

/** Simple text tabs with bottom border indicator. */
export function UnderlineTabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: UnderlineTabsProps<T>) {
  return (
    <div
      className={cn(
        "flex gap-8 border-b border-transparent text-sm font-medium",
        className,
      )}
      role="tablist"
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "-mb-px pb-2 transition-colors",
              selected
                ? "border-b-2 border-black text-brand-text-primary"
                : "text-brand-text-muted hover:text-brand-text-secondary",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
