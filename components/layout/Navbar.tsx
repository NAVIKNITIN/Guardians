"use client";

import { Container } from "@/components/common/Container";
import { IconChevronDown, IconSearch } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLeft = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/buyer/services",
    dropdown: true,
    dropdownItems: [
      { label: "Buyer's Services", href: "/buyer/services" },
      { label: "Developer's Services", href: "/developer/services" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    dropdown: true,
    dropdownItems: [
      { label: "Ongoing Projects", href: "/projects?stage=ongoing" },
      { label: "Completed Projects", href: "/projects?stage=completed" },
    ],
  },
  // { label: "Developer", href: "/Main", dropdown: true },
];

const navRight = [
  { label: "Partners & Clients", href: "/partners" },
  { label: "TGREA", href: "/tgrea" },
  { label: "Career", href: "/career" },
];

/** Primary nav labels (Figma TGREA): Nexa 400, 18/18, #202225 */
const navLinkClass =
  "font-nexa not-italic fs-17 lh-100 text-[#202225] transition-colors hover:text-brand-accent";

const navLinkClassMobile =
  "font-nexa not-italic fs-18 lh-100 text-[#202225] transition-colors hover:text-brand-accent";

/** Desktop flyout rows — same type ramp as primary links (avoids UA / role=menu text sizing). */
const navDropdownItemClass = cn(
  navLinkClass,
  "pointer-events-auto relative z-10 block w-full px-4 py-2.5 text-left transition-colors hover:bg-black/[0.04] hover:text-brand-accent",
);

