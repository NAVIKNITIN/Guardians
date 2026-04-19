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
  /**
   * Each tab uses half of the row; the active underline spans that half (e.g. Ongoing | Completed).
   * Use with a bounded width on the tablist (`max-w-*` / `flex-1`) so “50%” is visible.
   */
  equalTabWidth?: boolean;
};

/**
 * Text tabs with underline on the active tab.
 * `equalTabWidth`: Landmark — 305×32, 50/50; taupe active + light grey inactive (continuous baseline).
 */
export function UnderlineTabs<T extends string>({
  value,
  onChange,
  options,
  className,
  equalTabWidth = false,
}: UnderlineTabsProps<T>) {
  return (
    <div
      className={cn(
        "flex n-reg",
        equalTabWidth
          ? "h-8 min-h-8 max-h-8 w-[305px] shrink-0 gap-0 overflow-hidden leading-none ml-auto"
          : "fs-20 gap-10 border-b border-neutral-200",
        className,
      )}
      role="tablist"
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        if (equalTabWidth) {
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(opt.value)}
              className={cn(
                "flex min-h-0 min-w-0 flex-1 basis-0 cursor-pointer flex-col justify-end gap-1 px-0.5 transition-colors",
              )}
            >
              <span
                className={cn(
                  "n-reg fs-18 text-center leading-none",
                  selected
                    ? "text-[#8F8183] n-bold"
                    : "text-[#8F8183] hover:text-[#8F8183]/85",
                )}
              >
                {opt.label}
              </span>
              {/* Segmented rule: thick taupe (active) vs 1px grey — fills half width */}
              <span
                aria-hidden
                className={cn(
                  "block w-full shrink-0 rounded-[1px]",
                  selected ? "h-[3px] bg-[#8F8183]" : "h-px bg-[#8F8183]",
                )}
              />
            </button>
          );
        }
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "cursor-pointer pt-1 transition-colors",
              selected
                ? "-mb-px border-b-2 border-brand-accent pb-1.5 text-brand-text-secondary"
                : "-mb-px border-b-2 border-transparent pb-1.5 text-[#D9D9D9] hover:text-brand-text-primary",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
