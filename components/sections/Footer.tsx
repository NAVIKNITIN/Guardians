import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconChevronDown } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

const locations = ["Mumbai", "Pune", "Dubai"] as const;
const queries = ["Business", "HR", "Channel Partner"] as const;

/** Figma: left column Facebook · Instagram, right column Twitter/X · LinkedIn */
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
  [
    { label: "Career", href: "/career" },
    { label: "Media", href: "/newsroom" },
  ],
];

const sectionTitleClass =
  "font-nexa text-base font-bold uppercase tracking-[0.1em] text-white sm:text-lg";

const dropdownButtonClass =
  "flex w-full items-center justify-between gap-2 border-b border-white py-1.5 text-left font-nexa text-sm font-normal text-white transition-colors hover:text-white";

function QuickLinkRow({ items }: { items: { label: string; href: string }[] }) {
  return (
    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-nexa text-sm leading-snug text-white">
      {items.map((item, i) => (
        <span key={item.href} className="inline-flex items-center gap-x-1.5">
          {i > 0 && (
            <span className="select-none text-white/50" aria-hidden>
              ·
            </span>
          )}
          <Link
            href={item.href}
            className="font-nexa text-white transition-colors hover:text-white/90"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#8F8183] font-nexa text-brand-text-inverse">
      {/* Watermark — anchored bottom-left behind branding */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/Group%204.svg"
          alt=""
          width={344}
          height={193}
          className="absolute bottom-0 left-8 h-auto w-[min(26rem,88vw)] max-w-none object-contain object-bottom object-left sm:left-[14%] lg:left-[20%] lg:w-[min(22rem,32vw)]"
        />
      </div>

      <Container className="relative z-10 py-7 sm:py-8 lg:py-9">
        <div
          className={cn(
            "grid gap-6 lg:gap-7",
            "lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-0",
            "xl:gap-x-12 xl:gap-x-14",
          )}
        >
          {/* Column 1 — brand, headline, CTA */}
          <div className="relative flex min-w-0 shrink-0 flex-col gap-4 sm:gap-5 lg:col-span-5 lg:px-6">
            <div className="shrink-0">
              <Image
                src="/images/Logo.svg"
                alt="The Guardians Real Estate Advisory"
                width={220}
                height={56}
                className="h-auto w-full max-w-[180px] object-contain object-left sm:max-w-[200px]"
                priority={false}
              />
            </div>

            <h2 className="max-w-[26rem] font-nexa text-[clamp(1.5rem,3.2vw,2.35rem)] font-normal leading-[1.1] sm:mt-4">
              <span className="font-normal text-[#BCBDC0]">Lorem Ipsum Dolor? </span>
              <span className="font-normal text-[#BCBDC0]">
                Let&apos;s <span className="font-bold text-[#F7F7F7]">Collaborate.</span>
              </span>
            </h2>

            <Link
              href="/contact"
              className={cn(
                "group inline-flex w-fit shrink-0 items-center gap-2 border border-white bg-transparent px-4 py-2.5 font-nexa text-sm font-bold text-white transition-colors sm:text-base",
                "hover:bg-white hover:text-neutral-900",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              )}
            >
              Get In Touch
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Column 2 — Location + Social */}
          <div className="flex min-w-0 shrink-0 flex-col gap-5 sm:gap-6 lg:col-span-3 lg:pt-0">
            <div>
              <h3 className={sectionTitleClass}>Location</h3>
              <ul className="mt-2 space-y-0">
                {locations.map((city) => (
                  <li key={city}>
                    <button type="button" className={dropdownButtonClass}>
                      <span>{city}</span>
                      <IconChevronDown className="h-4 w-4 shrink-0 text-white" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={sectionTitleClass}>Social</h3>
              <div className="mt-2 flex items-stretch gap-4 sm:gap-5">
                <ul className="flex min-w-0 flex-1 flex-col gap-2 font-nexa text-sm">
                  {socialLeftCol.map(({ label, href, iconSrc }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2.5 font-nexa text-white transition-colors hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={iconSrc}
                          alt=""
                          width={14}
                          height={14}
                          className="h-3.5 w-3.5 shrink-0 object-contain"
                        />
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="w-px shrink-0 self-stretch bg-white/40" aria-hidden />
                <ul className="flex min-w-0 flex-1 flex-col gap-2 font-nexa text-sm">
                  {socialRightCol.map(({ label, href, iconSrc }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2.5 font-nexa text-white transition-colors hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={iconSrc}
                          alt=""
                          width={14}
                          height={14}
                          className="h-3.5 w-3.5 shrink-0 object-contain"
                        />
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3 — Queries + Quick links */}
          <div className="flex min-w-0 shrink-0 flex-col gap-5 sm:gap-6 lg:col-span-3 lg:pt-0">
            <div>
              <h3 className={sectionTitleClass}>Have queries?</h3>
              <ul className="mt-2 space-y-0">
                {queries.map((q) => (
                  <li key={q}>
                    <button type="button" className={dropdownButtonClass}>
                      <span>{q}</span>
                      <IconChevronDown className="h-4 w-4 shrink-0 text-white" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={sectionTitleClass}>Quick links</h3>
              <div className="mt-2 flex flex-col gap-1.5">
                {quickLinkRows.map((row, idx) => (
                  <QuickLinkRow key={idx} items={row} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width rule + copyright */}
        <div className="mt-8 shrink-0 border-t border-white pt-5 sm:mt-9 sm:pt-6">
          <p className="text-center font-nexa text-sm font-light leading-normal text-white">
            © {year} The Guardians. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
