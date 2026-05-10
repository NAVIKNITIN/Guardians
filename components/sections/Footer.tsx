"use client";
import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconChevronDown } from "@/components/common/icons";
import { FooterMediaDropdown } from "@/components/sections/FooterMediaDropdown";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const locations = [{ "label": "Mumbai", "address": "C-602 & 603, ONE BKC, G Block, Bandra Kurla Complex, Bandra (E), Mumbai - 400051" }, { "label": "Pune", "address": "Westport, Unit No 410, Survey Nos. 32/1A/1/30 to 38 & 54 of Revenue Village, Pan Card Club Road, Baner, Pune 411045" }, { "label": "Dubai", "address": "TGREA International Advisory LLC, Office No 1807, Lake Central Tower, Business Bay, Dubai (UAE)" }] as const;
const queries = ["Business", "HR", "Channel Partner"] as const;

/** Figma: left sub-col Facebook/Instagram, right sub-col Twitter/X & LinkedIn */
const socialLeftCol = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    iconSrc: "/images/facebook.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    iconSrc: "/images/instagram.svg",
  },
] as const;
const socialRightCol = [
  {
    label: "Twitter/X",
    href: "https://twitter.com",
    iconSrc: "/images/twitter.svg",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    iconSrc: "/images/linkedIn.svg",
  },
] as const;

const quickLinkRows: { label: string; href: string }[][] = [
  [
    { label: "About", href: "/about" },
    { label: "Brands", href: "/about#brands" },
    { label: "Services", href: "#services" },
  ],
  [
    { label: "Projects", href: "#projects" },
    { label: "Partners & Clients", href: "/partners" },
  ],
];

/**
 * Figma section labels — small ALL-CAPS Nexa, tracked, white.
 * Not bold: these are UI labels, not headings.
 */
const sectionTitleCls =
  "block w-full n-bold text-[14px] leading-[1.35] uppercase tracking-[0.09em] text-white text-center sm:text-left sm:fs-18 sm:lh-25 sm:tracking-[0.10em]";

/** Full-width list under Location / Have queries — borders must span column width. */
const dropdownListCls =
  "mt-2 w-full min-w-0 list-none p-0 [&>li]:w-full [&>li]:min-w-0 n-book text-[12px] leading-[1.35] sm:fs-14 sm:lh-20";

/**
 * Figma dropdown row — border-bottom separator + chevron.
 * Figma shows white divider lines between each city / query.
 */
const dropdownRowCls =
  "box-border flex min-h-[40px] w-full min-w-0 max-w-full items-center justify-between gap-2 border-b border-white py-1.5 text-left text-white transition-colors hover:text-white/80 sm:min-h-0 sm:py-[7px]";

