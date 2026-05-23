"use client";
import { Container } from "@/components/common/Container";
import {
  ContactEnquiryEmailIcon,
  ContactEnquiryPhoneIcon,
} from "@/components/common/ContactEnquiryIcons";
import { IconArrowUpRight, IconChevronDown } from "@/components/common/icons";
import {
  FooterMediaDropdown,
  FooterPopoverDropdown,
} from "@/components/sections/FooterPopoverDropdown";
import {
  BUYER_SERVICES,
  DEVELOPER_SERVICES,
  PROJECTS_COMPLETED,
  PROJECTS_ONGOING,
} from "@/data/audience-marketing-shared";
import { CONTACT_ENQUIRIES } from "@/data/contactEnquiries";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const locations = [{ "label": "Mumbai", "address": "C-602 & 603, ONE BKC, G Block, Bandra Kurla Complex, Bandra (E), Mumbai - 400051" }, { "label": "Pune", "address": "Westport, Unit No 410, Survey Nos. 32/1A/1/30 to 38 & 54 of Revenue Village, Pan Card Club Road, Baner, Pune 411045" }, { "label": "Dubai", "address": "TGREA International Advisory LLC, Office No 1807, Lake Central Tower, Business Bay, Dubai (UAE)" },{ "label": "Goa", "address": "near Baga Beach" }, ] as const;
const accordionPanelCls =
  "overflow-hidden transition-all duration-300 ease-in-out";

const accordionPanelOpenCls = "max-h-40 opacity-100";
const accordionPanelClosedCls = "max-h-0 opacity-0";

const queriesAccordionOpenCls = "max-h-44 opacity-100";

const footerEnquiryLinkCls =
  "inline-flex items-center gap-2 fs-10 md:fs-12 n-book text-white transition-colors hover:text-white/80";

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
  ],
  [{ label: "Partners & Clients", href: "/partners" }],
];

const footerServicesItems = [
  { label: "Buyer's Services", href: BUYER_SERVICES },
  { label: "Developer's Services", href: DEVELOPER_SERVICES },
] as const;

const footerProjectsItems = [
  { label: "Ongoing Projects", href: PROJECTS_ONGOING },
  { label: "Completed Projects", href: PROJECTS_COMPLETED },
] as const;

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

const quickLinkRowCls =
  "flex w-full min-w-0 flex-wrap items-center justify-center gap-x-1.5 gap-y-1 n-book text-[12px] leading-[1.45] text-white sm:justify-start sm:fs-14 sm:lh-25";

/** Social + Quick links — shared bottom band on mobile two-column footer */
const footerBottomSectionCls = "mt-auto w-full min-w-0 pt-6 sm:pt-8";

function FooterAccordionItem({
  label,
  isOpen,
  onToggle,
  panelClassName,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  panelClassName?: string;
  children: ReactNode;
}) {
  return (
    <li>
      <button
        suppressHydrationWarning
        type="button"
        className={dropdownRowCls}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{label}</span>
        <IconChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-white transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          accordionPanelCls,
          isOpen ? panelClassName ?? accordionPanelOpenCls : accordionPanelClosedCls,
        )}
      >
        {children}
      </div>
    </li>
  );
}

function QuickLinkRow({ items }: { items: { label: string; href: string }[] }) {
  return (
    <>
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
    </>
  );
}

