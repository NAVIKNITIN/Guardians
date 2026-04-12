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
        "flex gap-10 border-b border-neutral-200 font-nexa text-sm font-medium tracking-wide",
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
              "-mb-px pb-2.5 transition-colors",
              selected
                ? "border-b-2 border-[#6b5d56] text-[#4a433e]"
                : "border-b-2 border-transparent text-neutral-400 hover:text-neutral-500",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