function QuickLinkRow({ items }: { items: { label: string; href: string }[] }) {
  return (
    <p className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 n-book text-[12px] leading-[1.45] text-white sm:justify-start sm:fs-14 sm:lh-25">
      {items.map((item, i) => (
        <span
          key={item.href}
          className="inline-flex items-center gap-x-1.5 n-book text-[12px] sm:fs-14"
        >
          {i > 0 && (
            <span className="select-none" aria-hidden>
              ·
            </span>
          )}
          <Link
            href={item.href}
            className="n-reg text-white transition-colors hover:text-white/80"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

export function Footer() {
  const [openLocation, setOpenLocation] = useState<string | null>(null);
  return (
    <footer className="relative overflow-hidden bg-[#8F8183] text-white">
      {/* Horizontal inset + max width: shared <Container>. Vertical rhythm: outer py + grid py-4. */}
      <Container className="relative py-8 sm:py-10 lg:py-3">
        {/* Watermark — Guardian logo mark, bottom-left of the brand column area */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/images/Group%204.svg"
            alt=""
            width={344}
            height={193}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 36vw, 22rem"
            className="absolute bottom-0 left-1/2 h-auto w-[clamp(160px,26vw,22rem)] -translate-x-1/2 select-none object-contain object-bottom-left opacity-90 sm:left-[27%] sm:translate-x-0"
          />
        </div>

        <div className="relative z-10">
          {/*
           * 12-column grid: 5 + 3 + 4 — third column absorbs former Figma “trailing”
           * column so content aligns to the container edge (no dead column on the right).
           */}
          <div
            className={cn(
              "grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8",
              "lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-0 lg:pt-4",
              "xl:gap-x-14 mt-2 md:mt-3",
            )}
          >
            {/* ── Column 1: brand ────────────────────────────────────────── */}
            <div
              className={cn(
                "flex min-w-0 flex-col items-center gap-4 text-center",
                "sm:items-start sm:gap-5 sm:text-left",
                "col-span-2 lg:col-span-6",
              )}
            >
              {/* Logo — Figma natural SVG 223×60, displayed at 178×48 (80 %) */}
              <Image
                src="/images/Logo1.svg"
                alt="The Guardians Real Estate Advisory"
                width={275}
                height={75}
                className="h-auto w-[min(78vw,275px)] shrink-0 object-contain object-left sm:w-auto"
                priority={false}
              />

              {/*
               * Headline — Figma:
               *   "Lorem Ipsum Dolor? Let's" → Nexa Book (#BCBDC0, muted)
               *   "Collaborate."             → Nexa Bold (#F7F7F7, bright)
               * Two visual lines; natural wrap at this font size + column width.
               */}
              <h2
                className={cn(
                  "n-bold max-w-[min(100%,26rem)] lh-42",
                  "fs-42",
                  "text-balance",
                  "sm:mt-6 sm:leading-[1.1]",
                )}
              >
                <span className="text-[#BCBDC0]">Lorem Ipsum Dolor? </span>
                <span className="text-[#BCBDC0]">Let&apos;s </span>
                <span className="n-bold text-[#F7F7F7]">Collaborate.</span>
              </h2>

              {/*
               * CTA — Figma: outline border, white, Nexa Bold (all Figma CTAs use weight 700).
               * Same outline-button pattern as Frame 62 "Know More" button.
               */}
              <Link
                href="/contact"
                className={cn(
                  "group inline-flex w-full shrink-0 items-center justify-center gap-2.5",
                  "border border-white bg-transparent py-3 n-bold text-sm text-white mt-3",
                  "transition-colors hover:bg-white hover:text-neutral-900",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  "md:max-w-[180px] fs-16 n-bold",
                )}
              >
                Get In Touch
                <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── Column 2: Location + Social ────────────────────────────── */}
            <div
              className={cn(
                "flex min-w-0 flex-col items-center gap-6 text-center",
                "sm:items-stretch sm:text-left",
                "col-span-1 lg:col-span-3 lg:pt-2 lg:mr-8",
              )}
            >
              {/* Location */}
              <div className="w-full min-w-0">
                <h3 className={sectionTitleCls}>Location</h3>
                <ul className={dropdownListCls}>
                  {locations?.map((city: { label: string; address: string }) => (
                    <li key={city.label}>
                      <button
                        suppressHydrationWarning
                        type="button"
                        className={dropdownRowCls}
                        onClick={() => setOpenLocation(openLocation === city.label ? null : city.label)}
                      >
                        <span>{city.label}</span>
                        <IconChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-white transition-transform duration-300",
                            openLocation === city.label && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Accordion content */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          openLocation === city.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <p className="fs-12 py-3 text-white">
                          {city.address}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social — two sub-columns: left (Facebook, Instagram) | right (Twitter/X, LinkedIn) */}
              <div className="w-full min-w-0 mt-3">
                <h3 className={sectionTitleCls}>Social</h3>
                <div className="mt-4 flex w-full min-w-0 items-start justify-center gap-6 sm:justify-start sm:gap-8">
                  <ul className="flex flex-col gap-1">
                    {socialLeftCol.map(({ label, href, iconSrc }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="inline-flex items-center gap-2 n-book text-[12px] leading-[1.35] text-white transition-colors hover:text-white/80 sm:fs-14"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={iconSrc}
                            alt=""
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 shrink-0"
                          />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="flex flex-col gap-1">
                    {socialRightCol.map(({ label, href, iconSrc }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="inline-flex items-center gap-2 n-book text-[12px] leading-[1.35] text-white transition-colors hover:text-white/80 sm:fs-14"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={iconSrc}
                            alt=""
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 shrink-0"
                          />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Column 3: Have queries + Quick links ───────────────────── */}
            <div
              className={cn(
                "flex min-w-0 flex-col items-center gap-6 text-center lg:ml-8",
                "sm:items-stretch sm:text-left",
                "col-span-1 lg:col-span-3 lg:pt-2",
              )}
            >
              {/* Have queries */}
              <div className="w-full min-w-0">
                <h3 className={sectionTitleCls}>Have queries?</h3>
                <ul className={dropdownListCls}>
                  {queries.map((q: string) => (
                    <li key={q}>
                      <button type="button" className={dropdownRowCls}>
                        <span>{q}</span>
                        <IconChevronDown className="h-4  w-4 shrink-0 text-white" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick links */}
              <div className="w-full min-w-0 mt-3">
                <h3 className={sectionTitleCls}>Quick links</h3>
                <div className="mt-2 flex flex-col gap-2 sm:gap-1.5 ">
                  {quickLinkRows.map((row, idx) => (
                    <QuickLinkRow key={idx} items={row} />
                  ))}

                  <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 n-book text-[12px] leading-[1.45] text-white sm:justify-start sm:fs-14 sm:lh-25">
                    <span className="inline-flex items-center gap-x-1.5 n-book text-[12px] sm:fs-14">
                      <Link
                        href="/career"
                        className="n-reg text-white transition-colors hover:text-white/80"
                      >
                        Career
                      </Link>
                    </span>
                    <span className="select-none" aria-hidden>
                      ·
                    </span>
                    <FooterMediaDropdown />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Copyright ──────────────────────────────────────────────────── */}
          <div className="mt-8 border-t border-white/50 pt-5 sm:mt-10 sm:pt-3">
            <p className="text-center n-reg text-[11px] fw-300 text-white leading-[1.4] sm:fs-14 sm:lh-20 sm:leading-relaxed">
              © 2025 The Guardians. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