export function Footer() {
  const [openLocation, setOpenLocation] = useState<string | null>(null);
  const [openQuery, setOpenQuery] = useState<string | null>(null);
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
              "grid grid-cols-2 items-stretch gap-x-6 gap-y-8 sm:gap-8",
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
                  "n-bold max-w-[min(100%,26rem)] text-balance text-white",
                  "text-[clamp(1.35rem,4.8vw,1.85rem)] leading-[1.12]",
                  "sm:mt-6 sm:text-[clamp(1.5rem,4.5vw,2.25rem)] sm:leading-[1.1]",
                  "md:fs-42 md:lh-42 md:leading-[1.1]",
                )}
              >
                Have a vision for your next move?{" "}
                <span className="text-[#BCBDC0]">Let&apos;s build it together.</span>
              </h2>

              {/*
               * CTA — Figma: outline border, white, Nexa Bold (all Figma CTAs use weight 700).
               * Same outline-button pattern as Frame 62 "Explore More" button.
               */}
              <Link
                href="/contact"
                className={cn(
                  "group mt-3 inline-flex w-fit max-w-full shrink-0 items-center justify-center gap-2 uppercase",
                  "border border-white bg-transparent py-2 n-bold text-[11px] leading-[16px] text-white",
                  "transition-colors hover:bg-white hover:text-neutral-900",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  "md:w-fit md:gap-2.5 md:py-3 md:text-sm md:fs-16 md:leading-normal",
                  "px-4 py-2.5"
                )}
              >
                Get In Touch
                <IconArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-3.5 md:w-3.5" />
              </Link>
            </div>

            {/* ── Column 2: Location + Social ────────────────────────────── */}
            <div
              className={cn(
                "flex min-h-full min-w-0 flex-col items-center gap-6 text-center",
                "sm:items-stretch sm:text-left",
                "col-span-1 lg:col-span-3 lg:pt-2 lg:mr-8",
              )}
            >
              {/* Location */}
              <div className="w-full min-w-0">
                <h3 className={sectionTitleCls}>Location</h3>
                <ul className={dropdownListCls}>
                  {locations.map((city) => (
                    <FooterAccordionItem
                      key={city.label}
                      label={city.label}
                      isOpen={openLocation === city.label}
                      onToggle={() =>
                        setOpenLocation(
                          openLocation === city.label ? null : city.label,
                        )
                      }
                    >
                      <p className="fs-10 md:fs-12 py-3 text-white">{city.address}</p>
                    </FooterAccordionItem>
                  ))}
                </ul>
              </div>

              {/* Social — two sub-columns: left (Facebook, Instagram) | right (Twitter/X, LinkedIn) */}
              <div className={footerBottomSectionCls}>
                <h3 className={sectionTitleCls}>Social</h3>
                <div className="mx-auto mt-3 flex w-fit max-w-full items-start justify-center gap-8 sm:mx-0 sm:justify-start">
                  <ul className="flex flex-col items-start gap-2">
                    {socialLeftCol.map(({ label, href, iconSrc }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="inline-flex items-center gap-2 whitespace-nowrap n-book text-[12px] leading-[1.35] text-white transition-colors hover:text-white/80 sm:fs-14"
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
                  <ul className="flex flex-col items-start gap-2">
                    {socialRightCol.map(({ label, href, iconSrc }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="inline-flex items-center gap-2 whitespace-nowrap n-book text-[12px] leading-[1.35] text-white transition-colors hover:text-white/80 sm:fs-14"
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
                "flex min-h-full min-w-0 flex-col items-center gap-6 text-center lg:ml-8",
                "sm:items-stretch sm:text-left",
                "col-span-1 lg:col-span-3 lg:pt-2",
              )}
            >
              {/* Have queries */}
              <div className="w-full min-w-0">
                <h3 className={sectionTitleCls}>Have queries?</h3>
                <ul className={dropdownListCls}>
                  {CONTACT_ENQUIRIES.map((query) => (
                    <FooterAccordionItem
                      key={query.label}
                      label={query.label}
                      isOpen={openQuery === query.label}
                      panelClassName={queriesAccordionOpenCls}
                      onToggle={() =>
                        setOpenQuery(
                          openQuery === query.label ? null : query.label,
                        )
                      }
                    >
                      <div className="flex flex-col gap-2 py-3">
                        {query.email ? (
                          <a
                            href={`mailto:${query.email}`}
                            className={footerEnquiryLinkCls}
                          >
                            <ContactEnquiryEmailIcon />
                            {query.email}
                          </a>
                        ) : null}
                        {query.phones.map((phone, phoneIdx) => (
                          <a
                            key={`${phone.telHref}-${phoneIdx}`}
                            href={phone.telHref}
                            className={footerEnquiryLinkCls}
                          >
                            <ContactEnquiryPhoneIcon />
                            {phone.display}
                          </a>
                        ))}
                      </div>
                    </FooterAccordionItem>
                  ))}
                </ul>
              </div>

              {/* Quick links */}
              <div className={footerBottomSectionCls}>
                <h3 className={sectionTitleCls}>Quick links</h3>
                <div className="mx-auto mt-2 flex w-full max-w-full flex-col items-center gap-1 sm:mx-0 sm:items-start sm:gap-0.5">
                  <div className={quickLinkRowCls}>
                    <QuickLinkRow items={quickLinkRows[0]} />
                    <span className="select-none" aria-hidden>
                      ·
                    </span>
                    <FooterPopoverDropdown
                      label="Services"
                      items={[...footerServicesItems]}
                    />
                  </div>

                  <div className={quickLinkRowCls}>
                    <FooterPopoverDropdown
                      label="Projects"
                      items={[...footerProjectsItems]}
                    />
                    <span className="select-none" aria-hidden>
                      ·
                    </span>
                    <QuickLinkRow items={quickLinkRows[1]} />
                  </div>

                  <div className={quickLinkRowCls}>
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