/** Top bar “Search” — Figma Group 63: box height 11px → 11/11 type (paste had no font block; color kept for bar contrast). */
const searchLabelClass =
  "font-nexa not-italic fw-400 text-[11px] leading-[11px] text-white/95 capitalize sm:text-xs sm:leading-none";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navStateClass(isActive: boolean) {
  return isActive ? "fw-400 opacity-100" : "fw-100 opacity-55";
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  /** After a submenu link is clicked, hide the flyout until pointer leaves the trigger (hover/focus-within otherwise keeps it open). */
  const [closedDesktopDropdown, setClosedDesktopDropdown] = useState<
    string | null
  >(null);
  useBodyScrollLock(open);

  return (
    <header className="sticky top-0 z-50 w-full border-t border-[#1A1A1A]/10 bg-[#8F8083]">
      <div className="bg-brand-bar/90 text-[11px] font-medium tracking-wide text-white/95 sm:text-xs">
        <Container className="flex h-9 items-center justify-end sm:h-10">
          <Link
            href="#search"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="Search"
          >
            <IconSearch className="h-3.5 w-3.5 opacity-90 sm:h-4 sm:w-4" />
            <span className="capitalize">Search</span>
          </Link>
        </Container>
      </div>

      <div className="border-b border-black/[0.06] bg-[#FAFAFA] backdrop-blur-md">
        <Container className="relative">
          {/* Mobile: centered logo, menu control on the right */}
          <div className="relative flex min-h-[4.25rem] items-center justify-between py-3 sm:min-h-[4.5rem] xl:hidden">
            <span className="w-10 shrink-0" aria-hidden />
            <Link
              href="/"
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 py-1"
              aria-label="The Guardians home"
            >
              <Image
                src="/images/Home/Logo.png"
                alt="The Guardians Real Estate Advisory"
                width={220}
                height={52}
                className="h-8 w-auto max-w-[min(72vw,220px)] object-cover"
                sizes="220px"
                priority
              />
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded border border-black/10"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className={cn(
                  "h-0.5 w-5 bg-[#1A1A1A] transition-transform",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-[#1A1A1A] transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-[#1A1A1A] transition-transform",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </button>
          </div>

          {/* Desktop: left nav | centered logo | right nav */}
          <div className="hidden min-h-[5.25rem] items-stretch py-4 lg:min-h-[5.5rem] lg:py-5 xl:flex">
            <nav
              className="flex min-w-0 flex-1 items-center justify-end gap-7 pr-6 lg:gap-9 lg:pr-10"
              aria-label="Primary left"
            >
              {navLeft.map((item) => {
                const dropdownItems =
                  "dropdownItems" in item ? item.dropdownItems : undefined;
                const hasMenu =
                  Array.isArray(dropdownItems) && dropdownItems.length > 0;

                if (hasMenu && dropdownItems) {
                  const dismissed = closedDesktopDropdown === item.label;
                  const isItemActive =
                    isActivePath(pathname, item.href) ||
                    dropdownItems.some((sub) => isActivePath(pathname, sub.href));
                  return (
                    <div key={item.label} className="group relative shrink-0">
                      <Link
                        href={item.href}
                        className={cn(
                          navLinkClass,
                          navStateClass(isItemActive),
                          "inline-flex items-center gap-1.5 font-nexa not-italic ",
                        )}
                        aria-haspopup="true"
                        onMouseEnter={() => {
                          if (closedDesktopDropdown === item.label) {
                            setClosedDesktopDropdown(null);
                          }
                        }}
                      >
                        {item.label}
                        <IconChevronDown className="h-3 w-3 shrink-0 text-[#202225]/50 transition-transform group-hover:translate-y-px" />
                      </Link>
                      <div
                        className={cn(
                          "pointer-events-none invisible absolute left-0 top-full z-[60] pt-3 opacity-0 transition-[opacity,visibility] duration-150",
                          !dismissed &&
                          "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100",
                        )}
                        role="presentation"
                      >
                        <ul
                          className="list-none p-0 font-nexa not-italic fw-400 fs-17 lh-100 text-[#202225] min-w-[12.5rem] rounded border border-black/[0.06] bg-[#FAFAFA] py-2 shadow-md"
                          role="menu"
                        >
                          {dropdownItems.map((sub) => (
                            <li key={sub.href} role="none">
                              <Link
                                role="menuitem"
                                href={sub.href}
                                className={navDropdownItemClass}
                                onClick={() => {
                                  // Defer so the Link’s navigation runs before we hide the panel;
                                  // sync state can drop pointer-events and break the first click.
                                  window.setTimeout(() => {
                                    setClosedDesktopDropdown(item.label);
                                  }, 0);
                                }}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      navLinkClass,
                      navStateClass(isActivePath(pathname, item.href)),
                      "group inline-flex shrink-0 items-center gap-1.5",
                    )}
                  >
                    {item.label}
                    {item.dropdown ? (
                      <IconChevronDown className="h-3 w-3 shrink-0 text-[#202225]/50 transition-transform group-hover:translate-y-px" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/"
              className="flex shrink-0 items-center justify-center self-center px-2 lg:px-5"
              aria-label="The Guardians home"
            >
              <Image
                src="/images/Home/Logo.png"
                alt="The Guardians Real Estate Advisory"
                width={260}
                height={60}
                className="h-10 w-auto object-cover sm:h-11 lg:h-[3.25rem]"
                sizes="(min-width: 1280px) 260px, 0px"
              />
            </Link>

            <nav
              className="flex min-w-0 flex-1 items-center justify-start gap-7 pl-6 lg:gap-9 lg:pl-10"
              aria-label="Primary right"
            >
              {navRight.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    navLinkClass,
                    navStateClass(isActivePath(pathname, item.href)),
                    "shrink-0",
                    item.label === "TGREA" && "uppercase",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "border-b border-black/[0.06] bg-[#FAFAFA] xl:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-4 py-6">
          <div className="flex flex-col gap-3">
            {navLeft.map((item) => {
              const dropdownItems =
                "dropdownItems" in item ? item.dropdownItems : undefined;
              const hasMenu =
                Array.isArray(dropdownItems) && dropdownItems.length > 0;

              return (
                <div key={item.label} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className={cn(
                      navLinkClassMobile,
                      navStateClass(isActivePath(pathname, item.href)),
                      "inline-flex items-center gap-1.5",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    {item.dropdown ? (
                      <IconChevronDown className="h-3.5 w-3.5 shrink-0 text-[#202225]/50" />
                    ) : null}
                  </Link>
                  {hasMenu && dropdownItems
                    ? dropdownItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={cn(
                          navLinkClassMobile,
                          navStateClass(isActivePath(pathname, sub.href)),
                          "border-l-2 border-black/[0.08] pl-4",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))
                    : null}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 border-t border-black/[0.06] pt-4">
            {navRight.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  navLinkClassMobile,
                  navStateClass(isActivePath(pathname, item.href)),
                  item.label === "TGREA" && "uppercase",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
