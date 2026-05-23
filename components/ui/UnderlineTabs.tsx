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
  if (equalTabWidth) {
    return (
      <div
        className={cn(
          "relative flex w-full min-w-[17.5rem] max-w-full gap-0 leading-none n-reg sm:ml-auto sm:max-w-[325px]",
          className,
        )}
        role="tablist"
      >
        {/* Single continuous baseline under both tabs */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-px bg-[#8F8183]"
        />
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(opt.value)}
              className="relative z-[1] flex min-h-8 flex-1 basis-0 cursor-pointer flex-col items-stretch justify-end px-2 pb-[3px] transition-colors sm:px-3"
            >
              <span
                className={cn(
                  "n-reg block w-full whitespace-nowrap pb-2 text-center text-sm leading-tight sm:fs-18 sm:leading-none",
                  selected
                    ? "text-[#8F8183] n-bold"
                    : "text-[#8F8183] hover:text-[#8F8183]/85",
                )}
              >
                {opt.label}
              </span>
              {selected ? (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 z-[2] h-[3px] bg-[#8F8183]"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn("flex n-reg fs-20 gap-10 border-b border-neutral-200", className)}
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
