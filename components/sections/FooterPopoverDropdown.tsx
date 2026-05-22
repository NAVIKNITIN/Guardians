"use client";

import { IconChevronDown } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

/** Same look as `Navbar` flyout items — Nexa 15, #202225, hover row tint. */
const panelLinkClass = cn(
  "n-reg not-italic text-[#202225] fs-15 lh-100",
  "pointer-events-auto relative z-10 block w-full px-4 py-2.5 text-left",
  "transition-colors hover:bg-black/[0.04] hover:text-[#8F8183]",
);

export type FooterPopoverItem = { label: string; href: string };

type FooterPopoverDropdownProps = {
  items: FooterPopoverItem[];
  label: string;
};

/**
 * Footer quick-link submenu (same pattern as navbar flyouts).
 * Opens **above** the trigger so the panel is not cut off at the bottom of the page.
 */
export function FooterPopoverDropdown({
  items,
  label,
}: FooterPopoverDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    const onDocPointerDown = (e: Event) => {
      const t = e.target;
      if (t instanceof Node && rootRef.current?.contains(t)) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown, { capture: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown, { capture: true });
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative inline-block align-baseline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-0.5 n-reg text-white transition-colors hover:text-white/80"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        {label}
        <IconChevronDown
          className={cn(
            "h-3 w-3 shrink-0 text-white/90 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <ul
        id={menuId}
        className={cn(
          "list-none p-0",
          "absolute bottom-full left-1/2 z-20 w-[max(12.5rem,100%)] min-w-[12.5rem] max-w-[min(16rem,calc(100vw-1.5rem))] -translate-x-1/2 sm:left-0 sm:translate-x-0",
          "rounded border border-black/[0.06] bg-[#FAFAFA] py-2 text-[#202225] shadow-md",
          !open && "hidden",
        )}
        role="menu"
      >
        {items.map((item) => (
          <li key={item.href} role="none">
            <Link
              role="menuitem"
              href={item.href}
              className={panelLinkClass}
              onClick={() => {
                setOpen(false);
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const defaultMediaItems: FooterPopoverItem[] = [
  { label: "Newsroom", href: "/newsroom" },
  { label: "Blog", href: "/blog" },
  { label: "Magazine", href: "/magazine" },
  { label: "Gazette", href: "/gazette" },
];

/** @deprecated Use `FooterPopoverDropdown` with media items. */
export function FooterMediaDropdown() {
  return (
    <FooterPopoverDropdown label="Media" items={defaultMediaItems} />
  );
}
