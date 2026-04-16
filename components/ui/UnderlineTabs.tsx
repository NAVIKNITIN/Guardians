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

/** Text tabs with a thin baseline and a thicker underline on the active tab (design: landmark / marketing). */
export function UnderlineTabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: UnderlineTabsProps<T>) {
  return (
    <div
      className={cn(
        "flex gap-10 border-b border-neutral-200 n-reg  fs-20 ",
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
              "-mb-px pb-1.5 pt-1 transition-colors",
              selected
                ? "cursor-pointer border-b-2 border-brand-accent text-brand-text-secondary"
                : " cursor-pointer border-b-2 border-transparent text-[#D9D9D9] hover:text-brand-text-primary",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
